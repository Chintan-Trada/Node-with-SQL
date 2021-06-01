const { GeneralError, NotFound, BadRequest } = require('../middleware/error');
const { GeneralResponse } = require('../middleware/response');
const Testnomial = require('../models/testnomial.modal');

exports.findAll = async (req,res,next) => {
    try {
    Testnomial.findAll((err,testnomial) => {
        if(err){
            next(new NotFound('Not found testnomial'))
        }
        else if(testnomial.length === 0){
            next(new NotFound('Not found testnomial'))
        }
        else{
            next(new GeneralResponse('testnomial', testnomial))
        }
    })
}
catch (err) {
    next(new GeneralError('error while getting testnomial list'))
}
};

exports.findById = async (req,res,next) => {
    const id = req.params.id;
    try {
    await Testnomial.findById(id, (err,testnomial) => {
        if(err){
            next(new NotFound(err))
        }
        else if(testnomial.length === 0){
            next(new NotFound(`Not found testnomial with this id = ${id}`))
        }
        else{
            next(new GeneralResponse('Testnomial', testnomial))
        }
    })
}
catch (err) {
    next(new GeneralError(`error while getting ${id} testnomial`))
}
};

exports.create = async (req,res,next) => {
    const new_testnomial = new Testnomial(req.body);

    try {
        await Testnomial.create(new_testnomial,(err,testnomial) => {
            if(err){
                next(new BadRequest(err));
            }
            else{
                next(new GeneralResponse('Testnomial', testnomial));
            }
        })
    }
    catch (err) {
        next(new GeneralError(`error while post data`))
    }
};

exports.update = async (req,res,next) => {
    const update_testnomial = new Testnomial(req.body);
    const id  = req.params.id;
    try {
        await Testnomial.findById(id, (err,testnomial) => {
            if(err){
                next(new NotFound(err))
            }
            else if(testnomial.length === 0){
                next(new NotFound(`Not found testnomial with this id = ${id}`))
            }
            else{
                Testnomial.update(id, update_testnomial, (err,testnomial) => {
                    if(err){
                        next(new BadRequest(err))
                    }
                    else{
                        next(new GeneralResponse('Data update successfully!'))
                    }
                })
            }
        })
    }
    catch (err) {
        next(new GeneralError(`error while updating data`))
    }
};

exports.delete = async (req,res,next) => {
    const id = req.params.id;
    try {
        await Testnomial.findById(id, (err,testnomial) => {
            if(err){
                next(new NotFound(err))
            }
            else if(testnomial.length === 0){
                next(new NotFound(`Not found testnomial with this id = ${id}`))
            }
            else{
                Testnomial.delete(id, (err,testnomial) => {
                    if(err){
                        next(new NotFound(err))
                    }
                    else{
                        next(new GeneralResponse('Data delete successfully'))
                    }
                })
            }
        })
    }
    catch (err) {
        next(new GeneralError(`error while getting ${id} testnomial`))
    }
    
};

exports.multipleDelete = async (req,res,next) => {
    var id = await req.body.id;
    try{
        Testnomial.multipleDelete(id,(err,category) => {
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
