/*
Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
 */
module.exports = {
    builder: function(source) {
        return (Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE, MOVE, MOVE], {
            'role': 'builder',
            'source': source
        }))
    },
    harvester: function(source) {
        return (Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE, MOVE, MOVE], {
            'role': 'harvester',
            'source': source
        }))
    },
    upgrader: function(source) {
        return (Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE, MOVE, MOVE], {
            'role': 'upgrader',
            'source': source
        }))
    },
    rolePathfinder: function(source) {
        return (Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE, MOVE, MOVE], {
            'role': 'rolePathfinder',
            'source': source
        }))
    },
    creepManager: {
        builder: [3,6,0],
        harvester: [2,6,0],
        // harvester: [0,0,0],
        // upgrader: [0,0,0],
        upgrader: [2,6,0],
        // roadBuilder: [0,0,0],
        rolePathfinder: [1,2,0],
      }
};