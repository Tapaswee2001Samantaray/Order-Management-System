const router = require("express").Router();
const { createCustomer, createOrder } = require("../controller/controller");

router.post("/customer", createCustomer);
router.post("/order/:customerId", createOrder);

module.exports = router;