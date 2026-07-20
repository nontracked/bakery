import React from "react";

export default function Main({children, modal}: Readonly<{ children: React.ReactNode, modal: React.ReactNode }>) {
  return (
    <>
      <main className="main-content">
        {children}
      </main>
      {modal}
    </>
  );
}