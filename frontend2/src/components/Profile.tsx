class Profile {
    username: string;
    name: string;
    email: string;
    correctAnswers: number;
    incorrectAnswers: number;

    // Static map to store <UUID, Profile> entries
    static profilesMap: Map<string, Profile> = new Map();

    constructor(username: string, name: string, email: string) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.correctAnswers = 0;
        this.incorrectAnswers = 0;

        // Add the new profile to the map
        Profile.profilesMap.set(this.username, this);
    }

    // Method to calculate the percentage of correct answers
    calculateScore(): number {
        if (this.correctAnswers + this.incorrectAnswers === 0) {
            return 0; // Avoid division by zero
        }
        return (this.correctAnswers / (this.correctAnswers + this.incorrectAnswers)) * 100;
    }
}

export default Profile;
