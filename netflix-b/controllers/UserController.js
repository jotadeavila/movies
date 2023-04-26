const User = require('../models/UserModel')

module.exports.addToLikedMovies = async (req, res) => {
    try {
        const {email, data} = req.body
        const user = await User.findOne({'email': email})
        console.log(user)
        if(user){
            const {likedMovie} = user
            const movieAlreadyLiked = likedMovie.find(({id}) => id === data.id) 
            if(!movieAlreadyLiked){
                await User.findByIdAndUpdate(
                    user._id,
                    {
                        likedMovie: [...user.likedMovie, data]
                    },
                    {
                        new: true
                    }
                )
            }else return res.json({msg: 'Movie already adding to the like list'})
        }else await User.create({email, likedMovie: [data]})
        return res.json({msg: 'Movie added successfully'})
    } catch (error) {
        console.log(error)
        return res.json({msg: 'Error adding movie'})
    }
}

module.exports.getLikedMovies = async (req, res) => {
    console.log(req.body)
    try {
        const {email} = req.params
        const user = await User.findOne({'email': email})
        console.log(user)
        if(user){
            return res.json({msg: 'success', movies: user.likedMovie})
        }else return res.json({msg: 'Email no encontrado'})
    } catch (error) {
        return res.json({msg: 'Error al buscar'})
    }
} 

module.exports.removeFromLikedMovie = async (req, res) => {
        try {
            const {email, movieId} = req.body
            const user = await User.findOne({'email': email})
            if(user){
                const {likedMovie} = user
                const movieIndex = likedMovie.findIndex(({id}) => id === movieId) 
                if(!movieIndex) res.status(400).send({msg:'No encontrada'})
                likedMovie.splice(movieIndex, 1)
                    await User.findByIdAndUpdate(
                        user._id,
                        {
                            likedMovie
                        },
                        {
                            new: true
                        }
                    )
                return res.json({msg: 'Borrada', movies:likedMovie})
            }
    } catch (error) {
        return res.json({msg: 'Error al borrar', movies:likedMovie})
    }
}
