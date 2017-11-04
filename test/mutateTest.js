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

function randomIndex(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
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

/*
 * For each alive cell treat it as the centre of a grid of 9 cells (horizontally)
 * At least one other cell in the grid must be alive, giving at least 2 live cells
 * If this is not the case it means the live cell at the centre is not adjacent to another
 */
function liveCellsAreAdjacent(results) {
    const result = results[0];

    const flattened = _.flattenDeep(result);

    const aliveIndex = _.indexOf(flattened, 1);
    const leftTrimmed =  _.drop(flattened, aliveIndex-4)
    const adjacents =  _.dropRight(leftTrimmed, leftTrimmed.length - 9);
    const sum = _.reduce(adjacents, function(sum, n) {
        return sum + n;
    }, 0)  

    return sum >= 2;
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
        test.equal(true, liveCellsAreAdjacent(results), ['Mutations should form adjacent to already living cells'])
        test.done();
    }
};
