import React, {SyntheticEvent, useState,useRef} from 'react';

import './Error.css';

type Props = {
    errorText: string;
}

export const Error = (props: Props) => {
    return (
        <div className="error">
            <p>{props.errorText}</p>
        </div>
    )
}
