module.exports = (app) => {
  const { router, controller } = app;
  let logger = app.middleware.logger({
    xx:"log"
  })
  router.get('/home',logger, controller.home.getList);
  router.post('/file', controller.home.uploadFile);
  router.post('/sql', controller.home.sqlApi);
  router.post('/testget', controller.home.testGet);
  router.post('/testpost', controller.home.testPost);
};