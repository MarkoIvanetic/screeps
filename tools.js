var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roadBuilder = require('role.roadBuilder');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var roleRepair = require('role.repair');
var roleRanger = require('role.soldier.ranged');
var tools = require('tools');

module.exports.loop = function() {
    
    var hostiles = Game.rooms['sim'].find(FIND_HOSTILE_CREEPS);
    
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room ${'sim'}`);
        var towers = Game.rooms['sim'].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
    }
    
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    var creepWorksheet = {
        'builder': [0, 0, 0, 0],
        'harvester': [0, 0, 0, 0],
        'upgrader': [0, 0, 0, 0],
        'roadBuilder': [0, 0, 0, 0],
        'repair': [0, 0, 0, 0],
        'ranger': [0, 0, 0, 0]
    }
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var spawnCreeps = true;
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
        if (creep.memory.role == 'roadBuilder') {
            roadBuilder.run(creep);
        }
        if (creep.memory.role == 'repair') {
            roleRepair.run(creep);
        }
        if (creep.memory.role == 'ranger') {
            roleRanger.run(creep);
        }
    };
    // tools.builder(0);
    // For every role
    for (var role in tools.creepManager) {
        // for every source

        for (var i = 0; i < tools.creepManager[role].length; i++) {
            if (creepWorksheet[role][i] < tools.creepManager[role][i]) {
                if (spawnCreeps) {
                    if (tools[role](i) != ERR_NOT_ENOUGH_ENERGY) {
                        console.log("Creating " + role + " on source " + i)
                    }
                }
            }
        }
    }
    //console.log(JSON.stringify(creepWorksheet));

}