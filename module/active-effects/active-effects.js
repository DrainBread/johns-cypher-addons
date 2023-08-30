import { clone, stringToArray, timeout } from "../../utilities/utils.js"

export async function deleteTransferredEffect(item){
    if(!item.actor)
        return;
    
    const actor = game.actors.get(item.actor.id);
  
    // Get all effects iids with the transfer flag
    let itemEffects = clone(item.getFlag('johns-cypher-addons', 'effects'));
    let toTransfer = Object.keys(itemEffects)
      .filter( k => itemEffects[k].transfer && !itemEffects[k].disabled );

    // For each of those effects, get the effect ids on the actor
    let appliedEffects = [];
    for(const te of toTransfer){
        appliedEffects = [].concat(appliedEffects, 
            Array.from(actor.effects).filter(e => 
                e.data.flags['johns-cypher-addons'].iid == te)
                .map(e => e.id));
    }

    // Remove the effects
    await item.actor.deleteEmbeddedDocuments("ActiveEffect", appliedEffects);   
}

export async function applyTransferredEffect(item){
    if(!item.actor)
        return;
  
    // Get all effects with the transfer flag
    let toTransfer = Object.values(clone(item.getFlag('johns-cypher-addons', 'effects')))
        .filter( v => v.transfer && !v.disabled );

    // Apply the effects
    if(toTransfer?.length > 0){
        let changes = [];
        for(let e of toTransfer){
            Object.keys(e.changes).forEach(k => { changes.push(e.changes[k]) });
            e.changes = changes;
            applyActiveEffect(item.actor, clone(e));
            changes = [];
        }        
    }
        
}
export function getEffectsFromItem(itemData){
    if(itemData.flags['johns-cypher-addons']?.effects){
        let effects = itemData.flags['johns-cypher-addons'].effects;
        let DATA = [];

        for(let v of Object.values(effects)){
            if(!v.disabled) {
                let changes = [];
                Object.values(v.changes).forEach(e => changes.push(e));
                v.changes = changes;
                DATA.push(clone(v));
                changes = [];
            }
        }
        return DATA;
    }
    return [];
}

export async function createActiveEffect(DATA, actorID, targetsIDs){

    const actor = game.actors.get(actorID);

    let targets = game.canvas.tokens.placeables.filter(e => targetsIDs.includes(e.id))
    for(const e of DATA){                
        let effectTarget = e.flags['johns-cypher-addons'].target;

        switch(effectTarget){
            case 'none':
                applyActiveEffect(null, e);
                break;
            case 'self':
                if(actor)
                    applyActiveEffect(actor, e);
                break;
            default:
                if(targets?.length){
                    targets = targets.filter(t => t.actor.type == effectTarget)
                    targets.forEach(t => {
                        applyActiveEffect(t.actor, e)
                    });
                }else{
                    ui.notifications.error(game.i18n.localize("JOHNSCYPHERADDONS.NoTargets"));
                }
                break;
        }
    }
}

export async function applyActiveEffect(actor, effect){

    let createdEffect;

    // Process stacks
    if(document){
        switch(effect.flags['johns-cypher-addons'].stacks){
            case 'origin': 
                // if actor already has an effect of the same origin, don't apply it again
                const sameOrigin = Array.from(actor.effects).filter(e => e.data.origin == effect.origin)
                if(sameOrigin?.length)
                    return;
                break;
            case 'name': 
                // if actor already has an effect of the same name, don't apply it again
                const sameName = Array.from(actor.effects).filter(e => e.data.label == effect.label)
                if(sameName?.length)
                    return;
                break;
            case 'reapply': 
                // if actor already has this effect, remove it and apply this new instance
                const ids = Array.from(actor.effects)
                    .filter(e => e.data.flags['johns-cypher-addons'].iid == effect.flags['johns-cypher-addons'].iid)
                    .map(e => e.id);
                if(ids?.length)
                    await actor.deleteEmbeddedDocuments("ActiveEffect", ids);
                break;
            case 'increase':
            default:
                break;
        }

        // Remove all the statuses when creating the effect for they will be treated separately
        let iArr = []
        for(let i = 0; i < effect.changes.length; i++){
            if(effect.changes[i].key.startsWith("@Status"))
                iArr.push(i);
        }

        let nonStatusEffect = clone(effect);
        for(let i = iArr.length-1; i >= 0; i--){
            nonStatusEffect.changes.splice(iArr[i],1);
        }

        if(nonStatusEffect.changes.length > 0){
            createdEffect = await actor.createEmbeddedDocuments("ActiveEffect", [clone(nonStatusEffect)]);
            createdEffect[0].data.changes = effect.changes;
        }
        
    }

    // Process macro (if no effect was created, that means no actor is being affected, just run a macro)
    if(createdEffect)
        await executeCustomEffects(createdEffect[createdEffect.length-1].data, actor);
    else
        await executeCustomEffects(effect, actor);
}

async function executeCustomEffects(effect, actor){
    let cubActive = game.modules.get("combat-utility-belt")?.active;
    for(const change of effect.changes){

        if (change.key.startsWith("@Macro")){            
            
            const macro = change.key.replaceAll("@Macro","").replaceAll("[","").replaceAll("]","")
            const args = await stringToArray(await parseStringTags(change.value, actor?.id, effect?._id, effect?.origin));
            game.macros.get(macro).execute(args);

        }else if (change.key.startsWith("@Status")){

            if(change.key.includes(".CUB")){

                if(cubActive){
                    const status = change.key.replaceAll("@Status.CUB","").replaceAll("[","").replaceAll("]","");
                    game.cub.addCondition(status, [game.canvas.tokens.placeables.find(e => e.actor.id == actor.id)]);
                }else{
                    ui.notifications.error(game.i18n.localize("JOHNSCYPHERADDONS.CubInactive"));
                }

            } else {
                // apply regular status using core features (which apparently don't exist!)
            }
        }
    }
}

async function parseStringTags(string, actorID, effectID, sourceID){

    string = string.replaceAll("@userID", game.user.id);   
    string = string.replaceAll("@actorID", actorID);

    if(string.includes("@target")){
        let targets = Array.from(game.user.targets);

        while(!targets.length){
            await timeout(1000);
            targets = Array.from(game.user.targets);
        }

        targets = targets.filter(t => t.actor.type == target);

        string = string.replaceAll("@targetIDs", targets.map(t => t.id));
    }
    
    string = string.replaceAll("@effectID", effectID);
    string = string.replaceAll("@sourceID", sourceID);

    return string;
}