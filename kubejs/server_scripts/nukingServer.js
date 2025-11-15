// All entries in global.nukelist will be removed from recipe viewers, loot
// tables, recipes, tags, ect.


// EMI hidden stacks cross syncing system, see nukeList.json comment
// Load configs
let emiCfg = JsonIO.read('emi.json')
let nukeListFile = JsonIO.read('kubejs/server_scripts/nukeList.json')
let previousNukeList = nukeListFile["nuke_list"]
let removeFromNukeList = nukeListFile["remove_from_nuke_list"]

// Create emi.json if it doesn't exist
if (emiCfg == undefined) {
	emiCfg = {}
	emiCfg.hidden_stacks = []
}

// Extract hidden item ids, e.g. "item:xxx:xxx" to "xxx:xxx"
let emiHidden = (emiCfg.hidden_stacks)
	.filter(x => typeof x === "string" && x.indexOf("item:") === 0)
	.map(x => x.split("item:")[1])

// Combine lists
let combined = [].concat(previousNukeList, emiHidden)

// Deduplicate
let seen = {}
let finalNukeList = combined.filter(function (item) {
	if (seen[item]) return false
	seen[item] = true
	return true
}).sort()

// Deduplicate EMI hidden stacks
let seenHidden = {}
emiCfg.hidden_stacks = []
	.concat(emiCfg.hidden_stacks.filter(function (item) {
		let key = JSON.stringify(item)
		if (seenHidden[key]) return false
		seenHidden[key] = true
		return true
	})).sort()

// Remove the removal entries from nuke list in all places
for (let remove of removeFromNukeList) {
	finalNukeList = finalNukeList.filter(x => x !== remove)
	emiCfg.hidden_stacks = emiCfg.hidden_stacks.filter(x => x !== `item:${remove}`)
}
nukeListFile["remove_from_nuke_list"] = []

// Save merged files
JsonIO.write('emi.json', emiCfg)
nukeListFile["nuke_list"] = finalNukeList
JsonIO.write('kubejs/server_scripts/nukeList.json', nukeListFile)

global.nukelist = finalNukeList

// in game nuking actions
ServerEvents.tags("item", (event) => {
	event.removeAllTagsFrom(global.nukelist)
	event.add("kubejs:nuked", global.nukelist)
	// event.add("c:hidden_from_recipe_viewers", global.nukelist)
})

ServerEvents.tags("block", (event) => {
	event.removeAllTagsFrom(global.nukelist)
})

ServerEvents.tags("fluid", (event) => {
	event.removeAllTagsFrom(global.nukelist)
	event.add("kubejs:nuked", global.nukelist)
	// event.add("c:hidden_from_recipe_viewers", global.nukelist)
})

ServerEvents.recipes((event) => {
	event.remove({ input: global.nukelist })
	event.remove({ output: global.nukelist })
})

LootJS.modifiers((event) => {
	event.addLootTypeModifier(
		LootType.ENTITY,
		LootType.UNKNOWN,
		LootType.BLOCK,
		LootType.CHEST,
		LootType.FISHING,
		LootType.GIFT,
		LootType.ADVANCEMENT_ENTITY,
		LootType.ADVANCEMENT_REWARD,
		LootType.PIGLIN_BARTER
	).removeLoot(global.nukelist)
})
