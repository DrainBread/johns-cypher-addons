    var $nav = $("div.sheet.actor.npc:last #affinitiesNav");
    var $body = $("div.sheet.actor.npc:last #affinitiesTab");
    $("div.sheet.actor.npc:last nav.sheet-tabs.tabs a.item[data-tab='description']").after($nav);
    $("div.sheet.actor.npc:last section.sheet-body").append($body);