import React from "react";
import './logCaptcha.scss';
import jpMan from './jpMan.webp'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
const LogCaptcha:React.FC = () => {
    const [diffSpoted, setDiffSpoted] = useState<Boolean>(false)

    const logFinishTime = () => {
        const startTimeStr = localStorage.getItem("logStartTime");
        if (! startTimeStr) {
            return
        }
        const startTime = parseInt(startTimeStr)
        const finalTime = Date.now();

        const diff = finalTime - startTime;
        window.alert("Yay, you logged in. You only took "+diff/1000+" seconds. Score is recoreded on leaderboard.")
        
        const userData = {
            "name" : localStorage.getItem("regUsername"),
            "password":localStorage.getItem("regPassword"),
            "email":localStorage.getItem("regEmail"),
            "time": diff/1000
        }
        // Store login finish time
        let leader = localStorage.getItem("logLeaderboard")
        if (!leader){
            localStorage.setItem("logLeaderboard",JSON.stringify([userData]))
        } else {
            const leader_list= JSON.parse(leader)
            leader_list.push(userData)
            localStorage.setItem("logLeaderboard",JSON.stringify(leader_list))
        }
    }


    return (
        <section id="logCaptcha-section">
            <h1>Login: Captcha</h1>
            <p>Spot the difference by pressing it</p>
            <div id="images">
                <div className="image">
                    <h2 onClick = {(e)=>{setDiffSpoted(true); logFinishTime();}}>Image 1</h2>
                    <img src={jpMan} />
                </div>
                <div className="image">
                    <h2 onClick = {(e)=>{setDiffSpoted(true); logFinishTime();}}>Image 2</h2>
                    <img src={jpMan} />
                </div>
            </div>
            {
                diffSpoted ? 
                    <Link to={'/leaderboard'} className="link" >Log in !!!!!!! Finally!! Maybe there is a leaderboard</Link>
                :
                    null
            }
        </section>
    );
}

export default LogCaptcha;