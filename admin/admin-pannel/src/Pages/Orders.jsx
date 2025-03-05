/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Order Page</h3>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-300 p-5 rounded-lg shadow-sm text-gray-700"
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div className="space-y-1">
              {order.items?.map((item, idx) => (
                <p className="text-sm" key={idx}>
                  {item.name} X {item.quantity}{" "}
                  <span className="text-gray-500">{item.size}</span>
                </p>
              ))}
            </div>
            {order.address && (
              <div className="text-sm">
                <p className="font-bold">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
                <p className="text-gray-600">{order.address.phone}</p>
              </div>
            )}
            <div className="text-sm sm:text-[15px]">
              <p>Items: {order.items?.length || 0}</p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p className={order.payment ? "text-green-600" : "text-red-500"}>
                Payment: {order.payment ? "Done" : "Pending"}
              </p>
              <p>
                Date: {order.date ? new Date(order.date).toDateString() : "N/A"}
              </p>
            </div>
            <p className="text-sm font-semibold sm:text-[15px]">
              {order.currency || "$"}
              {order.amount}
            </p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-1 border border-gray-300 rounded text-sm bg-white"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
