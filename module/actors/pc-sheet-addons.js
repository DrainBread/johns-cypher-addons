var $nav = $("div.sheet.actor.pc:last #affinitiesNav");
var $body = $("div.sheet.actor.pc:last #affinitiesTab");
$("div.sheet.actor.pc:last nav.sheet-tabs.tabs a.item[data-tab='description']").after($nav);
$("div.sheet.actor.pc:last section.sheet-body").append($body);