const express = require('express');
const router = express.Router();

const { getIndex, postCheckAnswer } = require('../controllers/base.controller');

router.get('/', getIndex);
router.post('/', postCheckAnswer);

module.exports = {
	baseRouter: router,
};
