module.exports = ( sequelize, Sequelize ) => {
    const Exercise = sequelize.define(
        "Exercise",
        {
            Name: {
                type: Sequelize.DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            Muscle: {
                type: Sequelize.DataTypes.STRING,
                unique: false,
                allowNull: false,
            },
            Equipment: {
                type: Sequelize.DataTypes.STRING,
                unique: false,
                allowNull: false,
            }
        },
        {
            timestamps: false
        },
    )
    Exercise.associate = function ( models ) {
        Exercise.belongsToMany(models.Program, { through: models.ProgramExercise, allowNull: false });

    }
    return Exercise;
}