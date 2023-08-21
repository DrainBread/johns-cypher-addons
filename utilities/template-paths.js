export async function preloadTemplates() {
  const templatePaths = [
    "modules/johns-cypher-addons/templates/tabs/actor-effects-list.html",
    "modules/johns-cypher-addons/templates/tabs/attack-settings.html",
    "modules/johns-cypher-addons/templates/tabs/item-effects-list.html",
    "modules/johns-cypher-addons/templates/forms/item-effects.html",
    "modules/johns-cypher-addons/templates/sheets/ammo-sheet.html",
    "modules/johns-cypher-addons/templates/sheets/armor-sheet.html",
    "modules/johns-cypher-addons/templates/sheets/artifact-sheet.html",
    "modules/johns-cypher-addons/templates/sheets/attack-sheet.html",
    "modules/johns-cypher-addons/templates/sheets/cypher-sheet.html",
    "modules/johns-cypher-addons/templates/sheets/equipment-sheet.html",
    "modules/johns-cypher-addons/templates/sheets/material-sheet.html",
    "modules/johns-cypher-addons/templates/sheets/oddity-sheet.html",
    "modules/johns-cypher-addons/templates/sheets/pc-sheet.html",
    "modules/johns-cypher-addons/templates/sheets/npc-sheet.html",
    "modules/johns-cypher-addons/templates/navs/effects.html",
    "systems/cyphersystem/templates/item/ability-sheet.html",
    "systems/cyphersystem/templates/item/ammo-sheet.html",
    "systems/cyphersystem/templates/item/armor-sheet.html",
    "systems/cyphersystem/templates/item/artifact-sheet.html",
    "systems/cyphersystem/templates/item/attack-sheet.html",
    "systems/cyphersystem/templates/item/cypher-sheet.html",
    "systems/cyphersystem/templates/item/equipment-sheet.html",
    "systems/cyphersystem/templates/item/material-sheet.html",
    "systems/cyphersystem/templates/item/oddity-sheet.html",
    "systems/cyphersystem/templates/actor/pc-sheet.html",
    "systems/cyphersystem/templates/actor/npc-sheet.html"
  ];
  return loadTemplates(templatePaths);
}