
import request from "request";
import Data from "../controllers/crawlData";

require("dotenv").config();
const { Configuration, OpenAIApi } = require('openai');
const OPEN_AI_KEY = process.env.OPEN_AI_KEY;

const configuration = new Configuration({
    organization: "org-50zRhKVuFYDGNCfmCtMW3s87",
  apiKey: OPEN_AI_KEY ,
});

const openai = new OpenAIApi(configuration);

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;





let getFacebookUsername = (sender_psid) => {
    return new Promise((resolve, reject) => {
        // Send the HTTP request to the Messenger Platform
        let uri = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`;
        request({
            "uri": uri,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                //convert string to json object
                body = JSON.parse(body);
                let username = `${body.last_name} ${body.first_name}`;
                resolve(username);
            } else {
                reject("Unable to send message:" + err);
            }
        });
    });
};

let sendResponseWelcomeNewCustomer = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response_first = { "text": `Yo cả nhà GenZ cuồng chiêm tinh! Đã bao giờ bạn tự hỏi, nếu chúng ta có thể đoán trước tương lai như là việc đoán xem ai sẽ reply tin nhắn trước, liệu cuộc sống có dễ dàng hơn không? 🌌🔮 \n \n Well, đừng lo, vì chúng tôi ở đây để "predict" những vibes tương lai của bạn bằng cách đảo bài Tarot cùng mấy "code" bí mật từ dải mây đen. Nếu bạn muốn biết liệu có nên order thêm pizza hay tiết kiệm tiền để mua vé concert của idol, thì đừng ngần ngại "tap" ngay vào nút "Xem Chiêm Tinh"! 🍕🎶 \nRemember, đời không phải lúc nào cũng clear và easy như việc scroll mạng xã hội, nhưng ít nhất bạn sẽ có thêm một lý do để cười "LOL" và nói: "Ờ, chiêm tinh cũng hay phết đấy chứ!" 😄🌟` };
            let response_second = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "Tiênn tri zô triii",
                                "subtitle": "Ở đây có xem chiêm tinh cho bạn nèe",
                                "image_url": "https://res.cloudinary.com/dt0kv3yml/image/upload/v1692518329/85c41de6078dc52c30666a7b9aeea7d5_xp0mag.gif",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHIEM TINH",
                                        "payload": "MAIN_MENU",
                                    },
                                    
                                    {
                                        "type": "postback",
                                        "title": "XEM CÁCH SỬ DỤNG",
                                        "payload": "GUIDE_BOT",
                                    }
                                ],
                            } ]
                    }
                }
            };

            //send a welcome message
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response_first);

            //send a image with button view main menu
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response_second);

            resolve("done!")
        } catch (e) {
            reject(e);
        }

    });
};

let sendMainMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "XEM TỔNG QUAN THÁNG TỚI",
                                "subtitle": "NHẤN CHỌN CÁC GÓI NHÉ BẠN IUU 😘",
                                "image_url": "https://res.cloudinary.com/dt0kv3yml/image/upload/v1692521421/45ca6a71f7530d8c8fbe82b614b893e0_y2islb.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM",
                                        "payload": "XEM",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "QUAY LẠI",
                                        "payload": "RESTART",
                                    },
                                    
                                ],
                            },

                            {
                                "title": "CHUYỆN TÌNH CẢM CỦA BẠN SẮP TỚI SẼ NHƯ THẾ NÀO?",
                                "subtitle": "XEM CHUYỆN TÌNH CẢM CỦA BẠN, NGƯỜI ẤY SUY NGHĨ GÌ VỀ BẠN? \n KHI NÀO THÌ 2 BẠN GẶP NHAU?",
                                "image_url": " https://res.cloudinary.com/dt0kv3yml/image/upload/v1692521421/7d42cfdf2ea9fc63802ccea90aae732c_rahexl.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM",
                                        "payload": "XEM",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "QUAY LẠI",
                                        "payload": "RESTART",
                                    }
                                ],
                            },

                            {
                                "title": "CÔNG VIỆC",
                                "subtitle": "cÔNG VIỆC CỦA BẠN NĂM NAY NHƯ THẾ NÀO? ",
                                "image_url": " https://res.cloudinary.com/dt0kv3yml/image/upload/v1692521419/b60c7dbb493bdb3392776e3af55de661_uigdfe.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM",
                                        "payload": "XEM",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "QUAY LẠI",
                                        "payload": "RESTART",
                                    }
                                ],
                            }


                        ]
                    }
                }
            };
            
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });

};
function getRandomElements(array, count) {
    const shuffledArray = [...array];
    
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    
    return shuffledArray.slice(0, count);
  }
let generateResponse = (messages,sender_psid) => {
    return new Promise(async (resolve, reject) => {
        let randomElements = getRandomElements(Data, 3);
        let randomElementsString = randomElements.join(', ');
        try {
            const response = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo-16k',
                messages: [
                  { role: 'system', content: 'You are a helpful assistant.' },
                  { role: 'user', content: `với câu hỏi: ${messages}? khi bóc được lá bài tarot ${randomElementsString} thì bạn sẽ trả lời như thế nào? giải thích thẳng vào vấn đề, câu trả lời của bạn như 1 chuyên gia không cần nêu ưu điểm của tarot ` },
                ],
              });
            
            
            

              let mes1 = {text: response.data.choices[0].message.content}
            
              await sleep(2000)
              console.log("đã hêt slepp");
              await sendMessage(sender_psid, mes1);
            resolve("done");

            
        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.log("Too many requests, waiting and retrying...");
                await sleep(5000); // Đợi một khoảng thời gian
                return generateResponse(messages, sender_psid); // Thử lại gọi hàm
            } else {
                console.error("Error:", error);
                throw error; // Xử lý lỗi khác
            }
        }
    });
    
  
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let sendLunchMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "Appetizers",
                                "image_url": "https://bit.ly/imageAppetizer",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "SHOW APPETIZERS",
                                        "payload": "SHOW_APPETIZERS",
                                    }
                                ],
                            },

                            {
                                "title": "Entree Salad",
                                "image_url": "https://bit.ly/imageSalad",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "SHOW ENTREE SALAD",
                                        "payload": "SHOW_ENTREE_SALAD",
                                    }
                                ],
                            },

                            {
                                "title": "Fish and Shell Fish",
                                "image_url": "https://bit.ly/imageFish",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "SHOW FISH",
                                        "payload": "SHOW_FISH",
                                    }
                                ],
                            },

                            {
                                "title": "Skeens Classics",
                                "subtitle": "and Dry-aged on Premise",
                                "image_url": "https://bit.ly/imageClassics",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "SHOW CLASSICS",
                                        "payload": "SHOW_CLASSICS",
                                    }
                                ],
                            },

                            {
                                "title": "Go back",
                                "image_url": " https://bit.ly/imageToSend",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "BACK TO MAIN MENU",
                                        "payload": "BACK_TO_MAIN_MENU",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "RESERVE A TABLE",
                                        "payload": "RESERVE_TABLE",
                                    }
                                ],
                            }
                        ]
                    }
                }
            };
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};



let seenTarot = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getFacebookUsername(sender_psid);
            let response = { text: `Mời ${username} đặt câu hỏi theo dạng /ask\n Ví dụ: /ask tôi và người yêu tương lại gặp nhau trong hoàn cảnh nào?` };
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response);
        } catch (e) {
            reject(e);
        }
    });
};
let sendMessageShare = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getFacebookUsername(sender_psid);
            let response = { text: `Cảm ơn ${username} đã tin tưởng và sử dụng dịch vụ, hãy share để mọi người cùng nhận thông điệp nèoo: \n http://m.me/61550499343479` };
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response);
        } catch (e) {
            reject(e);
        }
    });
};

let handleReserveTable = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getFacebookUsername(sender_psid);
            let response = { text: `Hi ${username}, What time and date you would like to reserve a table ?` };
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response);
        } catch (e) {
            reject(e);
        }
    });
};


let sendTypingOn = (sender_psid) => {
    return new Promise ((resolve, reject) => {
       try{
           let request_body = {
               "recipient": {
                   "id": sender_psid
               },
               "sender_action":"typing_on"
           };

           // Send the HTTP request to the Messenger Platform
           request({
               "uri": "https://graph.facebook.com/v17.0/me/messages",
               "qs": { "access_token": PAGE_ACCESS_TOKEN },
               "method": "POST",
               "json": request_body
           }, (err, res, body) => {
               if (!err) {
                   resolve('done!')
               } else {
                   reject("Unable to send message:" + err);
               }
           });
       } catch (e) {
           reject(e);
       }
    });
};

let markMessageSeen = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "sender_action":"mark_seen"
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v17.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve('done!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        }catch (e) {
          reject(e);
        }
    });
};
let sendMessage = (sender_psid, response) => {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "message": response,
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v17.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                console.log(res)
                console.log(body)
                if (!err) {
                    console.log("message sent!");
                    resolve('done!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};


let sendMessageDefaultForTheBot = (sender_psid) => {
    return new Promise (async (resolve, reject) => {
        try{
            let response1 = {
                "text": 'Vui lòng thao tác với cá nút nhấn!!!'
            };
            //send a media template
            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "Our menus",
                                "subtitle": "Nhận thông điệp từ vụ trụ",
                                "image_url": "https://res.cloudinary.com/dt0kv3yml/image/upload/v1692518329/85c41de6078dc52c30666a7b9aeea7d5_xp0mag.gif",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHIÊM TINH",
                                        "payload": "MAIN_MENU",
                                    },
                                    
                                ],
                            },

                            
                           


                        ]
                    }
                }
            };
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response2);
            resolve("done");
        }catch (e) {
            reject(e);
        }
    });
};
let sendMessageThanks = (sender_psid) => {
    return new Promise (async (resolve, reject) => {
        try{
            
            //send a media template
            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "Nếu những điều trên giúp ích cho bạn thì hãy cho mình xin feedback hoặc share cho bạn bè cùng trải nghiệm nhóo 😚",
                                "subtitle": "FeedBack & Share 😚",
                                "image_url": "https://res.cloudinary.com/dt0kv3yml/image/upload/w_300,h_170/v1693125571/80729aaa92b285f6f247f487ad5eb0ab_f4ml8k.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "FEEDBACK",
                                        "payload": "FEEDBACK",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "SHARE",
                                        "payload": "SHARE",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "QUAY LẠI",
                                        "payload": "MAIN_MENU",
                                    }
                                    
                                ],
                            },

                            
                           


                        ]
                    }
                }
            };
            
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response2);
            resolve("done");
        }catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    sendMessageDefaultForTheBot: sendMessageDefaultForTheBot,
    getFacebookUsername: getFacebookUsername,
    sendResponseWelcomeNewCustomer: sendResponseWelcomeNewCustomer,
    sendMainMenu: sendMainMenu,
    sendLunchMenu: sendLunchMenu,
    seenTarot: seenTarot,
    handleReserveTable: handleReserveTable,
    generateResponse:generateResponse,
    markMessageSeen: markMessageSeen,
    sendTypingOn: sendTypingOn,
    sendMessage: sendMessage,
    sendMessageShare:sendMessageShare,
    sendMessageThanks:sendMessageThanks
 
};