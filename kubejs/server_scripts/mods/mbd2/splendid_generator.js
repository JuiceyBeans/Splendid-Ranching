const $NbtUtils = Java.loadClass("net.minecraft.nbt.NbtUtils")

MBDMachineEvents.onTick("mbd2:splendid_generator", e => {
    if (Utils.server.tickCount % 20 != 0) { return }

    const mbdEvent = e.event
    const { machine } = mbdEvent

    let energyTrait = machine.getTraitByName("forge_energy_storage")
    /** @type {Internal.EnergyStorage} */
    const energyStorage = energyTrait.storage

    let itemTrait = machine.getTraitByName("item_slot")
    /** @type {ItemStackTransfer.prototype} */
    const itemStorage = itemTrait.storage
    try {
        let stack = itemStorage.getStackInSlot(0)
        if (!stack.nbt || stack.nbt['AccountID'] == null) return

        let accountUUID = $NbtUtils.loadUUID(stack.nbt['AccountID'])
        let account = global.GLOBAL_BANK.getAccount(accountUUID)
        let balance = account.balance
        let setMaxEnergy = machine.customData.getInt("max_energy")

        // Energy currently stored
        let currentEnergy = energyStorage.getEnergyStored()
        let spaceAvailable = setMaxEnergy - currentEnergy

        if (currentEnergy >= setMaxEnergy) {
            return
        }

        // Determine how much glubcoin can be converted into energy
        // Each glubcoin = 1000 energy, up to 10 gips at once, and limited by balance and storage capacity
        let maxDollarsPossible = Math.min(10, balance, Math.floor(spaceAvailable / 10000))

        if (maxDollarsPossible > 0) {
            account.deduct(maxDollarsPossible)
            energyStorage.receiveEnergy(maxDollarsPossible * 10000, false)
        }
    } catch (err) {
        console.error(err)
    }
})

MBDMachineEvents.onUI("mbd2:splendid_generator", e => {
    const mbdevent = e.event
    const { machine, root } = mbdevent
    /** @type {TextFieldWidget} */
    const textfield = root.getFirstWidgetById("textfield")
    try {
        textfield.setNumbersOnlyFloat(0, 500000)
        if (machine.customData.getInt("max_energy") == 0) {
            machine.customData.putInt("max_energy", 50000)
        }
        textfield.setCurrentString(machine.customData.getInt("max_energy"))


        textfield.setTextResponder(s => {
            machine.customData.putInt("max_energy", Number(s))
        })
    } catch (err) {
        console.error(err)
    }
})