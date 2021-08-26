const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const LINKS_FILE_PATH = './links.txt';
const CHANNELS_FILE_PATH = './channels.txt';
const GUILD_FILE_PATH = './guilds.txt';

require("dotenv").config();

let links = [];
let isBotStarting = true;
let meetlink;
let channels = [];
let guilds = [];

if (!fs.existsSync(LINKS_FILE_PATH)) {
    fs.writeFileSync(LINKS_FILE_PATH, "huh");
    let data = fs.readFileSync(LINKS_FILE_PATH,"utf8");
    links = data.split("\n");
}else{
    let data  = fs.readFileSync(LINKS_FILE_PATH,"utf8");
    links = data.split("\n");
}

if (!fs.existsSync(CHANNELS_FILE_PATH)) {
    fs.writeFileSync(CHANNELS_FILE_PATH, "867044976835027280");
    let data = fs.readFileSync(CHANNELS_FILE_PATH,"utf8");
    channels = data.split("\n");
}else{
    let data  = fs.readFileSync(CHANNELS_FILE_PATH,"utf8");
    channels = data.split("\n");
}

if (!fs.existsSync(GUILD_FILE_PATH)) {
    fs.writeFileSync(GUILD_FILE_PATH, "967044976835027280");
    let data = fs.readFileSync(GUILD_FILE_PATH,"utf8");
    guilds = data.split("\n");
}else{
    let data  = fs.readFileSync(GUILD_FILE_PATH,"utf8");
    guilds = data.split("\n");
}

client.on('ready', () => {
	console.log(`${client.user.tag} is active.`);
    openClassroom();
});

client.on('message', message => {
  // If the message is "ping"
    if (message.content === '!link') {
        if(!isBotStarting){
            if(meetlink && !links.includes(meetlink)){
                let meetstr = `what the current one is. or i think so. idk. take this and move on. \n ${meetlink} `
                message.reply(meetstr);
            }else{
                message.reply("No meet link right now.   :)");
            }
        } else {
            message.reply("Sorry, in a minute.\n the bot is only starting.");
        }
    }
    if (message.content === '!link-setup') {
        if(message.guild === null){
            message.reply("Sir, this is a Wendys. u cant do that in here." );
            return;
        }
        if(!guilds.includes(message.guild.id)){
            if(!channels.includes(message.channel.id)){
                channels.push(message.channel.id)
                fs.writeFileSync(CHANNELS_FILE_PATH, channels.join("\n"));
                message.reply("This channel will be used for showing meet links\nfor this entire server tho");
                guilds.push(message.guild.id);
                fs.writeFileSync(GUILD_FILE_PATH, guilds.join("\n"));
            }
        } else{
            message.reply("This server already has one channel already setup to send meet links at.");
        }
    }
});

async function sendToChannels(meetstr){
    channels.forEach(channelid => {
        const channel = client.channels.cache.get(channelid);
        if(channel){
            channel.send(meetstr);     
        }
    });
}
function log(msg){
    let d = new Date();
    let h = `${d.getHours()}`.padStart(2, '0')
    let m = `${d.getMinutes()}`.padStart(2, '0')
    let s = `${d.getSeconds()}`.padStart(2, '0')
    console.log(`[${h}:${m}:${s}] ${msg}`); 

}
async function scrapAndSend(page){

    await page.goto(process.env.CLASSROOM_URL)

    log(`CLASSROOM_RELOAD`);

    await page.waitForFunction(
      'document.querySelector("body").innerText.includes("THIRD SEMESTER")'
    );
    const hrefs = await page.$$eval('a', as => as.map(a => a.href));

    meetlink = (hrefs.filter(val => val.includes("meet")))[0];

    isBotStarting = false;

    if(meetlink){
        meetlink = meetlink.split("?")[0];
    }
    if(meetlink && !links.includes(meetlink)){
        log(`MEET_LINK: ${meetlink}`);
        let meetstr = `@everyone \n A new meet link is out - \n ${meetlink} `

        sendToChannels(meetstr);
        
        links.push(meetlink)
        fs.writeFileSync(LINKS_FILE_PATH, links.join("\n"));
    }

}



function openClassroom(){

puppeteer.launch({ headless: true }).then(async browser => {

    const page = await browser.newPage()

    const navigationPromise = page.waitForNavigation()

    await page.goto('https://accounts.google.com/')

    await navigationPromise

    await page.waitForSelector('input[type="email"]')
    await page.click('input[type="email"]')

    await navigationPromise

    await page.type('input[type="email"]', process.env.GOOGLE_EMAIL, { delay: 200 });

    await page.waitForSelector('#identifierNext')
    await page.click('#identifierNext')
    log("EMAIL STEP DONE");
    await page.waitFor(500);

    await page.waitForSelector('input[type="password"]')
    await page.click('input[type="email"]')
    await page.waitFor(3000);

    await page.type('input[type="password"]', process.env.GOOGLE_PASSWORD, { delay: 500 });

    await page.waitForSelector('#passwordNext')
    await page.click('#passwordNext')

    log("PASSWORD STEP DONE");

    await page.waitForNavigation({
            waitUntil: ["networkidle0", "domcontentloaded"]
    });

    await scrapAndSend(page);

    setInterval(async() => {
        await scrapAndSend(page);
    },15000);

});

}



client.login(process.env.DISCORD_KEY);
