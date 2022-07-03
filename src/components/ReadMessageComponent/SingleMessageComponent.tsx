import React, {SyntheticEvent, useState} from 'react';
import './SingleMessageComponent.css';

type Props = {
    sender: string;
    body: string;
    createdAt: string
}

export const SingleMessageComponent = (props: Props) => {

    return (
        <>
            <div className="message">
                <h3>Your secret message</h3>
                <div>
                    <p><b>Message from: </b> {props.sender}</p>
                    <p><b>Sent on: </b> { props.createdAt }</p>
                </div>
                <p className='message-content'><b>Message content:</b>
                    <br />
                 {props.body}
                 </p>
            </div>
        </>
    );
}