"use client";

import api from "@/lib/axios";

export default function Home() {

  const testApi = async () => {

    try {

      const response =
        await api.get("/");

      console.log(response.data);

      alert("Backend Connected 🚀");

    } catch (error) {

      console.log(error);

      alert("Connection Failed");
    }
  };

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
      "
    >

      <button
        onClick={testApi}
        className="
          bg-blue-500
          text-white
          px-6
          py-3
          rounded-xl
        "
      >

        Test Backend

      </button>

    </div>
  );
}