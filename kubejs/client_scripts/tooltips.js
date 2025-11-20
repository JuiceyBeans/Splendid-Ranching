ItemEvents.tooltip(e => {
    // mbd2
    e.add('mbd2:selling_port', ['Sells plorts using interface'])
    e.add('mbd2:auto_selling_port', ['Sells plorts on the ground'])
    e.add('mbd2:slime_breeder', ['Fuses slimes in a 5x4x5 area behind it'])
    e.add('mbd2:chicken_duper', ['50/50 Duplicates or kills a chicken'])
    e.add('mbd2:splendid_generator', ['Generates 2.5k FE/gip from your bank account', 'up to 25k FE/second'])
    // ranching
    e.add('splendid_slimes:corral_block', ['Allows players to pass through,\nbut not slimes', 'Redstone powering will disable\nother mobs passing through '])
    e.add('splendid_slimes:slime_incubator', ['Grows a slime heart to spawn a new slime'])
    e.add('splendid_slimes:plort_press', ['Creates slime hearts from plorts'])
    e.add('splendid_slimes:plort_rippit', ['Extracts resources from a slime heart'])
    e.add('splendid_slimes:slime_feeder', ['Nearby slimes can eat from it\'s inventory'])
    // quark
    e.add('quark:feeding_trough', ['Feeds nearby slimes from items inside'])
})