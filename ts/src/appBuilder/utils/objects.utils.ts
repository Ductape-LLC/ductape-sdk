export const CleanObj = (
    obj: Record<string, any>,
    keysToExclude: Array<string>,
  ) => {
    const cleaned = Object.fromEntries(
      Object.entries(obj).filter(([key]) => !keysToExclude.includes(key)),
    );

    return cleaned;
  };