'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema
let { formatPhoneNumber, validatePhoneNumber } = require('../libPhone')

module.exports = function () {
  const bcrypt = require('bcrypt')
  let model
  let UserSchema = new Schema({
    first_name: { type: String, trim: true, required: false, minLength: 1 },
    last_name: { type: String, trim: true, required: false, minLength: 1 },
    username: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      minLength: 1,
      match: /.+\@.+\..+/,
      unique: true
    },
    mobile_device_id: {
      type: String
    },
    biometrics_enabled: {
      type: Boolean
    },
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
      validate: {
        validator: validatePhoneNumber
      },
      set: normalizePhoneNumber,
      get: internationalPhoneNumber
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
  }, { timestamps: { created_at: 'created_at', updated_at: 'modified_at' }, collection: 'users' })

  UserSchema.index({ username: 1 })
  UserSchema.index({ email: 1 })
  UserSchema.index({ roles: 1 })
  UserSchema.index({ wallet: 1 })

  UserSchema.pre('save', function (next) {
    const user = this
    if (!user.password) {
      next()
    }

    if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, (error, salt) => {
        if (error) return next(error)
        bcrypt.hash(user.password, salt, (error, hash) => {
          if (error) return next(error)
          user.password = hash
          next()
        })
      })
    } else {
      return next()
    }
  })
  UserSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (error, matches) => {
      if (error) {
        return cb(error)
      }
      return cb(null, matches)
    })
  }
  UserSchema.methods.comparePasswordAync = function (password) {
    let self = this
    return new Promise(function (resolve, reject) {
      bcrypt.compare(password, self.password, (error, matches) => {
        if (error) {
          return reject(error)
        }
        if (!matches) {
          return reject(new Error('Invalid Password'))
        }
        return resolve(matches)
      })
    })
  }

  try {
    // Throws an error if "Name" hasn't been registered
    model = mongoose.model('user')
  } catch (e) {
    model = mongoose.model('user', UserSchema)
  }
  return model
}

const normalizePhoneNumber = function (pn) {
  return pn.replace(/[^\d]+/g, '')
}

const internationalPhoneNumber = function (pn) {
  var cc = this.country_code || 'US'

  var cleanNum = pn
  try {
    cleanNum = formatPhoneNumber(cleanNum, cc)
  } catch (e) {
    console.log(e)
  }
  return cleanNum
}
