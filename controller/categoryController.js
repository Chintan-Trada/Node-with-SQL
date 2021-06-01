const { GeneralError, NotFound, BadRequest } = require('../middleware/error');
const { GeneralResponse } = require('../middleware/response');
const Category = require('../models/category.modal');


exports.findAll = async (req, res, next) => {
    try {
        await Category.findAll((err, category) => {
            if (err) {
                next(new NotFound('Not found category'))
            }
            else if (category.length === 0) {
                next(new NotFound('Not found category'))
            }
            else {
                // console.log(category)
                next(new GeneralResponse('Category', category))
            }
        })
    }
    catch (err) {
        next(new GeneralError('error while getting category list'))
    }

}

exports.findById = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Category.finById(id, (err, category) => {
            if (err) {
                next(new NotFound(err))
            }
            else if (category.length === 0) {
                next(new NotFound(`Not found category with this id = ${id}`))
            }
            else {
                // console.log(category.length)
                next(new GeneralResponse('Category', category))
            }
        })
    }
    catch (err) {
        next(new GeneralError(`error while getting ${id} category`))
    }

}

exports.create = async (req, res, next) => {
    const new_category = new Category(req.body);

    try {
        await Category.create(new_category, (err, category) => {
            if (err) {
                next(new BadRequest(err));
            }
            else {
                next(new GeneralResponse('Category', category));
            }
        })

    }
    catch (err) {
        next(new GeneralError(`error while post data`))
    }


}

exports.update = async (req, res, next) => {
    const new_category = new Category(req.body);
    const id = req.params.id;
    try {
        await Category.finById(id, (err, category) => {
            if (err) {
                next(new NotFound(err))
            }
            else if (category.length === 0) {
                next(new NotFound(`Data not found with this id = ${id}`))
            }
            else {
                Category.update(id, new_category, (err, category) => {
                    if (err) {
                        next(new BadRequest(err))
                    }
                    else {
                        next(new GeneralResponse('Data update successfully!'))
                    }
                })
            }
        })
    }
    catch (err) {
        next(new GeneralError(`error while updating data`))
    }    
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Category.finById(id, (err, category) => {
            if (err) {
                next(new NotFound(err))
            }
            else if (category.length === 0) {
                next(new NotFound(`Data not found with this id = ${id}`))
            }
            else {
                Category.delete(id, (err, category) => {
                    if (err) {
                        next(new NotFound(err))
                    }
                    else {
                        next(new GeneralResponse('Data delete successfully'))
                    }
                })
            }
        })
    }
    catch (err) {
        next(new GeneralError(`error while deleting data`))
    }
    
}

exports.multipleDelete = async (req,res,next) => {
    var id = await req.body.id;
    try{
        Category.multipleDelete(id,(err,category) => {
            if(err){
                next(new NotFound(err))
            }
            else{
                next(new GeneralResponse('Data delete successfully'))
            }
        })
    }
    catch(err){
        next(new GeneralError(`error while deleting data`))
    }
}
