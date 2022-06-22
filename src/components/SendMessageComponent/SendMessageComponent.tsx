import React, {SyntheticEvent, useState} from 'react';
import {Btn} from "../common/Btn";

// import './SendMessageComponent.css';

export const SendMessageComponent = () => {

    const [message, setMessage] = useState({
        sender: '',
        body: '',
        toBeDeletedAfterRed: false,
    });

    const saveMessage = async (e: SyntheticEvent) => {
        e.preventDefault();

    };

    const updateForm = (key: string, value: any) => {
        setMessage(msg => ({
            ...msg,
            [key]: value,
        }));
    };


    return (
        <form action="" className="send-form" onSubmit={saveMessage}>
            <h3>Create secret message</h3>
            <p>
                <label>
                    Sender: <br/>
                    <input
                        type="text"
                        title="sender"
                        required
                        maxLength={99}
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
                        maxLength={999}
                        value={message.body}
                        onChange={e => updateForm('body', e.target.value)}
                    />
                </label>
            </p>
            <Btn text="Send message"/>
        </form>
    );
}