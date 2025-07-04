'use client'

import React, { useEffect, useState } from 'react';
import "./Components.css";

export default function LightModePopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (isLightMode) {
      setShowPopup(true);
    }
  }, []);

  if (!showPopup) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Looks like you're in light mode!</h2>
        <p>This is a special message for our light mode users.</p>
        <button onClick={() => setShowPopup(false)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Close
        </button>
      </div>
    </div>
  );
}