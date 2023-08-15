import { CypherItemSheet } from "../../../../systems/cyphersystem/module/item/item-sheet.js";
import { CustomActiveEffect } from "../active-effects/custom-active-effect.js"

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

        // WHEN A NEW ONE IS ADDED SET THESE AND SOME OTHER BASIC STUFF!!!!
        //{ 'stacks': 'notByOrigin', 'enabled': false}

        html.find('a.add').click(event => {
            if(this.item.getFlag('johns-cypher-addons', 'effects')){
                let effects = this.item.getFlag('johns-cypher-addons', 'effects');
                effects.push(
                    {
                        label: this.item.data.name,
                        icon: this.item.data.img,
                        sourceName: this.item.data.name,
                        isTemporary: false,
                        disabled: true,
                        duration: {
                            label: "",
                            rounds: "",
                            turns: "",
                            startRound: "",
                            startTurn: "",

                        },
                        changes: []
                    }
                );
                this.item.setFlag('johns-cypher-addons', 'effects', effects)
            }
        });

        html.find('a.edit').click(event => {
            const index = event.target.dataset.index;
            const effect = this.item.getFlag('johns-cypher-addons', 'effects')[index];
            const itemEffect = new CustomActiveEffect(effect, this.item);
            return itemEffect.render(true);
        });

            /** REMOVE EFFECT*/
        html.find('a.delete').click(event => {
            const index = event.target.dataset.index;

            // DELETE THE EFFECT FROM THE CURRENT ITEM USER/HOLDER
            if(this.item.actor){
                const label = this.item.getFlag('johns-cypher-addons', 'effects')[index].label;
                const effectIDs = Array.from(this.item.actor.effects).filter(e => e.data.label == label).map(e => e.id)
                if(effectIDs && effectIDs.length > 0)
                    this.item.actor.deleteEmbeddedDocuments("ActiveEffect", effectIDs);
            }

            // REMOVE THE EFFECT FROM THE LIST
            let effects = this.item.getFlag('johns-cypher-addons', 'effects');
            effects.splice(index,1);
            this.item.setFlag('johns-cypher-addons', 'effects', effects);
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