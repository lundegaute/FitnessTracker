module.exports = ( sequelize, Sequelize ) => {
    const Program = sequelize.define(
        'Program',
        {
            Name: {
                type: Sequelize.DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            Type: {
                type: Sequelize.DataTypes.STRING,
                unique: false,
                allowNull: false
            },
            
        },
        {
            timestamps: false
        }

    );
    Program.associate = function ( models ) {
        Program.belongsToMany(models.User, { through: models.UserProgram, allowNull: false })
        Program.belongsToMany(models.Exercise, { through: models.ProgramExercise, allowNull: false })
    }
    return Program;
};