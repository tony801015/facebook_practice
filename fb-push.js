var login = require('facebook-chat-api');
var fs = require('fs');

var account = {
    email: '',
    password: ''
};
var subscription = [''];

//login the first way
login(account, function (err, api) {
    if (err) return console.error(err);
    // Used first login,write file the appstate.json. It is login cookie.
    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
    // _api(api);
})

//login the second way used login cookie 
// login({
//     appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))
// }, function callback(err, api) {
//     if (err) console.error(err);
//     _api(api);
// });

//use facebook-bot-api getUserID
// login(account, function callback(err, api) {
//     if (err) console.error(err);
//     //The way is so cool,input facebook name or facebook email(first open eamil),output getUserID
//     api.getUserID("Jia-Wun Luo", function (err, data) {
//         if (err) return callback(err);

//         // Send the message to the best match (best by Facebook's criteria)
//         var threadID = data[0].userID;
//         console.log(threadID);
//         // api.sendMessage('msg', threadID);
//     });
// });

function _api(api) {
    //api.getUserInfo can send message to many people.
    //Before you want to used getUsrInfo, must get user's facebook id.(reference:fb-getId.js)
    api.getUserInfo(subscription, function callback(err, ret) {
        if (err) return console.error(err);

        for (var prop in ret) {
            api.sendMessage('messages', prop);
        }

    })
};