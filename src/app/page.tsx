'use client';

import OpenOrdersPage from "@/components/L2/OpenOrders/OpenOrders";
import Header from "@/components/L1/Header/Header";

export default function Home(){
  return(
    <>
      <Header/>
      <OpenOrdersPage/>
    </>
  )
}