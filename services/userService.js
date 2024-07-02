class UserService {
    constructor(db) {
        this.Client = db.sequelize;
        this.User = db.User;
        this.Role = db.Role;
    }

    async getUserByEmail(email) {
        return this.User.findOne({
            where: {
                Email: email,
            },
            include: [this.Role]
        })
    }

    async createAdmin(user) {
        return this.User.create({
            Email: user.email,
            EncryptedPassword: user.encryptedPassword,
            Salt: user.salt,
            RoleId: 1,
        })
    }

    async createUser(user) {
        return this.User.create({
            Email: user.email,
            EncryptedPassword: user.encryptedPassword,
            Salt: user.salt,
            Role: 2,
        })
    }

}

module.exports = UserService;