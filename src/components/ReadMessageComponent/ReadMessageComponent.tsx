import React, {SyntheticEvent, useState} from 'react';
import {Btn} from "../common/Btn";

import './ReadMessageComponent.css';

export const ReadMessageComponent = () => {

    const [secretKey, setSecretKey] = useState({
        secretKey: '',
        sender: ''
    });

    const readMessage = async (e: SyntheticEvent) => {
        e.preventDefault();

    };

    const updateSecretKey = (key: string, value: any) => {
        setSecretKey(secret => ({
            ...secret,
            [key]: value,
        }));
    };


    return (
        <>
        <div className="show-message">
            <h3>Here you will see the secret message:</h3>
            <br/>
            <p>SMS</p>
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