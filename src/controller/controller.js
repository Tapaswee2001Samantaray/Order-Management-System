const customerModel = require("../models/customerModel");
const orderModel = require("../models/orderModel");
const discountModel = require("../models/discountModel");
const { isValidObjectId } = require("mongoose");

const nameRegex = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;


const createCustomer = async function (req, res) {
    try {
        let name = req.body.name;

        if (name && typeof name != "string") {
            return res.status(400).send({ status: false, message: "name should be in string" });
        }
        if (!name || !name.trim()) {
            return res.status(400).send({ status: false, message: "name is mandaory" });
        }
        if (!nameRegex.test(name.trim())) {
            return res.status(400).send({ status: false, message: "Invalid name, numbers are not allowed" });
        }

        const data = await customerModel.create({ name: name });
        return res.status(201).send({ status: true, message: "Success", data: data });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}


module.exports = { createCustomer }