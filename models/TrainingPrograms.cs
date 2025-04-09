namespace FitnessTracker.Models {
    public class TrainingProgram {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Exercise>? Exercises { get; set; }
        public ICollection<User>? Users { get; set; }

    }
}