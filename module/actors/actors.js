export async function createActor(actor){

  let updates = {};

  if (actor.type == "PC") {
    updates["data.pools.totalPool"] = { "value": 30, "max": 30 };
  }

  await actor.update(updates);

}

export async function updateActor(document, change){

  if(document.data.type == "PC"){
    if(change.hasOwnProperty("data") && change.data.hasOwnProperty("pools")){

      if(change.data.pools.hasOwnProperty("totalPool")) return;

      let actor = document;
      let newMightValue = actor.data.data.pools.might.value;
      let newMightMax = actor.data.data.pools.might.max;
      let newSpeedValue = actor.data.data.pools.speed.value;
      let newSpeedMax = actor.data.data.pools.speed.max;
      let newIntellectValue = actor.data.data.pools.intellect.value;
      let newIntellectMax = actor.data.data.pools.intellect.max;

      if(change.data.pools.hasOwnProperty("might")){
          newMightValue = change.data.pools.might.value ? change.data.pools.might.value : newMightValue;
          newMightMax = change.data.pools.might.max ? change.data.pools.might.max : newMightMax;
      }

      if(change.data.pools.hasOwnProperty("speed")){
          newSpeedValue = change.data.pools.speed.value ? change.data.pools.speed.value : newSpeedValue;
          newSpeedMax = change.data.pools.speed.max ? change.data.pools.speed.max : newSpeedMax;
      }
      
      if(change.data.pools.hasOwnProperty("intellect")){
          newIntellectValue =  change.data.pools.intellect.value ? change.data.pools.intellect.value : newIntellectValue;
          newIntellectMax = change.data.pools.intellect.max ? change.data.pools.intellect.max : newIntellectMax;
      }
      
      await actor.update({
          "data.pools.totalPool.value": newMightValue + newSpeedValue + newIntellectValue,
          "data.pools.totalPool.max": newMightMax + newSpeedMax + newIntellectMax
      });      
    }
  }
}