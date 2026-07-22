const http = require('http');
const mineflayer = require('mineflayer');

// إنشاء سيرفر HTTP بسيط لإبقاء الخدمة نشطة على Render
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('CR7 Minecraft Bot is Running 24/7!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
console.log('Web server listening on port ' + PORT);
});

// إعدادات بوت ماينكرافت
function createBot() {
  const bot = mineflayer.createBot({
    host: 'osieds.aternos.me',
    port: 36669,
    username: 'CR7',
    version: '1.20.1'
  });

  bot.on('spawn', () => {
    console.log('CR7 joined the server successfully!');
    // القفز بشكل دوري لمنع الـ AFK kick
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('Bot disconnected, reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('Error encountered:', err);
  });
}

createBot();
