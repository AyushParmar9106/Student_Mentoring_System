"use client"; // REQUIRED

import React from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container py-5 text-center">
      <h2 className="text-danger fw-bold">Something went wrong!</h2>
      <p className="text-body-secondary">{error.message}</p>
      <button className="btn btn-primary rounded-pill px-4" onClick={() => reset()}>
        Try Again
      </button>
    </div>
  );
}