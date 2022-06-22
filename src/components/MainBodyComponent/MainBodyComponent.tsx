import React from 'react';
import {SendMessageComponent} from '../SendMessageComponent/SendMessageComponent'
import {ReadMessageComponent} from '../ReadMessageComponent/ReadMessageComponent'

import './MainBodyComponent.css';

export const MainBodyComponent = () => {
  return (
    <div className="main-body">
      <div className="send-message">
        <SendMessageComponent/>
      </div>
      <div className="read-message">
        <ReadMessageComponent/>
      </div>
    </div>
  );
}