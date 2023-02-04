const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const discountSchema = new mongoose.Schema({
    orderId: {
        type: ObjectId,
        ref: "Order",
    },
    customerId: {
        type: ObjectId,
        ref: "Customer",
    },
    discountAmount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Discount", discountSchema);