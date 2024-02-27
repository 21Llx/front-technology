module.exports = function logger(options) {
  return async(ctx, next) => {
    await next();
  };
};
