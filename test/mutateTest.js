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
    seed[5][5] = 1;
    return seed
}

function manyResults(seedGenerator) {
    let seeds = [];
    for(var i = 0; i < 100; i++) {
        seeds.push(seedGenerator());
    }
    return seeds.map(mutate.mutate);
}

function trueForAll(results, predicate) {
    return results
        .map(predicate)
        .filter(result => result === true)
        .length === results.length;
}

function numLiveCells(result, n) {
    return _.flattenDeep(result).filter(x => x === 1).length === n;
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

function liveCellsAreAdjacent2(result) {
    return result[4][4] === 1 ||
        result[4][5] === 1 ||
        result[4][6]  === 1||
        result[5][4]  === 1||
        result[5][6]  === 1||
        result[6][4] === 1 ||
        result[6][5] === 1 ||
        result[6][6] === 1;
}

function givesDifferentResults(results) {
    const reduced = results.map(_.flattenDeep);
    const uniques = _.uniqWith(reduced, _.isEqual);
    return uniques.length > 1;
}

exports.randomMutation = {
    mutateEmptySeed: function (test) {
        const results = manyResults(emptySeed); 

        test.equal(true, trueForAll(results, (result) => numLiveCells(result, 1)), ['An empty seed should be mutated to contain one live cell']);
        test.equal(true, givesDifferentResults(results), ['An empty seed should produce different results for each mutation'])
        test.done();
    },
    mutateSimpleSeed: function (test) {
        const results = manyResults(singleCellSeed);

        test.equal(true, trueForAll(results, (result) => numLiveCells(result, 2)), ['A mutation should add one additional live cell']);
        test.equal(true, trueForAll(results, liveCellsAreAdjacent2), ['Mutations should form adjacent to already living cells'])
        test.equal(true, givesDifferentResults(results), ['A simple seed should produce different results for each mutation'])
        test.done();
    }
};

// TODO tests for mutate.expandCoordinates inc. live cells in corners and edges
// TODO test for repeated mutations
