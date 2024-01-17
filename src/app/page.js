"use client"
import Image from "next/image";
import Task from "./components/Task"

export default function Home() {

  return (
    <div className="flex justify-center items-center mt-10">
      <Task/>
    </div>
  );
}
