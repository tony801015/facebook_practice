var login = require('facebook-chat-api');
var fs = require('fs');
var translation = require('./get-translation');

var account = {
    email: '',
    password: ''
};

login(account, function callback(err, api) {
    if (err) {
        _keyin();
    }

    api.setOptions({
        listenEvents: true
    });

    var stopListening = api.listen(function (err, event) {
        if (err) return console.error(err);

        switch (event.type) {
            case "message":
                if (event.body === '/stop') {
                    api.sendMessage("Goodbye...", event.threadID);
                    return stopListening();
                }

                api.markAsRead(event.threadID, function (err) {
                    if (err) console.log(err);
                });
                translation(event.body, function (error, message) {
                    api.sendMessage(message, event.threadID);
                });
                break;
            case "event":
                console.log(event);
                break;
        }
    });
});