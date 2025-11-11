let slimeData = {}

NetworkEvents.dataReceived('kubejs:slime_value_data', e => {
    slimeData = e.data
})

// Plort dynamic valuing tooltips
ItemEvents.tooltip(e => {
    e.addAdvanced(`splendid_slimes:plort`, (item, advanced, text) => {
        text.remove(1)
        function addPercent(text, mult) {
            if (mult != 0 && mult != undefined) {
                text.add(2, [
                    `${mult < 0 ? '§c' : '§a+'}${mult}%`
                ])
            }
        }

        try {
            if (!item.nbt || !item.nbt['plort']) return

            let plort = item.nbt['plort'].id.split(':')[1]

            if (slimeData && slimeData[plort] === undefined) return

            let plortData = slimeData[plort]
            let cost = plortData.currentValue
            let mult = plortData.multPercent

            if (e.shift) {
                text.add(1, [
                    `§6${global.calculateCost(cost, 1, item.count)}§a☻`,
                    item.count > 1 ? '§7 Stack Value' : ''
                ])
                addPercent(text, mult)
            } else {
                text.add(1, [
                    `§6${global.calculateCost(cost, 1, 1)}§a☻`,
                    item.count > 1 ? '§8 [§7Shift§8]' : ''
                ])
                addPercent(text, mult)
            }
        } catch (err) {
            console.log(err)
        }
    })
})

// Coin valuing tooltips
ItemEvents.tooltip(e => {
    for (let coinEntry of Object.entries(global.coinObj)) {
        e.addAdvanced(coinEntry[0], (item, advanced, text) => {
            text.remove(1)
            let val = global.coinObj[item.id]
            if (e.shift) {
                text.add(1, [
                    `§6${global.calculateCost(val, 1, item.count)}§a☻`,
                    item.count > 1 ? '§7 Stack Value' : ''
                ])
            } else {
                text.add(1, [
                    `§6${global.calculateCost(val, 1, 1)}§a☻`,
                    item.count > 1 ? '§8 [§7Shift§8]' : ''
                ])
            }
        })
    }
})
