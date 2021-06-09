
const { GeneralError, NotFound, BadRequest } = require('../middleware/error');
const { GeneralResponse } = require('../middleware/response');
const Portfolio = require('../models/portfolio.modal');


exports.findAll = async (req, res, next) => {
    try {
        await Portfolio.findAll((err, portfolio) => {
            if (err) {
                next(new NotFound('Not found portfolio'))
            }
            else if (portfolio.length === 0) {
                next(new NotFound('Not found portfolio'))
            }
            else {
                next(new GeneralResponse('Portfolio', portfolio))
            }
        })
    }
    catch (err) {
        next(new GeneralError('error while getting portfolio list'))
    }
};

exports.findById = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Portfolio.findById(id, (err, portfolio) => {
            if (err) {
                next(new NotFound(err))
            }
            else if (portfolio.length === 0) {
                next(new NotFound(`Not found portfolio with this id = ${id}`))
            }
            else {
                next(new GeneralResponse('Portfolio', portfolio))
            }
        })
    }
    catch (err) {
        next(new GeneralError(`error while getting ${id} portfolio`))
    }
};

exports.create = async (req, res, next) => {
        
    const new_portfolio = await new Portfolio(req.body);
    const new_portfolio_file = await req.file.filename;
    try {
        await Portfolio.create(new_portfolio,new_portfolio_file, (err, portfolio) => {
            if (err) {
                next(new BadRequest(err));
            }
            else {
                next(new GeneralResponse('portfolio', portfolio));
            }
        })
    }
    catch (err) {
        next(new GeneralError(`error while post data`))
    }
};

exports.update = async (req, res, next) => {
    const update_portfolio =await new Portfolio(req.body);
    const update_portfolio_file =await req.file.filename;

    const id = req.params.id;

    try {
        await Portfolio.findById(id, (err, portfolio) => {
            if (err) {
                next(new NotFound(err))
            }
            else if (portfolio.length === 0) {
                next(new NotFound(`Not found portfolio with this id = ${id}`))
            }
            else {
                Portfolio.update(id, update_portfolio,update_portfolio_file, (err, portfolio) => {
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
        next(new GeneralError(`error while getting ${id} portfolio`))
    }
};

exports.delete = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Portfolio.findById(id, (err, portfolio) => {
            if (err) {
                next(new NotFound(err))
            }
            else if (portfolio.length === 0) {
                next(new NotFound(`Not found portfolio with this id = ${id}`))
            }
            else {
                Portfolio.delete(id, (err, portfolio) => {
                    if (err) {
                        next(new BadRequest(err))
                    }
                    else {
                        next(new GeneralResponse('Data delete successfully!'))
                    }
                })
            }
        })
    }
    catch (err) {
        next(new GeneralError(`error while getting ${id} portfolio`))
    }
    
};

exports.multipleDelete = async (req,res,next) => {
    var id = await req.body.id;
    try{
        Portfolio.multipleDelete(id,(err,category) => {
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
