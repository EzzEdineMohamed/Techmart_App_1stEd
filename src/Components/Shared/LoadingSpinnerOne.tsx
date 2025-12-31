import React from "react";
import { Spinner } from "../ui/spinner";

export default function LoadingSpinnerOne() {
  return (
    <div className="flex items-center gap-6">
      <Spinner className="size-6 text-red-500" />
    </div>
  );
}
