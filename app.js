require('dotenv').config()
const { Client } = require('discord.js')

const client = new Client()

client.on('ready', () => {
  console.log('Bot ready')
})

client.on('message', message => {
  const lowerMessage = (message.content).toLowerCase()
  if (lowerMessage.startsWith('!vocal')) {
    const query = lowerMessage.split(' ')
    if (query.length === 1) {
      message.channel.send('Hii from vocal')
    } else if (query.length > 1) {
      if (query[1] === 'notify') {
        const role = message.guild.roles.cache.find(role => (role.name).toLowerCase() === 'notify')
        message.guild.member(message.author).roles.add(role)
        message.reply('cool, you will be notified')
      } else if (query[1] === 'dnd') {
        const role = message.guild.roles.cache.find(role => (role.name).toLowerCase() === 'notify')
        message.guild.member(message.author).roles.remove(role)
        message.reply('Whatever!, we\'ll not disturb you')
      }
    }
  }
})

client.on('voiceStateUpdate', (oldMember, newMember) => {
  if (!!(newMember.channel) && !!(oldMember.channel)) {
    return
  }
  if (newMember.channel) {
    const role = newMember.member.roles.cache.find(r => r.name.toLowerCase() === 'notify')
    const memberIds = role.members.reduce((object, current) => {
      if (current.id !== newMember.member.id) {
        object[current.id] = true
      }
      return object
    }, {})
    newMember.guild.members.cache.forEach(member => {
      if (memberIds[member.id]) {
        member.send(`${newMember.member.displayName} is here!`)
      }
    })
  }

  if (oldMember.channel) {
    const role = oldMember.member.roles.cache.find(r => r.name.toLowerCase() === 'notify')
    const memberIds = role.members.reduce((object, current) => {
      if (current.id !== oldMember.member.id) {
        object[current.id] = true
      }
      return object
    }, {})
    oldMember.guild.members.cache.forEach(member => {
      if (memberIds[member.id]) {
        member.send(`${newMember.member.displayName} left`)
      }
    })
  }
})

client.login(process.env.DISCORD_TOKEN)
