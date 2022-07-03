import React, { useEffect, useState } from 'react';

// import './Warning.css';

type Props = {
    text: string;
}

export const Warning = (props: Props) => {

    return (
        <p className='warning-text'><b>{props.text}</b></p>
    );
}