namespace FitnessTracker.Models {
    public class User {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PasswordHash { get; set; }
        public ICollection<TrainingProgram>? TrainingPrograms { get; set; }

    }
}