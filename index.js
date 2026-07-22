const http = require('http');
const mineflayer = require('mineflayer');

const PORT = process.env.PORT || 10000;

// سيرفر الويب لإبقاء Render شغال 24/7
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('CR7 Bot Status: ACTIVE');
}).listen(PORT, '0.0.0.0', () => {
  console.log(`[Web Server] Running on port ${PORT}`);
});

function startBot() {
  console.log('[Bot] Connecting to thestreamer.aternos.host:44278...');

  const bot = mineflayer.createBot({
    host: 'thestreamer.aternos.host',
    port: 44278,
    username: 'CR7',
    auth: 'offline', // لدخول الحسابات المكركة
    checkTimeoutInterval: 60000
  });

  bot.on('login', () => {
    console.log('[Bot] Logged in successfully!');
  });

  bot.on('spawn', () => {
    console.log('====================================');
    console.log('>>> SUCCESS: CR7 IS IN THE SERVER! <<<');
    console.log('====================================');

    // قفز دوري كل 20 ثانية لمنع طرد الـ AFK
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 20000);
  });

  bot.on('kicked', (reason) => console.log('[Bot] Kicked:', JSON.stringify(reason)));
  bot.on('error', (err) => console.log('[Bot] Error:', err.message || err));
  bot.on('end', (reason) => {
    console.log('[Bot] Connection ended:', reason);
    console.log('[Bot] Reconnecting in 5 seconds...');
    setTimeout(startBot, 5000);
  });
}

startBot();
