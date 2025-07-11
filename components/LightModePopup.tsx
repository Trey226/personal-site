'use client'

import React, { useEffect, useState } from 'react';
import "./Components.css";


export default function LightModePopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [interactionStage, setInteractionStage] = useState(0);


  const titles = [
    `It's ${new Date().getFullYear()}, you should be using darkmode`,
    "Seriously? It will take you 6 seconds, I timed myself.",
    "You're a lost cause.",
    "Thank you for coming to my Ted Talk!",
  ]

  const messages = [
    <p>It's easy don't worry! <br /> First, press "alt + e"<br />Next, hover over the 4th option from the bottom titled "More tools" <br />Now, the 3rd option from the top says "Customize Chrome" click that <br /> Now click on "Dark" and you're done! </p>,
    <p>Press "alt + e"<br /> Hover "More tools"<br /> Click "Customize Chrome"<br />Click "Dark"</p>,
    "",
    "You will be happy you made the switch."
  ];


  const buttonTexts = [
    "Okay, did it",
    "Okay, I really did it",
    "I am not going to do it stop bothering me",
    "Thanks Trey"
  ];


  const classLists = [
    "mt-4 px-4 py-2 bg-green-500 text-black rounded cursor-pointer",
    "mt-4 px-4 py-2 bg-yellow-300 text-black rounded cursor-pointer",
    "mt-4 px-4 py-2 bg-red-700 text-white rounded cursor-pointer",
    "mt-4 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer",
  ]

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setShowPopup(true);
    }
  }, []);

  if (!showPopup || screenWidth < 800) {
    return null;
  }

  const handleInteraction = () => {
    const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;

    //dark mode check on click
    if (!isLightMode && (interactionStage <= 1)) {
      setInteractionStage(3);
      return;
    }

    if (interactionStage === 0) {
      setInteractionStage(1);
      return;
    }

    if (interactionStage === 1) {
      setInteractionStage(2);
      return;
    }

    if (interactionStage === 2) {

      setShowPopup(false);
    }
    if (interactionStage === 3) {
      setShowPopup(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg text-center">
        <h2 className="text-xl font-bold mb-4 text-black">{titles[interactionStage]}</h2>

        {/* The message and button text are now driven by the interaction stage */}
        <div className='text-black'>{messages[interactionStage]}</div>

        <button
          onClick={handleInteraction}
          className={classLists[interactionStage]}
        >
          {buttonTexts[interactionStage]}
        </button>
      </div>
    </div>
  );
}