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

function manyResults() {
    let seeds = [];
    for(var i = 0; i < 10; i++) {
        seeds.push(emptySeed());
    }
    seeds.map(mutate.mutate);
    return seeds;
}

function atLeastOneLiveCell(seed) {
    return seed.reduce((a, b) => a.concat(b)).includes(1);
}

function givesDifferentResults(results) {
    const reduced = results.map(result => result.reduce((a, b) => a.concat(b)));
    const uniques = _.uniqWith(reduced, _.isEqual);
    return uniques.length === results.length;
}

exports.randomMutation = {
    mutateEmptySeed: function (test) {
        const results = manyResults(); 

        test.equal(true, atLeastOneLiveCell(results[0]), ['An empty seed should be mutated to contain one live cell']);
        test.equal(true, givesDifferentResults(results), ['An empty seed should produce different results for each mutation'])
        test.done();
    }
};
