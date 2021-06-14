const {OrderClothes} = require('../models/models')

const ApiError = require('../error/ApiError');

class orderController {
    async create(req, res) {
        const orderJSON = JSON.stringify(req.body)
        const order = OrderClothes.create({product: orderJSON})

        return res.json(order)
    }

    async getAll(req, res) {
        const order = await OrderClothes.findAll()
        /*const orderPars = JSON.parse(order)*/
        return res.json(
            order.map( (o) => ( {
                 ...JSON.parse(o.product),
                id: o.id

            }))
        )

    }

    async deleteOne(req, res) {

        const {id} = req.params
        const order = await OrderClothes.findOne(
            {
                where: {id}
            }
        )
        console.log('order',order)
        console.log('id',id)
        await order.destroy()
        return res.json(order)
    }
}

module.exports = new orderController()
