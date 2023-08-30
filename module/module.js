import { CypherActorSheetPC } from "../../../systems/cyphersystem/module/actor/pc-sheet.js";
import { CypherActorSheetNPC } from "../../../systems/cyphersystem/module/actor/npc-sheet.js";
import { CypherItemSheet } from "../../../systems/cyphersystem/module/item/item-sheet.js";

import { registerHandlebars } from "../utilities/handlebars.js";
import { preloadTemplates } from "../utilities/template-paths.js";
import * as SFXDataBase from "../databases/SFXDataBase.js";
import * as VFXDataBase from "../databases/VFXDataBase.js";
import * as Init from "./init.js"
import * as ItemsAddons from "./items/item.js"
import * as ItemsSheetAddons from "./items/item-sheets.js"
import * as ActorsAddons from "./actors/actors.js";
import * as ActorSheetsAddons from "./actors/actors-sheets.js";
import * as RulerAddons from "./automation/ruler.js"
import * as AttackAddons from "./automation/attack-roll.js"
import * as ActiveEffectsAddons from "./active-effects/active-effects.js"

let socket;

Hooks.on("sequencer.ready", () => {
    Sequencer.Database.registerEntries("johns-cypher-sfx", SFXDataBase.database);
    Sequencer.Database.registerEntries("johns-cypher-vfx", VFXDataBase.database);
});

Hooks.once("socketlib.ready", ()=>{

    socket = socketlib.registerModule("johns-cypher-addons");    
    
    // initialization
    socket.register("initialize", Init.initialize);    

    // Actors
    socket.register("createActor", ActorsAddons.createActor);
    socket.register("updateActor", ActorsAddons.updateActor);

    // Items
    socket.register("createItem", ItemsAddons.createItem);
    socket.register("deleteAttackAmmo", ItemsAddons.deleteAttackAmmo);
    socket.register("updateArmorActive", ItemsAddons.updateArmorActive);
    socket.register("updateArmorValue", ItemsAddons.updateArmorValue);

    // Measured Template
    socket.register("createRuler", RulerAddons.createRuler);

    // Active Effects
    socket.register("deleteTransferredEffect", ActiveEffectsAddons.deleteTransferredEffect);
    socket.register("applyTransferredEffect", ActiveEffectsAddons.applyTransferredEffect);
    socket.register("createCAE", ActiveEffectsAddons.createActiveEffect);
    
    // Combat Automation
    socket.register("dealDamageToNPC", AttackAddons.dealDamageToNPC);
    
});

Hooks.once("init", async function() {
    // Register Handlebars.
    registerHandlebars();

    // Pre-load templates.
    preloadTemplates();

    // Unregister the default sheets by the system and register our modified version.
    Actors.unregisterSheet("cypher", CypherActorSheetPC);
    Actors.unregisterSheet("cypher", CypherActorSheetNPC);
    Actors.registerSheet("johns-cypher-addons", ActorSheetsAddons.CustomSheetPC, {types: ['PC'], makeDefault: false, label: "John's PC Sheet"});
    Actors.registerSheet("johns-cypher-addons", ActorSheetsAddons.CustomSheetNPC, {types: ['NPC'], makeDefault: false, label: "John's NPC Sheet"});

    Items.unregisterSheet("cypher", CypherItemSheet);
    Items.registerSheet("johns-cypher-addons", ItemsSheetAddons.CustomSheetItem, {makeDefault: false, label: "John's Item Sheet"});

});

Hooks.once("ready", async function () {
    /** INITIALIZE */
    if(game.user.isGM)
        await socket.executeAsGM("initialize");
    
})

Hooks.on("ready", async function() { 

    /** ACTOR ADDONS */
    Hooks.on("createActor", async function(actor) {
        await socket.executeAsGM("createActor", actor);
    });

    Hooks.on("updateActor", async function (document, change, options, userId) {
        await socket.executeAsGM("updateActor", document, change);
    });

    /** ITEM & ATTACK & ABILITY ADDONS */
    Hooks.on("createItem", async function (document) {
        await socket.executeAsGM("createItem", document);
    });

    Hooks.on("updateItem", async function (document, change, options, userId) {
        // Item is owned by a character, is of ammo type and was archived or has no quantity left.
        if(document.actor && document.type == 'ammo' && (document.data.data.archived || document.data.data.quantity <= 0))
            await socket.executeAsGM("deleteAttackAmmo", document);

        if(document.actor && document.type == 'armor' && change.data && change.data.armorActive)
            await socket.executeAsGM("updateArmorActive", document);

        if(document.actor && document.type == 'armor' && document.data.data.armorValue <= 0)
            await socket.executeAsGM("updateArmorValue", document);

        if(document.actor && document.getFlag('johns-cypher-addons', 'effects') && change.data){
            if(change.data.archived == true)
                await socket.executeAsGM("deleteTransferredEffect", document);
            else if (change.data.archived == false)
                await socket.executeAsGM("applyTransferredEffect", document);
        }            
    });

    Hooks.on("deleteItem", async function(document) {
        if(document.actor && document.type == 'ammo')
            await socket.executeAsGM("deleteAttackAmmo", document);

        if(document.actor && document.getFlag('johns-cypher-addons', 'effects'))
            await socket.executeAsGM("deleteTransferredEffect", document);
    });

    /** AUTOMATE RULER */
    Hooks.on("createRuler", async function (distance, shape, macro, ...args){
        RulerAddons.createRuler(distance, shape, macro, args);
    });

    /** AUTOMATE ACTIVE EFFECT */
    Hooks.on("createCAE", async function (data, actorID, targets){
        await socket.executeAsGM("createCAE", data, actorID, targets);
    });

    /** AUTOMATE PC ATTACK */
    Hooks.on("renderChatMessage", async function(message, html, data){        
        if(!data?.message?.roll)
            return;
        AttackAddons.attack(data);
    });

    Hooks.on("damageNPC", async function(actor, damage){
        await socket.executeAsGM("dealDamageToNPC", actor, damage);
    });

});