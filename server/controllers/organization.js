const Organization = require('../models/organization');

function createNewOrganization(req,res,next){
  console.log('createNewOrganization talking!');
  console.log('req.body',req.body);

  const name = req.body.name;

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
    }
  });
}

module.exports = {
  createNewOrganization
}