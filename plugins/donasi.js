let handler =  m => m.reply(`
╭─「 Donasi 」
│ • Dana: 0895415497664
│ • Pulsa: 0895415497664
╰────
`.trim()) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

export default handler
