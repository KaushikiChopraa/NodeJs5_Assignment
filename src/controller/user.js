const { User } = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



let signUp =  async (req, res) => {
    try {
        const user = new User(req.body);
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.status(200).send({message : "User signUp successfully", data : user})
    } catch (error) {
        res.status(500).send(error)
    }
}


let signIn =  async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Invalid email or password");

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(400).send("Invalid email or password");

        // let jwtSecretKey = "secretKey";
        let data = {
            email : req.body.email,
            password : req.body.password
        }
        const token = jwt.sign(data, process.env.JWTPRIVATEKEY);
        res.status(200).send({message : "User signIn successfully", token : token})
    } catch (error) {
        res.status(500).send(error)
    }
}

let getUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id);
        res.status(200).send({message : "User signUp successfully", data : user})
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports = {signUp, signIn, getUser}
