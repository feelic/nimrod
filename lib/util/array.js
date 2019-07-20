module.exports = {
  arrayIndexDiff: (arr, a, b) => {
    const idxA = arr.indexOf(a);
    const idxB = arr.indexOf(b);

    if (idxA === -1) {
      throw new Error(`Parameter "${a}" not in array`);
    }
    if (idxB === -1) {
      throw new Error(`Parameter "${b}" not in array`);
    }

    return Math.abs(idxA - idxB);
  },
};
