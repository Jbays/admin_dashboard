let mongoose = require('mongoose')
let Schema = mongoose.Schema

const OrganizationSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minLength: 1,
    unique: true,
    uniqueCaseInsensitive: true
  },
  description:{
    type:String,
    required:false
  },
  profile_picture_url: String,
  website_url: String,
  org_wallet_address: String,
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  default_group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'group'
  },
  members: [{
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'super-user', 'admin'],
      default: 'user'
    }
  }],
  verified: {type: Boolean, required: true, default: false},
  location: String,
  history: [mongoose.Schema.Types.Object],
  meta: {type: mongoose.Schema.Types.Object}
});

OrganizationSchema.index({name: 1})

const Organization = mongoose.model('Organization',OrganizationSchema);

module.exports = Organization;