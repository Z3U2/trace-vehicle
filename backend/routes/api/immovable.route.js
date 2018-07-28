const express = require('express'),
    router = express.Router(),
    immovableController = require('../../controllers/immovable.controller');



router.get('/', immovableController.getImmovables)

router.get('/:id', immovableController.getImmovable)

router.post('/', immovableController.createImmovable)

module.exports = router