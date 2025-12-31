import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-8 animate-spin 300ms rounded-full w-8 border-b-2 border-red-500"></div>
    </div>
  );
}
