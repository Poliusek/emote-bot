"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js = __importStar(require("discord.js"));
const dotenv = __importDefault(require("dotenv"));
dotenv.default.config();
const client = new discord_js.default.Client({
    intents: [
        discord_js.Intents.FLAGS.GUILDS,
        discord_js.Intents.FLAGS.GUILD_MESSAGES,
        discord_js.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        discord_js.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    ]
});
const chan = ['913137718215721013', '925138099443466320']; //What channels are beeing checked for messages
const sendchan = '925133609155846224'; //channel that message will be sent if clock option 2 is choosen
const rea = [`✅`, `❌`, `⏰`]; //emotes that will be checked for
const prroles = "924344783969857588"; //roles that can add reactions
client.on('ready', () => {
    console.log('Ready!');
});
client.on('messageCreate', (message) => {
    if (message.author.bot)
        return;
    if (message.content === ">upd")
        return;
    for (var i = 0; i < chan.length; i++) {
        if (message.channelId === chan[i]) {
            message.react('✅');
            message.react('❌');
            message.react('⏰');
        }
    }
});
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
    var _a;
    if (user.bot)
        return;
    if ((_a = reaction.message.member) === null || _a === void 0 ? void 0 : _a.roles.cache.has(prroles))
        for (var p = 0; p < rea.length; p++) {
            if (reaction.emoji.name === rea[p]) {
                for (var l = 0; l < chan.length; l++) {
                    if (reaction.message.channelId === chan[l]) {
                        reaction.message.reactions.removeAll();
                        reaction.message.react(reaction.emoji);
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
client.login(process.env.TOKEN);
