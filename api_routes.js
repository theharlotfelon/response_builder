const router = require('express').Router();
const responseController = require('./responseController');
const renderController = require('./routes/renderController');

// Set default API response
/*router.get('/', (req, res) => {
    res.json({
        status: 'API Working',
        message: 'Welcome to ResponseBuilder!'
    });
});*/

// API Routes
router.route('/responses')
    .get(responseController.index)
    //.post(responseController.new);

router.route('/responses/:_id')
    .get(responseController.view)
    .patch(responseController.update)
    .put(responseController.update)
    .delete(responseController.delete);

router.route('/user/:user_id/responses/')
    .get(responseController.viewAll);

module.exports = router;