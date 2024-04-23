import React from "react";

export default function Component() {
  return (
    <div className="mx-auto grid max-w-3xl items-stretch justify-center gap-4">
  <div className="rounded-lg shadow-lg bg-white border bg-card text-card-foreground shadow-sm w-full max-w-sm" data-v0-t="card">
    <div className="p-6 space-y-4 text-center">
      <div className="text-3xl fontX-semibold">1</div>
      <div className="flex w-full items-center gap-4 mx-auto max-w-xs justify-center"> {/* Centering content */}
        <div className="space-y-2 text-center"> {/* Centering content */}
          <h3 className="text-xl font-semibold">Alice Kumar</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Branch: AIML Batch: 2022-2024 
          </p>
        </div>
      </div>
      <div className="flex w-full items-center gap-4 mx-auto max-w-xs justify-center"> {/* Centering content */}
        <div className="text-2xl font-semibold">Points: 2400</div>
        <div className="text-2xl font-semibold">Rating: 0000</div>
      </div>
    </div>
  </div>
</div>

  );
}
