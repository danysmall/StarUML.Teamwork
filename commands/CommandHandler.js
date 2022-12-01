/**
 * Copyright (c) 2016 Michael Seiler. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction, including without
 * limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
// var CommandManager = app.getModule("command/CommandManager");
// var Commands = app.getModule("command/Commands");
// var Toast = app.getModule("ui/Toast");

//Imports
var OpenProject = require("../teamworkApi/OpenProject");
var CreateProject = require("../teamworkApi/CreateProject");
var LockElement = require("../teamworkApi/LockElement");
var UpdateProject = require("../teamworkApi/UpdateProject");
var ProjectCommitter = require("../teamworkApi/ProjectCommitter");
var Locking = require("../locking/ElementLocker");
var TeamworkBase = require("../teamworkApi/TeamworkBase");

function doIfProjectIsTeamworkProject(operationCallback) {
    if (TeamworkBase.isTeamworkProject()) {
        operationCallback();
    } else {
        Toast.error("Project has to be Teamwork-Project to execute this operation!");
    }
}

exports.lockWholeTeamworkProject = () => {
    doIfProjectIsTeamworkProject(LockElement.lockWholeTeamworkProject);
}

exports.updateProjectLockInfo = () => {
    doIfProjectIsTeamworkProject(LockElement.updateProjectLockInfo);
}

exports.updateProject = () => {
    doIfProjectIsTeamworkProject(UpdateProject.updateProject);
}

exports.commitChanges = () => {
    doIfProjectIsTeamworkProject(ProjectCommitter.commitProjectChanges);
}

exports.lockElement = () => {
    doIfProjectIsTeamworkProject(Locking.lockElement);
}

exports.unlockElement = () => {
    doIfProjectIsTeamworkProject(Locking.unlockElement);
}

/* --------------------------------- Exports -------------------------------- */
exports.openProject = OpenProject.openTeamworkProject;
exports.createProject = CreateProject.createTeamworkProject;