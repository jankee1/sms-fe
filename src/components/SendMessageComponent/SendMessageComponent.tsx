import React, {SyntheticEvent, useState} from 'react';
import {Btn} from "../common/Btn";
import {CreateMessageApiResponse} from "types";

import './SendMessageComponent.css';


export const SendMessageComponent = () => {

    const MSG = {
        sender: '',
        body: '',
        toBeDeletedAfterRead: false
    }
    const APIRES: CreateMessageApiResponse = {
        isSucces: false,
        secretKey: '',
        sender: '',
        errMsg: ''
    }
    const MAX_SENDER_LENGTH: number = 30
    const MAX_MESSAGE_LENGTH: number = 500

    const [message, setMessage] = useState(MSG);
    const [apiResponse, setApiResponse] = useState(APIRES)
    const [toBeDeletedAfterReadChecked, setToBeDeletedAfterReadChecked] = useState(false)

    const toBeDeletedAfterReadCheckbox = () => setToBeDeletedAfterReadChecked(!toBeDeletedAfterReadChecked)

    const saveMessage = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        try {
            const res = await fetch(`http://localhost:3001/message/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...message
                }),
            });
            const data: CreateMessageApiResponse = await res.json();
            setApiResponse({
                ...data
            })
            setToBeDeletedAfterReadChecked(false);
        } finally {
            console.log('wynik',apiResponse); // TODO ogarnac ten temat
            setMessage(MSG);
        }
        console.log('wynik',apiResponse);
    };

    const updateForm = (key: string, value: any) => {
        setMessage(msg => ({
            ...msg,
            [key]: value,
        }));
    };


    return (
        <>
            
            <form action="" className="send-form" onSubmit={saveMessage} >
                 <p>{apiResponse.isSucces ?? `Dear ${apiResponse.sender}. Your secret key is ${apiResponse.secretKey}. Pass these credentials to the person who you sent this message to as this is the first and last time where the secret key is visible for you`}</p>
                <h2>Create secret message</h2>
                <p>
                    <label>
                        Sender: <br/><br/>
                        <input
                            type="text"
                            title="sender"
                            required
                            maxLength={MAX_SENDER_LENGTH}
                            value={message.sender}
                            onChange={e => updateForm('sender', e.target.value)}
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Message: <br/><br/>
                        <textarea
                            className='message-body'
                            name="description"
                            maxLength={MAX_MESSAGE_LENGTH}
                            value={message.body}
                            onChange={e => updateForm('body', e.target.value)}
                        />
                    </label>
                </p>
                <p>
                    <label>
                        <input 
                            type="checkbox" 
                            name="toBeDeletedAfterRead" 
                            id="" 
                            onClick={toBeDeletedAfterReadCheckbox}
                            checked={toBeDeletedAfterReadChecked}
                            onChange={e => updateForm('toBeDeletedAfterRead', e.target.checked)}
                        />
                        Delete message after 24h*?
                    </label>
                </p>
                <Btn text="Send message"/>

                <p><small>* The message will be deleted after 24h regardless whether it will be read or not</small></p>
            </form>
        </>
    );
}