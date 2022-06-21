const Sequelize = require('sequelize');
const {STRING, TEXT} = Sequelize;
const {faker} = require('@faker-js/faker')
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db');

const User = conn.define('user', {
    name: STRING,
    bio: TEXT
    },{
        hooks:{
            beforeCreate: function(user) {
                if(!user.bio){
                    user.bio = `${user.name}. ${faker.lorem.paragraph(3)}. ${user.name}`;
                }
            }
        }
    }
)

User.createWithName = (name) =>{
    return User.create({name})
}

const syncAndSeed = async () => {
    await conn.sync({force: true});
    const [moe, lucy, curly] = await Promise.all([
        ['moe', 'lucy', 'curly'].map(User.createWithName)
    ]);
};

module.exports = {
    models:{
        User
    },
    syncAndSeed
}