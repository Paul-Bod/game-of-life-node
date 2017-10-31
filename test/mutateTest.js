const mutate = require('../lib/mutate');
const _ = require('lodash');

function emptySeed() {
    let rows = [];
    for(var i = 0; i < 20; i++) {
        let cols = [];
        for (var j = 0; j < 20; j++) {
            cols.push(0);
        }
        rows.push(cols);
    }
    return rows;
}

function singleCellSeed() {
    const seed = emptySeed();
    const xIndex = randomIndex(0, seed.length);
    const row = seed[xIndex];
    const yIndex = randomIndex(0, row.length);

    seed[xIndex][yIndex] = 1;
    return seed

}

function manyResults(seedGenerator) {
    let seeds = [];
    for(var i = 0; i < 10; i++) {
        seeds.push(seedGenerator());
    }
    seeds.map(mutate.mutate);
    return seeds;
}

function exactlyOneLiveCell(results) {
    return results
        .map(result => _.flattenDeep(result).filter(x => x === 1).length === 1)
        .filter(result => result === true)
        .length === results.length;
}

// TODO the logic here is flawed. Consider 101000000
function liveCellsAreAdjacent(results) {
    return results.map(result => {
        const flattened = result.flattenDeep(result);
        const firstLiveCell = _.indexOf(flattened, 1);
        const lastLiveCell = _.lastIndexOf(flattened, 1);
        const distance = _.slice(flattened, firstLiveCell+1, lastLiveCell).length;
        return distance <= 3; // any greater between two cells and they are not adjacent
    })
    .filter(result => result === true)
    .length === results.length;
}

function givesDifferentResults(results) {
    const reduced = results.map(_.flattenDeep);
    const uniques = _.uniqWith(reduced, _.isEqual);
    return uniques.length === results.length;
}

exports.randomMutation = {
    mutateEmptySeed: function (test) {
        const results = manyResults(emptySeed); 

        test.equal(true, exactlyOneLiveCell(results), ['An empty seed should be mutated to contain one live cell']);
        test.equal(true, givesDifferentResults(results), ['An empty seed should produce different results for each mutation'])
        test.done();
    },
    mutateSimpleSeed: function (test) {
        const results = manyResults(singleCellSeed);

        test.equal(true, givesDifferentResults(results), ['A simple seed should produce different results for each mutation'])
        test.done();
    }
};
