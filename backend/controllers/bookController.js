const path = require('path');
const fs = require("fs");
const Book = require('../models/book');
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require("../utils/cloudinary");
const { asyncHandler } = require('../middlewares/asyncHandler');

// method   POST 
// route    api/books
// desc     Create new book
// access   Private | admin
const createBook = asyncHandler(async(req, res) => {
    try{
        // Image Validation
        if (!req.file) {
            return res.status(400).json({ message: "no image provided" });
        }

        // Upload Photo
        const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
        const result = await cloudinaryUploadImage(imagePath);

        // Save new post in database
        const book = await Book.create({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            user: req.userId,
            image: {
                url: result.secure_url,
                publicId: result.public_id,
            },
            author: req.body.author,
            language: req.body.language,
            PublicationDate: req.body.PublicationDate,
        });

        // Send response to the client
        res.status(201).json(book);

        // 6. Remove image from the server
        fs.unlinkSync(imagePath);
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
    const limit = 6
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
    
    res.status(200).json({ message: "Book deleted successfully" })
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
    if (!req.file) {
        return res.status(404).json({ message: "No image provided" })
    } 

    const book = await Book.findById(req.params.id)
    if (!book) {
        return res.status(404).json({ message: "Book Not Found" })
    }

    // Delete Old Image from Cloudinary
    await cloudinaryRemoveImage(book.image.publicId)

    // Upload new Image
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
    const result = await cloudinaryUploadImage(imagePath);

    // Update Image Field in DB 
    const updateBook = await Book.findByIdAndUpdate(req.params.id, {
        $set: {
            image: {
                url: result.secure_url,
                publicId: result.public_id
            }
        }
    }, { new: true })

    res.status(200).json({ 
        data: updateBook, 
        message: "Image updated successfully" 
    });

    // Remove Image From Server
    fs.unlinkSync(imagePath)
})

module.exports = {
    createBook,
    getBooks,
    findBook, 
    deleteBook,
    updateBook,
    updateBookImage
}

