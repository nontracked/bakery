import React from "react";

interface Props {
  children: React.ReactNode
}

export default function LayoutSuccessPage({children}: Props) {
  return (
    <main>
      {children}
    </main>
  )
}