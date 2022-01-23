const increaseKi = () => {
    const items = game.user.character.data.items
    let kiItem

    items.forEach(e => {
        if (e.data.name === "Ki") {
            kiItem = e
        }
    })

    const currentKi = kiItem.data.data.uses.value
    const maxKi = kiItem.data.data.uses.max
    const profBonus = game.user.character.data.data.attributes.prof
    const profBonusAdjusted = ((maxKi - currentKi) < profBonus) ? (maxKi - currentKi) : profBonus

    kiItem.update({
        data: {
            uses: {
                value: currentKi + profBonusAdjusted
            }
        }
    })
        .then(() => {
            ChatMessage.create({
                user: game.user.id,
                speaker: ChatMessage.getSpeaker(),
                content: `Regained ${profBonusAdjusted} Ki.`
            })
        })
}

game.dnd5e.rollItemMacro("Breath of Nature")
    .then(increaseKi)
