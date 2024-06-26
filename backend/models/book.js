const mongoose = require('mongoose')

const ModelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        default: {
          url: "",
          publicId: null,
        }
    },
    author: {
        type: String,
        required: true
    },
    language: {
        type: String,
    },
    PublicationDate: {
        type: Date,
    },
    rate: {
        type: Number,
        default: 0
    },
    reviews: {
        type: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                username: {
                    type: String,
                    required: true,
                },
                comment: String,
                rate: Number
            }
        ],
        default: []
    }
}, {
    timestamps: true
})

ModelSchema.set('toJSON', {
    virtuals: true,
    versionKey: false, 
    transform: (doc, ret) => {
        delete ret._id 
    }
})

const Model = mongoose.model('Book', ModelSchema);

module.exports = Model