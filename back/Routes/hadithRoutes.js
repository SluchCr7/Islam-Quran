const {getHadiths, getAllHadithsByBukhary , getHadithsByMuslim , getHadithsByTirmidhi} = require('../Controller/HadithController')

const router = require('express').Router()

router.get('/all', getHadiths)

router.get('/bukhary', getAllHadithsByBukhary)

router.get('/muslim', getHadithsByMuslim)

router.get('/tirmidhi', getHadithsByTirmidhi)
module.exports = router