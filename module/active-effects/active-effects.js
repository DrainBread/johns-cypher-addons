import { clone, mergeObjects, stringToArray, timeout } from "../../utilities/utils.js"

export async function deleteTransferredEffect(item){
    if(!item.actor)
        return;
    
    const actor = game.actors.get(item.actor.id);
  
    // Get all effects with the transfer flag
    let transEffects = item.getFlag('johns-cypher-addons', 'effects').filter( e => e.transfer && !e.disabled);

    // For each of those effects, get the effect ids on the actor
    let appliedEffects = [];
    for(const te of transEffects){
        appliedEffects = [].concat(appliedEffects, 
            Array.from(actor.effects).filter(e => 
                e.data.flags['johns-cypher-addons'].iid == te.flags['johns-cypher-addons'].iid)
                .map(e => e.id));
    }

    // Remove the effects
    await item.actor.deleteEmbeddedDocuments("ActiveEffect", appliedEffects);   
}

export async function applyTransferredEffect(item){
    if(!item.actor)
        return;
  
    // Get all effects with the transfer flag
    let transEffects = item.getFlag('johns-cypher-addons', 'effects').filter( e => e.transfer && !e.disabled);
    if(!transEffects || !transEffects.length || transEffects.length < 1)
        return;
    // Apply the effects
    await applyActiveEffect(item.actor, transEffects)
}


export async function createActiveEffect(DATA, actor){
    for(const e of DATA){
                
        let target = e.flags['johns-cypher-addons'].target;

        if(target == 'none'){
            applyActiveEffect(null, e);
        }else if(target == 'self'){
            applyActiveEffect(actor, e);
        }else{
            let targets = Array.from(game.user.targets)

            while(!targets.length){
                await timeout(1000);
                targets = Array.from(game.user.targets);
            }

            targets = targets.filter(t => t.actor.type == target)
            targets.forEach(t => {
                applyActiveEffect(t.actor, e)
            });

        }
    };
}

export async function applyActiveEffect(actor, effect){
    let createdEffect;

    // Process stacks
    if(actor){
        switch(effect.flags['johns-cypher-addons'].stacks){
            case 'origin': // if actor already has an effect of the same origin, don't apply it again
                const sameOrigin = Array.from(actor.effects).filter(e => e.data.origin == effect.origin)
                if(sameOrigin && sameOrigin.length)
                    return;
                break;
            case 'name': // if actor already has an effect of the same name, don't apply it again
                const sameName = Array.from(actor.effects).filter(e => e.data.label == effect.label)
                if(sameName && sameName.length)
                    return;
                break;
            case 'reapply': // if actor already has this effect, remove it and apply this new instance
                const ids = Array.from(actor.effects)
                    .filter(e => e.data.flags['johns-cypher-addons'].iid == effect.flags['johns-cypher-addons'].iid)
                    .map(e => e.id)
                if(ids && ids.length)
                    await actor.deleteEmbeddedDocuments("ActiveEffect", ids);
                break;
            case 'increase': // just add another instance
                break;
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
            game.macros.get(macro).execute(args)

        }else if (change.key.startsWith("@Status")){

            if(change.key.includes(".CUB")){

                if(cubActive){
                    const status = change.key.replaceAll("@Status.CUB","").replaceAll("[","").replaceAll("]","");
                    game.cub.addCondition(status, [game.canvas.tokens.placeables.find(e => e.actor.id == actor.id)]);
                }else{
                    ui.notifications.error(game.i18n.localize("JOHNSCYPHERADDONS.CubInactive"));
                }

            } else {
                // TODO: apply regular status using core features (which apparently don't exist!)
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