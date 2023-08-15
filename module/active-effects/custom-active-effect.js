export class CustomActiveEffect extends FormApplication{

    constructor(effect, item) {
        super(...arguments);
        this.effect = effect;
        this.item = item;
    }

    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["johns-cypher-addons", "custom-sheet"],
            template: "modules/johns-cypher-addons/templates/dialog/item-effects.html",
            title: `Edit Effect`,
            closeOnSubmit: false,
            submitOnChange: false,
            submitOnClose: false,
            width: 650,
            height: 375,
            resizable: false
        });
    }

    getData(){
        const data = super.getData();
        data.effect = this.effect;
        data.item = this.item;
        return data;
    }

    _updateObject(event, formData) {
        console.log('_updateObject');
        console.log(event);
        console.log(formData);

        // TODO: Submit. Save changes to item flag. modify active effects of the same name (and previous name, in case the label was changed)
    }

    async activateListeners(html){
        super.activateListeners(html);

        html.find('nav.sheet-tabs.tabs a').click(event =>{
            var $active = html.find('.active');
            $active.removeClass('active');
            $active = html.find('div.' + event.target.dataset.tab);
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
            this.render();
        });

        // Remove changes
        html.find('a.remove-effect').click(event => {
            const index = event.target.dataset.index;
            this.effect.changes.splice(index,1);
            this.render();
        });

        // TODO: RENDER WITHOUT CHANGING TABS (MAYBE CHANGE THE WAY THE TABS WORK TO BE AUTOMATIC LIKE THE SHEETS?)
        // TODO: FIX THE STYLE FOR THE EFFECT CHANGES
        // TODO: SUBMIT FORM
        // TODO: DAE SPECIAL FLAGS ON SUBMIT
        

        /*
            html.find('input.enable').change(event => {
                this.item.setFlag('johns-cypher-addons', 'effects', {"enabled": event.target.checked});
    
                // TODO: apply custom flags (self/PC/NPC, from inventory, macro repeat, stack)
                // TODO: Effect Transfer, like DAE
                // TODO: consider stacking
    
                if(event.target.checked && this.item.actor){
                    const DATA = this.item.getFlag('johns-cypher-addons', 'effects');
                    this.item.actor.createEmbeddedDocuments("ActiveEffect", [DATA]);    
                } else if(this.item.actor){               
                    const label = this.item.getFlag('johns-cypher-addons', 'effects').label;
                    const effectIDs = Array.from(this.item.actor.effects).filter(e => e.data.label == label).map(e => e.id)
                    if(effectIDs && effectIDs.length > 0)
                        this.item.actor.deleteEmbeddedDocuments("ActiveEffect", effectIDs);
                }
                    
    
            });
    
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
    
            html.find('input.rounds').change(event => {
                this.item.setFlag('johns-cypher-addons', 'effects', {"duration.rounds": parseInt(event.target.value)});
            });
    
            html.find('input.turns').change(event => {
                this.item.setFlag('johns-cypher-addons', 'effects', {"duration.turns": parseInt(event.target.value)});
            });
    
            html.find('input.round').change(event => {
                this.item.setFlag('johns-cypher-addons', 'effects', {"duration.startRound": parseInt(event.target.value)});
            });
            
            html.find('input.turn').change(event => {
                this.item.setFlag('johns-cypher-addons', 'effects', {"duration.startTurn": parseInt(event.target.value)});
            });
    
            html.find('select.macro-repeat').change(event => {
                this.item.setFlag('johns-cypher-addons', 'effects', {"macroRepeat": event.target.value});
            });

            html.find('input.attr-key').change(event =>{
                const index = event.target.dataset.index;
                let changes = this.item.getFlag('johns-cypher-addons', 'effects').changes;
                changes[index].key = event.target.value;
                this.item.setFlag('johns-cypher-addons', 'effects', {"changes": changes})
            });
    
            html.find('input.self').change(event =>{
                const index = event.target.dataset.index;
                let changes = this.item.getFlag('johns-cypher-addons', 'effects').changes;
                changes[index].self = event.target.checked;
                this.item.setFlag('johns-cypher-addons', 'effects', {"changes": changes})
            });
    
            html.find('input.target-pc').change(event =>{
                const index = event.target.dataset.index;
                let changes = this.item.getFlag('johns-cypher-addons', 'effects').changes;
                changes[index].targetPCs = event.target.checked;
                this.item.setFlag('johns-cypher-addons', 'effects', {"changes": changes})
            });
    
            html.find('input.target-npc').change(event =>{
                const index = event.target.dataset.index;
                let changes = this.item.getFlag('johns-cypher-addons', 'effects').changes;
                changes[index].targetNPCs = event.target.checked;
                this.item.setFlag('johns-cypher-addons', 'effects', {"changes": changes})
            });
    
            html.find('select.change-mode').change(event =>{
                const index = event.target.dataset.index;
                let changes = this.item.getFlag('johns-cypher-addons', 'effects').changes;
                changes[index].mode = parseInt(event.target.value);
                this.item.setFlag('johns-cypher-addons', 'effects', {"changes": changes})
            });
    
            html.find('input.attr-value').change(event =>{
                const index = event.target.dataset.index;
                let changes = this.item.getFlag('johns-cypher-addons', 'effects').changes;
                changes[index].value = event.target.value;
                this.item.setFlag('johns-cypher-addons', 'effects', {"changes": changes})
            });
    
            html.find('input.priority').change(event =>{
                const index = event.target.dataset.index;
                let changes = this.item.getFlag('johns-cypher-addons', 'effects').changes;
                changes[index].priority = parseInt(event.target.value);
                this.item.setFlag('johns-cypher-addons', 'effects', {"changes": changes})
            });
        
        */
    }

}