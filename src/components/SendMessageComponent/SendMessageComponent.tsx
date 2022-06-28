import React, {SyntheticEvent, useState} from 'react';
import {Btn} from "../common/Btn";

import './SendMessageComponent.css';


export const SendMessageComponent = () => {

    const MSG = {
        sender: '',
        body: '',
        toBeDeletedAfterRead: false
    }
    const MAX_SENDER_LENGTH: number = 30
    const MAX_MESSAGE_LENGTH: number = 500

    const [message, setMessage] = useState(MSG);

    const saveMessage = async (e: SyntheticEvent) => {
        e.preventDefault();
        console.log(message)


        setMessage(MSG)
    };

    const updateForm = (key: string, value: any) => {
        setMessage(msg => ({
            ...msg,
            [key]: value,
        }));
    };


    return (
        <form action="" className="send-form" onSubmit={saveMessage}>
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
                        onChange={e => updateForm('toBeDeletedAfterRead', e.target.checked)}
                    />
                    Delete message after 24h*?
                </label>
            </p>
            <Btn text="Send message"/>

            <p><small>* The message will be deleted after 24h regardless whether it will be read or not</small></p>
        </form>
    );
}