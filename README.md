# Discord Bot for Google classroom
This is a simple discord bot that will fetch Google classroom's Google Meet links and send them to discord.<br> 
currently it saves used links and channel and guild ids in plain text. sqlite? maybe later. idk.


## installation
requirements - `nodejs` and `npm` 

set these enviornment variables by making `.env` file in the root directory

- `GOOGLE_EMAIL` -  your google email address 
- `GOOGLE_PASSWORD` - your google account password
- `DISCORD_KEY` - the discord token from the bot page of the discord developer portal
- `CLASSROOM_URL` - URL of the classroom you want to scrap the links from. 


and install the dependencies
```bash
npm i
```

## Usage

```bash
npm start
```

And add the bot to a discord server using appropriate persmissons like...
- mentioning everyone
- read messages
- send messages
- Manage messages (maybe for the da future idk)

use the fist bot command to setup the discord bot to send google meet links to a specific channel.

## Bot commands
- `!link-setup` - run this in a discord channel while the bot is active to configure the bot to send the classroom notifications to.
- `!link` - fetch the current link in google classroom


## License
MIT <br>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
