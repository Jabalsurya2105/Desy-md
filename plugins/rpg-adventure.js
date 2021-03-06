const cooldown = 300000
let handler = async (m, { usedPrefix }) => {
    let user = global.db.data.users[m.sender]
    let timers = (cooldown - (new Date - user.lastadventure))
    if (user.health < 80) return m.reply(`
ššš¦šš«š„š®š¤šš§ š”ššš„š­š”ā¤ļø šš¢šš­šš¬ šš
šš¢š„šš”š¤šš§ ššš„š¢ š©šØš­š¢šØš§ š®š§š­š®š¤ š¦šš«šš šš§šš«šš¬š¢ š”ššš„š­š”š ššØš§š­šØš”: *${usedPrefix}buy potion 2*,
ššš§ š¤šš­š¢š¤ *${usedPrefix}heal 2* š®š§š­š®š¤ š¦šš§š š š®š§šš¤šš§ š©šØš­š¢šØš§
`.trim())
    if (new Date - user.lastadventure <= cooldown) return m.reply(`
ššš¦š® ššš«š® š¬šš£š ššš«š©šš­š®šš„šš§š , š¦šØš”šØš§ š­š®š§š š š® *š${timers.toTimeString()}*
`.trim())
    const rewards = reward(user)
    let text = 'ā­āāāāāāāāāāāāā āŪŖŪŖą½“ą½»āø\nā ššš¦š® š¬š®ššš” ššš«š©šš«š­š®šš„šš§š  ššš§ š¤šš”š¢š„šš§š šš§'
    for (const lost in rewards.lost) if (user[lost]) {
        const total = rewards.lost[lost].getRandom()
        user[lost] -= total * 1
        if (total) text += `\nā ${global.rpg.emoticon(lost)}: ${total}\nā°ā¬āāāāāāāāāāāāā ā³¹`
    }
    text += '\nāā¤ā¦ā ššš¦š® š¦šš§ššš©šš­š¤šš§'
    for (const rewardItem in rewards.reward) if (rewardItem in user) {
        const total = rewards.reward[rewardItem].getRandom()
        user[rewardItem] += total * 1
        if (total) text += `\nāāā¦ā ${global.rpg.emoticon(rewardItem)}: ${total}`                  
    }
    text += `\nāā°āāāāāāāāāāāāā ā³¹\nā šš„šØš®šššØš­-šš \nā°āāāāāāāāāāāāā āŪŖŪŖą½“ą½»āø`
    const poid = 'https://i.ibb.co/64mn29X/images-3.jpg'
    conn.sendHydrated(m.chat, 'š°š³šš“š½šššš“', text.trim(), poid, 'https://github.com/itsmedell', 'šš¢š­š”š®š', null, null, [
      ['ššØš§šš­š', '/donasi'],
      ['šš§šÆšš§š­šØš«š²', '/inv'],
      ['šš«ššš­šØš«', '/owner']
    ], m)
    user.lastadventure = new Date * 1
}
handler.help = ['adventure', 'petualang', 'berpetualang', 'mulung']
handler.tags = ['rpg']
handler.command = /^(adventure|(ber)?petualang(ang)?|mulung)$/i

handler.cooldown = cooldown
handler.disabled = false

export default handler

function reward(user = {}) {
    let rewards = {
        reward: {
            money: 2001,
            exp: 509,
            trash: 101,
            potion: 2,
            rock: 2,
            wood: 2,
            string: 2,
            common: 2 * (user.dog && (user.dog > 2 ? 2 : user.dog) * 1.2 || 1),
            uncommon: [0, 0, 0, 1, 0].concat(
                new Array(5 - (
                    (user.dog > 2 && user.dog < 6 && user.dog) || (user.dog > 5 && 5) || 2
                )).fill(0)
            ),
            mythic: [0, 0, 0, 0, 0, 1, 0, 0, 0].concat(
                new Array(8 - (
                    (user.dog > 5 && user.dog < 8 && user.dog) || (user.dog > 7 && 8) || 3
                )).fill(0)
            ),
            legendary: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0].concat(
                new Array(10 - (
                    (user.dog > 8 && user.dog) || 4
                )).fill(0)
            ),
            iron: [0, 0, 0, 1, 0, 0],
            gold: [0, 0, 0, 0, 0, 1, 0],
            diamond: [0, 0, 0, 0, 0, 0, 1, 0].concat(
                new Array(5 - (
                    (user.fox < 6 && user.fox) || (user.fox > 5 && 5) || 0
                )).fill(0)
            ),
        },
        lost: {
            health: 101 - user.cat * 4,
            armordurability: (15 - user.armor) * 7
        }
    }
    return rewards
}
