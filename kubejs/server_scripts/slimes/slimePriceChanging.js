// priority: 0

ServerEvents.loaded(e => {
    if (e.server.persistentData['slime_data'] === undefined) {
        e.server.persistentData['slime_data'] = baseSlimeData
    }
})

PlayerEvents.tick(e => {
    if(Utils.server.tickCount % 200 === 0) {
        e.player.sendData('kubejs:slime_data', e.server.persistentData['slime_data'])
    }
})

ItemEvents.firstLeftClicked('minecraft:iron_sword', e => {
    e.server.persistentData['slime_data'] = baseSlimeData
})