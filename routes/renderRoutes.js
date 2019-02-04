const router = require('express').Router();
const renderController = require('./renderController');

// Page Render Routes
router.route('/')
    .get(renderController.index);
router.route('/response/add')
    .get(renderController.pageResponse)
    .post(renderController.addResponse)
router.route('/response/:id')
    .get(renderController.getById)
router.route('/response/edit/:id')
    .get(renderController.editResponse)
    .post(renderController.update)
router.route('/response/delete/:id')
    .post(renderController.delete)

module.exports = router;