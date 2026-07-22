const http = require('http');
const mineflayer = require('mineflayer');

const PORT = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('CR7 Minecraft Bot is Active!');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('Web server is running on port ' + PORT);
});

function createBot() {
  const bot = mineflayer.createBot({
    host: 'osieds.aternos.me',
    port: 36669,
    username: 'CR7',
    version: '1.20.1'
  });

  bot.on('spawn', () => {
    console.log('CR7 joined the server successfully!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('Disconnected. Reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('Bot Error:', err);
  });
}

createBot();
