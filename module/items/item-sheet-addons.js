var $effectNav = $("div.sheet.item.item-sheet:last #effectsNav");
var $effectBody = $("div.sheet.item.item-sheet:last #effectsTab");
$("div.sheet.item.item-sheet:last nav.sheet-tabs.tabs a.item[data-tab='description']").after($effectNav);
$("div.sheet.item.item-sheet:last section.sheet-body").append($effectBody);

var $animationSettings = $("div.sheet.item.item-sheet:last #animationSettings");
$("div.sheet.item.item-sheet:last div.settings").append($animationSettings);