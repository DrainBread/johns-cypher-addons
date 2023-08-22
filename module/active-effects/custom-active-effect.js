import { clone, mergeObjects } from "../../utilities/utils.js"
import { applyActiveEffect } from "./active-effects.js"

export class CustomActiveEffect extends FormApplication{

    constructor(effect, owner) {
        super();
        this.effect = effect;

        if(owner instanceof CONFIG.Actor.documentClass){
            this.actor = owner;
            this.item = null;
        }   
        else if (owner instanceof CONFIG.Item.documentClass) {
            this.item = owner;
            this.actor = owner.actor;
        }

        this.tab = 'details';
    }

    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["johns-cypher-addons", "sheet", "actor"],
            template: "modules/johns-cypher-addons/templates/forms/item-effects.html",
            title: `Configure Active Effect`,
            closeOnSubmit: false,
            submitOnChange: false,
            submitOnClose: false,
            width: 650,
            height: 'auto',
            resizable: false,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body" }],
            scrollY: [".sheet-body", ".tab", ".details", ".duration", ".effects"]
        });
    }

    getData(){
        const data = super.getData();
        data.effect = this.effect;
        data.tab = this.tab;
        data.item = this.item;
        return data;
    }
    // TODO: changes should be an object, not an array.
    async _updateObject(event, formData) {
        formData = expandObject(formData);
        if (!formData.changes)
            formData.changes = [];

        formData.changes = Object.values(formData.changes);

        for (let c of formData.changes) {
            c.mode = parseFloat(c.mode);
            if(!isNaN(c.value))
                c.value = parseFloat(c.value);
        }
        
        
        this.effect = mergeObjects(this.effect, formData, true);
        const iid = this.effect.flags['johns-cypher-addons'].iid;

        // Update Item Effect
        if(this.item){
            let itemEffects = clone(this.item.getFlag('johns-cypher-addons','effects'));
            itemEffects[iid] = clone(this.effect);
            await this.item.unsetFlag('johns-cypher-addons',`effects.${iid}`);
            await this.item.setFlag('johns-cypher-addons','effects', itemEffects);
        }

        // Update Actor Effect - may be ongoing effect from owned item
        if(this.actor){
            let changes = [];
            Object.values(this.effect.changes).forEach(e => changes.push(e));
            
            let effect = clone(this.effect)
            effect.changes = changes;

            let actorEffect = Array.from(this.actor.effects).map(e => e.data).find(e => e.flags['johns-cypher-addons']?.iid == iid);
            if(actorEffect){
                actorEffect = mergeObjects(clone(effect), clone(actorEffect), true);
                await this.actor.updateEmbeddedDocuments("ActiveEffect", [actorEffect]);
            }

            // Process effects upon flag change to non-transfer and vice-versa
            if(this.item){
                const effectIDs = Array.from(this.actor.effects)
                    .filter(e => e.data.flags['johns-cypher-addons']?.iid == iid)
                    .map(e => e.id);
                const wasApplied = effectIDs?.length > 0;

                if((this.effect.disabled || formData.transfer == false) && wasApplied){
                    this.actor.deleteEmbeddedDocuments("ActiveEffect", effectIDs);
                } else if(this.effect.transfer && !wasApplied){
                    applyActiveEffect(this.actor, effect);
                }
            }
        }

        ui.notifications.info(`${this.effect.label} ` + game.i18n.localize("JOHNSCYPHERADDONS.EffectUpdated"));
        this.render(true);
    }

    async close(){
        const iid = this.effect.flags['johns-cypher-addons'].iid;
        if(this.item){
            let itemEffects = clone(this.item.getFlag('johns-cypher-addons','effects'));
            itemEffects[iid].flags['johns-cypher-addons'].rendered = false
            await this.item.setFlag('johns-cypher-addons','effects', itemEffects);
        } else {
            let actorEffect = Array.from(this.actor.effects)
                .map(e => e.data)
                .find(e => e.flags['johns-cypher-addons']?.iid == iid);

            if(actorEffect){
                actorEffect.flags['johns-cypher-addons'].rendered = false; 
                await this.actor.updateEmbeddedDocuments("ActiveEffect", [actorEffect]);
            }
        }
        super.close();
    }

    async activateListeners(html){
        super.activateListeners(html);

        // Tab navigation
        html.find('nav.sheet-tabs.tabs a').click(event =>{
            var $active = html.find('.active');
            $active.removeClass('active');
            $active = html.find('div.' + event.target.dataset.tab);
            this.tab = event.target.dataset.tab;
            $active.addClass('active');
        });

        // Add Changes
        html.find('a.add-effect').click(event => {
            let newKey = Object.keys(this.effect.changes).length;
            this.effect.changes[newKey] = {
                key: "", 
                mode: 0, 
                value: 0, 
                priority: 10, 
            };
            this.render(true);
        });

        // Remove changes
        html.find('a.remove-effect').click(event => {
            const index = event.target.dataset.index;
            // TODO: this will likely not work when updating the flags unless we unset it fusrts
            delete this.effect.changes[index]
            this.render(true);
        });

        /** Temporary changes prior to submitting. Used to prevent data loss when re-rendering the form. */
        
        // Inputs & Selects
        html.find('#icon, #label, #rounds, #turns, #startRound, #startTurn').change(event => {
            const key = event.target.id;
            this.effect[key] = event.target.value;
        })

        // Custom flags
        html.find('#stacks, #macroRepeats, #target').change(event => {
            const key = event.target.id;
            this.effect.flags['johns-cypher-addons'][key] = event.target.value;
        })

        // Checkboxes
        html.find('#disabled, #transfer').change(event => {
            const key = event.target.id;
            this.effect[key] = event.target.checked;
        })

        // Inputs & Selects within the changes[] property
        html.find('#key, #mode, #value, #priority').change(event => {
            const key = event.target.id;
            const index = event.target.dataset.index;
            this.effect.changes[index][key] = event.target.value;
        });

    }

}