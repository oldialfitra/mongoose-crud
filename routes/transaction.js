const router = require('express').Router(),
    controllerTransaction = require('../controllers/transaction')

router.post('/', controllerTransaction.addTransaction)

router.get('/', controllerTransaction.getAllTransaction)

router.put('/:_id', controllerTransaction.updateTransaction)

router.delete('/:_id', controllerTransaction.deleteTransaction)

module.exports = router