const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new Schema({
  first_name: { type: String, trim: true, required: false, minLength: 1 },
  last_name: { type: String, trim: true, required: false, minLength: 1 },
  username: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    unique: true,
    minLength:8
  },
  email:{
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    minLength: 1,
    match: /.+\@.+\..+/,
    unique: true
  },
  mobile_device_id: { type: String },
  biometrics_enabled: { type: Boolean },
  password: { type: String, required: false, minLength: 8 },
  verified: { type: Boolean, required: true, default: false },
  terms: { type: Boolean, required: false, default: false },
  country_code: String,
  phone_number: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    sparse: true,
  },
  wallet: {
    type: String,
    required: true,
    unique: true
  },
  token_staking: {
    valid_token_balance: { type: Boolean },
    checked_on: { type: Date },
    token_hash: { type: String }
  },
  roles: {
    type: [String],
    enum: ['user', 'org.member', 'org.super-user', 'org.admin', 'super-user', 'admin', 'service-account'],
    default: 'user',
    index: true
  },
  orgs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'org'
  }],
  assets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'asset'
  }],
  contact: { type: mongoose.Schema.Types.Object },
  history: [mongoose.Schema.Types.Object],
  meta: { type: mongoose.Schema.Types.Object }
});

function encrypt(next) {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
};

function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

UserSchema.methods.encrypt = encrypt;
UserSchema.methods.comparePassword = comparePassword;

const User = mongoose.model("User", UserSchema);

module.exports = User;