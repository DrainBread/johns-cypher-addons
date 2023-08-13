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
            this.item.setFlag('johns-cypher-addons', 'affinities', { [event.target.dataset.key] : event.target.checked});     
        });

        /** UPDATE armor AFFINITIES */
        html.find('select.affinity').change(event => {
            this.item.setFlag('johns-cypher-addons','affinities', { [event.target.dataset.key] : event.target.value });
        });

        /** UPDATE TAGS */
        html.find('input.tag').change(event => {
            this.item.setFlag('johns-cypher-addons', 'tags', { [event.target.dataset.key] : event.target.checked });
        });        

        /** EFFECTS */

            /** UPDATE EFFECT DETAILS */
        html.find('input.label').change(event => {
            this.item.setFlag('johns-cypher-addons', 'effects', {"label": event.target.value});
        });

        html.find('input.icon').change(event => {
            this.item.setFlag('johns-cypher-addons', 'effects', {"icon": event.target.value});
        });

        html.find('input.applyFromInventory').change(event => {
            this.item.setFlag('johns-cypher-addons', 'effects', {"applyFromInventory": event.target.checked});
        });

        html.find('select.stacks').change(event => {
            this.item.setFlag('johns-cypher-addons', 'effects', {"stacks": event.target.value});
        });

            /** UPDATE EFFECT DURATION */

        html.find('input.rounds').change(event => {
            this.item.setFlag('johns-cypher-addons', 'effects', {"rounds": event.target.value});
        });

        html.find('input.turns').change(event => {
            this.item.setFlag('johns-cypher-addons', 'effects', {"turns": event.target.value});
        });

        html.find('input.round').change(event => {
            this.item.setFlag('johns-cypher-addons', 'effects', {"round": event.target.value});
        });
        
        html.find('input.turn').change(event => {
            this.item.setFlag('johns-cypher-addons', 'effects', {"turn": event.target.value});
        });

        html.find('select.macro-repeat').change(event => {
            this.item.setFlag('johns-cypher-addons', 'effects', {"macroRepeat": event.target.value});
        });

        /** TOGGLE THROWING ATTACK */
        html.find('input.throwing').change(event => {
            this.item.setFlag('johns-cypher-addons', 'additionalSettings', {"throwing": event.target.checked});
        });

        /** TOGGLE ATTACK REQUIRES ammo */
        html.find('input.requiresAmmo').change(event => {
            this.item.setFlag('johns-cypher-addons', 'additionalSettings', {"requiresAmmo": event.target.checked, "ammoID": null});     
        });

        /** CHANGE EQUIPPED ammo */
        html.find('#ammo-select').change(event => {
            this.item.setFlag('johns-cypher-addons','additionalSettings', {"ammoID": event.target.value});
        });
    }

}