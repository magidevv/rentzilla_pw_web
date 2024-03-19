export function objectMatch(obj1: object, obj2: object): boolean {
  for (const key in obj1) {
    if (Object.prototype.hasOwnProperty.call(obj1, key)) {
      if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
        console.log(`Property ${key} missing in obj2`);
        return false;
      }
      if (typeof obj1[key] === "object" && !Array.isArray(obj1[key])) {
        if (!objectMatch(obj1[key], obj2[key])) {
          return false;
        }
      } else if (Array.isArray(obj1[key])) {
        if (!arraysMatch(obj1[key], obj2[key])) {
          return false;
        }
      } else if (obj1[key] !== obj2[key]) {
        console.log(
          `Property ${key} does not match: ${obj1[key]} !== ${obj2[key]}`
        );
        return false;
      }
    }
  }
  return true;
}

function arraysMatch(arr1: any[], arr2: any[]): boolean {
  if (arr1.length !== arr2.length) {
    console.log(
      `Array lengths do not match: ${arr1.length} !== ${arr2.length}`
    );
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (typeof arr1[i] === "object" && !Array.isArray(arr1[i])) {
      if (!objectMatch(arr1[i], arr2[i])) {
        return false;
      }
    } else if (Array.isArray(arr1[i])) {
      if (!arraysMatch(arr1[i], arr2[i])) {
        return false;
      }
    } else if (arr1[i] !== arr2[i]) {
      console.log(
        `Array item at index ${i} does not match: ${arr1[i]} !== ${arr2[i]}`
      );
      return false;
    }
  }
  return true;
}
