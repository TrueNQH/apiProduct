import homepageService from "../services/homepageService";


import request from "request";

require("dotenv").config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;


let getHomepage = (req, res) => {
    let fbPageId = process.env.PAGE_ID;
    return res.render("homepage.ejs",{
        fbPageId
    });
};

let getFacebookUserProfile = (req, res) => {
    return res.render("profile.ejs");
};
let getPrivacyPolicy = (req, res) => {
    return res.render("privacypolicy.ejs");
};

let setUpUserFacebookProfile = async (req, res) => {
    // Send the HTTP request to the Messenger Platform
    try{
        await homepageService.setUpMessengerPlatform(PAGE_ACCESS_TOKEN);
        return res.status(200).json({
            message: "OK"
        });
    }catch (e) {
        return res.status(500).json({
            "message": "Error from the node server"
        })
    }
};
let setupGetStart = (req,result) =>  {
    let request_body = {
        "get_started": {"payload": "GET_STARTED"},
             
    
      }
    
      // Send the HTTP request to the Messenger Platform
      request({
        "uri": `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
      }, (err, res, body) => {
        console.log(body)
        if (!err) {
          console.log('-----!--')
          result.send('setup success!')
        } else {
          console.error("setup false:" + err);
        }
      }); 
}


module.exports = {
    getHomepage: getHomepage,
    getFacebookUserProfile: getFacebookUserProfile,
    setUpUserFacebookProfile: setUpUserFacebookProfile,
    setupGetStart: setupGetStart,
    getPrivacyPolicy:getPrivacyPolicy
};