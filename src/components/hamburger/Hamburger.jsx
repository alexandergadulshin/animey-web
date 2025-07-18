import { useState } from 'react';
import "./Hamburger.css";

export default function Hamburger() {
  const [open, setOpen] = useState(false);
  return (
    <div class="hamburger-container">
      <button
        class={`hamburger-btn ${open ? 'open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="hamburger-menu"
      >
        <span class="line" />
        <span class="line" />
        <span class="line" />
      </button>
      <nav
        id="hamburger-menu"
        class={`hamburger-menu ${open ? 'visible' : ''}`}
        role="menu"
      >
        <a href="#" role="menuitem">Home</a>
        <a href="#" role="menuitem">About</a>
        <a href="#" role="menuitem">Services</a>
        <a href="#" role="menuitem">Contact</a>
      </nav>
    </div>
  );
}