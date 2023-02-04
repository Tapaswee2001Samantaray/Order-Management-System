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


const createOrder = async function ( req , res ) {
    try {
        let customerId = req.params.customerId

         if(!isValidObjectId(customerId)){
            return res.status(404).send({ status : false , message : "Customer id is not valid"})
         }

         let checkCustomerId = await customerModel.findById(customerId)

         if(!checkCustomerId) {
            return res.status(404).send({ status : false , message : "Customer is not exist."})
         }

        let body = req.body
        let { totalAmount } = body

        totalAmount = parseFloat(totalAmount);
        if( !totalAmount) {
            return res.status(400).send({ status : false , message : "Please provide the total amount of order"})
        }
        body["totalAmount"] = totalAmount;

        if(checkCustomerId.customerType=="gold") body.discountAmount=(totalAmount*0.1)
        if(checkCustomerId.customerType=="platinum") body.discountAmount=(totalAmount*0.2)
        body.customerId=customerId

        let order = await orderModel.create(body)

        let obj={$inc:{orderCount:1}}
        if(checkCustomerId.orderCount==9){
            obj.customerType="gold"
        }
        if(checkCustomerId.orderCount==19){
            obj.customerType="platinum"
        }

        await customerModel.findOneAndUpdate({_id:customerId},obj,{new:true})

        await discountModel.create({orderId:order._id,customerId:customerId,discountAmount:order.discountAmount})
        
        return res.status(201).send({ status : true , message : "Order successfully placed." , data : order })

    }catch ( error ) {
        return res.status(500).send({ status: false , message : error.message})
    }
}

module.exports = { createCustomer, createOrder }