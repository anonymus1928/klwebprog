import React from 'react';

import logo from '../../assets/stratego-logo.png';

export function Header() {
    return (
        <div className="text-center" id="header">
            <img className="my-5" src={ logo } alt="" />
        </div>
    )
}