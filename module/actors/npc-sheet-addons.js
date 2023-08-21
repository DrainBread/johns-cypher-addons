var $effectNav = $("div.sheet.actor.npc:last #effectsNav");
var $effectBody = $("div.sheet.actor.npc:last #effectsTab");
$("div.sheet.actor.npc:last nav.sheet-tabs.tabs a.item[data-tab='description']").after($effectNav);
$("div.sheet.actor.npc:last section.sheet-body").append($effectBody);
