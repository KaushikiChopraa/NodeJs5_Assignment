const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});



// userSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY);
//     return token;
// };

const User = mongoose.model("user", userSchema);



module.exports = { User};