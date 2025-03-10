// 1. Bubble Sort Function
// This function takes an array of numbers as input and sorts it from lowest to highest using the Bubble Sort algorithm.
function bubbleSort(arr) {
    let n = arr.length;
    // Outer loop: iterate over the entire array
    for (let i = 0; i < n - 1; i++) {
      // Inner loop: compare adjacent elements
      for (let j = 0; j < n - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          // Swap if the current element is greater than the next
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  }
  
  // Example usage:
  const unsortedArray = [5, 6, 1, 3, 4, 2];
  console.log("BubbleSort Result:", bubbleSort(unsortedArray)); // Expected output: [1, 2, 3, 4, 5, 6]
  

  // 2. Staircase Problem (Using Loops)
  // This function takes an integer n and logs a step-shaped staircase with n levels using the '#' character.
  function steps(n) {
    for (let i = 1; i <= n; i++) {
      let stair = "";
      // Build each level with the appropriate number of '#' characters.
      for (let j = 1; j <= i; j++) {
        stair += "#";
      }
      console.log(stair);
    }
  }
  
  // Example usage:
  console.log("\nStaircase for 2 levels:");
  steps(2);
  
  console.log("\nStaircase for 3 levels:");
  steps(3);
  

  // 3. Cylinder Volume Using Object Classes
  // This class represents a Cylinder. It calculates the volume using the formula:
  // Volume = π * r^2 * h
  // The volume is returned with 4 decimal places.
  class Cylinder {
    constructor(radius, height) {
      this.radius = radius;
      this.height = height;
    }
  
    volume() {
      const vol = Math.PI * Math.pow(this.radius, 2) * this.height;
      // toFixed returns a string; if a number is needed, you can convert it using parseFloat(vol.toFixed(4))
      return vol.toFixed(4);
    }
  }
  
  // Example usage:
  const cylinder = new Cylinder(3, 5); // radius = 3, height = 5
  console.log("\nCylinder Volume:", cylinder.volume());
  