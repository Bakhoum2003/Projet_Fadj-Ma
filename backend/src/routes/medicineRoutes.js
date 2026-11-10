const express = require('express');
const protect = require('../middlewares/auth');
const validateObjectId = require('../middlewares/validateObjectId');
const controller = require('../controllers/medicineController');

const router = express.Router();
router.use(protect);
router.route('/').get(controller.getMedicines).post(controller.createMedicine);
router.route('/:id').get(validateObjectId, controller.getMedicine).put(validateObjectId, controller.updateMedicine).delete(validateObjectId, controller.deleteMedicine);

module.exports = router;
