const Joi = require("@hapi/joi");


module.exports = {
  categoryValidation: Joi.object({
    categoryName: Joi.string().required().empty().messages({
      "string.base": `first name should be a type of 'text'`,
      "string.empty": `Category is required.`,
      "any.required": `Category is required.`,
    }),
    discription: Joi.string().required().empty().messages({
      "string.base": `Discription should be a type of 'text'`,
      "string.empty": `Discription is required.`,
      "any.required": `Discription is required.`,
    })
  }),
  portfolioValidation: Joi.object({
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
  }),
  testnomialValidation: Joi.object({
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
  }),
  enquiryValidation: Joi.object({
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
  }),
  userValidation: Joi.object({
    username: Joi.string().required().empty().messages({
      "string.base": `Username should be a type of 'text'`,
      "string.empty": `Username is required.`,
      "any.required": `Username is required.`,
    }),
    password: Joi.string().required().empty().messages({
      "string.base": `Password should be a type of 'text'`,
      "string.empty": `Password is required.`,
      "any.required": `Password is required.`,
    }) ,
    firstname: Joi.string().required().empty().messages({
      "string.base": `Firstname should be a type of 'text'`,
      "string.empty": `Firstname is required.`,
      "any.required": `Firstname is required.`,
    }) ,
    lastname: Joi.string().required().empty().messages({
      "string.base": `Lastname should be a type of 'text'`,
      "string.empty": `Lastname is required.`,
      "any.required": `Lastname is required.`,
    }) ,
    contact: Joi.string().required().empty().messages({
      "string.base": `Contact should be a type of 'text'`,
      "string.empty": `Contact is required.`,
      "any.required": `Contact is required.`,
    }) ,
    email: Joi.string().required().empty().email().messages({
      "string.base": `Email should be a type of 'text'`,
      "string.empty": `Email is required.`,
      "string.email": `Email should be correct Format.`,
      "any.required": `Email is required.`,
    })  
  }),
  loginValidation: Joi.object({
    username: Joi.string().required().empty().messages({
      "string.base": `Username should be a type of 'text'`,
      "string.empty": `Username is required.`,
      "any.required": `Username is required.`,
    }),
    password: Joi.string().required().empty().min(6).messages({
      "string.base": `Password should be a type of 'text'`,
      "string.empty": `Password is required.`,
      "string.min": `Password should be of minimum 6 characters.`,
      "any.required": `Password is required.`,
    })
  }),
  forgotpasswordValidation: Joi.object({
    password: Joi.string().required().empty().min(6).messages({
      "string.base": `Password should be a type of 'text'`,
      "string.empty": `Password is required.`,
      "string.min": `Password should be of minimum 6 characters.`,
      "any.required": `Password is required.`,
    }),
    confirmPassword: Joi.string().required().empty().min(6).valid(Joi.ref('password')).messages({
      "string.base": `Confirm password should be a type of 'text'`,
      "string.empty": `Confirm password is required.`,
      "string.min": `Confirm password should be of minimum 6 characters.`,
      "any.only": `Password and Confirm password must me match.`,
      "any.required": `Confirm password is required.`,
    })
  }),
  changePasswordValidation: Joi.object({
    oldPassword: Joi.string().required().empty().min(6).messages({
      "string.base": `Old password should be a type of 'text'`,
      "string.empty": `Old password is required.`,
      "string.min": `Old password should be of minimum 6 characters.`,
      "any.required": `Old password is required.`,
    }),
    password: Joi.string().required().empty().min(6).messages({
      "string.base": `Password should be a type of 'text'`,
      "string.empty": `Password is required.`,
      "string.min": `Password should be of minimum 6 characters.`,
      "any.required": `Password is required.`,
    }),
    confirmPassword: Joi.string().required().empty().min(6).valid(Joi.ref('password')).messages({
      "string.base": `Confirm password should be a type of 'text'`,
      "string.empty": `Confirm password is required.`,
      "string.min": `Confirm password should be of minimum 6 characters.`,
      "any.only": `Password and Confirm password must me match.`,
      "any.required": `Confirm password is required.`,
    })
  })
  };