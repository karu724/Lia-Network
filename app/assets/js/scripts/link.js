const discordbutton = document.getElementById('discord')
const riaweb = document.getElementById('RiaWeb')
const minepg = document.getElementById('minepg')
const youtube = document.getElementById('youtube')

discordbutton.onclick = () => {
    shell.openExternal('https://discord.gg/5crYqVB3Wz')
}

riaweb.onclick = () => {
    shell.openExternal('http://rianetwork.kr/')
}

minepg.onclick = () => {
    shell.openExternal('https://mine.page/server/rianetwork.mcsv.kr')
}

youtube.onclick = () => {
    shell.openExternal('https://www.youtube.com/channel/UCEH8WhuAJ3Bsmz_iNK8pLbQ')
}