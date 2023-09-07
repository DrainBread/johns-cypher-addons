import { dealDamageToNPC } from "./attack-roll.js"

export async function executeNPCAttack(attack){
        
    if(!attack){
        ui.notifications.error(game.i18n.localize("JOHNSCYPHERADDONS.NoAttackQueued"));
        return;
    }        

    if(!game.user.isGM){
        ui.notifications.error(game.i18n.localize("JOHNSCYPHERADDONS.MustBeGM"));
        return;
    }

    if(!Array.from(game.user.targets).length){
        ui.notifications.error(game.i18n.localize("JOHNSCYPHERADDONS.NoTarget"));
        return;
    }

    Array.from(game.user.targets).filter(t => t.actor.type == 'PC').forEach(t => {
        let actor = t.actor;
        let armor = attack.piercesArmor ? 0 : actor.data.data.armor.armorValueTotal;
        let damage = Math.max((attack.damage - armor), 0);
        damagePC(t.actor.id, damage, attack.poolToDamage);

        if(attack.status && game.modules.get("combat-utility-belt")?.active)
            game.cub.addCondition(attack.status, [t]);
    });

    Array.from(game.user.targets).filter(t => t.actor.type == 'NPC').forEach(t => {
        let actor = t.actor;
        let armor = attack.piercesArmor ? 0 : actor.data.data.armor;
        let damage = Math.max((attack.damage - armor), 0);
        dealDamageToNPC(t.id, damage);

        if(attack.status && game.modules.get("combat-utility-belt")?.active)
            game.cub.addCondition(attack.status, [t]);
    });
}

export async function damagePC(actorID, damage, pool){

    const actor = game.actors.get(actorID);

    let propertyName = `data.pools.${pool}.value`;
    let poolValue = actor.data.data.pools[pool].value;
    
    if(poolValue < damage){
        damage -= poolValue;
        // Updates the damaged pool and totalPool
        let updates = { [propertyName]: 0 }
        console.log(updates)
        await actor.update(updates);
        
        // Check if actor is dead
        if(actor.data.data.pools.totalPool.value <= 0)
            return;

        // Overflow damage with recursion
        switch(pool){
            case "might":
                pool = "speed";
                break;
            case "speed":
                pool = "intellect";
                break;
            case "intellect":
                pool = "might";
                break;
            default:
                break;
        }
        await damagePC(actorID,damage,pool);
        
    }else{
        // Updates the damaged pool and totalPool
        let updates = { [propertyName]: poolValue - damage }
        await actor.update(updates);
    }
    
    return;
}