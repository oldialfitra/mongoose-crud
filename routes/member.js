const router = require('express').Router(),
    controllerMember = require('../controllers/member')

router.post('/', controllerMember.registerMember)

router.get('/', controllerMember.getAllMembers)

router.put('/:_id', controllerMember.updateMember)

router.delete('/:_id', controllerMember.deleteMember)

module.exports = router