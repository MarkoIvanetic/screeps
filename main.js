var roleHarvester = require('roleHarvester');
var roleUpgrader = require('roleUpgrader');
var rolePathfinder = require('rolePathfinder');
var roleBuilder = require('roleBuilder');
var tools = require('tools');

module.exports.loop = function() {

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    var creepWorksheet = {
        'builder': [0, 0, 0],
        'harvester': [0, 0, 0],
        'upgrader': [0, 0, 0],
        'rolePathfinder': [0, 0, 0]
    }
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        creepWorksheet[creep.memory.role][creep.memory.source]++;

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'rolePathfinder') {
            rolePathfinder.run(creep);
        }
    };
    // For every role
    for (var role in tools.creepManager) {
        // for every source

        for (var i = 0; i < tools.creepManager[role].length; i++) {
            if (creepWorksheet[role][i] < tools.creepManager[role][i]) {
                if (Game.spawns['Spawn1'].energy >= 300) {
                    if (tools[role](i) != ERR_NOT_ENOUGH_ENERGY) {
                        console.log("Creating " + role + " on source " + i)
                    }
                }
            }
        }
        tools.creepManager[role]
    }
    //console.log(JSON.stringify(creepWorksheet));

}