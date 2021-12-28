const Joi = require("joi");

module.exports.campgroundSchema = Joi.object({
    thought: Joi.object({
        title: Joi.string().required(),
        media: Joi.array(),
        description: Joi.string().required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    campreview: Joi.object({
        rating: Joi.number().required(),
        body: Joi.string().required()
    }).required()
})