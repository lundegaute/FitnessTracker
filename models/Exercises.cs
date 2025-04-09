namespace FitnessTracker.Models {
    public class Exercise {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Agonist { get; set; }
        public string Description { get; set; }
        public ICollection<TrainingProgram>? TrainingPrograms { get; set; }     

    }
}