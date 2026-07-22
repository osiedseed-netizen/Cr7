const http = require('http');
const mineflayer = require('mineflayer');
const { statusJava } = require('node-mcstatus');

const PORT = process.env.PORT || 10000;
const ATERNOS_SERVER = 'osieds.aternos.me';

// سيرفر ويب بسيط لإبقاء Render شغال
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('CR7 Bot Status: ACTIVE');
}).listen(PORT, '0.0.0.0', () => {
  console.log(`[Web Server] Running on port ${PORT}`);
});

async function startBot() {
  console.log(`[Bot] Fetching current live status for ${ATERNOS_SERVER}...`);

  try {
    // جلب البورت والـ IP الحقيقيين المباشرين للسيرفر تلقائياً
    const result = await statusJava(ATERNOS_SERVER);

    if (!result.online) {
      console.log('[Bot] Server is currently OFFLINE on Aternos. Retrying in 15 seconds...');
      setTimeout(startBot, 15000);
      return;
    }

    const host = result.ip;
    const port = result.port;

    console.log(`[Bot] Found active server at ${host}:${port}! Connecting...`);

    const bot = mineflayer.createBot({
      host: host,
      port: port,
      username: 'CR7',
      version: '1.20.1',
      auth: 'offline',
      checkTimeoutInterval: 60000
    });

    bot.on('login', () => {
      console.log('[Bot] Logged in successfully!');
    });

    bot.on('spawn', () => {
      console.log('====================================');
      console.log('>>> SUCCESS: CR7 IS IN THE SERVER! <<<');
      console.log('====================================');

      // حركة الحركة التلقائية لتفادي الـ AFK
      setInterval(() => {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
      }, 20000);
    });

    bot.on('kicked', (reason) => console.log('[Bot] Kicked:', JSON.stringify(reason)));
    bot.on('error', (err) => console.log('[Bot] Error:', err.message || err));
    bot.on('end', (reason) => {
      console.log('[Bot] Connection ended:', reason);
      console.log('[Bot] Reconnecting in 10 seconds...');
      setTimeout(startBot, 10000);
    });

  } catch (error) {
    console.log('[Bot] Failed to resolve server status:', error.message);
    setTimeout(startBot, 10000);
  }
}

startBot();
