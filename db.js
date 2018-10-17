const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, 'postgres', process.env.PG_PASS, {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate().then(
    () => console.log('Connected to BlueBadge DB'),
    (err) => console.log(err)
)

module.exports = sequelize