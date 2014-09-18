exports.cellShouldSurvive = function (neighbours) {
    if (neighbours === 2 || neighbours === 3) {
        return true;
    }
    return false;
};

exports.cellShouldRevive = function (neighbours) {
    if (neighbours === 3) {
        return true;
    }
    return false;
};