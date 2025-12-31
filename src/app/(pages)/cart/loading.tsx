import LoadingSpinnerTwo from "@/Components/Shared/LoadingSpinnerTwo";
import React from "react";

export default function Loading() {
  return (
    <div className="w-[90%] mx-auto px-4 py-8">
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinnerTwo />
      </div>
    </div>
  );
}
