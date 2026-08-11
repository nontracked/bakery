import React from "react";
import {Header} from "@/layout/Header";
import {Footer} from "@/layout/Footer";

export default function Main({children, modal}: Readonly<{ children: React.ReactNode, modal: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      {modal}
    </>
  );
}