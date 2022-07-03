import React, {SyntheticEvent, useState, useEffect} from 'react';
import {Btn} from "../common/Btn";
import {CreateMessageApiResponse} from "types";
import {MessageSentConfirmation} from './MessageSentConfirmation';
import {apiUrl} from '../../config/api';
import { Error } from '../common/Error';

import './SendMessageComponent.css';


export const SendMessageComponent = () => {

    const MSG = {
        sender: '',
        body: '',
        toBeDeletedAfter24h: false
    }
    const APIRES: CreateMessageApiResponse = {
        isSucces: false,
        secretKey: '',
        sender: '',
        errMsg: ''
    }
    const MAX_SENDER_LENGTH: number = 30
    const MAX_MESSAGE_LENGTH: number = 500
    const ONE_MINUTE: number = 60

    const [message, setMessage] = useState(MSG);
    const [apiResponse, setApiResponse] = useState(APIRES)
    const [toBeDeletedAfter24hChecked, setToBeDeletedAfter24hChecked] = useState(false)
    const [counter, setCounter] = useState(0);
    const [shomConfirmation, setShowConfirmation] = useState(false);

    const toBeDeletedAfterReadCheckbox = () => setToBeDeletedAfter24hChecked(!toBeDeletedAfter24hChecked)


    const saveMessage = async (e: SyntheticEvent) => {
        e.preventDefault();
        setShowConfirmation(false);
        
        try {
            const res = await fetch(`${apiUrl}/message/`, {
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
            console.log(data)
            if(data.secretKey && data.secretKey.length > 0) {
                setCounter(ONE_MINUTE);
                setShowConfirmation(true);
            }

            
            setToBeDeletedAfter24hChecked(false);

        } finally {
            setMessage(MSG);
            console.log(apiResponse)
        }
    };

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);


    const updateForm = (key: string, value: any) => {
        setMessage(msg => ({
            ...msg,
            [key]: value,
        }));
    };

    return (
        <>
            <div className="message-confirmation">
                {
                    shomConfirmation ? <MessageSentConfirmation sender={apiResponse.sender} secretKey={apiResponse.secretKey} counter={counter}/> : ''
                }
                {
                    apiResponse.errMsg && apiResponse.errMsg.length > 0 ? <Error errorText={apiResponse.errMsg}/> : ''
                }
            </div>
            
            <form action="" className="send-form" onSubmit={saveMessage} >
                <h2>Create secret message</h2>
                <p>
                    <label>
                        Sender: <br/>
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
                        Message: <br/>
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
                            name="toBeDeletedAfter24h" 
                            id="" 
                            onClick={toBeDeletedAfterReadCheckbox}
                            checked={toBeDeletedAfter24hChecked}
                            onChange={e => updateForm('toBeDeletedAfter24h', e.target.checked)}
                        />
                        Delete message after 24h?*
                    </label>
                </p>
                <Btn text="Send message"/>

                <p><small>* The message will be deleted after 24h regardless whether it will be read or not</small></p>
            </form>
        </>
    );
}