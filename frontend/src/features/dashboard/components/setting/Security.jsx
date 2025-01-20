import React from "react";

const Security = () => {
  return (
    <section>
      <h2 className=" font-semibold text-2xl underline ">Security</h2>
      <div className=" mt-2">
        <h3 className=" font-medium text-xl">Password</h3>
        <form className=" space-y-2 relative">
          <div className=" flex flex-col">
            <label htmlFor="oldPassword">Current Password</label>
            <input
              type="text"
              id="oldPassword"
              placeholder="Current Password"
              className=" px-4 py-2 rounded-lg border-gray-500 border focus:outline-gray-500 "
            />
          </div>
          <div className=" flex flex-col">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="text"
              id="newPassword"
              placeholder="New Password"
              className=" px-4 py-2 rounded-lg border-gray-500 border focus:outline-gray-500 "
            />
          </div>
          <button
            type="submit"
            className=" absolute right-0 px-4 py-2 rounded-lg bg-gray-600 text-white"
          >
            Change
          </button>
        </form>
      </div>
      <div className=" mt-[80px] items-end flex space-x-3 justify-between ">
        <div>
          <h3 className=" font-medium text-xl">Two-Factor Authentication</h3>
          <p className=" text-gray-400">
            Add an additional layer of security to your account by enabling
            two-factor authentication.
          </p>
        </div>
        <button className=" px-4 py-2 rounded-lg bg-gray-600 text-white">
          Enable
        </button>
      </div>
    </section>
  );
};

export default Security;
