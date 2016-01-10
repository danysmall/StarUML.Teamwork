define(function(require, exports, module) {
    "use strict";

    //modules
    var _global                 = app.getModule("core/Global").global;
    var Repository              = app.getModule("core/Repository");
    var ProjectManager          = app.getModule("engine/ProjectManager");
    var OperationBuilder        = app.getModule("core/OperationBuilder");
    var Toast 				    = app.getModule("ui/Toast");
    var Core                    = app.getModule("core/Core");

    //imported modules
    var OpenProject             = require("./../teamworkApi/OpenProject");
    var GitConfiguration        = require("./../preferences/TeamworkConfiguration");
    var TeamworkView            = require("./../teamworkView/TeamworkView");
    var TeamworkBase            = require("./../teamworkApi/TeamworkBase");
    var ProjectCommitter        = require("./../teamworkApi/ProjectCommitter");
    var SaveProject             = require("./../teamworkApi/CreateProject");
    var LockElement             = require("./../teamworkApi/LockElement");
    var ElementLocker           = require("./../locking/ElementLocker");

    function updateTitlebar(projectName) {
        var filename = projectName,
            title = "";
        app.metadata.name = "Teamwork-Project";

        if (filename && filename.length > 0) {
            title += filename + " — ";
        }

        if (Repository.isModified()) {
            title += "• ";
        }

        title += "Teamwork-Project";

        $("title").html(title);
    }

    function setupTriggerOpenProject() {
        $(OpenProject).on('teamworkProjectLoaded', function (event, projectName) {
            try {
                ProjectManager._setFilename(projectName);
                TeamworkBase.setTeamworkProjectName(projectName);
                TeamworkBase.setTeamworkProject(true);
                Repository.setModified(false);
                updateTitlebar(projectName);
            } catch (err) {
                console.error(err);
            }
        });
    }

    function setupTriggerCommitProject() {
        $(ProjectCommitter).on('projectCommitted', function(event, projectName) {
            Repository.setModified(false);
            var lockedElements = ElementLocker.getLockedElements();
            LockElement.unlockGivenElements(lockedElements);
            updateTitlebar(projectName);
        });
    }

    function setupTriggerCreateProject() {
        $(SaveProject).on('projectCreated', function(event, projectName) {
            Repository.setModified(false);
            TeamworkBase.setTeamworkProject(true);
            TeamworkBase.setTeamworkProjectName(projectName);
            updateTitlebar(projectName);
        });
    }

    function setupTriggerOnRepository() {
        var teamworkUser = GitConfiguration.getUsername();
        var MESSAGE = "One of the elements to change is Locked by someone else. Cannot do Operation";
        var MOVE_VIEWS = "move views";
        $(Repository).on('beforeExecuteOperation', function (event, operation) {
            if(!TeamworkBase.isTeamworkProject()) {
                return;
            }
            var operationName = operation.name;
            var elements = extractElementsToChange(operation);

            if(operationName == MOVE_VIEWS) {
                if((elements[0]._parent && !elements[0]._parent.isNewElement() && !elements[0]._parent.isLocked()) || (elements[0]._parent && elements[0]._parent.isLocked() &&  elements[0]._parent.getLockUser() !== teamworkUser)) {
                    TeamworkView.addTeamworkItem("Error", MESSAGE, new Date().toJSON().slice(0, 19).replace("T", " "), teamworkUser);
                    throw new Error(MESSAGE);
                }
            }
            var reader;
            for (var i = 0, len = operation.ops.length; i < len; i++) {
                if (operation.ops[i].op === OperationBuilder.OP_INSERT) {
                    reader = new Core.Reader({ data: operation.ops[i].arg }, _global.type);
                    var elementToCreate  = reader.readObj("data");
                    var parentOfCreation = Repository.get(elementToCreate._parent.$ref);
                    if((parentOfCreation && !parentOfCreation.isNewElement() && !parentOfCreation.isLocked()) || (parentOfCreation && parentOfCreation.isLocked() &&  parentOfCreation.getLockUser() !== teamworkUser)) {
                        TeamworkView.addTeamworkItem("Error", MESSAGE, new Date().toJSON().slice(0, 19).replace("T", " "), teamworkUser);
                        throw new Error(MESSAGE);
                    }
                }
                if (operation.ops[i].op === OperationBuilder.OP_REMOVE) {
                    reader = new Core.Reader({ data: operation.ops[i].arg }, _global.type);
                    var elementToDelete  = reader.readObj("data");
                    var parentOfDeletion = Repository.get(elementToDelete._parent.$ref);
                    if((parentOfDeletion && !parentOfDeletion.isNewElement() && !parentOfDeletion.isLocked()) || (parentOfDeletion && parentOfDeletion.isLocked() &&  parentOfDeletion.getLockUser() !== teamworkUser)) {
                        TeamworkView.addTeamworkItem("Error", MESSAGE, new Date().toJSON().slice(0, 19).replace("T", " "), teamworkUser);
                        throw new Error(MESSAGE);
                    }
                }
                if(operation.ops[i].arg.op !== undefined) {
                    var oldParent = Repository.get(operation.ops[i].arg.op);
                    if(oldParent.isLocked() && oldParent.getLockUser() !== teamworkUser) {
                        TeamworkView.addTeamworkItem("Error", MESSAGE, new Date().toJSON().slice(0, 19).replace("T", " "), teamworkUser);
                        throw new Error(MESSAGE);
                    }
                }
                if(operation.ops[i].arg.np !== undefined) {
                    var newParent = Repository.get(operation.ops[i].arg.np);
                    if(newParent.isLocked() && newParent.getLockUser() !== teamworkUser) {
                        TeamworkView.addTeamworkItem("Error", MESSAGE, new Date().toJSON().slice(0, 19).replace("T", " "), teamworkUser);
                        throw new Error(MESSAGE);
                    }
                }
            }
            for(var elementIndex = 0; elementIndex < elements.length; elementIndex++) {
                var element = elements[elementIndex];
                if(element.isLocked() && element.getLockUser() !== teamworkUser) {
                    TeamworkView.addTeamworkItem("Error", MESSAGE, new Date().toJSON().slice(0, 19).replace("T", " "), teamworkUser);
                    throw new Error(MESSAGE);
                }
            }
        });

        $(Repository).on('operationExecuted', function(event, operation) {
            var changedElements = Repository.extractChanged(operation);
            TeamworkBase.addChangedElements(changedElements);
        });

        $(Repository).on('created', function(event, createdElements) {
            createdElements.forEach(function(element) {
                element = Repository.get(element._id);
                element.newElement = true;
            });
        });
    }

    function extractElementsToChange(operation) {
        return Repository.extractChanged(operation);
    }

    exports.setupTriggerOpenProject = setupTriggerOpenProject;
    exports.setupTriggerOnRepository = setupTriggerOnRepository;
    exports.setupTriggerCommitProject = setupTriggerCommitProject;
    exports.setupTriggerCreateProject = setupTriggerCreateProject;
});