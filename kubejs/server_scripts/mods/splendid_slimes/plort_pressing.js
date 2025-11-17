// slime heart plort duplication recipes
ServerEvents.recipes(e => {
    e.remove({ type: 'splendid_slimes:plort_pressing' })

    // loop over all slimes
    for (const [slimeType, slimeData] of Object.entries(global.slimeDefinitionsData)) {
        let valueData = global.baseSlimeValueData[slimeType]

        // continue if slime has no value data or no slime dupe cost
        if (valueData === undefined) { continue }
        if (1 > valueData.slimeDupeCost || valueData.slimeDupeCost === undefined) { continue }

        // add slime heart duplication recipe
        e.custom({
            type: "splendid_slimes:plort_pressing",
            ingredient: {
                count: valueData.slimeDupeCost,
                item: "splendid_slimes:plort",
                nbt: {
                    plort: {
                        id: `splendid_slimes:${slimeType}`
                    }
                }
            },
            result: {
                item: "splendid_slimes:slime_heart",
                nbt: {
                    slime: {
                        id: `splendid_slimes:${slimeType}`
                    }
                }
            }
        }).id(`kubejs:generated/heart_pressing/dupe/${slimeType}`)
    }
})

// other plort pressing recipes
ServerEvents.recipes(e=> {

})