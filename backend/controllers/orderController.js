import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";

//global variable
const currency = "inr";
const deliverCharge = 10;

//gatewat initialize
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Placing Order using COD Method
const placeorder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// // Placing Order using Stripe Method
// const placeorderStripe = async (req, res) => {
//   try {
//     const { userId, items, amount, address } = req.body;
//     const orderData = {
//       userId,
//       items,
//       address,
//       amount,
//       paymentMethod: "stripe",
//       payment: false,
//       date: Date.now(),
//     };
//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     const options = {
//       amount: amount * 100,
//       currency: strpieCurrency.toUpperCase(),
//             receipt: newOrder._id.toString(),
//     };
//     await razorpayInstance.orders.create(options, (error, order) => {
//       if (error) {
//         console.log(error);
//         return res.json({ success: false, message: error });
//       }
//       res.json({ success: true, order });
//     });
//   } catch (error) {
//     console.log(error)
//     res.json({success:false,message:error.message})
//   }
// };
// Placing Order using Razorpay Method
const placeorderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "razorpay",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: newOrder._id.toString(),
    };
    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
};

const verifyRazorpay = async (req,res) =>{
try {
  
const {userId, razorpay_order_id} = req.body

const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
if (orderInfo.status === 'paid') {
  await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
  await userModel.findByIdAndUpdate(userId,{cartData:{}})
  res.json({success:true,message:"Payment Successful"})
}else{
  res.json({success:false,message:'Payment Failed'});
}

} catch (error) {
  console.log(error)
    res.json({success:false,message:error.message})
}
}

// All Order data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// All Order data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update order status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Statue Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeorder,
  placeorderRazorpay,
  
  allOrders,
  userOrders,
  updateStatus,
  verifyRazorpay
};
