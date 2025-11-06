MBDMachineEvents.onTick("mbd2:selling_port", e => {
    const mbdEvent = e.event
    const { machine } = mbdEvent

    let itemTrait = machine.getTraitByName("item_slot")
    /** @type {ItemStackTransfer.prototype} */
    const storage = itemTrait.storage

    machine.customData.putInt("sell_price", 0)

    let plorts = {}

    for (let i = 0; i < storage.getSlots(); i++) {
        let stack = storage.getStackInSlot(i)
        if (stack.isEmpty()) { continue }
        let plortid = String(stack.nbt.plort.id).split(":")[1]
        plorts[plortid] = (plorts[plortid] || 0) + stack.count
    }

    if (Object.keys(plorts).length === 0) { return }
    let sellPrice = 0
    let slimeData = Utils.server.persistentData['slime_data']

    for (let plortid in plorts) {
        let count = plorts[plortid]
        sellPrice += global.getSellPrice(plortid, count, slimeData)
    }
    machine.customData.putInt("sell_price", sellPrice)
})

MBDMachineEvents.onUI("mbd2:selling_port", e => {
    const mbdevent = e.event
    const { machine, root } = mbdevent

    /** @type {LabelWidget_} */
    const label = root.getFirstWidgetById("text")
    /** @type {LabelWidget_} */
    const debuglabel = root.getFirstWidgetById("debuglabel")
    /** @type {ButtonWidget_} */
    const button = root.getFirstWidgetById("sell")

    /** @type {SlotWidget_[]} */
    const slots = []

    for (let i = 0; i < 6; i++) {
        slots.push(root.getFirstWidgetById(`item_slot_${i}`))
    }

    label.setTextProvider(() => `sells for §b${machine.customData.getInt("sell_price")}§d☻`)

    button.setOnPressCallback(clickData => {
        if (clickData.isRemote) { return }
        slots.forEach((slot) => {
            console.log(slot)
            slot.item = Item.empty
        })

        let sellPrice = machine.customData.getInt("sell_price")
        let coinItems = global.getSellCoins(sellPrice)

        for (let i = 0; i < coinItems.length; i++) {
            machine.level.getBlock(machine.pos).popItemFromFace(coinItems[i], "up")
            let a = i
            Utils.server.scheduleInTicks(10000 * a, () => {
                let block = machine.level.getBlock(machine.pos)
                block.popItemFromFace(coinItems[i], "up")
            })
        }
    })
})