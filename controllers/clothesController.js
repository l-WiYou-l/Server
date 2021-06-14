

const uuid = require('uuid')
const path = require('path');
const {Clothes, ClothesInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class ClothesController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const clothes = await Clothes.create({name, price, brandId, typeId, info, img: fileName});
            return res.json(clothes)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let clothes1;
        if (!brandId && !typeId) {
            clothes1 = await Clothes.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            clothes1 = await Clothes.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            clothes1 = await Clothes.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            clothes1 = await Clothes.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(clothes1)
    }

    async getOne(req, res) {
        const {id} = req.params
        const clothes = await Clothes.findOne(
            {
                where: {id}
            },
        )
        return res.json(clothes)
    }
    async deleteOne(req, res) {

        const {id} = req.params
        const clothes = await Clothes.findOne(
            {
                where: {id}
            }
        )
        await clothes.destroy()
        return res.json(clothes)
}
}
module.exports = new ClothesController()
