import voucherModel from "../models/voucherModel.js";

// To get all the vouchers
export const getAllVouchers = async (req, res, next) =>{
    try{
        const result = await voucherModel.find()
        res.status(200).json(result)
    }
    catch(err){
       next(err)
    }
}

// To get the vouchers of a specified category
export const getCategoryVouchers = async (req, res, next) =>{
    const {category} = req.body;
    console.log("category", category);
    try {
       
          const result = await voucherModel.find({
            category: category})
          res.status(200).json(result);
        
      } catch (err) {
        next(err);
      }
    };

    // To get the vouchers of a specified city
export const getCityVouchers = async (req, res, next) =>{
    const {location} = req.body;
    try {
       
          const result = await voucherModel.find({
            location: location})
          res.status(200).json(result);
        
      } catch (err) {
        next(err);
      }
    };
