import React, { useEffect, useState } from 'react';

// import './Warning.css';

type Props = {
    text: string;
}

export const Warning = (props: Props) => {

    const [color,setColor] = useState('')

    function colorGen(): string {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`
      }

      useEffect(() => {
        setInterval(() => {
            setColor(colorGen())
        }, 100)
      }, [])

    return (
        <b style={{color: color}}>{props.text}</b>
    );
}