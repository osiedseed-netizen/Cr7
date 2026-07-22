const http = require('http');
const mineflayer = require('mineflayer');

// 1. سيرفر الـ HTTP مع ربط 0.0.0.0 ليتمكن Render من اكتشافه
const PORT = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('CR7 Minecraft Bot is Active!');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('Web server is running on port ' + PORT);
});

// 2. إعدادات بوت ماينكرافت
function createBot() {
  const bot = mineflayer.createBot({
    host: 'osieds.aternos.me',
    port: 36669, // تأكد إن هاد هو البورت الحالي من أترنوس
    username: 'CR7',
    version: '1.20.1'
  });

  bot.on('spawn', () => {
    console.log('CR7 joined the server successfully!');
    // قفز دوري لمنع الـ AFK kick
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
