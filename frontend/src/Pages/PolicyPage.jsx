/* eslint-disable no-unused-vars */
import React from "react";
import Title from "../Components/Title";

const PolicyPage = () => {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="text-2xl pt-8 border-t">
        <Title text1={"OUR "} text2={"POLICY"} />
      </div>

      <div className="flex flex-col items-start justify-center w-full max-w-2xl mt-6">
        {/* About Us Section */}
        <section className="mb-8">
          <b className="text-gray-800 text-lg ">About Us</b>
          <p className="text-gray-600 mt-2">
            Welcome to our e-commerce store! We are committed to providing the best shopping experience 
            with quality products and excellent customer service.
          </p>
        </section>

        {/* Privacy Policy */}
        <section className="mb-8">
          <b className="text-gray-800 text-lg">Privacy Policy</b>
          <p className="text-gray-600 mt-2">
            We value your privacy and ensure that your personal data is protected. Your information will not be shared 
            with third parties without your consent. We use secure payment gateways to process transactions safely.
          </p>
        </section>

        {/* Return Policy */}
        <section className="mb-8">
          <b className="text-gray-800 text-lg">Return & Refund Policy</b>
          <p className="text-gray-600 mt-2">
            You can return items within 14 days of purchase. Items must be unused and in original packaging. Refunds will 
            be processed within 7 business days after the return is received.
          </p>
        </section>

        {/* Delivery Policy */}
        <section className="mb-8">
          <b className="text-gray-800 text-lg">Delivery Policy</b>
          <p className="text-gray-600 mt-2">
            We offer standard and express delivery options. Orders are processed within 3-4 business days, and delivery 
            time varies based on location. Tracking details will be provided once your order is shipped. In case of delays 
            due to unforeseen circumstances, we will notify you via email.
          </p>
        </section>

        {/* Terms & Conditions */}
        <section>
          <b className="text-gray-800 text-lg">Terms & Conditions</b>
          <p className="text-gray-600 mt-2">
            By using our website, you agree to comply with our terms and conditions. Prices and availability are subject 
            to change without notice. Unauthorized use of content is prohibited.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PolicyPage;
