var $effectNav = $("div.sheet.actor.pc:last #effectsNav");
var $effectBody = $("div.sheet.actor.pc:last #effectsTab");
$("div.sheet.actor.pc:last nav.sheet-tabs.tabs a.item[data-tab='description']").after($effectNav);
$("div.sheet.actor.pc:last section.sheet-body").append($effectBody);
