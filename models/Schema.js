const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    user_id: { //This user.id is for the user who is creating this contact..(private user)
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, "Pleas add the contact name"],
    },
    email: {
        type: String,
        required: [true, " Please add the contact address"],
    },
    phone: {
        type: String,
        required: [true, "Please add the contact number"]
    },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Contact", contactSchema)