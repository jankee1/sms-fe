import React, {SyntheticEvent, useState, useEffect} from 'react';
import {Btn} from "../common/Btn";
import {CreateMessageApiResponse} from "types";
import {MSG, APIRES, ONE_MINUTE, MAX_SENDER_LENGTH, MAX_MESSAGE_LENGTH} from "../../config/api";
import {MessageSentConfirmation} from './MessageSentConfirmation';
import {apiUrl} from '../../config/api';
import { Error } from '../common/Error';

import './SendMessageComponent.css';


export const SendMessageComponent = () => {

    const [message, setMessage] = useState(MSG);
    const [apiResponse, setApiResponse] = useState(APIRES)
    const [toBeDeletedAfter24hChecked, setToBeDeletedAfter24hChecked] = useState<boolean>(false)
    const [counter, setCounter] = useState<number>(0);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

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

            if(data.secretKey && data.secretKey.length > 0) {
                setCounter(ONE_MINUTE);
                setShowConfirmation(true);
            }

        } finally {
            setMessage(MSG);
            setToBeDeletedAfter24hChecked(false);
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
                    showConfirmation ? <MessageSentConfirmation sender={apiResponse.sender} secretKey={apiResponse.secretKey} counter={counter}/> : ''
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