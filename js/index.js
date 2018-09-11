$(document).ready(function () {
    $('#parse-btn').click(function (e) {
        e.preventDefault(e);
        parseSimc();
        return false;
    });
    parseSimc();
});

var partsSlot = [
    'head',
    'neck',
    'shoulder',
    'back',
    'wrist',
    'hands',
    'waist',
    'legs',
    'feet',
    'finger',
    'trinket',
    'main_hand',
    'off_hand'
];

var baseGearObj = {
    head: [],
    neck: [],
    shoulder: [],
    back: [],
    wrist: [],
    hands: [],
    waist: [],
    legs: [],
    feet: [],
    finger: [],
    trinket: [],
    main_hand: [],
    off_hand: []
};

var selectedGear = $.extend(true, {}, baseGearObj);
var combinations = [];

function parseSimc() {
    console.log("input simc faked");
    $('#input-simc').val("# SimC Addon 1.10.6\n" + "# 8.0 Note: reforge= is being used as a hacky way to capture item context. This will be changed in 8.1\n" + "\n" + "warlock=\"Rodrive\"\n" + "level=120\n" + "race=undead\n" + "region=eu\n" + "server=ysondre\n" + "role=spell\n" + "professions=alchemy=140/herbalism=150\n" + "talents=3222223\n" + "spec=affliction\n" + "\n" + "head=,id=159252,bonus_id=4819/1512/4786,reforge=23,azerite_powers=123/30\n" + "neck=,id=158075,bonus_id=4936/4929/4930/1510,reforge=11,azerite_level=20\n" + "shoulder=,id=159232,bonus_id=4819/1512/4786,reforge=23,azerite_powers=425/22\n" + "back=,id=158375,bonus_id=4779/1512/4786,reforge=23\n" + "chest=,id=163280,bonus_id=5125/1532/5138,reforge=28,azerite_powers=123/30\n" + "tabard=,id=43349\n" + "wrist=,id=163306,gem_id=154129,bonus_id=5126/4802/1562/4786,reforge=6\n" + "hands=,id=159266,bonus_id=5005/1527/4786,reforge=16\n" + "waist=,id=159255,bonus_id=5002/1522/4786,reforge=16\n" + "legs=,id=158350,bonus_id=5006/1527/4786,reforge=16\n" + "feet=,id=159243,gem_id=153709,bonus_id=4780/4802/1527/4783,reforge=16\n" + "finger1=,id=159463,enchant_id=5940,bonus_id=4779/1512/4786,reforge=23\n" + "finger2=,id=159462,enchant_id=5940,bonus_id=4779/1512/4786,reforge=23\n" + "trinket1=,id=159610,bonus_id=5002/41/1527/4783,reforge=16\n" + "trinket2=,id=159630,bonus_id=4779/1517/4783,reforge=23\n" + "main_hand=,id=159636,enchant_id=5964,bonus_id=4946/1522/4783,reforge=16\n" + "\n" + "### Gear from Bags\n" + "#\n" + "# Smartly Plumed Cap (340)\n" + "# head=,id=155886,bonus_id=4819/1512/4786,reforge=23,azerite_powers=131/462\n" + "#\n" + "# Amice of the Returned (340)\n" + "# shoulder=,id=159273,bonus_id=4819/1512/4786,reforge=23,azerite_powers=\n" + "#\n" + "# Shadra Silk Mantle (340)\n" + "# shoulder=,id=157907,bonus_id=1532/5140,reforge=28,azerite_powers=432/30\n" + "#\n" + "# Brood Cleanser's Amice (340)\n" + "# shoulder=,id=159254,bonus_id=4819/1512/4786,reforge=23,azerite_powers=123/31\n" + "#\n" + "# Cloak of Questionable Intent (355)\n" + "# back=,id=159287,bonus_id=4780/1527/4783,reforge=16\n" + "#\n" + "# Parrotfeather Cloak (340)\n" + "# back=,id=155884,bonus_id=4779/1512/4786,reforge=23\n" + "#\n" + "# Loa Betrayer's Vestments (340)\n" + "# chest=,id=159233,bonus_id=4819/1512/4786,reforge=23,azerite_powers=123/22\n" + "#\n" + "# Inmate's Straight Robe (340)\n" + "# chest=,id=159268,bonus_id=4819/1512/4786,reforge=23,azerite_powers=479/22\n" + "#\n" + "# Sandspinner Vestments (340)\n" + "# chest=,id=157962,bonus_id=1532/5138,reforge=28,azerite_powers=444/22\n" + "#\n" + "# Wristwraps of Twined Morels (350)\n" + "# wrist=,id=159275,bonus_id=5002/1522/4786,reforge=16\n" + "#\n" + "# Honorbound Artificer's Cuffs (340)\n" + "# wrist=,id=163306,bonus_id=5124/1532/4786,reforge=3\n" + "#\n" + "# Iron-Kelp Wristwraps (340)\n" + "# wrist=,id=159256,bonus_id=4779/1512/4786,reforge=23\n" + "#\n" + "# Wraps of Everliving Fealty (340)\n" + "# wrist=,id=158348,gem_id=153709,bonus_id=4779/4802/1512/4786,reforge=23\n" + "#\n" + "# Gloves of Staunched Wounds (340)\n" + "# hands=,id=159253,bonus_id=4779/1512/4786,reforge=23\n" + "#\n" + "# Belt of Undying Devotion (355)\n" + "# waist=,id=159262,bonus_id=5006/1527/4786,reforge=16\n" + "#\n" + "# Ouroborial Sash (340)\n" + "# waist=,id=159255,bonus_id=4779/1512/4786,reforge=23\n" + "#\n" + "# Rowdy Reveler's Legwraps (340)\n" + "# legs=,id=158350,bonus_id=4779/40/1512/4786,reforge=23\n" + "#\n" + "# Darklight Legwarmers (355)\n" + "# legs=,id=159269,bonus_id=5005/1527/4786,reforge=16\n" + "#\n" + "# Devilsaur Worshiper's Sandals (350)\n" + "# feet=,id=158303,bonus_id=5002/1522/4786,reforge=16\n" + "#\n" + "# Band of the Ancient Dredger (355)\n" + "# finger1=,id=159461,enchant_id=5939,bonus_id=4780/1527/4783,reforge=16\n" + "#\n" + "# Murky Cerulean Signet (340)\n" + "# finger1=,id=158318,enchant_id=5939,bonus_id=4779/40/1512/4786,reforge=23\n" + "#\n" + "# Band of the Ancient Dredger (340)\n" + "# finger1=,id=159461,enchant_id=5939,bonus_id=4779/1512/4786,reforge=23\n" + "#\n" + "# Jade Ophidian Band (360)\n" + "# finger1=,id=162544,bonus_id=5006/1532/4783,reforge=16\n" + "#\n" + "# Pearl Diver's Compass (320)\n" + "# trinket1=,id=158162,bonus_id=4803/1512/4785,reforge=25\n" + "#\n" + "# Ignition Mage's Fuse (340)\n" + "# trinket1=,id=159615,bonus_id=4779/1512/4786,reforge=23\n" + "#\n" + "# Darkmoon Deck: Squalls (355)\n" + "# trinket1=,id=159126,reforge=13\n" + "#\n" + "# Regurgitated Purifier's Flamestaff (355)\n" + "# main_hand=,id=160689,enchant_id=5949,bonus_id=4798/1477/4786,reforge=3\n" + "#\n");

    resetDom();
    removeWowhead();

    createGearDom();
    var simcInput = $('#input-simc').val();
    var simcLines = simcInput.split('\n');
    var gear = getGear(simcLines);

    getGearData(gear);

    $('#compare-btn').click(function () {
        combinations = compare(selectedGear);
        displayResult(simcInput, combinations);
    });

}

function resetDom() {
    $('#section-gear').hide();
    $('#section-result').hide();
    $('#section-loading').show();
    selectedGear = $.extend(true, {}, baseGearObj);
    combinations = [];
}

function removeWowhead() {
    $("script[src*='wow.zamimg.com']").remove();
    $("link[href*='wow.zamimg.com']").remove();
    $(".wowhead-script").remove();
    WH = undefined;
    Icon = undefined;
    $WowheadPower = undefined;
}

function getGear(lines) {
    var gear = {
        equipped: $.extend(true, {}, baseGearObj),
        bag: $.extend(true, {}, baseGearObj)
    };

    lines.forEach(function (line) {
        if (isAPart(line)) {
            var gearPosition = 'equipped';
            if (isABagPart(line)) {
                gearPosition = 'bag';
                line = line.replace('#', '');
            }
            line = line.replace(' ', '');
            var slot = getSlot(line);
            gear[gearPosition][slot].push(line);
        }
    });
    return gear;
}

function isAPart(line) {
    return partsSlot.some(function (part) {
        return line.indexOf(part) !== -1;
    })
}

function getSlot(line) {
    var slot = '';
    partsSlot.some(function (part) {
        if (line.indexOf(part) !== -1) {
            slot = part;
            return true;
        }
    });
    return slot;
}

function isABagPart(line) {
    return line[0] === "#"
}

function createGearDom() {
    var $gearSection = $('#section-gear > .container > #gear-container');
    $gearSection.empty();
    var $currentRow = '';
    partsSlot.forEach(function (slot, index) {
        if ((index) % 3 === 0) {
            $currentRow = $("<div class='row mb-5 pt-2'></div>");
            $gearSection.append($currentRow);
        }
        $currentRow.append("<div class='col-4' id='" + 'gear-' + slot + "'" + "><h4 class='text-uppercase'>" + slot + "</h4></div>");
    });
}

function getGearData(gear) {
    Object.keys(gear.equipped).forEach(function (slot) {
        var $currentCol = $("#gear-" + slot);
        var waiting = 0;
        gear.equipped[slot].forEach(function (part) {
            var item = getPartInfos(part);
            var itemUrl = getUrl(item);
            $.get(itemUrl, function (data) {
                item.ilvl = getIlvl(data.tooltip_enus);
                $currentCol.append(
                    "<div class='equipped mb-2 p-2 border border-warning'>" +
                    "<a class='bold' target='_blank' href='https://www.wowhead.com/item=" + item.id + "/" + getDetailItemUrlParams(item) + "'>" +
                    data.name_enus +
                    "</a>" +
                    "<div><small>" + "ilvl: "+ item.ilvl +
                    "</small></div>" +
                    "</div>");
                waiting++;
            })
        });
        gear.bag[slot].forEach(function (part) {
            var item = getPartInfos(part);
            var itemUrl = getUrl(item);
            $.get(itemUrl, function (data) {
                item.ilvl = getIlvl(data.tooltip_enus);
                $currentCol.append(
                    "<div class='bag mb-2 p-2 border border-white pointer' onclick='toggleGear(this, \"" + part+ "\", \"" + data.name_enus.replace("'", "") + "\")'>" +
                    // "<a href='https://www.wowhead.com/item=" + item.id + " data-wowhead='item=" + item.id + "/" + getDetailItemUrlParams(item) + "'>" +
                    "<a target='_blank' href='https://www.wowhead.com/item=" + item.id + "/" + getDetailItemUrlParams(item) + "'>" +
                    data.name_enus +
                    "</a>" +
                    "<div><small>" + "ilvl: "+ item.ilvl +
                    "</small></div>" +
                    "</div>");
                waiting++;
            })
        });
    });
    loadTooltip(750);
}

function getPartInfos(line) {
    return {
        id: getId(line),
        bonus: getBonus(line),
        azerite: getAzerite(line),
        enchant: getEnchant(line),
        gem: getGem(line)
    }
}

function getIlvl(str) {
    return str.split('<!--ilvl-->')[1].slice(0, 3);
}

function getId(line) {
    return line.split('id=')[1].split(',')[0];
}

function getBonus(line) {
    if (line.indexOf('bonus_id=') !== -1) {
        return line.split('bonus_id=')[1].split(',')[0].split('/');
    }
    return [];
}

function getAzerite(line) {
    if (line.indexOf('azerite_powers=') !== -1) {
        return line.split('azerite_powers=')[1].split(',')[0].split('/');
    }
    return [];
}

function getEnchant(line) {
    if (line.indexOf('enchant_id=') !== -1) {
        return line.split('enchant_id=')[1].split(',')[0].split('/');
    }
    return [];
}

function getGem(line) {
    if (line.indexOf('gem_id=') !== -1) {
        return line.split('gem_id=')[1].split(',')[0].split('/');
    }
    return [];
}

function getUrl(item) {
    var baseUrl = "https://www.wowhead.com/tooltip/item/" + item.id + "&json&power";
    baseUrl += getDetailItemUrlParams(item);
    return baseUrl;
}

function getDetailItemUrlParams(item) {
    var baseUrl = '';
    if (item.bonus.length > 0) {
        baseUrl += "&bonus=";
        item.bonus.forEach(function (bonus, index) {
            baseUrl += (index === 0 ? '' : ':') + bonus;
        })
    }

    if (item.azerite.length > 0) {
        baseUrl += "&azerite-powers=";
        item.azerite.forEach(function (azerite, index) {
            baseUrl += (index === 0 ? '' : ':') + azerite;
        })
    }

    if (item.enchant.length > 0) {
        baseUrl += "&ench=";
        item.enchant.forEach(function (enchant, index) {
            baseUrl += (index === 0 ? '' : ':') + enchant;
        })
    }

    if (item.gem.length > 0) {
        baseUrl += "&gems=";
        item.gem.forEach(function (gem, index) {
            baseUrl += (index === 0 ? '' : ':') + gem;
        })
    }
    return baseUrl;
}

function loadTooltip(time) {
    setTimeout(function () {
        $("body").append("<script class='wowhead-script' src=\"https://wow.zamimg.com/widgets/power.js\"></script>");
        $("body").append("<script class='wowhead-script'>var whTooltips = {colorLinks: true, iconSize: 'small', iconizeLinks: true, renameLinks: true};</script></script>");
        setTimeout(function () {
            $('#section-loading').hide();
            $('#section-gear').show();
            $('#section-result').show();
        }, 100);
    }, !!time ? time : 500);
}

function toggleGear(el, part, name) {
    var slot = getSlot(part);
    if (selectedGear[slot].indexOf(part) !== -1) {
        $(el).removeClass('border-info').addClass('border-white').removeClass('bold');
        selectedGear[slot].splice(selectedGear[slot].indexOf(part), 1);
    } else {
        $(el).removeClass('border-white').addClass('border-info').addClass('bold');
        selectedGear[slot].push(
            {
                line: part,
                name: name
            }
        );
    }
    console.log(selectedGear);
}

function compare(set) {
    var combinations = [];

    initSet(set);

    function initSet(set) {
        var tmpSet = Object.assign({}, set);
        Object.keys(tmpSet).forEach(function (key) {
            if (tmpSet[key].length === 0) {
                delete tmpSet[key];
            } else {
                if (key === 'finger' || key === 'trinket') {
                    // tmpSet[key + "1"] = tmpSet[key].slice();
                    tmpSet[key + "1"] = $.extend(true, [], tmpSet[key]);
                    // tmpSet[key + "2"] = tmpSet[key].slice();
                    tmpSet[key + "2"] = $.extend(true, [], tmpSet[key]);
                    tmpSet[key + "2"].forEach(function (part, idx) {
                        tmpSet[key + "2"][idx].line = part.line.replace(key + "1", key + "2");
                    });
                    delete tmpSet[key];
                }
            }
        });
        getComb(tmpSet, []);
    }


    function getComb(set, currComb, prevRingTrinket) {
        var tmpSet = Object.assign({}, set);
        var tmpKeys = Object.keys(tmpSet);
        tmpKeys.forEach(function (key) {
            tmpSet[key].forEach(function (part) {
                var tmpSet2 = Object.assign({}, tmpSet);
                // var tmpComb = currComb.slice();
                var tmpComb = $.extend(true, [], currComb);
                if (key === 'finger2' || key === 'trinket2') {
                    if (!prevRingTrinket || (prevRingTrinket.replace("finger1", "finger") !== part.line.replace("finger2", "finger") &&
                        prevRingTrinket.replace("trinket1", "trinket") !== part.line.replace("trinket2", "trinket"))) {
                        tmpComb.push(part);
                        combinations.push(tmpComb);
                    }

                } else {
                    tmpComb.push(part);
                    combinations.push(tmpComb);
                }
                delete tmpSet2[key];
                if (key === 'finger1' || key === 'trinket1'){
                    getComb(tmpSet2, tmpComb, part.line);
                } else {
                    getComb(tmpSet2, tmpComb);
                }

            });
            delete tmpSet[key];
        });
    }

    return combinations;
}

function displayInput(simcInput, combinations){

}
