exports.cellShouldSurvive = function (neighbours) {
    if (neighbours === 2 || neighbours === 3) {
        return true;
    }
    return false;
};