let isBetween = (a, b, c) => {
  let min = Math.min(a, b, c);
  let max = Math.max(a, b, c);
  return min !== a && max !== a;
};

module.exports = { isBetween };
