VECTOR METHODS
------------------------------------------------------------------------------------------------------------------------

Optimized methods for working with Float64Array vectors with length of 64 elements.

- getVectorDistance(v1, v2, maxValue) - calculate distance between two vectors (without extracting square root)
- getMultipleVectorsDistance(registeredVectors, candidateVectors) - find minimum distance between two arrays of vectors
- getRandomVector() - generate random vector with length of 64 elements
- addVectorToVector(sumV, v) - add second vector to first and returns first vector (vector is modified, not copied)
- divideVectorByConstant(v, c) - add constant to vector (vector is modified, not copied)
- squareVector(v) - multiply vector to itself (vector is modified, not copied)
- calculateCentroid(ls, n) - calculate centroid vector from linear sum vector (not array of vectors) and count of vectors
- findNearest(arr, findV) - find nearest vector to findV in array
- findTopNearest(arr, findV, topCount) - find top N vectors nearest to findV in array