import * as Utils from "../utilities/utils.js";

export const supportedTypes = ['ability', 'ammo','armor','artifact','attack','cypher','equipment','material','oddity'];

export async function initialize(){

    ui.notifications.info(game.i18n.localize("JOHNSCYPHERADDONS.InitStarted"));

    let PCs = Array.from(game.actors).filter(value => value.data.type == 'PC');
    for(const actor of PCs){

      /** ADD TOTAL POOL */
      let updates = {
        "data.pools.totalPool.value": actor.data.data.pools.might.value + actor.data.data.pools.speed.value + actor.data.data.pools.intellect.value, 
        "data.pools.totalPool.max": actor.data.data.pools.might.max + actor.data.data.pools.speed.max + actor.data.data.pools.intellect.max
      }

      await actor.update(updates);
      
      /** ACTOR ACTIVE EFFECTS */
      let effects = Array.from(actor.effects).map(e => e.data)
      for(let effect of effects){
        if(!effect.flags['johns-cypher-addons']){
          effect.flags['johns-cypher-addons'] = {rendered: false}
        }else{
          effect.flags['johns-cypher-addons'].rendered = false;
        }  
        await actor.updateEmbeddedDocuments("ActiveEffect", [effect]);
      }
      
      /** OWNED ITEM ACTIVE EFFECTS */
      let items = Array.from(actor.items).filter(i => supportedTypes.includes(i.type));
      for(const item of items){
        /** ADD DEFAULT VALUES TO EFFECTS OF EXISTING ITEMS */
        if(!item.type.includes('skill')){
          if(!item.getFlag('johns-cypher-addons', 'effects')){
            await item.setFlag('johns-cypher-addons', 'effects', []);
          }else{
            let effects = item.getFlag('johns-cypher-addons', 'effects')
            if(effects && effects.length){
              effects.forEach(e => e.flags['johns-cypher-addons'].rendered = false);
              await item.setFlag('johns-cypher-addons', 'effects', effects);
            }
          }
        }
      }
    }
    
    /** NPC ACTIVE EFFECTS */
    let NPCs = Array.from(game.actors).filter(value => value.data.type == 'NPC');
    for(const actor of NPCs){
      let effects = Array.from(actor.effects).map(e => e.data)
      for(let effect of effects){
        if(!effect.flags['johns-cypher-addons']){
          effect.flags['johns-cypher-addons'] = {rendered: false}
        }else{
          effect.flags['johns-cypher-addons'].rendered = false;
        }  
        await actor.updateEmbeddedDocuments("ActiveEffect", [effect]);
      }
    }    

    /** NOT-OWNED ITEM ACTIVE EFFECTS */
    let items = Array.from(game.items).filter(i => supportedTypes.includes(i.type));
    for(const item of items){
      /** ADD DEFAULT VALUES TO EFFECTS OF EXISTING ITEMS */
      if(!item.type.includes('skill')){
        if(!item.getFlag('johns-cypher-addons', 'effects')){
          await ('johns-cypher-addons', 'effects', []);
        }else{
          let effects = item.getFlag('johns-cypher-addons', 'effects')
          if(effects && effects.length){
            effects.forEach(e => e.flags['johns-cypher-addons'].rendered = false);
            await item.setFlag('johns-cypher-addons', 'effects', effects);
          }
        }
      }
    }    

    ui.notifications.info(game.i18n.localize("JOHNSCYPHERADDONS.InitFinished"));
}