const http = require('http');
const mineflayer = require('mineflayer');

const PORT = process.env.PORT || 10000;

// سيرفر الويب لإبقاء Render شغال
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('CR7 Bot is running!');
}).listen(PORT, '0.0.0.0', () => {
  console.log(`[Web Server] Running on port ${PORT}`);
});

function startBot() {
  console.log('[Bot] Starting connection attempt...');

  const bot = mineflayer.createBot({
    host: 'scarletibis.aternos.host', // أو osieds-lfk5.aternos.me
    port: 36669,                      // تأكد من رقم البورت الحالي
    username: 'CR7',
    version: '1.20.1',
    checkTimeoutInterval: 60000
  });

  bot.on('login', () => {
    console.log('[Bot] Logged in successfully! Joining world...');
  });

  bot.on('spawn', () => {
    console.log('[Bot] CR7 is now inside the server!');
    // قفز دوري لمنع الـ AFK kick
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 20000);
  });

  bot.on('kicked', (reason) => {
    console.log('[Bot] Kicked:', reason);
  });

  bot.on('error', (err) => {
    console.log('[Bot] Error:', err.message || err);
  });

  bot.on('end', (reason) => {
    console.log('[Bot] Connection ended:', reason);
    console.log('[Bot] Reconnecting in 10 seconds...');
    setTimeout(startBot, 10000);
  });
}

startBot();
