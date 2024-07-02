class RoleService {
    constructor(db) {
        this.Client = db.sequelize;
        this.Role = db.Role;
    }

    async createRole(role) {
        return this.Role.create({
            Role: role
        })
    }


}