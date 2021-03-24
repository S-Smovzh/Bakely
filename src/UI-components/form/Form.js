import React from "react";

export const Form = ({success, children}) => {
  return (
    <form className='Form fill-width' method='POST'>
      {success ?
        <div className='SVG__Container fill-width fill-height'>
          <svg version="1.1" className='Success-Tick' xmlns="http://www.w3.org/2000/svg"
               x="0px" y="0px" viewBox="0 0 37 37" xmlSpace="preserve" enableBackground='new 0 0 37 37'>
            <path className="Success-Tick__Circle"
                  d="M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"/>
            <polyline className="Success-Tick__Check" points="11.6,20 15.9,24.2 26.4,13.8"/>
          </svg>
        </div>
        : null}
      {children}
    </form>
  );
}