const { expect } = require('chai');
const _ = require('lodash');
const vectorMethods = require('../index');

describe('vectorMethods', function () {

    const testVector01 = new Float64Array(_.map(_.range(64), i => 0.1));

    const distance1 = vectorMethods.getVectorDistance(testVector01, testVector01, Number.MAX_VALUE);

    it('distance between equal vectors should be zero', function () {
        expect(distance1).to.equal(0)
    })

    const testVector10 = new Float64Array(_.map(_.range(64), i => 1.0));
    const testVector0 = new Float64Array(_.map(_.range(64), i => 0.0));

    const distance2 = vectorMethods.getVectorDistance(testVector10, testVector0);

    it('distance between vectors of 0 and 1 should be 64', function () {
        expect(distance2).to.equal(64)
    })

    const testVector04 = new Float64Array(_.map(_.range(64), i => 0.4));

    const distance3 = vectorMethods.getMultipleVectorsDistance([testVector01, testVector04], [testVector04, testVector10]);
    it('min distance between arrays of vectors with same vector should be 0', function () {
        expect(distance3).to.equal(0)
    })

    const randomVector = vectorMethods.getRandomVector();
    it('random vector should be Float64Array', function () {
        expect(randomVector).to.be.a('float64array');
    })

    const testVector03 = new Float64Array(_.map(_.range(64), i => 0.3));
    const sumVector = vectorMethods.addVectorToVector(testVector03, testVector01);
    const distance4 = vectorMethods.getVectorDistance(sumVector, testVector04);
    it('sum vector of 0.1 and 0.3 should have zero distance with vector 0.4', function () {
        expect(distance4).to.equal(0);
    })

    const dividedVector = vectorMethods.divideVectorByConstant(new Float64Array(_.map(_.range(64), i => 0.4)), 4);
    const distance5 = vectorMethods.getVectorDistance(dividedVector, testVector01);
    it('vector of 0.4 divided by 4 should have zero distance with vector 0.1', function () {
        expect(distance5).to.equal(0);
    })

    const squareVector = vectorMethods.squareVector(new Float64Array(_.map(_.range(64), i => 2)))
    const testVector40 = new Float64Array(_.map(_.range(64), i => 4))
    const distance6 = vectorMethods.getVectorDistance(squareVector, testVector40);
    it('squared vector of 2 should have zero distance with vector 4', function () {
        expect(distance6).to.equal(0);
    })

    const linearSum = vectorMethods.addVectorToVector(new Float64Array(64), testVector10);
    const testVector20 = new Float64Array(_.map(_.range(64), i => 2));
    vectorMethods.addVectorToVector(linearSum, testVector20);
    const testVector30 = new Float64Array(_.map(_.range(64), i => 3));
    vectorMethods.addVectorToVector(linearSum, testVector30);

    const centroid = vectorMethods.calculateCentroid(linearSum, 3);
    const distance7 = vectorMethods.getVectorDistance(centroid, testVector20);
    it('centroid of 3 vector of 1, 2 and 3 should have zero distance with vector 2', function () {
        expect(distance7).to.equal(0);
    })

    const testVector50 = new Float64Array(_.map(_.range(64), i => 5));

    const nearest = vectorMethods.findNearest([testVector0, testVector10, testVector20, testVector30, testVector40, testVector50], testVector30);
    it('nearest vector of 0,1,2,3,4,5 for vector 3 should be vector 3 with distance 0', function ()  {
        expect(nearest).to.be.an('object');
        expect(nearest.vector).to.equal(testVector30);
        expect(nearest.distance).to.equal(0);
    })

    const top3Nearest = vectorMethods.findTopNearest([testVector0, testVector30, testVector40, testVector50], testVector30, 3);
    it('top 3 nearest vector of 0,3,4,5 for vector 3 should be vectors 3, 4 and 5', function ()  {
        expect(top3Nearest).to.be.an('array').to.have.lengthOf(3);
        expect(top3Nearest[0].vector).to.equal(testVector30);
        expect(top3Nearest[1].vector).to.equal(testVector40);
        expect(top3Nearest[2].vector).to.equal(testVector50);
    })


});