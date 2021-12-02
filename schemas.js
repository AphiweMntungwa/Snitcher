const Joi = require("joi");

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        location: Joi.string().required(),
        price: Joi.number().required().min(0),
        description: Joi.string()
    }).required(),
    // image: Joi.String()
});

module.exports.reviewSchema = Joi.object({
    campreview: Joi.object({
        rating: Joi.number().required(),
        body: Joi.string().required()
    }).required()
})