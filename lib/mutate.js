const _ = require('lodash');

function randomIndex(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function createCoordinates(seed) {
    return seed.map((yval, yindex) => {
        return yval.map((xval, xindex) => {
            return {
                value: xval,
                yindex: yindex,
                xindex: xindex
            };
        });
    });
}

function expandCoordinates(yMax, xMax, coordinates) {
    return _.flatMap(coordinates, (coordinate) => {
        let newCoordinates = [];

        for (let y = coordinate.yindex-1; y <= coordinate.yindex+1; y++) {
            for (let x = coordinate.xindex-1; x <= coordinate.xindex+1; x++) {
                if (!(y === coordinate.yindex && x === coordinate.xindex)) {
                    newCoordinates.push({
                        yindex: y,
                        xindex: x
                    });
                }
            }
        }

        return newCoordinates;
    });
}

function turnOnRandomCell(seed) {
    const xIndex = randomIndex(0, seed.length);
    const row = seed[xIndex];
    const yIndex = randomIndex(0, row.length);

    seed[xIndex][yIndex] = 1;
    return seed;
}

exports.mutate = (seed) => {
    if (!_.flattenDeep(seed).includes(1)) {
        return turnOnRandomCell(seed);
    }
    else {
        const aliveCoordinates = _.flatten(createCoordinates(seed)).filter((coordinate) => coordinate.value === 1);

        const expandedCoordinates = expandCoordinates(seed.length, seed[0].length, aliveCoordinates);

        const randomCoordinate = expandedCoordinates[randomIndex(0, expandedCoordinates.length)];
        seed[randomCoordinate.yindex][randomCoordinate.xindex] = 1;

        return seed;
    }
};
