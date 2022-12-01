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

const commands = require('./commands/commandsRegistry');

function handleShowMessage() {
    window.alert('Hello, world!')
}


const init = () => {
    app.commands.register('helloworld:show-message', handleShowMessage, 'Show Message');

    commands.register(app);
    //# Import libs
    // var AppInit = app.getModule("utils/AppInit");
    // var CommandManager = app.getModule("command/CommandManager");
    // var MenuManager = app.getModule("menu/MenuManager");
    // var DefaultMenus = app.getModule("menu/DefaultMenus");
    // var ContextMenuManager = app.getModule("menu/ContextMenuManager");
    // var ExtensionUtils = app.getModule("utils/ExtensionUtils");
    // var Repository = app.getModule("core/Repository");

    // //Imported files
    // var TeamworkCommandHandler = require("./commandHandler/CommandHandler");
    // var LockingAttributesElement = require("./locking/LockingAttributesElement");
    // var Trigger = require("./trigger/Trigger");
    // var TeamworkView = require("./teamworkView/TeamworkView");

    // //Overwrites
    // Repository.doOperation = Trigger.doOperation;


    // var menu;
    // menu = MenuManager.addMenu(CMD_TEAMWORK);
    // menu.addMenuItem(CMD_TEAMWORK_OPEN);
    // menu.addMenuItem(CMD_TEAMWORK_CREATE);
    // menu.addMenuItem(CMD_TEAMWORK_LOCK);
    // menu.addMenuItem(CMD_UPDATE_LOCKS);
    // menu.addMenuDivider();
    // menu.addMenuItem(CMD_TEAMWORK_COMMIT);
    // menu.addMenuItem(CMD_TEAMWORK_UPDATE);
    // menu.addMenuDivider();
    // menu.addMenuItem(CMD_TEAMWORK_CONFIGURE);

    // var contextMenuDiagram;
    // contextMenuDiagram = ContextMenuManager.getContextMenu(DefaultMenus.contextMenus.DIAGRAM);
    // contextMenuDiagram.addMenuItem(CMD_LOCK_ELEMENT);
    // contextMenuDiagram.addMenuItem(CMD_UNLOCK_ELEMENT);

    // var contextMenuExplorer;
    // contextMenuExplorer = ContextMenuManager.getContextMenu(DefaultMenus.contextMenus.EXPLORER);
    // contextMenuExplorer.addMenuItem(CMD_LOCK_ELEMENT);
    // contextMenuExplorer.addMenuItem(CMD_UNLOCK_ELEMENT);

    // AppInit.appReady(function () {
    //     TeamworkView.init();
    // });

    // AppInit.htmlReady(function () {
    //     ExtensionUtils.loadStyleSheet(module, "styles/dialog.css");
    //     ExtensionUtils.loadStyleSheet(module, "styles/preferences.css");
    //     ExtensionUtils.loadStyleSheet(module, "styles/bootstrap/css/bootstrap.css");
    //     LockingAttributesElement.addLockingAttributeToElementType();
    //     LockingAttributesElement.addLockingAttributesToUMLModelElementType();
    //     Trigger.setupTriggerOpenProject();
    //     Trigger.setupTriggerOnRepository();
    //     Trigger.setupTriggerCommitProject();
    //     Trigger.setupTriggerCreateProject();
    //     //Trigger.setupTriggerOnDiagramChanges();
    // });
}

exports.init = init