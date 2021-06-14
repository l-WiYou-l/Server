const Router = require('express')
const router = new Router()
const clothesController = require('../controllers/clothesController')

router.post('/', clothesController.create)
router.get('/', clothesController.getAll)
router.get('/:id', clothesController.getOne)
router.delete('/:id', clothesController.deleteOne)

module.exports = router
