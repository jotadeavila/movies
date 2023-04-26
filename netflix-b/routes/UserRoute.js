const {addToLikedMovies, getLikedMovies, removeFromLikedMovie} = require('../controllers/UserController')

const router = require('express').Router()

router.post('/add', addToLikedMovies)
router.get('/liked/:email', getLikedMovies)
router.put('/remove', removeFromLikedMovie)

module.exports = router