const swag = require('./../models/swag')

const getSwag = (req, res) => {
    res.status(200).send(swag)
}

module.exports = {
    getSwag
}