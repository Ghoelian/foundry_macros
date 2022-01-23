let dialogue = new Dialog({
    title: `Dice rolls to check`,
    content: `<p>Enter the type of dice to check: <input type="number" id="diceFacesToCheck" value="20"></p>`,
    buttons: {
        one: {
            icon: '',
            label: 'Submit',
            callback: () => {
                const diceToCheck = parseInt($('#diceFacesToCheck').val()) ?? 20
                const chatLog = game.messages.entries
                let rolls = 0
                let total = 0

                for (let i = 0; i < chatLog.length; i++) {
                    const entry = chatLog[i]
                    const data = entry.data

                    if (data.roll !== undefined) {
                        const roll = JSON.parse(data.roll)
                        let entryTotal = 0

                        if (typeof roll.terms === 'object') {
                            for (let j = 0; j < roll.terms.length; j++) {
                                if (typeof roll.terms[j] === 'object' && roll.terms[j].faces === diceToCheck) {
                                    if (Number.isInteger(roll.terms[j].results[0].result)) {
                                        entryTotal += roll.terms[j].results[0].result
                                        rolls++
                                    }
                                }
                            }

                            total += entryTotal
                        }
                    }
                }

                const average = rolls > 0 ? Math.round(((total / rolls) + Number.EPSILON) * 100) / 100 : 0

                let dialogue = new Dialog({
                    title: `Average d${diceToCheck} rolls`,
                    content: `<p>Amount of d${diceToCheck}'s checked: ${rolls}</p><p>Average result: ${average}</p>`,
                    buttons: {
                        one: {
                            icon: '',
                            label: 'Close'
                        }
                    }
                })

                dialogue.render(true)
            }
        }
    }
})

dialogue.render(true)
