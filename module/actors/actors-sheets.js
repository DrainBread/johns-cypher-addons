
import {CypherActorSheetPC} from "../../../../systems/cyphersystem/module/actor/pc-sheet.js";
import {CypherActorSheetNPC} from "../../../../systems/cyphersystem/module/actor/npc-sheet.js";
import { clone, generateId, stringToArray } from "../../utilities/utils.js"
import { CustomActiveEffect } from "../active-effects/custom-active-effect.js"
import { getEffectsFromItem } from "../active-effects/active-effects.js"

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

    async useItem(item){

        let description = "<hr style='margin:3px 0;'><img class='description-image-chat' src='" + item.data.img + "' width='50' height='50'/>" + item.data.data.description;
        ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: game.i18n.format("JOHNSCYPHERADDONS.UsingAnItem", {
                name: this.actor.name,
                itemName: item.name
            }) + description,
            flags: { "itemID": item.id }
        });
        if(item.data.flags['johns-cypher-addons']?.effects){
            let DATA = getEffectsFromItem(item.data);
            let targetsIDs = Array.from(game.user.targets).map(t => t.id);
            Hooks.call("createCAE", DATA, this.actor.id, targetsIDs);
        }
        if(item.data.flags['johns-cypher-addons']?.additionalSettings?.playAnimation){
            let macro = item.getFlag("johns-cypher-addons","additionalSettings").animationMacroID;
            let args = await stringToArray(item.getFlag("johns-cypher-addons","additionalSettings").animationMacroArgs);
            args = [].concat([this.actor.id], args);
            await game.macros.get(macro).execute(args);
        }
    }

    async activateListeners(html) {
        super.activateListeners(html);
        
        /** CONSUME OR USE ITEM*/
        html.find('.item-consume').click(async (event) => {
            if(!this.actor.isOwner)
                return;

            const shownItem = $(event.currentTarget).parents(".item");
            const itemData = duplicate(this.actor.items.get(shownItem.data("itemId")));

            let item = Array.from(this.actor.items).find(i => i.id == itemData._id);
            if((item?.data?.data?.quantity > 0 || ['cypher','artifact','oddity'].includes(item.type)) && item?.data?.data?.archived == false){
                let dialog = new Dialog({
                    title: game.i18n.localize("JOHNSCYPHERADDONS.ConsumeItemDialogTitle"),
                    content: `<p>${game.i18n.localize("JOHNSCYPHERADDONS.ConsumeItemDialog")}</p>`,
                    buttons: {
                        yes: {
                            label: `${game.i18n.localize("JOHNSCYPHERADDONS.YesConsume")}`,
                            callback: async () => {
                                this.useItem(item);
                                await item.update({'data.quantity': item.data.data.quantity - 1});
                            }
                        },
                        no:{
                            label: `${game.i18n.localize("JOHNSCYPHERADDONS.NoConsume")}`,
                            callback: async () => {
                                this.useItem(item);
                            }
                        },
                        cancel: {
                            label: `${game.i18n.localize("JOHNSCYPHERADDONS.Cancel")}`,
                            callback: () => {}
                        }
                    },
                    default: "cancel",
                    close: () => {}
                });
                dialog.render(true);
            }

        });

        /** PAY OR SPELL */
        html.find('.cast-spell, .item-pay').click(async (event) => {
            const shownItem = $(event.currentTarget).parents(".item");
            const itemData = duplicate(this.actor.items.get(shownItem.data("itemId")));
            if(itemData.flags['johns-cypher-addons']?.effects){
                let DATA = getEffectsFromItem(itemData);
                let targetsIDs = Array.from(game.user.targets).map(t => t.id);
                Hooks.call("createCAE", DATA, this.actor.id, targetsIDs);
            }
            if(itemData.flags['johns-cypher-addons']?.additionalSettings?.playAnimation){
                let macro = itemData.flags['johns-cypher-addons'].additionalSettings.animationMacroID;
                let args = await stringToArray(itemData.flags['johns-cypher-addons'].additionalSettings.animationMacroArgs);
                args = [].concat([this.actor.id], args);
                await game.macros.get(macro).execute(args);
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