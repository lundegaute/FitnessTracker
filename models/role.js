module.exports = ( sequelize, Sequelize ) => {
    const Role = sequelize.define(
        "Role",
        {
            Role: {
                type: Sequelize.DataTypes.STRING,
                unique: true,
                allowNull: false,
            }
        },
        {
            timestamps: false,
        },

    );
    Role.associate = function ( models ) {
        Role.hasMany( models.User, { allowNull: false })
    }
    return Role;
}