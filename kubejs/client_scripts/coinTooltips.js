// Borrowed from society

const coinTooltips = [
    "numismatics:spur",
    "numismatics:bevel",
    "numismatics:sprocket",
    "numismatics:cog",
    "numismatics:crown",
    "numismatics:sun"
];

ItemEvents.tooltip(e => {
    Object.entries(global.coinMap).forEach(coinEntry => {
        let coin = coinEntry.coin;
        e.addAdvanced(coin, (item, advanced, text) => {
            if (e.shift) {
                text.add(1, `§6${global.calculateCost(coinEntry.value, 1, item.count)}§a¤ §7Stack Value`);
            } else {
                text.add(1, `§6${global.calculateCost(coinEntry.value, 1, 1)}§a¤ §8[§7Shift§8]`);
            }
        });
    });
})

