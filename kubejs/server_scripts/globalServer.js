// Lots taken from Society

global.mainUiElementIds = [

];

const clearUiPaint = (player, ids) => {
    let removedText = {};
    let removedShadow = {};
    // Spawn and clear instance of paint element to prevent warnings that they don't exist
    ids.forEach((id) => {
        removedText[id] = { type: "text" };
        removedShadow[`${id}Shadow`] = { type: "text" };
    });
    player.paint(removedText);
    player.paint(removedShadow);
    ids.forEach((id) => {
        removedText[id] = { remove: true };
        removedShadow[`${id}Shadow`] = { remove: true };
    });
    player.paint(removedText);
    player.paint(removedShadow);
};

global.renderUiText = (player, server, messages, clearedMessages) => {
    server.scheduleInTicks(0, () => {
        clearUiPaint(player, clearedMessages);
        player.paint(messages);
        player.persistentData.ageLastShownMessage = player.age;
        server.scheduleInTicks(100, () => {
            if (player.age - player.persistentData.get("ageLastShownMessage") >= 100)
                clearUiPaint(player, clearedMessages);
        });
    });
};

global.clearUiItemPaint = (player, ids) => {
    let removedItem = {};
    // Spawn and clear instance of paint element to prevent warnings that they don't exist
    ids.forEach((id) => {
        removedItem[id] = { type: "item" };
    });
    player.paint(removedItem);
    ids.forEach((id) => {
        removedItem[id] = { remove: true };
    });
    player.paint(removedItem);
};

global.renderUiItemText = (player, items, ids) => {
    global.clearUiItemPaint(player, ids);
    player.paint(items);
};

global.calculateCoinValue = (coin) => {
    let value = 0;
    switch (coin.id.split(":")[1]) {
        case "spur":
            value = 1;
            break;
        case "bevel":
            value = 8;
            break;
        case "sprocket":
            value = 16;
            break;
        case "cog":
            value = 64;
            break;
        case "crown":
            value = 512;
            break;
        case "sun":
            value = 4096;
            break;
        // case "neptunium_coin":
        //     value = 32768;
        //     break;
        // case "ancient_coin":
        //     value = 262144;
        //     break;
        // case "prismatic_coin":
        //     value = 16777216;
        //     break;
        default:
            console.log(`Invalid coin`);
    }
    return value * coin.count;
};

global.calculateCoinsFromValue = (price, output) => {
    for (let i = 0; i < global.coinMap.length; i++) {
        let { coin, value } = global.coinMap[i];
        if (value <= price) {
            if (price % value === 0) {
                output.push({ id: coin, count: price / value });
                return output;
            } else {
                output.push({ id: coin, count: Math.floor(price / value) });
                global.calculateCoinsFromValue(price % value, output);
            }
            return output;
        }
    }
};

global.addItemCooldown = (player, item, time) => {
    if (!player.isFake()) player.addItemCooldown(item, time);
};
