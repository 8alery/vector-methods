const VECTOR_LENGTH = 64;

module.exports.getVectorDistance = (v1, v2, maxValue) => {

    let dist = 0;

    for (let i = 0; i < VECTOR_LENGTH; i += 4) {
        const diff1 = v1[i] - v2[i];
        const diff2 = v1[i + 1] - v2[i + 1];
        const diff3 = v1[i + 2] - v2[i + 2];
        const diff4 = v1[i + 3] - v2[i + 3];

        dist += diff1 * diff1 + diff2 * diff2 + diff3 * diff3 + diff4 * diff4;

        if (dist >= maxValue) {
            return dist;
        }
    }

    return dist;
};

module.exports.getMultipleVectorsDistance = (registeredVectors, candidateVectors) => {
    let minDistance = Number.MAX_VALUE;
    for (let cv of candidateVectors){
        for (let gv of registeredVectors){
            const distance = module.exports.getVectorDistance(cv, gv, Number.MAX_VALUE);
            if (distance < minDistance){
                minDistance = distance;
            }
        }
    }
    return minDistance;
};

module.exports.getRandomVector = () => {
    const v = new Float64Array(VECTOR_LENGTH);
    for (let j = 0; j < v.length; j++) {
        v[j] = Math.random();
    }
    return v;
};

module.exports.addVectorToVector = (sumV, v) => {

    for (let i = 0; i < VECTOR_LENGTH; i += 4){
        sumV[i] += v[i];
        sumV[i + 1] += v[i + 1];
        sumV[i + 2] += v[i + 2];
        sumV[i + 3] += v[i + 3];
    }
    return sumV;
};

module.exports.divideVectorByConstant = (v, c) => {

    for (let i = 0; i < VECTOR_LENGTH; i += 4){
        v[i] /= c;
        v[i + 1] /= c;
        v[i + 2] /= c;
        v[i + 3] /= c;
    }

    return v;
};

module.exports.squareVector = (v) => {

    for (let i = 0; i < VECTOR_LENGTH; i += 4){
        v[i] *= v[i];
        v[i + 1] *= v[i + 1];
        v[i + 2] *= v[i + 2];
        v[i + 3] *= v[i + 3];
    }

    return v;
};

module.exports.calculateCentroid = (ls, n) => {
    const result = new Float64Array(VECTOR_LENGTH);
    for (let i = 0; i < VECTOR_LENGTH; i += 4){
        result[i] = ls[i] / n;
        result[i + 1] = ls[i + 1] / n;
        result[i + 2] = ls[i + 2] / n;
        result[i + 3] = ls[i + 3] / n;
    }
    return result;
};

module.exports.findNearest = (arr, findV) => {

    let nearest = null;
    let minDist = new Float64Array([Number.MAX_VALUE])[0];

    for (let j = 0; j < arr.length; j++) {
        const item = arr[j];
        const dist = module.exports.getVectorDistance(findV, item, minDist);

        if (!nearest || dist < minDist) {
            nearest = item;
            minDist = dist;
        }
    }

    return { vector: nearest, distance: minDist };
};

module.exports.findTopNearest = (arr, findV, topCount) => {
    let top = arr
        .slice(0, topCount)
        .map(item => ({ vector: item, distance: module.exports.getVectorDistance(findV, item, Number.MAX_VALUE) }))
        .sort((a, b) => a.distance - b.distance);

    let badMinDist = top[top.length - 1].distance;

    for (let j = top.length; j < arr.length; j++) {
        const item = arr[j];
        const dist = module.exports.getVectorDistance(findV, item, badMinDist);

        if (dist < badMinDist) {
            const newItem = { distance: dist, vector: item };

            // Находим индекс, куда вставить новый элемент, можно заменить бинарным поиском, но вроде так быстрее все же
            // на маленьких массивах
            // let index = _.sortedIndexBy(top, newItem, 'distance');
            let index = 0;
            for (let i = 0; i < top.length; i++) {
                if (top[i].distance > dist) {
                    index = i;
                    break;
                }
            }

            top.splice(index, 0, newItem);
            top.length = topCount;
            badMinDist = top[topCount - 1].distance;
        }
    }

    return top;
};