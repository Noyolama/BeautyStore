const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { createCategory, getAllCategory, removeCategory } = require('../controllers/categoryController');
const router = express.Router();


router.route('/').post(protect, authorize('admin'), createCategory);
router.route('/').get(getAllCategory);
router.route('/:id').delete(protect, authorize('admin'), removeCategory);

module.exports = router;