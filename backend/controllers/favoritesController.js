const { asyncHandler } = require('../middlewares/asyncHandler');
const Book = require('../models/book');
const User = require('../models/user');

// method   POST 
// route    api/favoriteList
// desc     Add to favorite books
// access   Private | auth
const addToFavorites = asyncHandler(async(req, res) => {
    const { book, favorite } = req.body;
    const user = await User.findById(req.userId);

    const index = user.watchList.findIndex(e => e.book == book);
    if(index > -1) {
        user.favoriteList[index].favorite = favorite
    } else{
        user.favoriteList.push({ book, favorite })
    };

    await user.save();

    res.json({
        success: true
    });
})

// method   DELETE 
// route    api/favoriteList/:id
// desc     Remove from favorites
// access   Private | auth
const deleteFromFavorites = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(req.userId);

    user.watchList = user.favoriteList.filter(e => e.id != id)
    await user.save()

    res.json({
        success: true
    });
})

// method   GET 
// route    api/favoriteList
// desc     Get favorite books
// access   Private | auth
const getFavorites = asyncHandler(async(req, res) => {
    const user = await User.findById(req.userId)
        .select('-watchList._id')
        .populate('favoriteList.book', ['name', 'category', 'rate', 'image'])

    res.json({
        success: true,
        data: user.favorite
    })
})

module.exports = {
    addToFavorites,
    deleteFromFavorites,
    getFavorites
}