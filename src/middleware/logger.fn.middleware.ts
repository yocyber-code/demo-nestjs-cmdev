export function loggerFn(req, res, next) {
  console.log('xxx');
  next();
}
