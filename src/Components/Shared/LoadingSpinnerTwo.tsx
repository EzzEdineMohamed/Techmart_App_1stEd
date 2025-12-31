import React from "react";
import { Spinner } from "../ui/spinner";

export default function LoadingSpinnerTwo() {
  return (
    <div className="flex items-center gap-6">
      <Spinner className="size-6 text-blue-500" />
    </div>
  );
}
