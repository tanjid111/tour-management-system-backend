const mongoose = require('mongoose');

//schema design

const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this product."],
        trim: true, //removes blank space before and after
        unique: [true, "Name must be unique"],
        minLength: [3, "Name must be atleast 3 characters."],
        maxLength: [100, "Name is too large"]
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price cannot be negative"]
    },
    image: {
        type: String,
        required: [true, "Please provide a image url for this product."],
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "quantity can't be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true
                } else {
                    return false
                }
            }
        },
        message: "Quantity must be an integer"
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["Available", "Not-Available"],
            message: "status can't be {VALUE}"
        }
    },
    viewCount: {
        type: Number
    }
}, {
    timestamps: true,
})

tourSchema.pre('save', function (next) {
    if (this.quantity == 0) {
        this.status = 'Not-Available'
    }
    next()
})

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour;