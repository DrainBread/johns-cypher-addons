var $effectNav = $("div.sheet.actor.pc:last #effectsNav");
var $effectBody = $("div.sheet.actor.pc:last #effectsTab");
$("div.sheet.actor.pc:last nav.sheet-tabs.tabs a.item[data-tab='description']").after($effectNav);
$("div.sheet.actor.pc:last section.sheet-body").append($effectBody);
var $consumeItem = $("div.sheet.actor.pc:last #consume-item");
$("div.sheet.actor.pc:last div.tab.items li:not('.item-header') div.item-controls").prepend($consumeItem);
$("div.sheet.actor.pc:last div.tab.items div.item-controls").css("min-width","65px");