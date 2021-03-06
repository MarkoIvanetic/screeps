// module.exports = {

//     /** @param {Creep} creep **/
//     run: function(creep) {
//         var source = creep.memory.source || 0;
//      if(creep.memory.building && creep.carry.energy == 0) {
//             creep.memory.building = false;
//             creep.say('harvesting');
//      }
//      if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
//          creep.memory.building = true;
//          creep.say('building');
//      }

//      if(creep.memory.building) {
//          var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {filter: {structureType: STRUCTURE_EXTENSION}});
//             if(targets.length) {
//                 if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
//                     creep.moveTo(targets[0]);
//                 }
//             }
//      }
//      else {
//          var sources = creep.room.find(FIND_SOURCES);
//             if(creep.harvest(sources[source]) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(sources[source]);
//             }
//      }
//  }
// };
module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var source = creep.memory.source || 0;
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[source]) == ERR_NOT_IN_RANGE) {
                //creep.pos.createConstructionSite(STRUCTURE_ROAD)
                creep.moveTo(sources[source]);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    //creep.pos.createConstructionSite(STRUCTURE_ROAD)
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};