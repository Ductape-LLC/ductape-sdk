export const tagify = (str: string) => {
    return str.replace(/[^A-Z0-9]/gi, '_').toLowerCase();
}


const compareArrays = (arr1: Array<unknown>, arr2: Array<unknown>) => {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (!compareValues(arr1[i], arr2[i])) {
            return false;
        }
    }

    return true;
}



const compareValues = (value1: unknown, value2: unknown) => {
    if (typeof value1 === 'object' && typeof value2 === 'object') {
        return areObjectsEqual(value1, value2);
    } else if (Array.isArray(value1) && Array.isArray(value2)) {
        return compareArrays(value1, value2);
    } else {
        return value1 === value2;
    }
}

export const areObjectsEqual = (smallerObject: any, biggerObject: any) => {

    for (const key in smallerObject) {
        if (smallerObject.hasOwnProperty(key)) {
            if (
                !biggerObject.hasOwnProperty(key) ||
                !compareValues(smallerObject[key], biggerObject[key])
            ) {
                return false;
            }
        }
    }

    return true;
}

// Example usage:
/*const smallerObj = {
  key1: 'value1',
  key2: { subkey: 'subvalue', subarray: [1, 2, 3] },
};
 
const biggerObj = {
  key1: 'value1',
  key2: { subkey: 'subvalue', subarray: [1, 2, 3] },
  key3: 'value3',
};
 
const result = areObjectsEqual(smallerObj, biggerObj);
console.log(result); // Output: true
*/