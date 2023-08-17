import express from "express";
import {
    getAllVouchers, getCategoryVouchers, getCityVouchers
  } from "../controllers/voucherControllers.js";
  
  const router = express.Router();
  
  
  router.get("/get-vouchers", getAllVouchers);
  router.post("/get-category-vouchers", getCategoryVouchers);
  router.post("/get-city-vouchers", getCityVouchers);

  
  export default router;