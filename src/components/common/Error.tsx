import React from 'react';

import './Error.css';

type Props = {
    errorText: string
}

export const Error = (props: Props) => {
    return (
        <div className="error">
            <h3>Error!</h3>
            <p>{props.errorText}</p>
        </div>
    )
}
