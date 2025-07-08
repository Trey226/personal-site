import React, { useEffect, useState } from 'react';
import "./Components.css";
import { getCountrySpecificPics } from '@/_data/pic';
import type { pic } from '@/_data/pic';
import Toast from './Toast'; // Import the Toast component

type PicModalProps = {
  isOpen: boolean,
  name: string,
  code: string,
  close: () => void,
};

export default function PicModal({ isOpen, name, code, close }: PicModalProps) {
  let pics: pic[] = getCountrySpecificPics(code);

  const [currentPic, setCurrentPic] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClose = () => {
    setCurrentPic(0);
    close();
  };

  const handlePrevious = () => {
    const newIndex = (currentPic === 0) ? pics.length - 1 : currentPic - 1;
    setCurrentPic(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentPic === (pics.length - 1)) ? 0 : currentPic + 1;
    setCurrentPic(newIndex);
  };

  const handleEmpty = React.useCallback(() => {
    setToastMessage(`Trey hasn't added any pictures for ${name}`);
    close();
    setTimeout(() => {
      setToastMessage('');
    }, 3000); // Hide toast and close modal after 3 seconds
  }, [name, close]);



  //this prevents scrolling while the modal is open
  useEffect(() => {
    if (isOpen && (!pics || pics.length === 0)) {
      handleEmpty()
    }
  }, [isOpen, pics, handleEmpty]);

  //this prevents scrolling and handles zooming on mobile while the modal is open
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      return;
    }

    const originalContent = viewport.getAttribute('content');
    const isMobile = window.innerWidth < 768;

    document.body.style.overflow = 'hidden';
    if (isMobile) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    return () => {
      document.body.style.overflow = 'unset';
      if (isMobile && originalContent) {
        viewport.setAttribute('content', originalContent);
      }
    };
  }, [isOpen]);

  if (!isOpen) {
    return toastMessage ? <Toast message={toastMessage} /> : null;
  }

  if (!pics || pics.length === 0) {
    return toastMessage ? <Toast message={toastMessage} /> : null;
  }


  return (
    <>
      <Toast message={toastMessage} />
      <div className="modal-overlay" /*onClick={close} commented this out for now because I didnt like the click outside to close functionality*/>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button onClick={handleClose} className='modal-close'><img src="/close.png" /></button>
          <h1 className="modal-title">Pictures from {name}</h1>
          <h2>{pics[currentPic].date}</h2>
          <div className='display'>
            {screenWidth > 768 ? (
              <a href={pics[currentPic].src} target='_blank' rel="noopener noreferrer" className="modal-image-link"><img src={pics[currentPic].src} className='modal-image' /></a>
            ) : (
              <div className="modal-image-link">
                <img src={pics[currentPic].src} className='modal-image' />
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button className='prev-btn rotate-y-180 mr-2 cursor-pointer' onClick={handlePrevious}><img src="/arrow.png" /></button>
            <p>picture {currentPic + 1} / {pics.length}</p>
            <button className='prev-btn ml-2 cursor-pointer' onClick={handleNext}><img src="/arrow.png" /></button>
          </div>
        </div>
      </div>
    </>
  );
}