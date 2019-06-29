'use strict'
const mongoose = require('mongoose')

module.exports = () => {

  let deviceSchema = new mongoose.Schema({
    name: String,
    devId: Number,
    lon: Number,
    lat: Number,
    capacity: Number,
    country: String,
    devType: String,
    source: String
  }, {
    collection: 'devices',
    timestamps: {createdAt: 'created', updatedAt: 'updated'}
  })

  let Device
  try {
    // Throws an error if "Name" hasn't been registered
    Device = mongoose.model('Device')
  } catch (e) {
    Device = mongoose.model('Device', deviceSchema)
  }
  return Device
}

