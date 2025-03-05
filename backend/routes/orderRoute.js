import express from 'express'
import {placeorder, placeorderRazorpay, allOrders, userOrders,updateStatus, verifyRazorpay} from '../controllers/orderController.js'
import adminAuth from '../middlerware/adminAuth.js'
import authUser from '../middlerware/auth.js'

const orderRouter = express.Router()

// Admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)
 
//Payment Features
orderRouter.post('/place',authUser,placeorder)
 
orderRouter.post('/razorpay',authUser,placeorderRazorpay)

//User Feature 
orderRouter.post('/userorders',authUser,userOrders)

//verify payment
orderRouter.post('/verifyRazorpay',authUser, verifyRazorpay)

export default orderRouter;