module.exports = ( sequelize, Sequelize ) => {
    const UserProgram = sequelize.define(
        "UserProgram",
        {
            
        },
        {
            timestamps: false
        },
    );
    UserProgram.associate = function ( models ) {
        UserProgram.belongsTo(models.User, { allowNull: false});
        UserProgram.belongsTo(models.Program, { allowNull: false});

    }
    return UserProgram;
}