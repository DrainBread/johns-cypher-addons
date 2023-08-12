var $nav = $("div.sheet.item.item-sheet:last #affinitiesNav");
var $body = $("div.sheet.item.item-sheet:last #affinitiesTab");
var $settings = $("div.sheet.item.item-sheet:last #additionalSettings");
$("div.sheet.item.item-sheet:last nav.sheet-tabs.tabs a.item[data-tab='description']").after($nav);
$("div.sheet.item.item-sheet:last section.sheet-body").append($body);
$("div.sheet.item.item-sheet:last div.settings").append($settings);