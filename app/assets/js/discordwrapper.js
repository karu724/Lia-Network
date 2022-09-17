// Work in progress
const logger = require('./loggerutil')('%c[DiscordWrapper]', 'color: #7289da; font-weight: bold')

const {Client} = require('discord-rpc-patch')

let client
let activity

exports.initRPC = function(genSettings, servSettings, initialDetails = '클라이언트 대기중..'){
    client = new Client({ transport: 'ipc' })

    activity = {
        details: initialDetails,
        state: '누 온라인 플레이중',
        largeImageKey: 'icon',
        largeImageText: '누 온라인',
        // smallImageKey: genSettings.smallImageKey,
        // smallImageText: genSettings.smallImageText,
        startTimestamp: new Date().getTime(),
        instance: false
    }

    client.on('ready', () => {
        logger.log('Discord RPC Connected')
        client.setActivity(activity)
    })
    
    client.login({clientId: "1020606249747890177"}).catch(error => {
        if(error.message.includes('ENOENT')) {
            logger.log('Unable to initialize Discord Rich Presence, no client detected.')
        } else {
            logger.log('Unable to initialize Discord Rich Presence: ' + error.message, error)
        }
    })
}

exports.updateDetails = function(details){
    activity.details = details
    client.setActivity(activity)
}

exports.shutdownRPC = function(){
    if(!client) return
    client.clearActivity()
    client.destroy()
    client = null
    activity = null
}