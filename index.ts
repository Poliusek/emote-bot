import DiscordJS, { Intents, TextChannel } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
    ]
})

const chan = ['913137718215721013','925138099443466320'] //What channels are beeing checked
const sendchan = '925133609155846224' //channel that message will be sent if clock option 2 is choosen
const rea = [`✅`,`❌`,`⏰`] //emotes that will be checked
const prroles = "924344783969857588"

client.on('ready', ()=> {
    console.log('Ready!')
})

client.on('messageCreate', (message) => {
    if(message.author.bot) return;
    if(message.content === ">upd") return;
    for(var i = 0; i<chan.length; i++){
        if(message.channelId === chan[i]) 
        {
            message.react('✅')
            message.react('❌')
            message.react('⏰')  
        }  
    }
})

/*
    client.on('messageCreate', (message) => {
    var ms = 'Here are messages that were marked as "Check in the next update": \n\n'
    if(message.content === ">upd"){
        message.channel.messages.fetch().then(messages => {
            messages.forEach(message => 
                {
                    if(message.reactions.cache.get(`⏰`) && message.reactions.cache.get(`✅`)?.count != 0 && message.reactions.cache.get(`❌`)?.count != 0)
                    {
                        ms = ms+"<"+(message.reactions.cache.get(`⏰`)?.message.url)+">"+"\n\n"
                    }
                })
            message.channel.send(ms)
        })
    }
})
*/

client.on("messageReactionAdd", (reaction, user) => {
    
    if(user.bot) return;
    if(reaction.message.member?.roles.cache.has(prroles))
    for(var p = 0; p<rea.length; p++)
    {
        if(reaction.emoji.name === rea[p])
        {
            for(var l = 0; l<chan.length; l++)
            {
                if(reaction.message.channelId === chan[l])
                {
                    reaction.message.reactions.removeAll()
                    reaction.message.react(reaction.emoji) 
                }
            }
        }
    }

/*    if(reaction.message.reactions.cache.get(`⏰`) && reaction.message.reactions.cache.get(`⏰`)?.count > 1)
    {
        let cont = reaction.message.content
        const sc = (client.channels.cache.get(sendchan) as TextChannel ).send(cont)
    }*/
    
});

client.login(process.env.TOKEN)
