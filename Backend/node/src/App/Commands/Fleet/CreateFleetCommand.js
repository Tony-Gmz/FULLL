class CreateFleetCommand {
    /**
     * Defines a command to create a fleet.
     * @param {string} userId - The unique identifier of the user who owns the fleet.
     * @throws {Error} If the userId is not provided.
     */
    constructor(userId) {
        if (!userId) {
            throw new Error('userId is required');
        }

        this.userId = userId;
    }
}

module.exports = CreateFleetCommand;
