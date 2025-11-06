let slimeData = {}

NetworkEvents.dataReceived('kubejs:slime_data', e => {
    slimeData = e.data
})

// Plort dynamic valuing tooltips
ItemEvents.tooltip(e => {
    e.addAdvanced(`splendid_slimes:plort`, (item, advanced, text) => {
        if (!item.nbt || !item.nbt['plort']) return

        let plort = item.nbt['plort'].id.split(':')[1]

        if (slimeData && slimeData[plort] === undefined) return

        let plortData = slimeData[plort]
        let cost = plortData.baseValue * plortData.currentMultiplier

        if (e.shift) {
            text.add(2, [
                `§b${global.calculateCost(cost, 1, item.count)}§d☻`,
                item.count > 1 ? '§7 Stack Value' : ''
            ])
        } else {
            text.add(2, [
                `§b${global.calculateCost(cost, 1, 1)}§d☻`,
                item.count > 1 ? '§8 [§7Shift§8]' : ''
            ])
        }
    })
})

// Coin valuing tooltips
ItemEvents.tooltip(e => {
    for (let coinEntry of Object.entries(global.coinObj)) {
        e.addAdvanced(coinEntry[0], (item, advanced, text) => {
            text.get(0)
            text.remove(1)
            let val = global.coinObj[item.id]
            if (e.shift) {
                text.add(1, [
                    `§b${global.calculateCost(val, 1, item.count)}§d☻`,
                    item.count > 1 ? '§7 Stack Value' : ''
                ])
            } else {
                text.add(1, [
                    `§b${global.calculateCost(val, 1, 1)}§d☻`,
                    item.count > 1 ? '§8 [§7Shift§8]' : ''
                ])
            }
        })
    }
})