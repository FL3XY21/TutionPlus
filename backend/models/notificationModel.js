const mongoose = require("mongoose");

const notificationSchema =
new mongoose.Schema({

    userId: {

        type: mongoose.Schema.Types.ObjectId,
        required: true

    },

    message: {

        type: String,
        required: true

    },

    role: {

        type: String,
        enum: ["Student", "Teacher", "Admin"],
        required: true

    },

    read: {

        type: Boolean,
        default: false

    }

},
{ timestamps: true });

module.exports =
mongoose.model(
 "notification",
 notificationSchema
);