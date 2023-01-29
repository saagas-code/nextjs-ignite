import * as React from "react";

export default function Pagination() {
  return (
    <div className="flex gap-2 mt-4 justify-between align-middle">
      <div className="">
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </div>

      <div className="flex gap-2">
        <button disabled className="text-xs w-6 disabled:bg-pink-500 disabled:cursor-default rounded-sm">
          1
        </button>
        <button className="text-xs w-6 bg-gray-700 hover:bg-gray-500 rounded-sm">2</button>
        <button className="text-xs w-6 bg-gray-700 hover:bg-gray-500 rounded-sm">3</button>
        <button className="text-xs w-6 bg-gray-700 hover:bg-gray-500 rounded-sm">4</button>
      </div>
    </div>
  );
}
