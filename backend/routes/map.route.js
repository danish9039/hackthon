const express = require('express')
const { getNearbyPlaces } = require('../controller/map.controller')
const { sendSOSAlert } = require('../controller/twilo.controller')
const router = express.Router()
router.route('/nearby-places').post(getNearbyPlaces)
router.route('/sos').post(sendSOSAlert)

module.exports = router

