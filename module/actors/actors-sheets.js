
import {CypherActorSheetPC} from "../../../../systems/cyphersystem/module/actor/pc-sheet.js";
import {CypherActorSheetNPC} from "../../../../systems/cyphersystem/module/actor/npc-sheet.js";

// Override default sheet with ours
export class CustomSheetPC extends CypherActorSheetPC {
    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            template: "modules/johns-cypher-addons/templates/sheets/pc-sheet.html"
        });
    }

    async activateListeners(html) {
        super.activateListeners(html);

        /** CHANGE AFFINITY */
        html.find('select.affinity').change(event => {
            const key = event.target.dataset.affinityKey;
            this.actor.setFlag('johns-cypher-addons','affinities', { [key] : event.target.value }); 
        });

        /** TOGGLE CONDITION IMMUNITY */
        html.find('input.condition-immunity').change(event => {
            const key = event.target.dataset.conditionKey;
            this.actor.setFlag('johns-cypher-addons','conditions', { [key] : event.target.value }); 
        });

        /** ROLL & PAY LISTENERS */

            /** ROLL ITEM */
            
        html.find('.item-roll').click(clickEvent => {
            const shownItem = $(clickEvent.currentTarget).parents(".item");
            const item = duplicate(this.actor.items.get(shownItem.data("itemId")));
    
            console.log(item);
            // TODO: Read effect from flag and execute it
        });
    
            /** PAY ITEM */
        html.find('.item-pay').click(clickEvent => {
            const shownItem = $(clickEvent.currentTarget).parents(".item");
            const item = duplicate(this.actor.items.get(shownItem.data("itemId")));
    
            console.log(item)
            // TODO: Read effect from flag and execute it
        });
    
            /** CAST SPELL */
        html.find('.cast-spell').click(clickEvent => {
            const shownItem = $(clickEvent.currentTarget).parents(".item");
            const item = duplicate(this.actor.items.get(shownItem.data("itemId")));
    
            let recoveryUsed = useRecoveries(this.actor, true);
    
            console.log(item)
            // TODO: Read effect from flag and execute it
        });
    }

}

export class CustomSheetNPC extends CypherActorSheetNPC {
    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            template: "modules/johns-cypher-addons/templates/sheets/npc-sheet.html"
        });
    }

    async activateListeners(html) {
        super.activateListeners(html);

        /** CHANGE AFFINITY */
        html.find('select.affinity').change(event => {
            const actor = game.actors.get(event.target.dataset.actorId);
            
            if(actor){
                const key = event.target.dataset.affinityKey;
                actor.setFlag('johns-cypher-addons','affinities', { [key] : event.target.value }); 
            }
        });

        /** TOGGLE CONDITION IMMUNITY */
        html.find('input.condition-immunity').change(event => {
            const actor = game.actors.get(event.target.dataset.actorId);

            if(actor){
                const key = event.target.dataset.conditionKey;
                actor.setFlag('johns-cypher-addons','conditions', { [key] : event.target.value }); 
            }
        });

    }
}