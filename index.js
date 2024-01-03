const TelegramBot = require('node-telegram-bot-api');
const { gameOptions, againOptions } = require('./options');


const token = '6579361165:AAH-qnPmWunYQ6iuY1W4vsaiAd-qxsCSM9U'

const bot = new TelegramBot(token, {polling: true});

const obj = {};

const startGame = async chatId => {
	await bot.sendMessage(
		chatId,
		"Kompyuter 0 dan 9 gacham son o'yladi, siz usha sonni toposhga xarakat qiling."
	);
	const randomNumber = Math.floor(Math.random() * 10);
	obj[chatId] = randomNumber;
	await bot.sendMessage(chatId, "Tog'ri sonni toping", gameOptions);
};



const boostrap = () => {
  
  bot.setMyCommands([
    {
      command:'/start',
      description:'you can update this bot using start command'
    },
    {
      command:'/info',
      description:"you can know how to help this bot"
    },
    {
			command: '/game',
			description: "O'yin o'ynash",
		},
  ])
  
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text
    
    if (text === '/start') {
     await bot.sendMessage(chatId, `Hello ${msg.from.first_name} Welcome  to aliev_orders_bot you can find all foods want!`);
     return
    }
  
    if (text === '/info') {
     await bot.sendMessage(chatId, 'this bot help you to find foods ')
     return 
    }

    if (text === '/game') {
			return startGame(chatId);
		}
  
  
  
  
    bot.sendMessage(chatId, 'sorry i don`t understand ')
  });


  bot.on('callback_query', msg => {
		const data = msg.data;
		const chatId = msg.message.chat.id;

		if (data === '/again') {
			return startGame(chatId);
		}

		if (data == obj[chatId]) {
			return bot.sendMessage(
				chatId,
				`Tabriklaymiz siz tog'ri javob berdingiz, kompyuter ${obj[chatId]} sonni tanlagan edi`
			);
		} else {
			return bot.sendMessage(
				chatId,
				`Siz notog'ri son tanladingiz tanlagan soningniz ${data}, kompyuter ${obj[chatId]} sonni tanlagan edi`,
				againOptions
			);
		}
	});


}


boostrap()
