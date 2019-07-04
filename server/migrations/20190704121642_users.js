exports.up = (knex)=>{
  return knex.schema.createTable('users',(table)=>{
    table.increments('user_id');
    table.string('first_name');
    table.string('last_name');
    table.string('username');
    table.string('email');
    table.integer('mobile_device_id');
    table.boolean('biometrics_enabled');
    table.string('password');
    table.boolean('verified');
    table.boolean('terms');
    table.string('phone_number');
    table.string('wallet');
    table.integer('token_staking_id');
    table.integer('roles_id');
    table.integer('orgs_id');
    table.integer('assets_id');
    table.integer('contact_id');
    table.integer('history_id');
    table.integer('meta_id')
    // table.timestamp('created_at').defaultTo(knex.fn.now());
    // table.timestamp('updated_at');
  }).catch((err)=>{
    console.error(`error with users migration: ${err}`);
  })
};

exports.down = (knex)=>{
  return knex.schema.dropTable('users')
  .catch((err)=>{
    console.error(`error with users migration rollback: ${err}`);
  })
};
