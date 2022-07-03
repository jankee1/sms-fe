import React, {SyntheticEvent, useState} from 'react';
import {Btn} from "../common/Btn";
import {SingleMessageComponent} from './SingleMessageComponent';
import {CREDENTIALS, SECRET_MESSAGE} from "../../config/api";
import {Error} from '../common/Error'
import {Warning} from '../common/Warning'
import {apiUrl} from '../../config/api';

import './ReadMessageComponent.css';

export const ReadMessageComponent = () => {

    const [credentials, setCredentials] = useState(CREDENTIALS);
    const [secretMessage, setSecretMessage] = useState(SECRET_MESSAGE)

    const readMessage = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`${apiUrl}/message/${credentials.sender}/${credentials.secretKey}`);
            const data = await res.json();
            setSecretMessage({
                ...data
            })
            
        } finally {
            setCredentials(CREDENTIALS);
        }
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
                <div>
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
                </div><br />
                <Btn text="Search for message"/>
                <br /><br /><br />
                <Warning text='YOUR MESSAGE WILL BE DELETED FROM DATABASE JUST AFTER IT WILL BE DISPLAYED!'/>
            </form>
        </>
    );
}