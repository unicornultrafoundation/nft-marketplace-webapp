import Text from "@/components/Text";
import React from "react";

export default function NotificationStep() {
  return (
    <div className="flex gap-8 mb-8 flex-col">
      <Text className="text-body-24 tablet:text-body-32 desktop:text-body font-semibold desktop:mt-5 mt-7">
        Notification
      </Text>
      <div className="flex flex-col gap-3">
        <div className="bg-surface-soft p-3 rounded-xl flex justify-between items-center">
          <div className="flex gap-1.5 flex-col">
            <Text className="font-medium">Item sold</Text>
            <Text className="text-secondary text-body-12">
              When someone purchased one of your items
            </Text>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" disabled />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="bg-surface-soft p-3 rounded-xl flex justify-between items-center">
          <div className="flex gap-1.5 flex-col">
            <Text className="font-medium">Bid activity</Text>
            <Text className="text-secondary text-body-12">
              When someone bids on one of your items
            </Text>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" disabled />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="bg-surface-soft p-3 rounded-xl flex justify-between items-center">
          <div className="flex gap-1.5 flex-col">
            <Text className="font-medium">Price change</Text>
            <Text className="text-secondary text-body-12">
              When an item you made an offer on changes in price
            </Text>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" disabled />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="bg-surface-soft p-3 rounded-xl flex justify-between items-center">
          <div className="flex gap-1.5 flex-col">
            <Text className="font-medium">Auction expiration</Text>
            <Text className="text-secondary text-body-12">
              When a timed auction you created ends
            </Text>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" disabled />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="bg-surface-soft p-3 rounded-xl flex justify-between items-center">
          <div className="flex gap-1.5 flex-col">
            <Text className="font-medium">Outbid</Text>
            <Text className="text-secondary text-body-12">
              When an offer you placed is exceeded by another user
            </Text>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" disabled />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-al peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="bg-surface-soft p-3 rounded-xl flex justify-between items-center">
          <div className="flex gap-1.5 flex-col">
            <Text className="font-medium">Successful purchase</Text>
            <Text className="text-secondary text-body-12">
              When you successfully buy an item
            </Text>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" disabled />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
