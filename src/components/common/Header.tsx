import React from "react";
import './styles/Header.css'

type HeaderProps = {
    title:string
}

/**
 * Header of the HTML
 */
export const Header: React.FC<HeaderProps> = ({title}) => {
    return (
        <header className="Header-Container">
            <h1>{title}</h1>
        </header>
    )
}