const Joi = require("@hapi/joi");

function categoryValidation(req) {
  const schema = Joi.object({
    categoryname: Joi.string().required().empty().messages({
      "string.base": `Category should be a type of 'text'`,
      "string.empty": `Category is required.`,
      "any.required": `Category is required.`,
    }),
    description: Joi.string().required().empty().messages({
      "string.base": `Discription should be a type of 'text'`,
      "string.empty": `Discription is required.`,
      "any.required": `Discription is required.`,
    })
  })
  return schema.validate(req);
}

function PortfolioValidation(req) {
  const schema = Joi.object({
    projectName: Joi.string().required().empty().messages({
      "string.base": `Project name should be a type of 'text'`,
      "string.empty": `Project name is required.`,
      "any.required": `Project name is required.`,
    }),
    projectCategory: Joi.string().required().empty().messages({
      "string.base": `Project category should be a type of 'text'`,
      "string.empty": `Project category is required.`,
      "any.required": `Project category is required.`,
    }),
    discription: Joi.string().required().empty().messages({
      "string.base": `Discription should be a type of 'text'`,
      "string.empty": `Discription is required.`,
      "any.required": `Discription is required.`,
    })
  })
  return schema.validate(req);
}

function TestnomialValidation(req) {
  const schema = Joi.object({
    clientName: Joi.string().required().empty().messages({
      "string.base": `Client name should be a type of 'text'`,
      "string.empty": `Client name is required.`,
      "any.required": `Client name is required.`,
    }),
    feedback: Joi.string().required().empty().messages({
      "string.base": `Feedback should be a type of 'text'`,
      "string.empty": `Feedback is required.`,
      "any.required": `Feedback is required.`,
    })
  })
  return schema.validate(req);
}

function EnquiryValidation(req) {
    const schema = Joi.object({
        firstname: Joi.string().required().empty().messages({
            "string.base": `Firstname should be a type of 'text'.`,
            "string.empty": `Firstname is required`,
            "any.required": `Firstname is required.`
        }),
        lastname: Joi.string().required().empty().messages({
            "string.base": `Lastname should be a type of 'text'.`,
            "string.empty": `Lastname is required`,
            "any.required": `Lastname is required.`
        }),
        email: Joi.string().required().empty().email().messages({
            "string.base": `Email should be a type of 'text'.`,
            "string.empty": `Email is required`,
            "string.email": `Email format not valid`,
            "any.required": `Email is required.`
        }),
        mobileNo: Joi.string().required().empty().messages({
            "string.base": `Mobile number should be a type of 'number'.`,
            "string.empty": `Mobile number is required`,
            "any.required": `Mobile number is required.`
        }),
        comment: Joi.string().required().empty().messages({
            "string.base": `Comment should be a type of 'text'.`,
            "string.empty": `Comment is required`,
            "any.required": `Comment is required.`
        })
    })
    return schema.validate(req);
}

module.exports = {
  categoryValidation,
  PortfolioValidation,
  TestnomialValidation,
  EnquiryValidation
};