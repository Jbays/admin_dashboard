const User = require('../models/user');
const Organization = require('../models/organization');

function createNewOrganization(req,res,next){
  const userId = req.body.member.user_id;
  const name = req.body.name;
  const description = req.body.description;
  const profilePictureUrl = req.body.profile_picture_url;
  const websiteUrl = req.body.website_url;
  const orgWalletAddress = req.body.org_wallet_address;
  const admin = req.body.UserId;
  const defaultGroup = req.body.group;
  const member = {user_id:req.body.UserId,role:'admin'}
  const verified = req.body.verified;
  const location = req.body.location;
  // const history = req.body.history;
  const meta = req.body.meta;

  if ( !name ){
    return res.status(422).send({ error: "Your organization requres a name." });
  }

  Organization.findOne({name},(err,existingOrg)=>{
    if(err){
      return next(err);
    }

    if (existingOrg){
      return res.status(422).send({error:"That organization name is already in use.  Please choose a unique organization name"})
    } else {

      //create the organization instance of the mongoose model.
      //save it
      //then return the id and a nice message
      const organization = new Organization({
        name,
        description,
        profilePictureUrl,
        websiteUrl,
        orgWalletAddress,
        admin,
        defaultGroup,
        member,
        verified,
        location
      });

      console.log('admin>>>>',admin);

      console.log('organization',organization);
      console.log('organization.admin',organization.admin);

      organization.save((err)=>{
        if(err){
          return next(err);
        }

        //check if user exists
        //if user exists, update user's roles, and orgs
        

        res.json({
          organizationId:organization._id,
          name:name,
          note:'you successfully created a new device'
        })
      })
    }
  });
}

module.exports = {
  createNewOrganization
}

