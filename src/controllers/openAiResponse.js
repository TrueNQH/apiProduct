const { Configuration, OpenAIApi } = require('openai');
require("dotenv").config();
const OPEN_AI_KEY = process.env.OPEN_AI_KEY;
import Data from "../controllers/crawlData";


const configuration = new Configuration({
    organization: "org-50zRhKVuFYDGNCfmCtMW3s87",
  apiKey: OPEN_AI_KEY ,
});

const openai = new OpenAIApi(configuration);
function getRandomElements(array, count) {
  const shuffledArray = [...array];
  
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  
  return shuffledArray.slice(0, count);
}
module.exports = {
    query: async (req, res) => {
        if(req.body=={}) {
          return   res.send({message: 'no data'})
        } else {
            let ask = req.body.ask;
            let randomElements = getRandomElements(Data, 3);
            let randomElementsString = randomElements.join(', ');
        
            const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              { role: 'user', content: `với câu hỏi: ${ask}? khi bóc được lá bài tarot ${randomElementsString} thì bạn sẽ trả lời như thế nào? giải thích thẳng vào vấn đề, câu trả lời của bạn chỉ mang tính tham khảo nên bạn hãy cho tôi câu trả lời` },
            ],
          });
        
          return res.json({
            message: "thành công!",
            response: response.data.choices[0].message.content
          }) ;
        }
        
        
    }
}