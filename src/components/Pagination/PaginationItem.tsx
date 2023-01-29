import React from "react";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({isCurrent = false, number, onPageChange}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <button  
        disabled 
        className={`text-xs p-1 w-6 disabled:bg-pink-500 
        disabled:cursor-defaultrounded-sm`}
      >
          {number}
      </button>
    )
  }

  return (
    <button 
      className="text-xs w-6 bg-gray-700
      hover:bg-gray-500 rounded-sm"
      onClick={() => onPageChange(number)}
    >
      {number}
    </button>
  )


}