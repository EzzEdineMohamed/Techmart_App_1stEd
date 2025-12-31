import LoadingSpinnerOne from "@/Components/Shared/LoadingSpinnerOne";
import React from "react";

export default function Loading() {
  return (
    <div className="w-[90%] mx-auto px-4 py-8">
      <div className="flex justify-center items-centersrc/app/(pages)/categories/loading.tsx min-h-[400px]">
        <LoadingSpinnerOne />
      </div>
    </div>
  );
}
