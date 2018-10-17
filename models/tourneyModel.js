module.exports = (sequelize, DataTypes) => {
    return sequelize.define('tournaments', {
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        format: {
            type: DataTypes.ENUM('Stroke', 'Match'),
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}