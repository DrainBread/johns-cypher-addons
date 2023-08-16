import { CypherItemSheet } from "../../../../systems/cyphersystem/module/item/item-sheet.js";
import { CustomActiveEffect } from "../active-effects/custom-active-effect.js"
import { generateId } from "../../utilities/utils.js"

export class CustomSheetItem extends CypherItemSheet {

    /** @override */
    get template() {
        const path = "modules/johns-cypher-addons/templates/sheets";
        const itemType = this.item.data.type.toLowerCase().replace(/ /g, "-");
        return `${path}/${itemType}-sheet.html`;
    }

    async getData(){
        const data = super.getData();
        const allModes = Object.entries(CONST.ACTIVE_EFFECT_MODES)
        .reduce((obj, e) => {
            obj[e[1]] = game.i18n.localize("EFFECT.MODE_" + e[0]);
            return obj;
        }, {});
        data.modes = allModes;
        return data;
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
        html.find('a.add').click(event => {            
            let effects = this.item.getFlag('johns-cypher-addons', 'effects')

            const effect = {
                iid: generateId(),
                rendered: false,
                changes: [],
                disabled: true,
                duration: {
                    combat: undefined,
                    label: '',
                    rounds: undefined,
                    turns: undefined,
                    startRound: undefined,
                    startTurn: undefined,
                },
                icon: this.item.data.img,
                label: this.item.data.name,
                origin: this.item.id,
                transfer: false,
                stacks: 'origin'
                
            };

            effects.push(effect);
            this.item.setFlag('johns-cypher-addons', 'effects', effects);
        });

        html.find('a.edit').click(event => {
            const index = event.target.dataset.index;
            let effects = this.item.getFlag('johns-cypher-addons', 'effects');
            
            if(!effects[index].rendered)
                effects[index].rendered = true;
            else
                return;

            const effect = effects[index];
            this.item.setFlag('johns-cypher-addons', 'effects', effects);

            return new CustomActiveEffect(effect, this.item).render(true);
        });

            /** REMOVE EFFECT*/
        html.find('a.delete').click(event => {
            const index = event.target.dataset.index;

            // DELETE THE EFFECT FROM THE CURRENT ITEM USER/HOLDER
            if(this.item.actor){
                const iid = this.item.getFlag('johns-cypher-addons', 'effects')[index].iid;
                const origin = this.item.getFlag('johns-cypher-addons', 'effects')[index].origin;

                const effectIDs = Array.from(this.item.actor.effects)
                    .filter(e => e.data.iid == iid && e.data.origin == origin)
                    .map(e => e.id)

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