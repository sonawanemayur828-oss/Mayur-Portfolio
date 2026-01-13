
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("Portfolio Engine: Initiating boot sequence...");

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Portfolio Engine: System online.");
  } catch (error) {
    console.error("Portfolio Engine: Critical failure during mount.", error);
    rootElement.innerHTML = `<div style="padding: 20px; text-align: center; color: #ff5555; font-size: 12px; letter-spacing: 0.1em;">
      MOUNT ERROR<br/>
      <small style="opacity: 0.5">${error.message}</small>
    </div>`;
  }
} else {
  console.error("Portfolio Engine: Root container not found in DOM.");
}
