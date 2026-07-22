const http = require('http');
const mineflayer = require('mineflayer');

const PORT = process.env.PORT || 10000;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('CR7 Bot is running!');
}).listen(PORT, '0.0.0.0', () => {
  console.log(`[Web Server] Running on port ${PORT}`);
});

function startBot() {
  console.log('[Bot] Connecting using Dyn address...');

  const bot = mineflayer.createBot({
    host: 'cod.aternos.host',
    port: 36669,
    username: 'CR7',
    version: '1.20.1',
    auth: 'offline',
    checkTimeoutInterval: 90000
  });

  bot.on('login', () => {
    console.log('[Bot] Logged in successfully!');
  });

  bot.on('spawn', () => {
    console.log('>>> SUCCESS: CR7 IS IN THE SERVER! <<<');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 20000);
  });

  bot.on('kicked', (reason) => console.log('[Bot] Kicked:', reason));
  bot.on('error', (err) => console.log('[Bot] Error:', err));
  bot.on('end', (reason) => {
    console.log('[Bot] Connection ended:', reason);
    console.log('[Bot] Reconnecting in 5 seconds...');
    setTimeout(startBot, 5000);
  });
}

startBot();
