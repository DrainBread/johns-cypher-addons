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
            obj[e[1]] = game.i18n.localize("JOHNSCYPHERADDONS." + game.i18n.localize("EFFECT.MODE_" + e[0]));
            return obj;
        }, {});
        data.modes = allModes;
        data.isGM = game.user.isGM;
        return data;
    }

    async activateListeners(html) {
        super.activateListeners(html); 

        /** EFFECTS */
        html.find('a#add-effect').click(async (event) => {      
            let effects = this.item.getFlag('johns-cypher-addons', 'effects')
            
            if(!effects)
                effects = {};

            let iid = generateId();
            let effect = {
                changes: {},
                disabled: true,
                transfer: false,
                duration: {
                    combat: undefined,
                    label: '',
                    rounds: undefined,
                    turns: undefined,
                    startRound: undefined,
                    startTurn: undefined,
                    startTime: 0
                },
                flags: {
                    'johns-cypher-addons': {
                        iid: iid,
                        rendered: false,
                        target: 'self'
                    },
                    'core': {statusId: 'unknown'}
                },
                icon: this.item.data.img,
                label: this.item.data.name,
                origin: this.item.id,
                stacks: 'origin'                
            };
            effects[iid] = effect;
            await this.item.setFlag('johns-cypher-addons', 'effects', effects);
        });

        html.find('a#edit-effect').click(async (event) => {
            const iid = event.target.dataset.iid;
            let effects = this.item.getFlag('johns-cypher-addons', 'effects');
            const effect = effects[iid];
            if(effect){
                if(!effect.flags['johns-cypher-addons'].rendered)
                    effect.flags['johns-cypher-addons'].rendered = true;
                else
                    return;

                effects[iid] = effect;
                await this.item.setFlag('johns-cypher-addons', 'effects', effects);
                new CustomActiveEffect(effect, this.item).render(true);
            }
        });

            /** REMOVE EFFECT*/
        html.find('a#delete-effect').click(async(event) => {
            const iid = event.target.dataset.iid;
            if(this.item.actor){
                const effectIDs = Array.from(this.item.actor.effects)
                    .filter(e => e.data.flags['johns-cypher-addons'].iid == iid)
                    .map(e => e.id)

                if(effectIDs?.length > 0)
                    this.item.actor.deleteEmbeddedDocuments("ActiveEffect", effectIDs);
            }           
            
            await this.item.unsetFlag('johns-cypher-addons', `effects.${iid}`);
        });

        /** TOGGLE THROWING ATTACK */
        html.find('input.throwing').change(async (event) => {
            await this.item.setFlag('johns-cypher-addons', 'additionalSettings', {"throwing": event.target.checked});
        });

        /** TOGGLE ATTACK REQUIRES ammo */
        html.find('input.requiresAmmo').change(async (event) => {
            await this.item.setFlag('johns-cypher-addons', 'additionalSettings', {"requiresAmmo": event.target.checked, "ammoID": null});     
        });

        /** CHANGE EQUIPPED ammo */
        html.find('#ammo-select').change(async (event) => {
            await this.item.setFlag('johns-cypher-addons','additionalSettings', {"ammoID": event.target.value});
        });
    }

}