import { loadDamageTypes, loadTags, supportedTypes } from "../init.js";

export async function createItem(item){

  const itemTags = await loadTags();

  if(supportedTypes.includes(item.type) && !item.getFlag('johns-cypher-addons', 'tags'))
    item.setFlag('johns-cypher-addons', 'tags', itemTags);

  if((item.type == 'attack' || item.type == 'armor') && !item.getFlag('johns-cypher-addons', 'affinities')){
    let damageTypes = await loadDamageTypes();
    
    item.setFlag('johns-cypher-addons', 'affinities', damageTypes);
    
  }

  // TODO: Effect

}

export async function deleteAttackAmmo(item){
  const id = item.id;
  const actor = game.actors.get(item.actor.id);

  const attacks = Array.from(actor.data.items).filter( i => i.type == 'attack');
  for(const attack of attacks){
    if(attack.getFlag('johns-cypher-addons','additionalSettings')){
      let flags = attack.getFlag('johns-cypher-addons','additionalSettings');
      if(flags && flags.ammoID == id){
          attack.setFlag('johns-cypher-addons','additionalSettings', {'ammoID': null});
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
    const activeArmors = Array.from(actor.data.items)
      .filter( i => i.type == 'armor' 
      && i.data.data.armorActive 
      && mutuallyExclusiveTypes.includes(i.data.data.armorType)
      && i.id != id);
  
    // If another light, medium or heavy armor is currently active, then deactivate this one
    if(activeArmors && activeArmors.length){
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