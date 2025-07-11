const Book = require('../models/book');
const User = require('../models/user');
const { cloudinaryRemoveImage, cloudinary } = require("../utils/cloudinary");
const { asyncHandler } = require('../middlewares/asyncHandler');

// method   POST 
// route    api/books
// desc     Create new book
// access   Private | admin
const createBook = asyncHandler(async(req, res) => {
    try{
        // Image Validation
        const image = req.file
        if (!image) {
            return res.status(400).json({ message: "no image provided" });
        }

        // Upload Photo
        const base64 = image.buffer.toString("base64")
        const mimeType = image.mimetype;
        const uploadResponse = await cloudinary.uploader.upload(
            `data:${mimeType};base64,${base64}`,
        );

        // Save new post in database
        const book = await Book.create({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            user: req.userId,
            image: {
                url: uploadResponse.secure_url,
                publicId: uploadResponse.public_id,
            },
            author: req.body.author,
            language: req.body.language,
            PublicationDate: req.body.PublicationDate,
        });

        // Send response to the client
        res.status(201).json(book);
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
});

// method   GET 
// route    api/books
// desc     Get all books
// access   Public
const getBooks = asyncHandler(async(req, res) => {
    const page = req.query?.page || 1
    const limit = 3
    const skip = (page - 1) * limit
    const movies = await Book.find().select('-reviews').skip(skip).limit(limit)
    const total = await Book.countDocuments()
    const pages = Math.ceil(total/limit)
    res.json({
        success: true,
        pages,
        data: movies
    })
})

// method   GET 
// route    api/books/:id
// desc     Find a book
// access   Private | auth
const findBook = asyncHandler(async(req, res) => {
    const book = await Book.findById(req.params.id)
    // Book Check
    if (!book) {
        return res.status(404).json({ message: "Book Not Found" })
    }

    res.status(200).json(book)
})

// method   DELETE 
// route    api/books/:id
// desc     Delete a book
// access   Private | admin
const deleteBook = asyncHandler(async(req, res) => {
    const book = await Book.findById(req.params.id)
    // Book Check
    if (!book) {
        return res.status(404).json({ message: "Book Not Found" })
    }
    // Delete Book from DB
    await Book.findByIdAndDelete(req.params.id);
    // Delete Book from Cloudinary
    await cloudinaryRemoveImage(book.image.publicId);
    
    res.status(200).json({ message: "Book deleted successfully", bookId: req.params.id })
})

// method   PUT 
// route    api/books/:id
// desc     Update a book
// access   Private | admin
const updateBook = asyncHandler(async(req, res) => {
    const book = await Book.findById(req.params.id)
    // Book Check
    if (!book) {
        return res.status(404).json({ message: "Book Not Found" })
    }
    // Update Book
    const updateBook = await Book.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            author: req.body.author,
            language: req.body.language,
            PublicationDate: req.body.PublicationDate,
        }
    }, { new: true })
    res.status(200).json({ 
        data: updateBook, 
        message: "Book updated successfully" 
    });
})

// method   PUT 
// route    api/books/update-image/:id
// desc     Update book Image
// access   Private | admin
const updateBookImage = asyncHandler(async(req, res) => {
    // Book Image Check
    const image = req.file
    if (!image) {
        return res.status(404).json({ message: "No image provided" })
    } 

    const book = await Book.findById(req.params.id)
    if (!book) {
        return res.status(404).json({ message: "Book Not Found" })
    }

    // Delete Old Image from Cloudinary
    await cloudinaryRemoveImage(book.image.publicId)

    // Upload new Image
    const base64 = image.buffer.toString('base64')
    const mimeType = image.mimetype
    const uploadResponse = await cloudinary.uploader.upload(
        `data:${mimeType};base64,${base64}`,
    );

    // Update Image Field in DB 
    const updateBook = await Book.findByIdAndUpdate(req.params.id, {
        $set: {
            image: {
                url: uploadResponse.secure_url,
                publicId: uploadResponse.public_id
            }
        }
    }, { new: true })

    res.status(200).json({ 
        data: updateBook, 
        message: "Image updated successfully" 
    });
})

// method   POST 
// route    api/books/:id/reviews
// desc     Add a book review
// access   Private | auth
const addReview = asyncHandler(async(req, res) => {
    const { id } = req.params
    const { comment, rate } = req.body
    const book = await Book.findById(id)
    const user = await User.findById(req.userId)

    if (!book) {
        return res.status(404).json({ message: "Book Not Found" })
    }
    const isRated = book.reviews.findIndex(m => m.user == req.userId)
    if (isRated > -1){
        return res.status(403).send({ message: "Review Is Already Added" });
    }
    const totalRate = book.reviews.reduce((sum, review) => sum + review.rate ,0)  
    const finalRate = (totalRate + rate) / (book.reviews.length + 1)

    await Book.updateOne(
        { _id: id } ,
        {
            $push: {
                reviews: {
                    user: req.userId,
                    username: user.name,
                    comment,
                    rate
                }
            },
            $set: {
                rate: finalRate
            }
        }
    )

    res.status(201).json({ message: "Review added successfully" })    
})

// method   GET 
// route    api/books/:id/reviews
// desc     Get a book review
// access   Public
const getReviews = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
        return res.status(404).json({ message: "Book Not Found" })
    }

    res.status(200).json(book.reviews)
})

module.exports = {
    createBook,
    getBooks,
    findBook, 
    deleteBook,
    updateBook,
    updateBookImage,
    addReview,
    getReviews
}

