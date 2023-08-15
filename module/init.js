import * as Utils from "../utilities/utils.js";

export const supportedTypes = ['ammo','armor','artifact','attack','cypher','equipment','material','oddity'];

export async function initialize(){

    ui.notifications.info(game.i18n.localize("JOHNSCYPHERADDONS.InitStarted"));

    const itemTags = await loadTags();
    const damageTypes = await loadDamageTypes();
    const conditions = await loadConditions();
    const affinities = Utils.clone(damageTypes);
    
    let PCs = Array.from(game.actors).filter(value => value.data.type == 'PC');
    for(const actor of PCs){

      /** ADD TOTAL POOL */
      let updates = {
        "data.pools.totalPool.value": actor.data.data.pools.might.value + actor.data.data.pools.speed.value + actor.data.data.pools.intellect.value, 
        "data.pools.totalPool.max": actor.data.data.pools.might.max + actor.data.data.pools.speed.max + actor.data.data.pools.intellect.max
      }

      await actor.update(updates);
      
      /** ADD AFFINITIES */
      if(actor.getFlag('johns-cypher-addons', 'affinities')){
        let flag = Utils.mergeObjects(actor.getFlag('johns-cypher-addons', 'affinities'),  Utils.clone(affinities));
        await actor.setFlag('johns-cypher-addons', 'affinities', {});
        actor.setFlag('johns-cypher-addons', 'affinities', flag);
      }else{
        actor.setFlag('johns-cypher-addons', 'affinities', Utils.clone(affinities));  
      }

      /** ADD CONDITIONS */
      if(actor.getFlag('johns-cypher-addons', 'conditions')){
        let flag = Utils.mergeObjects(actor.getFlag('johns-cypher-addons', 'conditions'),  Utils.clone(conditions));
        await actor.setFlag('johns-cypher-addons', 'conditions', {});
        actor.setFlag('johns-cypher-addons', 'conditions', flag);
      }else{
        actor.setFlag('johns-cypher-addons', 'conditions', Utils.clone(conditions));  
      }
      
      /** ADD OWNED ITEM AFFINITIES AND TAGS*/
      let items = Array.from(actor.data.items).filter(i => supportedTypes.includes(i.type));
      for(const item of items){
        /** ADD ATTACK & ARMOR AFFINITIES */
        if(item.type == 'attack' || item.type == 'armor'){
          if(item.getFlag('johns-cypher-addons', 'affinities')){
            let flag = Utils.mergeObjects(item.getFlag('johns-cypher-addons', 'affinities'),  Utils.clone(affinities));
            await item.setFlag('johns-cypher-addons', 'affinities', {});
            item.setFlag('johns-cypher-addons', 'affinities', flag);
          } else {
            item.setFlag('johns-cypher-addons', 'affinities', Utils.clone(affinities));          
          }
        }

        /** ADD DEFAULT VALUES TO EFFECTS OF EXISTING ITEMS */
        if(!item.type.includes('skill')){
          if(!item.getFlag('johns-cypher-addons', 'effects')){
            item.setFlag('johns-cypher-addons', 'effects', []);
          }
        }

        /** ADD ITEM TAGS */
        if(item.getFlag('johns-cypher-addons', 'tags')){
          let flag = Utils.mergeObjects(item.getFlag('johns-cypher-addons', 'tags'),  Utils.clone(itemTags));
          await item.setFlag('johns-cypher-addons', 'tags', {});
          item.setFlag('johns-cypher-addons', 'tags', flag);
        } else {
          item.setFlag('johns-cypher-addons', 'tags', Utils.clone(itemTags));          
        }

      }
      
    }
    
    /** ADD NPC AFFINITIES & CONDITIONS */
    let NPCs = Array.from(game.actors).filter(value => value.data.type == 'NPC');
    for(const actor of NPCs){
      /** ADD AFFINITIES */
      if(actor.getFlag('johns-cypher-addons', 'affinities')){
        let flag = Utils.mergeObjects(actor.getFlag('johns-cypher-addons', 'affinities'),  Utils.clone(affinities));
        await actor.setFlag('johns-cypher-addons', 'affinities', {});
        actor.setFlag('johns-cypher-addons', 'affinities', flag);
      }else{
        actor.setFlag('johns-cypher-addons', 'affinities', Utils.clone(affinities));  
      }
      /** ADD CONDITIONS */
      if(actor.getFlag('johns-cypher-addons', 'conditions')){
        let flag = Utils.mergeObjects(actor.getFlag('johns-cypher-addons', 'conditions'),  Utils.clone(conditions));
        await actor.setFlag('johns-cypher-addons', 'conditions', {});
        actor.setFlag('johns-cypher-addons', 'conditions', flag);
      }else{
        actor.setFlag('johns-cypher-addons', 'conditions', Utils.clone(conditions));  
      }
    }

    /** ADD NOT-OWNED ATTACK AND armor AFFINITIES AND TAGS TO ALL ITEMS. */
    let items = Array.from(game.items).filter(i => supportedTypes.includes(i.type));
    for(const item of items){
        
      /** ADD ATTACK & ARMOR AFFINITIES */
      if(item.type == 'attack' || item.type == 'armor'){
        if(item.getFlag('johns-cypher-addons', 'affinities')){
          let flag = Utils.mergeObjects(item.getFlag('johns-cypher-addons', 'affinities'),  Utils.clone(affinities));
          await item.setFlag('johns-cypher-addons', 'affinities', {});
          item.setFlag('johns-cypher-addons', 'affinities', flag);
        } else {
          item.setFlag('johns-cypher-addons', 'affinities', Utils.clone(affinities));          
        }
      }

      /** ADD DEFAULT VALUES TO EFFECTS OF EXISTING ITEMS */
      if(!item.type.includes('skill')){
        if(!item.getFlag('johns-cypher-addons', 'effects')){
          item.setFlag('johns-cypher-addons', 'effects', []);
        }
      }
      
      /** ADD TAGS */
      if(item.getFlag('johns-cypher-addons', 'tags')){
        let flag = Utils.mergeObjects(item.getFlag('johns-cypher-addons', 'tags'),  Utils.clone(itemTags));
        await item.setFlag('johns-cypher-addons', 'tags', {});
        item.setFlag('johns-cypher-addons', 'tags', flag);
      } else {
        item.setFlag('johns-cypher-addons', 'tags', Utils.clone(itemTags));
      }      
    }    

    ui.notifications.info(game.i18n.localize("JOHNSCYPHERADDONS.InitFinished"));
}

export async function reloadTags(){

  ui.notifications.info(game.i18n.localize("JOHNSCYPHERADDONS.TagReloadInit"));

  const itemTags = await loadTags();

  /** ADD TAGS TO PLAYER OWNED ITEMS */
  let PCs = Array.from(game.actors).filter(value => value.data.type == 'PC');
  for(const actor of PCs){
    let items = Array.from(actor.data.items).filter(i => supportedTypes.includes(i.type));
    for(const item of items){
      if(item.getFlag('johns-cypher-addons', 'tags')){
        let flag = Utils.mergeObjects(item.getFlag('johns-cypher-addons', 'tags'),  Utils.clone(itemTags));
        await item.setFlag('johns-cypher-addons', 'tags', {});
        item.setFlag('johns-cypher-addons', 'tags', flag);
      } else {
        item.setFlag('johns-cypher-addons', 'tags', Utils.clone(itemTags));          
      }
    }
  }

  /** ADD TAGS TO NOT-OWNED ITEMS */
  let items = Array.from(game.items).filter(i => supportedTypes.includes(i.type));
  for(const item of items){
    if(item.getFlag('johns-cypher-addons', 'tags')){
      let flag = Utils.mergeObjects(item.getFlag('johns-cypher-addons', 'tags'),  Utils.clone(itemTags));
      await item.setFlag('johns-cypher-addons', 'tags', {});
      item.setFlag('johns-cypher-addons', 'tags', flag);
    } else {
      item.setFlag('johns-cypher-addons', 'tags', Utils.clone(itemTags));
    }
  }

  ui.notifications.info(game.i18n.localize("JOHNSCYPHERADDONS.TagReloadEnd"));
}

export async function reloadAffinities(){

  ui.notifications.info(game.i18n.localize("JOHNSCYPHERADDONS.AffinityReloadInit"));

  const damageTypes = await loadDamageTypes();

  const affinities = Utils.clone(damageTypes);

  /** ADD PLAYER AFFINITIES*/
  let PCs = Array.from(game.actors).filter(value => value.data.type == 'PC');
  for(const actor of PCs){

    /** ADD AFFINITIES */
    if(actor.getFlag('johns-cypher-addons', 'affinities')){
      let flag = Utils.mergeObjects(actor.getFlag('johns-cypher-addons', 'affinities'),  Utils.clone(affinities));
      await actor.setFlag('johns-cypher-addons', 'affinities', {});
      actor.setFlag('johns-cypher-addons', 'affinities', flag);
    }else{
      actor.setFlag('johns-cypher-addons', 'affinities', Utils.clone(affinities));  
    }

    /** ADD OWNED ATTACK & ARMOR AFFINITIES */
    let attacks = Array.from(actor.data.items).filter(i => i.type == 'attack' || i.type == 'armor');
    for(const item of attacks){
      if(item.getFlag('johns-cypher-addons', 'affinities')){
        let flag = Utils.mergeObjects(item.getFlag('johns-cypher-addons', 'affinities'),  Utils.clone(affinities));
        await item.setFlag('johns-cypher-addons', 'affinities', {});
        item.setFlag('johns-cypher-addons', 'affinities', flag);
      } else {
        item.setFlag('johns-cypher-addons', 'affinities', Utils.clone(affinities));          
      }
    }
  }

  /** ADD NPC AFFINITIES */
  let NPCs = Array.from(game.actors).filter(value => value.data.type == 'NPC');
  for(const actor of NPCs){
    /** ADD AFFINITIES */
    if(actor.getFlag('johns-cypher-addons', 'affinities')){
      let flag = Utils.mergeObjects(actor.getFlag('johns-cypher-addons', 'affinities'),  Utils.clone(affinities));
      await actor.setFlag('johns-cypher-addons', 'affinities', {});
      actor.setFlag('johns-cypher-addons', 'affinities', flag);
    }else{
      actor.setFlag('johns-cypher-addons', 'affinities', Utils.clone(affinities));  
    }
  }

  /** ADD NOT-OWNED ATTACK & ARMOR AFFINITIES */
  let attacks = Array.from(actor.data.items).filter(i => i.type == 'attack' || i.type == 'armor');
  for(const item of attacks){
    if(item.getFlag('johns-cypher-addons', 'affinities')){
      let flag = Utils.mergeObjects(item.getFlag('johns-cypher-addons', 'affinities'),  Utils.clone(affinities));
      await item.setFlag('johns-cypher-addons', 'affinities', {});
      item.setFlag('johns-cypher-addons', 'affinities', flag);
    } else {
      item.setFlag('johns-cypher-addons', 'affinities', Utils.clone(affinities));          
    }
  }

  ui.notifications.info(game.i18n.localize("JOHNSCYPHERADDONS.AffinityReloadEnd"));
}

export async function reloadConditions(){

  ui.notifications.info(game.i18n.localize("JOHNSCYPHERADDONS.ConditionReloadInit"));

  const conditions = await loadConditions();

  /** ADD PLAYER CONDITIONS */
  let PCs = Array.from(game.actors).filter(value => value.data.type == 'PC');
  for(const actor of PCs){
    if(actor.getFlag('johns-cypher-addons', 'conditions')){
      let flag = Utils.mergeObjects(actor.getFlag('johns-cypher-addons', 'conditions'),  Utils.clone(conditions));
      await actor.setFlag('johns-cypher-addons', 'conditions', {});
      actor.setFlag('johns-cypher-addons', 'conditions', flag);
    }else{
      actor.setFlag('johns-cypher-addons', 'conditions', Utils.clone(conditions));  
    }
  }

  /** ADD NPC CONDITIONS */
  let NPCs = Array.from(game.actors).filter(value => value.data.type == 'NPC');
  for(const actor of NPCs){
    if(actor.getFlag('johns-cypher-addons', 'conditions')){
      let flag = Utils.mergeObjects(actor.getFlag('johns-cypher-addons', 'conditions'),  Utils.clone(conditions));
      await actor.setFlag('johns-cypher-addons', 'conditions', {});
      actor.setFlag('johns-cypher-addons', 'conditions', flag);
    }else{
      actor.setFlag('johns-cypher-addons', 'conditions', Utils.clone(conditions));  
    }
  }

  ui.notifications.info(game.i18n.localize("JOHNSCYPHERADDONS.ConditionReloadEnd"));
}

export async function loadTags(){

  const journal = Array.from(game.journal).filter(journal => journal.name == "Tags");
  if(journal.length > 0){

    const content = journal[0].data.content.replace(/<\/?p[^>]*>/g, "");
    let splitContent = content.split(/\r?\n/).filter( e=> e.trim() != "");
    let tags = {};

    splitContent.forEach(e => {
      tags[e] = false;
    });
    
    let sortedTags = Object.keys(tags).sort().reduce((objEntries, key) => {
      objEntries[key] = tags[key];
      return objEntries;
    }, {});

    return sortedTags;
  
  } else {
    ui.notifications.warn(game.i18n.localize("JOHNSCYPHERADDONS.NoTagsJournal"));
  }

  return {};
}

export async function loadDamageTypes(){

    const journal = Array.from(game.journal).filter(journal => journal.name == "Affinities");
    if(journal.length > 0){
  
      const content = journal[0].data.content.replace(/<\/?p[^>]*>/g, "");
      let splitContent = content.split(/\r?\n/).filter( e=> e.trim() != "");
      splitContent.sort();
      let damageTypes = {};

      splitContent.forEach(e => {
        damageTypes[e] = null;
      });
  
      return damageTypes;
    
    } else {
      ui.notifications.warn(game.i18n.localize("JOHNSCYPHERADDONS.NoAffinityJournal"));
    }
  
    return {};
}
  
  export async function loadConditions(){
    
    /** 
     * INFO: This is unorthodox as we should be accessing CONFIG.statusEffects, however anything added by modules wouldn't be loaded in time.
     * Besides, Cypher System doesn't work well with DAE or CUB, given that the actor template is all over the place. So anything that is added
     * through DAE or CUB may be listed in a Journal to be then displayed in the characters's sheets.
     * This does not change the behavior of the conditions, it's only to control wether or not a character is immune to it.
     **/
  
    const journal = Array.from(game.journal).filter(journal => journal.name == "Conditions");
    if(journal.length > 0){
  
      const content = journal[0].data.content.replace(/<\/?p[^>]*>/g, "");
      let splitContent = content.split(/\r?\n/).filter( e=> e.trim() != "");     
      splitContent.sort();

      let conditions = {};

      splitContent.forEach(e => {
        conditions[e] = false;
      });      
  
      return conditions;
    
    } else {
      ui.notifications.warn(game.i18n.localize("JOHNSCYPHERADDONS.NoConditionJournal"));
    }
  
    return {};
  
}