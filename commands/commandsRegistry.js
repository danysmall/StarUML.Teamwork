const commands = require('./commandsDefinition');
const TeamworkCommandHandler = require('./CommandHandler');

const commandsRegistration = (app) => {
    // app.commands.register(
    //     commands.CMD_TEAMWORK,
    //     CommandManager.doNothing,
    //     "Teamwork",
    // );
    app.commands.register(
        commands.CMD_TEAMWORK_OPEN,
        TeamworkCommandHandler.openProject,
        "Open Teamwork-Project...",
    );
    app.commands.register(
        commands.CMD_TEAMWORK_CREATE,
        TeamworkCommandHandler.createProject,
        "Create Teamwork-Project",
    );
    app.commands.register(
        commands.CMD_TEAMWORK_LOCK,
        TeamworkCommandHandler.lockWholeProject,
        "Lock Teamwork-Project",
    );
    app.commands.register(
        commands.CMD_UPDATE_LOCKS,
        TeamworkCommandHandler.updateProjectLockInfo,
        "Update Lock-Info",
    );
    app.commands.register(
        commands.CMD_TEAMWORK_COMMIT,
        TeamworkCommandHandler.commitChanges,
        "Commit changes",
    );
    app.commands.register(
        commands.CMD_TEAMWORK_UPDATE,
        TeamworkCommandHandler.updateProject,
        "Update Project",
    );
    app.commands.register(
        commands.CMD_TEAMWORK_CONFIGURE,
        TeamworkCommandHandler.handleConfigure,
        "Configure Teamwork-Server",
    );

    app.commands.register(
        commands.CMD_LOCK_ELEMENT,
        TeamworkCommandHandler.lockElement,
        "Lock Element"
    );
    app.commands.register(
        commands.CMD_UNLOCK_ELEMENT,
        TeamworkCommandHandler.unlockElement,
        "Unlock Element"
    );

}

exports.register = commandsRegistration