const express = require("express");
const paymentController = require("../controllers/payment-controllers.js");
const { authUser} = require("../middleware/auth.js");

const router = express.Router();
router.use(authUser);


router.get("/", paymentController.index);
router.post("/", paymentController.store);
router.put("/:id",paymentController.update);
router.delete("/:id",paymentController.remove);

module.exports = router;