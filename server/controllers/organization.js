const User = require('../models/user');
const Organization = require('../models/organization');

function createNewOrganization(req,res,next){
  const name = req.body.name;
  const description = req.body.description;
  const profilePictureUrl = req.body.profile_picture_url;
  const websiteUrl = req.body.website_url;
  const orgWalletAddress = req.body.org_wallet_address;
  const admin = req.body.member.user_id;
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

      organization.save((err)=>{
        if(err){
          return next(err);
        }

        //query probably doesn't need to return all the fields (like password)
        //but just the necessary fields.
        return User.findOneAndUpdate(admin).exec()
          .then((userDoc)=>{
            let userDocRoles = userDoc.roles;
            let userDocOrgs = userDoc.orgs;
            if ( !userDocRoles.includes('admin') ) {
              userDocRoles.push('admin');
              userDoc.roles = userDocRoles;
            }
            
            if ( !userDocOrgs.includes(name) ) {
              userDocOrgs.push(organization._id);
              userDoc.orgs = userDocOrgs;
            }
            userDoc.save();

            return res.json({
              organizationId:organization._id,
              name:name,
              note:'you successfully created a new device'
            })

          })
          .catch((err)=>{
            console.error(`error while trying to update admin user's record: ${err}`)
          });

      })
    }
  });
}

module.exports = {
  createNewOrganization
}

