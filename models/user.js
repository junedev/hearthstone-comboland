var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true}
})

// userSchema.set('toJSON', {
//   transform: function(doc, ret, options) {
//     var returnJson = {
//       id: ret._id
//     };
//     return returnJson;
//   }
// });

userSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

var User = mongoose.model("User", userSchema);

module.exports = User;