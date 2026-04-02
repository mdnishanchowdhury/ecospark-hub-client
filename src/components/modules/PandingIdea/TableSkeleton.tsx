"use client";

import { Spinner } from "@/components/ui/spinner"

export function SpinnerSize() {
  return (
    <div className="flex h-full min-h-[70vh] w-full items-center justify-center animate-in fade-in duration-500">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="size-10 text-emerald-600" />
      </div>
    </div>
  )
}