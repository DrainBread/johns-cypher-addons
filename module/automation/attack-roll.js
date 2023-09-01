import { clone, measureDistance, timeout, stringToArray } from "../../utilities/utils.js";
import { getEffectsFromItem } from "../active-effects/active-effects.js"

export async function attack(data){   
    const user = game.users.get(data.user.id);
    if(game.user.id != user.id)
        return;

    const actor = game.actors.get(data.message.speaker.actor);
    const item = Array.from(actor.data.items).find(a => a.id == data.message.flags.itemID);

    if(!item)
        return;
    
    let flavor = data.message.flavor;
    let localBeatsDifficulty = game.i18n.localize('JOHNSCYPHERADDONS.RollBeatDifficulty');
    let regex = new RegExp(localBeatsDifficulty + ' .{2}');
    let match = flavor.match(regex);

    if(match){

        let resultDifficulty = parseInt(match? match[0].substring(localBeatsDifficulty.length).trim() : '0');
        let localDamage = game.i18n.localize('JOHNSCYPHERADDONS.Damage');
        regex = new RegExp(localDamage + ' .{2}');
        match = flavor.match(regex);
        const attackDamage = parseInt(match? match[0].substring(localDamage.length).trim() : '0');

        let range = 3;
        switch(item.data.data.range){
            case null:
            case '':
            case 'Immediate':
                break;
            case 'Short':
                range = 15;
                break;
            case 'Long':
                range = 30;
                break;
            case 'Very Long':
                range = 60;
                break;
            default:
                if(item.data.data.range.includes('Very Long'))
                    range = 60;
                else if(item.data.data.range.includes('Long'))
                    range = 30;
                else if(item.data.data.range.includes('Short'))
                    range = 15;
                break;
        }

        let pierceArmor = false;
        let throwing = false;
        let requiresAmmo = false;
        let ammoID = null;
        if(item.data.flags['johns-cypher-addons']?.additionalSettings){
            pierceArmor = item.data.flags['johns-cypher-addons']?.additionalSettings.pierceArmor;
            throwing = item.data.flags['johns-cypher-addons']?.additionalSettings.throwing;
            requiresAmmo = item.data.flags['johns-cypher-addons']?.additionalSettings.requiresAmmo;
            ammoID = item.data.flags['johns-cypher-addons']?.additionalSettings.ammoID;

            if(requiresAmmo && !ammoID){
                ui.notifications.error(game.i18n.localize('JOHNSCYPHERADDONS.NoAmmoEquipped'));
                return;
            }
        }

        let targets = Array.from(user.targets);
        while(!targets.length){
            await timeout(1000);
            targets = Array.from(user.targets);
        }

        const source = Array.from(game.canvas.tokens.placeables).find(e => e.data.actorId == actor.id);
        let gridSize = canvas.grid.size;

        for(const target of targets){

            let targetActorData = target.actor.data;
            let facingCenter = target.center;
            let signY = Math.sign(source.center.y-facingCenter.y);
            let signX = Math.sign(source.center.x-facingCenter.x);
            let offCenter = (target.bounds.height/2)-(gridSize/2);
            facingCenter.x += offCenter*signX;
            facingCenter.y += offCenter*signY;

            let distance = measureDistance(source.center, facingCenter);

            if(distance > range){
                ui.notifications.error(game.i18n.localize('JOHNSCYPHERADDONS.TargetTooFar'));
                continue;
            }

            if(requiresAmmo && ammoID){
                let ammo = Array.from(actor.items).find(i => i.id == ammoID);
                if(ammo.data.data.quantity > 0){
                    await ammo.update({'data.quantity': ammo.data.data.quantity-1});
                } else {
                    ui.notifications.error(game.i18n.localize("JOHNSCYPHERADDONS.NoAmmo"));
                    await ammo.update({'data.archived': true});
                    continue;
                }
            }

            if(throwing){
                if(!item.data.data.archived){
                    await item.update({'data.archived': true});
                } else {
                    ui.notifications.error(game.i18n.localize("JOHNSCYPHERADDONS.NoWeaponToThrow"));
                    continue;
                }
            }
            
            let animationMacroID;
            let animationMacroArgs;
            if(item.getFlag('johns-cypher-addons', 'additionalSettings').playAnimation){
                animationMacroID = item.getFlag('johns-cypher-addons', 'additionalSettings').animationMacroID;
                animationMacroArgs = stringToArray(item.getFlag('johns-cypher-addons', 'additionalSettings').animationMacroArgs);
                animationMacroArgs = [].concat([actor.id, target.id], animationMacroArgs);
                
            }

            if(targetActorData.data.level > resultDifficulty){
                miss(target, animationMacroID, animationMacroArgs);
                if(throwing && game.modules.get("item-piles")?.active){
                    let offsetX = Math.random() > .5 ? 1 : -1;
                    let offsetY = Math.random() > .5 ? 1 : -1;
                    offsetX *= gridSize;
                    offsetY *= gridSize;
                    let dropPosition = {
                        x: target.center.x + (offCenter*signX) + offsetX,
                        y: target.center.y + (offCenter*signY) + offsetY
                    }
                    let droppedItemData = clone(item.data);
                    if(!isNaN(droppedItemData.data.quantity))
                        droppedItemData.data.quantity = 1;
                    await ItemPiles.API.createItemPile(dropPosition, {items: [droppedItemData]});
                }
                continue;
            }

            let roll = JSON.parse(data.message.roll).total;
            if(roll > 17)
                crit(roll, target);

            if(item.data.flags['johns-cypher-addons']?.effects){
                let DATA = getEffectsFromItem(item.data);
                Hooks.call("createCAE", DATA, actor.id, [target.id]);
            } 
            
            let armor = pierceArmor ? 0 : targetActorData.data.armor
            let damage = armor > attackDamage ? 0 : attackDamage - armor;

            if(animationMacroID)
                await game.macros.get(animationMacroID).execute(animationMacroArgs);

            Hooks.call("damageNPC", target.id, damage);
        }
    }
}

export async function dealDamageToNPC(tokenID, damage){

    if(isNaN(damage)){
        ui.notifications.error(game.i18n.localize('JOHNSCYPHERADDONS.NaNDamage'));
        return;
    }

    const token = game.canvas.tokens.get(tokenID);

    if(token){
        if(!token.data.actorLink){
            let data = token.data.actorData.data;
            let health = null;
            if(data?.health?.value){
                health = data.health.value < damage ? 0 : data.health.value - damage;
                await token.document.update({'actorData.data.health.value': health});
            }else{
                health = token.actor.data.data.health
                health.value = health.value < damage ? 0 : health.value - damage;
                await token.document.update({'actorData.data.health': health});
            }
        }else{
            let data = token.actor.data.data;
            let health = data.health.value < damage ? 0 : data.health.value - damage;
            const actor = game.actors.get(token.actor.id);
            await actor.update({'data.health.value': health});
        }
        
    }else{
        ui.notifications.error(game.i18n.localize('JOHNSCYPHERADDONS.ActorNotFound'));
    }
}

async function miss(target, animationMacroID, animationMacroArgs){
    if(game.modules.get("sequencer")?.active){
        new Sequence()
        .effect("jb2a.ui.miss.red")
            .atLocation(target)
        .sound("johns-cypher-sfx.system.roll.failure.0")
            .volume(.25)
        .play();
        
        if(animationMacroID){
            animationMacroArgs = [].concat(animationMacroArgs, ['missed']);
            await game.macros.get(animationMacroID).execute(animationMacroArgs);
        }
    }    
}

async function crit(roll, target){
    let extraDamage = 0;
    let extraEffect = null;
    switch(roll){
        case 17:
            extraDamage = 1;
            break;
        case 18:
            extraDamage = 2;
            break;
        case 19:
            extraDamage = 3;
            extraEffect = 'MinorEffect';
            break;
        case 20:
            extraDamage = 4;
            extraEffect = 'MajorEffect';
            break;
        default:
            break;
    }
    let buttons = {
        damage: {
            label: `+${extraDamage} ${game.i18n.localize("JOHNSCYPHERADDONS.ExtraDamage")}`,
            callback: async () => {
                Hooks.call("damageNPC", target.id, extraDamage);
            }
        }
    }

    if(extraEffect){
        buttons['effect'] = {
            label: `${game.i18n.localize("JOHNSCYPHERADDONS."+extraEffect)}`,
            callback: () => {}
        }
    }

    let dialog = new Dialog({
        title: game.i18n.localize("JOHNSCYPHERADDONS.CriticalSuccessDialogTitle"),
        content: (game.i18n.format("JOHNSCYPHERADDONS.CriticalSuccessDialog", {
            targetName: target.name,
            roll: roll
        })),
        buttons: buttons,
        default: "damage",
        close: () => {}
    });
    dialog.render(true);
}