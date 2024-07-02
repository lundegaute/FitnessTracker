module.exports = ( sequelize, Sequelize ) => {
    const User = sequelize.define( 
        'User',
        {
            Email: {
                type: Sequelize.DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            EncryptedPassword: {
                type: Sequelize.DataTypes.BLOB,
                unique: false,
                allowNull: false
            },
            Salt: {
                type: Sequelize.DataTypes.BLOB,
                allowNull: false
            }
        },
        {
            timestamps: false,
        }
    );
    User.associate = function ( models ) {
        User.belongsToMany(models.Program, { through: models.UserProgram});
        User.belongsTo(models.Role, { allowNull: false})
    };
    return User;
};