// priority: -20
// Borrowed from society
const $Numismatics = Java.loadClass("dev.ithundxr.createnumismatics.Numismatics");
global.GLOBAL_BANK = $Numismatics.BANK;

global.showPonderLayer = (scene, speed, height, exclude) => {
    for (let x = 0; x <= 5; x++) {
        for (let z = 0; z <= 5; z++) {
            if (!exclude || !(x == exclude.x && z == exclude.z))
                scene.world.showSection([x, height, z], Facing.DOWN);
        }
        if (speed > 0) scene.idle(speed);
    }
};

global.coinMap = [
    { coin: "numismatics:sun", value: 4096 },
    { coin: "numismatics:crown", value: 512 },
    { coin: "numismatics:cog", value: 64 },
    { coin: "numismatics:sprocket", value: 16 },
    { coin: "numismatics:bevel", value: 8 },
    { coin: "numismatics:spur", value: 1 },
];

global.formatPrice = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

global.formatNumber = (number, quality) => {
    let value;
    if (quality) {
        if (quality == 1.0) value = Math.round(number * 1.25);
        if (quality == 2.0) value = Math.round(number * 1.5);
        if (quality == 3.0) value = Math.round(number * 2);
    } else {
        value = number;
    }
    return global.formatPrice(value);
};

global.calculateCost = (value, count, stackSize) => {
    return global.formatNumber(value * count * (stackSize || 1));
};

global.formatName = (name) => {
    if (name.length === 0) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
};

// For cases where prices are auto-generated, round
const roundPrice = (price) => {
    for (let i = 0; i < global.coinMap.length; i++) {
        let { value } = global.coinMap[i];

        if (price % value === 0) {
            for (let k = 0; k < global.coinMap.length; k++) {
                if (price / global.coinMap[i - k].value <= 64) {
                    return global.coinMap[i - k].value * Math.round(price / global.coinMap[i - k].value);
                }
            }
        }
    }
    return price;
};

