const Router = require('express')
const router = new Router()
const clothesController = require('../controllers/clothesController')
const orderController = require('../controllers/orderController')

router.post('/', orderController.create)
router.get('/',orderController.getAll)
router.delete('/:id', orderController.deleteOne)


module.exports = router
