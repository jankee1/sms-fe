import React, {SyntheticEvent, useState} from 'react';
import {Btn} from "../common/Btn";

// import './ReadMessageComponent.css';

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
        <form action="" className="send-form" onSubmit={readMessage}>
            <h3>Update secret message</h3>
            <p>
                <label>
                    Secret key: <br/>
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
    );
}