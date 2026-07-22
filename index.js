const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'osieds.aternos.me',
    port: 44278,
    username: 'CR7',
    version: '1.20.1'
  });

  bot.on('spawn', () => {
    console.log('CR7 joined the server successfully!');
    // حركة بسيطة كل فترة عشان أترنوس ما يعتبره خامل برضه
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000); // يقفز كل 30 ثانية
  });

  bot.on('error', (err) => console.log('Error:', err));

  // إعادة الاتصال تلقائياً إذا انقطع
  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 10 seconds...');
    setTimeout(createBot, 10000);
  });
}

createBot();
