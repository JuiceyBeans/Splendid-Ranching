// removing recipes for items that are probably purchased
ServerEvents.recipes(e => {
    e.remove({ output: 'splendid_slimes:corral_block'})
    e.remove({ output: 'splendid_slimes:plort_press'})
    e.remove({ output: 'splendid_slimes:plort_rippit'})
    e.remove({ output: 'splendid_slimes:slime_incubator'})
    e.remove({ output: 'splendid_slimes:slime_feeder'})
})