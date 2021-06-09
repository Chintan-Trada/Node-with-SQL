const { GeneralError, NotFound, BadRequest } = require('../middleware/error');
const { GeneralResponse } = require('../middleware/response');
const Enquiry = require('../models/enquiry.modal');

exports.findAll = async (req, res, next) => {
    try {
        await Enquiry.findAll((err, enquiry) => {
            if (err) {
                next(new NotFound('Not found enquiry'))
            }
            else if (enquiry.length === 0) {
                next(new NotFound('Not found enquiry'))
            }
            else {
                next(new GeneralResponse('Enquiry', enquiry))
            }
        })
    }
    catch (err) {
        next(new GeneralError('error while getting category list'))
    }
};

exports.findById = async (req, res, next) => {
    const id = req.params.id;
    try {
    Enquiry.findById(id, (err, enquiry) => {
        if (err) {
            next(new NotFound(err))
        }
        else if (enquiry.length === 0) {
            next(new NotFound(`Not found enquiry with this id = ${id}`))
        }
        else {
            next(new GeneralResponse('Enquiry', enquiry))
        }
    })
}
catch (err) {
    next(new GeneralError(`error while getting ${id} category`))
}
};

exports.create = async (req, res, next) => {
    const new_enquiry = await new Enquiry(req.body);

    try {
        await Enquiry.create(new_enquiry, (err, enquiry) => {
            if (err) {
                next(new BadRequest(err));
            }
            else {
                next(new GeneralResponse('Enquiry', enquiry));
            }
        })
    }
    catch (err) {
        next(new GeneralError(`error while post data`))
    }
};

exports.update = async (req, res, next) => {
    const update_enquiry = await new Enquiry(req.body);
    const id = req.params.id;

    try {
        await Enquiry.findById(id, (err, enquiry) => {
            if (err) {
                next(new NotFound(err))
            }
            else if (enquiry.length === 0) {
                next(new NotFound(`Not found enquiry with this id = ${id}`))
            }
            else {
                Enquiry.update(id, update_enquiry, (err, enquiry) => {
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
};

exports.delete = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Enquiry.findById(id, (err, enquiry) => {
            if (err) {
                next(new NotFound(err))
            }
            else if (enquiry.length === 0) {
                next(new NotFound(`Not found enquiry with this id = ${id}`))
            }
            else {
                Enquiry.delete(id, (err, enquiry) => {
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
    
};

exports.multipleDelete = async (req,res,next) => {
    var id = await req.body.id;
    try{
        Enquiry.multipleDelete(id,(err,enquiry) => {
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
