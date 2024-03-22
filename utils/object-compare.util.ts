/**
 * Compares properties of two objects to determine if they match.
 * @param obj1 The first object to compare.
 * @param obj2 The second object to compare.
 * @returns A boolean indicating whether the properties of the objects match.
 */
export function objectMatch(obj1: any, obj2: any): boolean {
  // Iterate through each key in obj1
  for (const key in obj1) {
    // Check if the key exists in obj1
    if (key in obj1) {
      // If the key is missing in obj2, throw an error
      if (!(key in obj2)) {
        throw new Error(`Property ${key} missing in obj2`);
      }
      // If the value of the property in obj1 is an object (and not an array), recursively compare
      if (typeof obj1[key] === "object" && !Array.isArray(obj1[key])) {
        if (!objectMatch(obj1[key], obj2[key])) {
          return false;
        }
        // If the value of the property in obj1 is an array, call the function to compare arrays
      } else if (Array.isArray(obj1[key])) {
        if (!arraysMatch(obj1[key], obj2[key])) {
          return false;
        }
        // If the values of the properties do not match, throw an error
      } else if (obj1[key] !== obj2[key]) {
        throw new Error(
          `Property ${key} does not match: ${obj1[key]} !== ${obj2[key]}`
        );
      }
    }
  }
  // If all properties match, return true
  return true;
}

/**
 * Compares two arrays to determine if their elements match.
 * @param arr1 The first array to compare.
 * @param arr2 The second array to compare.
 * @returns A boolean indicating whether the elements of the arrays match.
 */
function arraysMatch(arr1: any[], arr2: any[]): boolean {
  // Check if the lengths of the arrays match
  if (arr1.length !== arr2.length) {
    throw new Error(
      `Array lengths do not match: ${arr1.length} !== ${arr2.length}`
    );
  }
  // Iterate through each element of the arrays for comparison
  for (let i = 0; i < arr1.length; i++) {
    // If the element is an object, recursively compare
    if (typeof arr1[i] === "object" && !Array.isArray(arr1[i])) {
      if (!objectMatch(arr1[i], arr2[i])) {
        return false;
      }
      // If the element is an array, call the function to compare arrays
    } else if (Array.isArray(arr1[i])) {
      if (!arraysMatch(arr1[i], arr2[i])) {
        return false;
      }
      // If the elements do not match, throw an error
    } else if (arr1[i] !== arr2[i]) {
      throw new Error(
        `Array item at index ${i} does not match: ${arr1[i]} !== ${arr2[i]}`
      );
    }
  }
  // If all elements of the arrays match, return true
  return true;
}
