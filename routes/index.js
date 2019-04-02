const router = require('express').Router(),
    routerBook = require('./book'),
    routerMember = require('./member'),
    routerTransaction = require('./transaction')

router.use('/books', routerBook)

router.use('/members', routerMember)

router.use('/transactions', routerTransaction)

module.exports = router