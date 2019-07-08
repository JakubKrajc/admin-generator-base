var flashMessages = {};

flashMessages.data = null;

flashMessages.__init = function (req){
    if(flashMessages.data==null){
        flashMessages.data = req.session.fm;
        if(flashMessages.data==null){
            flashMessages.data = {
                messages: []
            }
            req.session.fm = flashMessages.data;
        }
    }
}

flashMessages.getAll = function (req) {
    flashMessages.__init(req);
    var messages = flashMessages.data.messages;
    flashMessages.data.messages = [];
    req.session.fm = flashMessages.data;
    return messages;
    
};
    
flashMessages.add = function (req, message) {
    flashMessages.__init(req);
    flashMessages.data.messages.push(message);
    req.session.fm = flashMessages.data;
};


module.exports = flashMessages;
