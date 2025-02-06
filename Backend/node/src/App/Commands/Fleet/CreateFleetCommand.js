class CreateFleetCommand {
    /**
     * Defines a command to create a fleet.
     * @param {string} userId - The unique identifier of the user who owns the fleet.
     * @param {string} [name] (optional) - The name of the fleet.
     * @throws {Error} If the userId is not provided.
     */
    constructor(userId, name) {
        if (!userId) {
            throw new Error('userId is required');
        }

        this.userId = userId;
        this.name = name;
    }
}

module.exports = CreateFleetCommand;
