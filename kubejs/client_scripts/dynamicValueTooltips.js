let slimeData = {}

NetworkEvents.dataReceived('kubejs:slime_data', e => {
    slimeData = e.data
})

ItemEvents.tooltip(e => {
    e.addAdvanced(`splendid_slimes:plort`, (item, advanced, text) => {
        if (!item.nbt || !item.nbt['plort']) return

        let plort = item.nbt['plort'].id.split(':')[1]

        if (slimeData && slimeData[plort] === undefined) return

        let plortData = slimeData[plort]
        let cost = plortData.baseValue * plortData.currentMultiplier

        if (e.shift) {
            text.add(2, [
                `§6${global.calculateCost(cost, 1, item.count)}§a¤`,
                `${item.count > 1 ? '§7 Stack Value' : ''}`
                
            ]);
        } else {
            // text.add(2, `§6${global.calculateCost(cost, 1, 1)}§a¤ §8[§7Shift§8]`);
            text.add(2, [
                `§6${global.calculateCost(cost, 1, 1)}§a¤`,
                `${item.count > 1 ? '§8 [§7Shift§8]' : ''}`
            ]);
        }
    })
})