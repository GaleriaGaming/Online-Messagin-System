const ctrl = {};

const DMmessageSchema = require('../models/dmmessages');
const Users = require('../models/user');


ctrl.dm = async (req, res ) => {
    const messages = await DMmessageSchema.find({}).lean();
    res.render('messages/directmessages', { messages });
    const users = await Users.find({}).lean();
    res.render('messages/directmessages', { users });
    console.log(users.name)
};

ctrl.dmmessage = async (req, res) => {
    console.log(req.body)
    const {
        message
    } = req.body;
    const errors = [];

    if(!message) {
        res.redirect('/messages/dm');
        return;
    } else {
        const user = req.user.name;
        res.redirect('/messages/dm');
        const newDMMessage = new DMmessageSchema({
            user,
            message
        });
        await newDMMessage.save();
        console.log(newDMMessage);
    };
};

module.exports = ctrl;