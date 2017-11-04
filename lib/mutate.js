const _ = require('lodash');

function randomIndex(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
}

function createCoordinates(value, index) {
    return {
        value: value,
        index: index
    };
}

function expandCoordinates(seedLength, coordinates) {
    return _.flatMap(coordinates, (coordinate) => {
        let newCoordinates = [];
        for (let i = coordinate.index-4; i <= coordinate.index+4; i++) {
            if (i > 0  && i < seedLength) {
                newCoordinates.push(i);
            }
        }
        return newCoordinates;
    });
}

exports.mutate = (seed) => {
    const flattened = _.flattenDeep(seed);

    const aliveCoordinates = _.map(flattened, createCoordinates).filter((coordinate) => coordinate.value === 1);
    console.log(aliveCoordinates);

    const expandedCoordinates = expandCoordinates(flattened.length, aliveCoordinates);
    console.log(expandedCoordinates);


    const xIndex = randomIndex(0, seed.length);
    const row = seed[xIndex];
    const yIndex = randomIndex(0, row.length);

    seed[xIndex][yIndex] = 1;
    return seed;
};
