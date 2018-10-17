module.exports = (sequelize, DataTypes) => {
    return sequelize.define('registration', {
        user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        event: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}