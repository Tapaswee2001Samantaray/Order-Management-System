const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    customerType: {
        type: String,
        enum: ["regular", "gold", "platinum"],
        default: "regular",
        trim: true
    },
    orderCount: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Customer", customerSchema)