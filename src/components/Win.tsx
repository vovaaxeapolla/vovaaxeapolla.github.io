import { ReactNode, useRef, useEffect } from 'react';

import { useDrag } from '@src/hooks';
import '@styles/Win.sass';

interface IWinProps {
  title?: string
  close?: React.MouseEventHandler<HTMLButtonElement>
  element: JSX.Element | ReactNode
  type: 'fullscreen' | 'common';
}

export const Win: React.FC<IWinProps> = ({ title, close, element, type }) => {
  const wRef = useRef<HTMLDivElement>(null);

  const { top, left } = useDrag(wRef);

  useEffect(() => {
    if (wRef.current) {
      wRef.current.focus();
    }
  });

  return (
    type === 'common' ? <div className="win" style={{ top: `${top}px`, left: `${left}px` }}>
      <div className="win__border"></div>
      <div className="win__topbar" ref={wRef}>
        <p>{title}</p>
        <button className='win__close' onClick={close}>X</button>
      </div>
      <div className="win__content">
        {element}
      </div>
    </div> : <div className="win-fullscreen" ref={wRef} tabIndex={0}>
      <button className='win-fullscreen__close' onClick={close}>X</button>
      <div className="win-fullscreen__content">
        {element}
      </div>
    </div>
  );
};
