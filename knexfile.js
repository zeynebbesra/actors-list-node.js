require('dotenv').config();
module.exports = {
    development:{
        client:"pg",
        connection:{
            database:"aktors",
            user:"postgres",
            password:"1234"
        },
        migrations:{
            directory:"./data/migrations"
        },
        seeds:{
            directory:"./data/seeds"
        }
    }
}