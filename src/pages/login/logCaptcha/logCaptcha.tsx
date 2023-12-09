import React from "react";
import './logCaptcha.scss';
import jpMan from './jpMan.webp'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
const LogCaptcha:React.FC = () => {
    const [diffSpoted, setDiffSpoted] = useState<Boolean>(false)
    return (
        <section id="logCaptcha-section">
            <h1>Login: Captcha</h1>
            <p>Spot the difference by pressing it</p>
            <div id="images">
                <div className="image">
                    <h2 onClick = {(e)=>{setDiffSpoted(true); window.alert("Great job you found the difference")}}>Image 1</h2>
                    <img src={jpMan} />
                </div>
                <div className="image">
                    <h2 onClick = {(e)=>{setDiffSpoted(true); window.alert("Great job you found the difference")}}>Image 2</h2>
                    <img src={jpMan} />
                </div>
            </div>
            {
                diffSpoted ? 
                    <Link to="" className="link" >Log in !!!!!!! Finally!! Maybe there is a leaderboard</Link>
                :
                    null
            }
        </section>
    );
}

export default LogCaptcha;