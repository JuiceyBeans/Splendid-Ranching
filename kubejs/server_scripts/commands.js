ServerEvents.commandRegistry(e => {
    const { commands: Commands, arguments: Arguments } = e

    // command to print out coins from value
    // using this to make market quests lol
    e.register(
        Commands.literal("coinsFromValue")
            .then(Commands.argument("amount", Arguments.INTEGER.create(e))
                .executes(ctx => {
                    let player = ctx.source.player
                    let amount = Arguments.INTEGER.getResult(ctx, "amount")

                    /** @type {Array} */
                    let coins = global.calculateCoinsFromValue(amount, [])

                    player.tell(`§6${amount}§a☻§r in coins:`)
                    
                    for (let coin of coins) {
                        player.tell(`${coin.count}x ${Item.of(coin.id).hoverName.string}`)
                    }
                    return 1
                })
            )
    )
})