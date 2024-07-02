module.exports = (sequelize, Sequelize ) => {
    const ProgramExercise = sequelize.define(
        "ProgramExercise",
        {

        },
        {
            timestamps: false
        },
    );
    ProgramExercise.associate = function ( models ) {
        ProgramExercise.belongsTo(models.Exercise, {allowNull: false})
        ProgramExercise.belongsTo(models.Program, {allowNull: false})

    }
    return ProgramExercise;
}