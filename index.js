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
  console.log('Attempting to connect CR7...');
  
  const bot = mineflayer.createBot({
    host: 'scarletibis.aternos.host',
    port: 36669,
    username: 'CR7',
    version: '1.20.1',
    checkTimeoutInterval: 60000,
    // خيارات إضافية لتخطي مشاكل شبك المودات
    brand: 'vanilla'
  });

  bot.on('spawn', () => {
    console.log('SUCCESS: CR7 joined the server successfully!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('kicked', (reason) => {
    console.log('Kicked from server:', JSON.stringify(reason));
  });

  bot.on('end', (reason) => {
    console.log('Connection ended. Reason:', reason);
    console.log('Reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('Bot Error details:', err);
  });
}

createBot();
