import { CypherItemSheet } from "../../../../systems/cyphersystem/module/item/item-sheet.js";

export class CustomSheetItem extends CypherItemSheet {

    /** @override */
    get template() {
        const path = "modules/johns-cypher-addons/templates/sheets";
        const itemType = this.item.data.type.toLowerCase().replace(/ /g, "-");
        return `${path}/${itemType}-sheet.html`;
    }


    async activateListeners(html) {
        super.activateListeners(html);
        
        /** UPDATE ATTACK AFFINITIES */
        html.find('.affinity').change(event => {

            const itemID = event.target.dataset.itemId;
            const key = event.target.dataset.key;
            let item = game.items.get(itemID);

            if(!item){
                /** UPDATE ACTOR OWNED armor */
                const actor = game.actors.get(event.target.dataset.itemActorId);
                let item = Array.from(actor.data.items).find( i => i.id == itemID);
                let affinities = item.getFlag('johns-cypher-addons', 'affinities');
                affinities[key] = event.target.checked;

                item.setFlag('johns-cypher-addons', 'affinities', affinities);          
            } else {
                /** UPDATE NOT-OWNED armorS */
                let affinities = item.getFlag('johns-cypher-addons', 'affinities');
                affinities[key] = event.target.checked;
                item.setFlag('johns-cypher-addons', 'affinities', affinities);          
            }
        });

        /** UPDATE armor AFFINITIES */
        html.find('select.affinity').change(event => {

            const itemID = event.target.dataset.itemId;
            const key = event.target.dataset.key;
            let item = game.items.get(itemID);

            if(!item){
                /** UPDATE ACTOR OWNED armor */
                const actor = game.actors.get(event.target.dataset.itemActorId);
                let item = Array.from(actor.data.items).find( i => i.id == itemID);
                item.setFlag('johns-cypher-addons','affinities', { [key] : event.target.value });   
            } else {
                /** UPDATE NOT-OWNED armorS */
                item.setFlag('johns-cypher-addons','affinities', { [key] : event.target.value });           
            }
        });

        /** UPDATE TAGS */
        html.find('input.tag').change(event => {

            const itemID = event.target.dataset.itemId;
            const key = event.target.dataset.key;
            let item = game.items.get(itemID);
            
            if(!item){
                /** UPDATE ACTOR OWNED armor */
                const actor = game.actors.get(event.target.dataset.itemActorId);
                let item = Array.from(actor.data.items).find( i => i.id == itemID);
                let tags = item.getFlag('johns-cypher-addons', 'tags');
                tags[key] = event.target.checked;

                item.setFlag('johns-cypher-addons', 'tags', tags);          
            } else {
                /** UPDATE NOT-OWNED armorS */
                let tags = item.getFlag('johns-cypher-addons', 'tags');
                tags[key] = event.target.checked;
                item.setFlag('johns-cypher-addons', 'tags', tags);          
            }
        });        

        // TODO: Effects

        /** TOGGLE THROWING ATTACK */
        html.find('input.throwing').change(event => {
            const itemID = event.target.dataset.itemId;
            let item = game.items.get(itemID);

            if(!item){
                /** UPDATE ACTOR OWNED armor */
                const actor = game.actors.get(event.target.dataset.itemActorId);
                let item = Array.from(actor.data.items).find( i => i.id == itemID);
                item.setFlag('johns-cypher-addons', 'additionalSettings', {"throwing": event.target.checked});

            } else {
                /** UPDATE NOT-OWNED armorS */
                item.setFlag('johns-cypher-addons', 'additionalSettings', {"throwing": event.target.checked});     
            }
        });

        /** TOGGLE ATTACK REQUIRES ammo */
        html.find('input.requiresAmmo').change(event => {
            const itemID = event.target.dataset.itemId;
            let item = game.items.get(itemID);

            if(!item){
                /** UPDATE ACTOR OWNED armor */
                const actor = game.actors.get(event.target.dataset.itemActorId);
                let item = Array.from(actor.data.items).find( i => i.id == itemID);
                item.setFlag('johns-cypher-addons', 'additionalSettings', {"requiresAmmo" : event.target.checked, "ammoID": null});

            } else {
                /** UPDATE NOT-OWNED armorS */
                item.setFlag('johns-cypher-addons', 'additionalSettings', {"requiresAmmo": event.target.checked, "ammoID": null});     
            }
        });

        /** CHANGE EQUIPPED ammo */
        html.find('#ammo-select').change(event => {
            const itemID = event.target.dataset.itemId;
            let item = game.items.get(itemID);

            if(!item){
                const actor = game.actors.get(event.target.dataset.itemActorId);
                item = Array.from(actor.data.items).find( i => i.id == itemID);
                item.setFlag('johns-cypher-addons','additionalSettings', {"ammoID": event.target.value});
            }
        });
    }

}