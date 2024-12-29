"use client";

import { ReactNode } from "react";
import Header from "./header/header";
import Footer from "./footer/footer";

export default function HeaderFooter({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
