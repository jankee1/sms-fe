import React from 'react';
import { Warning } from '../common/Warning';

import './SendMessageComponent.css';

type Props = {
    sender: string | undefined; // it will never be undefined as every time this component is launched it means that sender is a string
    secretKey: string
    counter: number
}


export const MessageSentConfirmation = (props: Props) => {

    if(props.counter > 0)
        return (
            <> 
                <h3>This message will disapear within {<Warning text={props.counter.toString()}/>}s </h3>
                <span>
                    <p>Dear <b>{props.sender}</b></p>
                    <p>Your secret key is <b>{props.secretKey}</b>. Share these credentials with the person who you sent this message to as this is the first and last time where the secret key is visible for you</p>
                </span>
            </>
        );
    else {
        return <></>
    }
}