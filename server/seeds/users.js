exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          'first_name':'justin',
          'last_name':'blaze',
          'username':'jblaze',
          'email':'jblaze123@gmail.com',
          'mobile_device_id':1,
          'biometrics_enabled':false,
          'password':'1234abcd',
          'verified':true,
          'terms':false,
          'phone_number':'5125556789',
          'wallet':'#*ZWr0F9WES77mCA5ioc',
          'token_staking_id':1,
          'roles_id':1,
          'orgs_id':1,
          'assets_id':1,
          'contact_id':1,
          'history_id':1,
          'meta_id':1,
          // 'updated_at':'2019 July 3'
        },
      ])
      .catch((err)=>{
        console.error(`users seed error during insert: ${err}`);
      })
    })
    .catch((err)=>{
      console.error(`users seed error before insert: ${err}`);
    })
};
