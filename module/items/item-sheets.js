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

            /** UPDATE EFFECT DURATION */

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

            /** UPDATE EFFECTS CHANGES */

            /** ADD EFFECT */
        html.find('a.add-effect').click(event => {
            let changes;

            if(this.item.getFlag('johns-cypher-addons', 'effects'))
                changes = this.item.getFlag('johns-cypher-addons', 'effects').changes;
            if(!changes)
                changes = [];
                
            changes.push({key: "", mode: 0, value: "", priority: 10, self: true, targetPCs: false, targetNPCs: false});
            this.item.setFlag('johns-cypher-addons', 'effects', {"changes": changes})
        });

            /** REMOVE EFFECT */
        html.find('a.remove-effect').click(event => {
            const index = event.target.dataset.index;
            let changes = this.item.getFlag('johns-cypher-addons', 'effects').changes;
            changes.splice(index,1);
            this.item.setFlag('johns-cypher-addons', 'effects', {"changes": changes})
        });

            /** CHANGE KEY */
        html.find('input.attr-key').change(event =>{
            const index = event.target.dataset.index;
            let changes = this.item.getFlag('johns-cypher-addons', 'effects').changes;
            changes[index].key = event.target.value;
            this.item.setFlag('johns-cypher-addons', 'effects', {"changes": changes})
        });

            /** TARGET SELF */
        html.find('input.self').change(event =>{
            const index = event.target.dataset.index;
            let changes = this.item.getFlag('johns-cypher-addons', 'effects').changes;
            changes[index].self = event.target.checked;
            this.item.setFlag('johns-cypher-addons', 'effects', {"changes": changes})
        });

            /** TARGET PCs */
        html.find('input.target-pc').change(event =>{
            const index = event.target.dataset.index;
            let changes = this.item.getFlag('johns-cypher-addons', 'effects').changes;
            changes[index].targetPCs = event.target.checked;
            this.item.setFlag('johns-cypher-addons', 'effects', {"changes": changes})
        });

            /** TARGET NPCs */
        html.find('input.target-npc').change(event =>{
            const index = event.target.dataset.index;
            let changes = this.item.getFlag('johns-cypher-addons', 'effects').changes;
            changes[index].targetNPCs = event.target.checked;
            this.item.setFlag('johns-cypher-addons', 'effects', {"changes": changes})
        });

            /** CHANGE MOD */
        html.find('select.change-mode').change(event =>{
            const index = event.target.dataset.index;
            let changes = this.item.getFlag('johns-cypher-addons', 'effects').changes;
            changes[index].mode = parseInt(event.target.value);
            this.item.setFlag('johns-cypher-addons', 'effects', {"changes": changes})
        });

            /** CHANGE VALUE */
        html.find('input.attr-value').change(event =>{
            const index = event.target.dataset.index;
            let changes = this.item.getFlag('johns-cypher-addons', 'effects').changes;
            changes[index].value = event.target.value;
            this.item.setFlag('johns-cypher-addons', 'effects', {"changes": changes})
        });

            /** CHANGE PRIORITY */
        html.find('input.priority').change(event =>{
            const index = event.target.dataset.index;
            let changes = this.item.getFlag('johns-cypher-addons', 'effects').changes;
            changes[index].priority = parseInt(event.target.value);
            this.item.setFlag('johns-cypher-addons', 'effects', {"changes": changes})
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