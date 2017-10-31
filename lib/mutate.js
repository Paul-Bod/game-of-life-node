function randomIndex(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
}

exports.mutate = (seed) => {
    const xIndex = randomIndex(0, seed.length);
    const row = seed[xIndex];
    const yIndex = randomIndex(0, row.length);

    seed[xIndex][yIndex] = 1;
    return seed;
};
