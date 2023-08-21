
import {CypherActorSheetPC} from "../../../../systems/cyphersystem/module/actor/pc-sheet.js";
import {CypherActorSheetNPC} from "../../../../systems/cyphersystem/module/actor/npc-sheet.js";
import { clone, generateId } from "../../utilities/utils.js"
import { CustomActiveEffect } from "../active-effects/custom-active-effect.js"
import { createActiveEffect } from "../active-effects/active-effects.js"

// Override default sheet with ours
export class CustomSheetPC extends CypherActorSheetPC {
    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            template: "modules/johns-cypher-addons/templates/sheets/pc-sheet.html"
        });
    }

    getData(){
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

        /** ROLL & PAY LISTENERS */
            /** ROLL */
        // TODO: AWAIT ROLL RESULTS - SHOULDN'T BE A CLICK EVENT!
        html.find('.item-roll').click(event => {
            const shownItem = $(event.currentTarget).parents(".item");
            const item = duplicate(this.actor.items.get(shownItem.data("itemId")));

            if(item.flags['johns-cypher-addons'] && item.flags['johns-cypher-addons'].effects){
                const DATA = item.flags['johns-cypher-addons'].effects.filter(e => !e.disabled);
                createActiveEffect(DATA, this.actor)
            }
        });

            /** PAY OR SPELL */
        html.find('.cast-spell, .item-pay').click(event => {
            const shownItem = $(event.currentTarget).parents(".item");
            const item = duplicate(this.actor.items.get(shownItem.data("itemId")));
    
            if(item.flags['johns-cypher-addons'] && item.flags['johns-cypher-addons'].effects){
                const DATA = item.flags['johns-cypher-addons'].effects.filter(e => !e.disabled);
                createActiveEffect(DATA, this.actor)
            }   
        });

        /** EFFECTS */
        html.find('a#add-effect').click(async (event) => {
            let effect = {
                changes: [],
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
                        iid: generateId(),
                        rendered: false,
                        target: 'self'
                    },
                    'core': {statusId: 'unknown'}
                },
                icon: this.actor.img,
                label: this.actor.name,
                origin: this.actor.id,
                stacks: 'origin'
            };
            await this.actor.createEmbeddedDocuments("ActiveEffect", [clone(effect)]);
        });

        html.find('a#edit-effect').click(async (event) => {
            const index = event.target.dataset.index;
            let effects = Array.from(this.actor.effects);

            if(!effects[index].data.flags['johns-cypher-addons'] || !effects[index].data.flags['johns-cypher-addons'].rendered){
                console.log('edit clicked')
                let effect = effects[index];
                effect.data.flags['johns-cypher-addons'].rendered = true;
                await this.actor.updateEmbeddedDocuments("ActiveEffect", [clone(effect.data)]);
                new CustomActiveEffect(clone(effect.data), this.actor).render(true);
            }
        });

            /** REMOVE EFFECT*/
        html.find('a#delete-effect').click(async (event) => {
            const index = event.target.dataset.index;
            let id = Array.from(this.actor.effects)[index].id;
            if(id){
                await this.actor.deleteEmbeddedDocuments("ActiveEffect", [id]);
            }
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

    getData(){
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
            /** ADD EFFECT */
        html.find('a#add-effect').click(async(event) => {
            let effect = {
                changes: [],
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
                        iid: generateId(),
                        rendered: false,
                        target: 'self'
                    },
                    'core': {statusId: 'unknown'}
                },
                icon: this.actor.img,
                label: this.actor.name,
                origin: this.actor.id,
                stacks: 'origin'
            };
            await this.actor.createEmbeddedDocuments("ActiveEffect", [clone(effect)]);
        });

            /** EDIT EFFECT */
        html.find('a#edit-effect').click(async (event) => {
            const index = event.target.dataset.index;
            let effects = Array.from(this.actor.effects);

            if(!effects[index].data.flags['johns-cypher-addons'] || !effects[index].data.flags['johns-cypher-addons'].rendered){
                console.log('edit clicked')
                let effect = effects[index];
                effect.data.flags['johns-cypher-addons'].rendered = true;
                await this.actor.updateEmbeddedDocuments("ActiveEffect", [clone(effect.data)]);
                new CustomActiveEffect(clone(effect.data), this.actor).render(true);
            }
        });

            /** REMOVE EFFECT*/
        html.find('a#delete-effect').click(async (event) => {
            const index = event.target.dataset.index;
            let id = Array.from(this.actor.effects)[index].id;
            if(id){
                await this.actor.deleteEmbeddedDocuments("ActiveEffect", [id]);
            }                
        });

    }
}