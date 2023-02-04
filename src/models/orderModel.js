const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
    customerId: {
        type: ObjectId,
        ref: "Customer",
    },
    totalAmount: {
        type: Number
    },
    discountAmount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Order", orderSchema);