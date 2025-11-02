let slimeData = {}

NetworkEvents.dataReceived('kubejs:slime_data', e => {
    slimeData = e.data
})

ItemEvents.tooltip(e => {
    e.addAdvanced(`splendid_slimes:plort`, (stack, advanced, tooltip) => {
        if (!stack.nbt || !stack.nbt['plort']) return

        let plort = stack.nbt['plort'].id.split(':')[1]

        if (slimeData && slimeData[plort] === undefined) return

        let plortData = slimeData[plort]

        tooltip.add(2, `§a¤ §6${plortData.baseValue * plortData.currentMultiplier}`)
    })
})