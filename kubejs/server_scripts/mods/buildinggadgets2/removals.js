// removing recipes for items that are probably purchased
ServerEvents.recipes(e => {
    e.remove({ output: 'buildinggadgets2:gadget_building' })
    e.remove({ output: 'buildinggadgets2:gadget_exchanging' })
    e.remove({ output: 'buildinggadgets2:gadget_copy_paste' })
    e.remove({ output: 'buildinggadgets2:gadget_cut_paste' })
    e.remove({ output: 'buildinggadgets2:gadget_destruction' })
    e.remove({ output: 'buildinggadgets2:template_manager' })
})