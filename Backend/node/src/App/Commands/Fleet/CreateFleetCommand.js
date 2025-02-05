class CreateFleetCommand {
    /**
     * Crée une commande pour créer une flotte.
     * @param {string} userId - L'identifiant de l'utilisateur propriétaire de la flotte.
     */
    constructor(userId) {
        if (!userId) {
            throw new Error('userId is required');
        }

        this.userId = userId;
        this.fleetName = fleetName;
    }
}

module.exports = CreateFleetCommand;
