import {mergeObjects} from "../../utilities/utils.js"

export class CustomActiveEffect extends FormApplication{

    constructor(effect, item) {
        super();
        this.effect = effect;
        this.item = item;
        this.tab = 'details';
    }

    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["johns-cypher-addons", "sheet", "actor", "pc"],
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
        data.item = this.item;
        data.tab = this.tab;
        return data;
    }

    // TODO: fix bug when saving from a different screen, the other effect is affected too
    // TODO: do not reset when re-rendering. Save the info to this.effect but don't update the flag.
    // TODO: on submit, change applied effects
    // TODO: on delete, clear applied effects
    // TODO: stacks, macros, targets, CUB/Conditions

    async _updateObject(event, formData) {
        formData = expandObject(formData);

        if (!formData.changes)
            formData.changes = [];
        
        formData.changes = Object.values(formData.changes);

        for (let c of formData.changes) {
            c.value = parseInt(c.value);
        }
        
        const effect = mergeObjects(formData, this.effect, true);
        let effects = this.item.getFlag('johns-cypher-addons','effects');
        const index = effects.findIndex(e => e.iid = this.effect.iid)
        effects[index] = effect;

        this.effect = effect;
        await this.item.setFlag('johns-cypher-addons','effects', effects);
        this.render(true);
    }

    async close(){
        let effects = this.item.getFlag('johns-cypher-addons','effects');
        const index = effects.findIndex(e => e.iid = this.effect.iid)
        effects[index].rendered = false;
        await this.item.setFlag('johns-cypher-addons','effects', effects);
        super.close();
    }

    async activateListeners(html){
        super.activateListeners(html);

        html.find('nav.sheet-tabs.tabs a').click(event =>{
            var $active = html.find('.active');
            $active.removeClass('active');
            $active = html.find('div.' + event.target.dataset.tab);
            this.tab = event.target.dataset.tab;
            $active.addClass('active');
        });

        /** EFFECTS */

        // Add Changes
        html.find('a.add-effect').click(event => {
            this.effect.changes.push({
                    key: "", 
                    mode: 0, 
                    value: 0, 
                    priority: 10, 
                    self: true, 
                    targetPCs: false, 
                    targetNPCs: false
                });
            this.render(true);
        });

        // Remove changes
        html.find('a.remove-effect').click(event => {
            const index = event.target.dataset.index;
            this.effect.changes.splice(index,1);
            this.render(true);
        });
        
    }

}