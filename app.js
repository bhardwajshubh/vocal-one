require('dotenv').config()
const {Client , MessageEmbed } = require('discord.js')

const client = new Client()

client.on('ready', () => {
    console.log("Bot ready")
})

client.on('message', message => {
    if( message.content.startsWith('!vocal') ) {
        const query = message.content.split(" ")
        if(query.length === 1){
            message.channel.send('Hii from vocal')
        } else if(query.length > 1) {
            if(query[1] === 'notify') {
                message.reply('cool, you will be notified');
            }

            if(query[1] === 'embed'){
                const embed = new MessageEmbed()
                    .setTitle('embedded')
                    .setColor(0xff0000)
                    .setDescription(`embedded by ${message.author}`)
                message.channel.send(embed);
            }
        }
    }

})

client.login(process.env.DISCORD_TOKEN)
