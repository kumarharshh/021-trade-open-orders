// app/open-orders/page.tsx
'use client';
import OpenOrdersPage from "@/components/UI/OpenOrders";
import Header from "@/components/Header";

export default function Home(){
  return(
    <>
      <Header/>
      <OpenOrdersPage/>
    </>
  )
}