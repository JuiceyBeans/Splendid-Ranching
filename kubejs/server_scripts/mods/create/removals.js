// removing recipes for items that are probably purchased
ServerEvents.recipes(e => {
    e.remove({ output: 'numismatics:bank_terminal' })
    e.remove({ output: 'numismatics_utils:portable_bank_terminal' })
    e.remove({ output: 'numismatics:magenta_card' })
    e.remove({ output: 'create_jetpack:jetpack' })
    e.remove({ output: 'create_jetpack:netherite_jetpack', type: 'create:mechanical_crafting' })

})