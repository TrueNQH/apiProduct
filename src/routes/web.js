import express from "express";
import homepageController from "../controllers/homepageController";
import payment from "../controllers/payment";
import chatBotController from "../controllers/chatBotController";
import chatBotService from "../services/chatBotService";
import openAiResponse from "../controllers/openAiResponse";
const Daycharacter = require("../controllers/dataCharacter")
const bodyParser = require('body-parser')
const app = express()
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


let router = express.Router();

let initWebRoutes = (app) => {
    router.post('/payment_handler', payment.webhookConfig)

    // test connect database and generate tarrot
   
    router.get("/setup", homepageController.setupGetStart);
    router.post("/query", openAiResponse.query);
    router.post("/daycharacter", Daycharacter.post);
    

    router.get("/privacypolicy", homepageController.getPrivacyPolicy);
    //
    router.get("/", homepageController.getHomepage);
    router.get("/webhook", chatBotController.getWebhook);
    router.post("/webhook", chatBotController.postWebhook);
    router.get("/profile", homepageController.getFacebookUserProfile);
    router.post("/set-up-user-fb-profile", homepageController.setUpUserFacebookProfile);
    router.get("/test",async (req, res) =>{
        let user = await chatBotService.getFacebookUsername(3350311028355090);
    });

    return app.use("/", router);
};

module.exports = initWebRoutes;