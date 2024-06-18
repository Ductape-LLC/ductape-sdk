export const validateObjectKeys = (allowedKeys: Array<string>, obj: Record<string, any>): void => {
    const objKeys = Object.keys(obj);
  
    const missingKeys = allowedKeys.filter(key => !objKeys.includes(key));
    const extraKeys = objKeys.filter(key => !allowedKeys.includes(key));
  
    if (missingKeys.length > 0 || extraKeys.length > 0) {
      throw new Error(`Invalid keys. Missing keys: ${missingKeys.join(', ')}. Extra keys: ${extraKeys.join(', ')}`);
    }
  };

export const deepEqual = (obj1: any, obj2: any): boolean => {
    // Check if both objects are of the same type
    if (typeof obj1 !== typeof obj2) {
      return false;
    }
  
    // If both objects are arrays
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) {
        return false;
      }
      for (let i = 0; i < obj1.length; i++) {
        if (!deepEqual(obj1[i], obj2[i])) {
          return false;
        }
      }
      return true;
    }
  
    // If both objects are objects
    if (typeof obj1 === 'object' && typeof obj2 === 'object') {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      if (keys1.length !== keys2.length) {
        return false;
      }
      for (const key of keys1) {
        if (!obj2.hasOwnProperty(key) || !deepEqual(obj1[key], obj2[key])) {
          return false;
        }
      }
      return true;
    }
  
    // For primitive types, compare directly
    return obj1 === obj2;
  }