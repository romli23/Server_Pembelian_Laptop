const express = require("express");
const laptopController = require("../controllers/laptop-controllers.js");
const {authUser, isAdmin } = require("../middleware/auth.js");


const router = express.Router();


router.get("/", authUser, laptopController.index);
router.get("/:id", laptopController.show);
router.post("/", laptopController.store);
router.put("/:id", isAdmin, laptopController.update);
router.delete("/:id", laptopController.remove);

module.exports = router;