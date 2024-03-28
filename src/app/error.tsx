"use client";

import { MESSAGES } from "@/config/constants";

const ErrorPage = () => {
  return (
    <div className="space-y-3 text-center">
      <h1 className="text-2xl font-bold">Error</h1>
      <p>{MESSAGES.FAILURE.ERROR_PAGE}</p>
    </div>
  );
};

export default ErrorPage;
