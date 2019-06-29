'use strict'
let mongoose = require('mongoose')
let Schema = mongoose.Schema

/**
 * Database Schema for Groups
 */
module.exports = function () {
  let model
  let GroupSchema = new Schema({
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    shadow_name: {
      type: String, trim: true, required: false, minLength: 1, maxlength: 512, match: /[a-zA-Z0-9:_-]+/
    },
    name: {
      type: String, trim: true, required: true, minLength: 1, maxlength: 128, match: /[a-zA-Z0-9:_-]+/
    },
    description: {type: String, trim: true, required: false},
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
      required: true
    },
    type: String,
    meta: {type: mongoose.Schema.Types.Object}
  }, {timestamps: {created_at: 'created_at', updated_at: 'modified_at'}, collection: 'groups'})

  GroupSchema.index({owner_id: 1, name: 1}, {unique: true})

  model = mongoose.model('group', GroupSchema)
  return model
}
