import React, {SyntheticEvent, useState} from 'react';
// import './SingleMessageComponent.css';

type Props = {
    sender: string;
    body: string;
    createdAt: string
}

export const SingleMessageComponent = (props: Props) => {

    return (
        <>
            <div className="message">
                <h3>Here you will see the secret message:</h3>
                <br/>
                <p>Message from: {props.sender}</p>
                <p>Sent on: { props.createdAt }</p>
                <p>Message body: {props.body}</p>
            </div>
        </>
    );
}