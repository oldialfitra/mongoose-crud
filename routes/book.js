const router = require('express').Router(),
    controllerBook = require('../controllers/book')

router.post('/', controllerBook.addBook)

router.get('/', controllerBook.getAllBooks)

router.put('/:_id', controllerBook.updateBook)

router.delete('/:_id', controllerBook.deleteMember)

module.exports = router