import React, {SyntheticEvent, useState} from 'react';
import {Btn} from "../common/Btn";
import {OneMessageFromDB} from "types";

import './ReadMessageComponent.css';

export const ReadMessageComponent = () => {

    const CREDENTIALS = {
        secretKey: '',
        sender: ''
    }
    const SECRET_MESSAGE: OneMessageFromDB ={
        sender: '',
        secretKey: '',
        body: '',
        createdAt: ''
    }


    const [credentials, setCredentials] = useState(CREDENTIALS);
    const [secretMessage, setSecretMessage] = useState(SECRET_MESSAGE)

    const readMessage = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3001/message/${credentials.sender}/${credentials.secretKey}`);
            const data: OneMessageFromDB = await res.json();
            setSecretMessage({
                ...data
            })
            
        } finally {
            console.log('secretMessage',secretMessage); // TODO ogarnac ten temat
            
        }
        setCredentials(CREDENTIALS);
    };

    const updateSecretKey = (key: string, value: any) => {
        setCredentials(secret => ({
            ...secret,
            [key]: value,
        }));
    };

    return (
        <>
        <div className="show-message">
            <h3>Here you will see the secret message:</h3>
            <br/>
            <p>Message from: {secretMessage.sender}</p>
            <p>Sent on: {secretMessage.createdAt}</p>
            <p>Message body: {secretMessage.body}</p>
        </div>
        <form action="" className="send-form" onSubmit={readMessage}>
            <h3>Read secret message</h3>
            <p>
                <label>
                    Sender: <br/><br/>
                    <input
                        required
                        type="text"
                        title="sender"
                        onChange={e => updateSecretKey('sender', e.target.value)}
                    />
                </label>
            </p>
            <p>
                <label>
                    Secret key: <br/><br/>
                    <input
                        required
                        type="text"
                        title="secretKey"
                        onChange={e => updateSecretKey('secretKey', e.target.value)}
                    />
                </label>
            </p>
            <Btn text="Search for message"/>
        </form>
        </>
    );
}