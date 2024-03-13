const {signUp, signIn, getUser, getUsers, updateUser, deleteUser} = require("./../controller/user")
const auth = require("../utils/middleware/auth");
const {ValidateJoi, Schemas} = require("../utils/validation/validation")
const express = require("express");
const router = express.Router();

router.post("/signUp",ValidateJoi(Schemas.signUp),signUp);

router.post("/signIn",ValidateJoi(Schemas.signIn), signIn);

router.get("/user/:id", auth,getUser );

router.get("/users", auth,getUsers );

router.patch("/user/:id",auth, ValidateJoi(Schemas.update), updateUser);

router.delete("/user/:id",auth, deleteUser);

module.exports = router;