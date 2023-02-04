const router = require("express").Router();
const { createCustomer } = require("../controller/controller");

router.post("/customer", createCustomer);


module.exports = router