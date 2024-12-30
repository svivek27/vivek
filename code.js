// Import required modules
const fs = require("fs");

// Function to decode y values based on base
function decodeValue(base, value) {
  return parseInt(value, base);
}

// Lagrange Interpolation to find the constant term (c)
function lagrangeInterpolation(points) {
  let c = 0;
  for (let i = 0; i < points.length; i++) {
    let [x_i, y_i] = points[i];
    let term = y_i;
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        let [x_j] = points[j];
        term *= -x_j / (x_i - x_j);
      }
    }
    c += term;
  }
  return Math.round(c);
}

// Function to process a test case
function processTestCase(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const { n, k } = data.keys;
  const points = [];

  for (const key in data) {
    if (key !== "keys") {
      const x = parseInt(key);
      const y = decodeValue(parseInt(data[key].base), data[key].value);
      points.push([x, y]);
    }
  }

  // Ensure we use only k points
  const selectedPoints = points.slice(0, k);
  return lagrangeInterpolation(selectedPoints);
}

// Process both test cases
const secret1 = processTestCase("test_1.json");
const secret2 = processTestCase("test_2.json");

// Print results
console.log("Secret for TestCase 1:", secret1);
console.log("Secret for TestCase 2:", secret2);