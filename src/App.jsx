// src/App.jsx
import { useState } from "react";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <h1 className="text-center text-2xl font-bold">📚 Book Finder</h1>
      </header>
      <main className="container mx-auto px-4 py-6">
        <Home />
      </main>
    </div>
  );
}
