const router = require('express').Router();
const renderController = require('./renderController');

// Page Render Routes
router.route('/')
    .get(renderController.index);
router.route('/responses/add')
    .get(renderController.pageResponse)
    .post(renderController.addResponse)

module.exports = router;