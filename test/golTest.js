var gol = require('../lib/life');

exports.testCellShouldSurvive = function (test) {
    test.equal(false, gol.cellShouldSurvive(0), ["Cell should not survive with 0 neighbours"]);
    test.equal(false, gol.cellShouldSurvive(1), ["Cell should not survive with 1 neighbours"]);
    test.equal(true, gol.cellShouldSurvive(2), ["Cell should survive with 2 neighbours"]);
    test.equal(true, gol.cellShouldSurvive(3), ["Cell should survive with 3 neighbours"]);
    test.equal(false, gol.cellShouldSurvive(4), ["Cell should not survive with 4 neighbours"]);
    test.equal(false, gol.cellShouldSurvive(5), ["Cell should not survive with > 4 neighbours"]);
    test.done();
};