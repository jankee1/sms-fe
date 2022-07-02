import React, {SyntheticEvent, useState,useRef} from 'react';
import {Btn} from "../common/Btn";
import {OneMessageFromDB} from "types";
import {SingleMessageComponent} from './SingleMessageComponent';
import {Error} from '../common/Error'

import './ReadMessageComponent.css';

export const ReadMessageComponent = () => {

    const CREDENTIALS = {
        sender: '',
        secretKey: ''
    }
    const SECRET_MESSAGE ={
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
            const data = await res.json();
            setSecretMessage({
                ...data
            })
            
        } finally {
            console.log('secretMessage',secretMessage); // TODO ogarnac ten temat
        }
        setCredentials(CREDENTIALS);
        console.log('credentials',credentials)
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
                {typeof secretMessage.sender === 'string' ? 
                    <SingleMessageComponent sender={secretMessage.sender} body={secretMessage.body} createdAt={secretMessage.createdAt}/> 
                    : <Error errorText="Provided sender nickname or secret key are incorrect."/>
                }
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
                            value={credentials.sender}
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
                            value={credentials.secretKey}
                            onChange={e => updateSecretKey('secretKey', e.target.value)}
                        />
                    </label>
                </p>
                <Btn text="Search for message"/>
            </form>
        </>
    );
}