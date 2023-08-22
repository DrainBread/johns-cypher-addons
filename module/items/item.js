import { applyActiveEffect } from "../active-effects/active-effects.js"
import { clone } from "../../utilities/utils.js"

export async function createItem(item){

  if(item.actor && item.getFlag('johns-cypher-addons', 'effects')){
    let toTransfer = Object.values(clone(item.getFlag('johns-cypher-addons', 'effects')))
      .filter( v => v.transfer && !v.disabled )

    if(toTransfer?.length > 0){
      let changes = [];
      for(let e of toTransfer){
        Object.values(e.changes).forEach(c => { changes.push(c) });
        e.changes = changes;
        await applyActiveEffect(item.actor, clone(e));
        changes = [];
      }
    }      
  }

  if(!item.type.includes('skill') && !item.getFlag('johns-cypher-addons', 'effects')){
    await item.setFlag('johns-cypher-addons', 'effects', {});
  }

}

export async function deleteAttackAmmo(item){
  const id = item.id;
  const actor = game.actors.get(item.actor.id);

  const attacks = Array.from(actor.items).filter( i => i.type == 'attack');
  for(const attack of attacks){
    if(attack.getFlag('johns-cypher-addons','additionalSettings')){
      let flags = attack.getFlag('johns-cypher-addons','additionalSettings');
      if(flags?.ammoID == id){
        await attack.setFlag('johns-cypher-addons','additionalSettings', {'ammoID': null});
      }
    }
  }

}

export async function updateArmorActive(armor){
    
  const mutuallyExclusiveTypes = ["medium armor","light armor","heavy armor"];

  // If the updated armor is light, medium or heavy, we can't allow them to be used together
  if(mutuallyExclusiveTypes.includes(armor.data.data.armorType)){

    const id = armor.id;
    const actor = game.actors.get(armor.actor.id);
  
    // Get other active light, medium and heavy armors for this actor that are NOT the current one.
    const activeArmors = Array.from(actor.items)
      .filter( i => i.type == 'armor' 
      && i.data.data.armorActive 
      && mutuallyExclusiveTypes.includes(i.data.data.armorType)
      && i.id != id);
  
    // If another light, medium or heavy armor is currently active, then deactivate this one
    if(activeArmors?.length){
      ui.notifications.error(game.i18n.localize("JOHNSCYPHERADDONS.CannotWearMultipleArmors"));
      const item = duplicate(actor.items.get(id));
      item.data.armorActive = false;
      actor.updateEmbeddedDocuments("Item", [item]);
    }
  }
}

export async function updateArmorValue(armor){
  if(armor.data.data.speedCost > 0 && armor.data.data.armorValue <= 0){
    ui.notifications.warn(game.i18n.localize("JOHNSCYPHERADDONS.ArmorBroke"));
    const id = armor.id;
    const actor = game.actors.get(armor.actor.id);
    const item = duplicate(actor.items.get(id));
    item.data.armorActive = false;
    actor.updateEmbeddedDocuments("Item", [item]);
  }
}