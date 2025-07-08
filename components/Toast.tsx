/**
 * components/Toast.tsx
 * 
 * This file contains the Toast component, which displays a simple notification
 * message to the user. It is designed to be a minimal, reusable component.
 */

import React from 'react';
import "./Components.css";

type ToastProps = {
  message: string;
};

/**
 * A simple toast notification component.
 * 
 * @param {ToastProps} props - The props for the component.
 * @param {string} props.message - The message to display in the toast.
 * @returns {JSX.Element | null} The rendered toast component or null if no message.
 */
export default function Toast({ message }: ToastProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="toast-container">
      <div className="toast-message">{message}</div>
    </div>
  );
} 