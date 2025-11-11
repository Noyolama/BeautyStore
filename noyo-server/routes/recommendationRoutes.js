const express = require('express');
const router = express.Router();
const {
    recommendByProduct,
    recommendByUser,
    precompute
} = require('../controllers/recommendController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/product/:id').get(recommendByProduct);
router.route('/user').get(protect, recommendByUser);
router.route('/precompute').get(protect, authorize('admin'), precompute);

module.exports = router;
