const {signUp, signIn, getUser} = require("./../controller/user")
const auth = require("../utils/middleware/auth");
const {ValidateJoi, Schemas} = require("../utils/validation/validation")
const express = require("express");
const router = express.Router();



router.post("/signUp",ValidateJoi(Schemas.signUp),signUp);

router.post("/signIn",signIn);

router.get("/users/:id", auth,getUser );

module.exports = router;