import React from "react";
import './logUsername.scss';
import RegUsername from "../../register/regUsername/regUsername";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const LogUsername:React.FC = () => {
    let username = localStorage.getItem("regUsername")
    const [logingUsername,setLogingUsername] = useState<Array<string>>(Array(7).fill(""))
    const [letterRemaining, setLetterRemaining] = useState(new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"));
    if (username === null) {
        username = ""
    } 
    const [highlightIndex, setHighlightIndex] = useState<number>(8)

    
    useEffect(() => {
        // Toggle allowInput every 1 seconds
        const intervalId = setInterval(() => {
            const a = Math.random()
            if (highlightIndex == 8){
                const prevTime = localStorage.getItem("mytime");
                const curTime = Date.now()
                if (prevTime) {
                    console.log(curTime - parseInt(prevTime))
                }
                localStorage.setItem("mytime",curTime.toString())
            }
            setHighlightIndex(prevIndex => ((prevIndex+1) % 9))
        },1000);
        return () => clearInterval(intervalId);
    }, [highlightIndex])

    const gunFire = () => {
        if (highlightIndex <=6){
            const updatedLogingUsername = [...logingUsername];
            updatedLogingUsername[highlightIndex] = letterRemaining[0]
            setLogingUsername(updatedLogingUsername)
        }
        setLetterRemaining([...letterRemaining].slice(1))


    }
    return (
        <section id="logUsername-section">
            <h1>Login: Username</h1>
            <p>Remember your username {localStorage.getItem("regUsername")}
            <br/>Fire the letters in the canon to spell your username correctly</p>

            <div id="row-boxes">
                { highlightIndex === 8 ?
                    <div className="highlighted-box">❌</div>
                    :
                    <div className="box">❌</div>
                }
                {logingUsername.map((char, index) => (
                        (index === highlightIndex ?
                            <div key={index} className="highlighted-box">{char}</div>
                        :
                            <div key={index} className="box">{char}</div>
                        )
                        ))}
                        
                { highlightIndex === 7 ?
                    <div className="highlighted-box">❌</div>
                    :
                    <div className="box">❌</div>
                }
            </div>
            {logingUsername.join("") === username? 
            <Link to={`/login/password`} className="link" >Proceed to Password</Link>
            :
            <button onClick={(e) => gunFire()}>Fire the inaccurate cannon!</button>
            }
            
            <div id="gun">
                <div id="laser" />
                <div id="cannon">{letterRemaining[0]}</div>
            </div>

            <div id="chamber">
                {letterRemaining.slice(1).map((char, index) => (
                    index<= 3?
                        <div key={index} className="box">{char}</div>
                    :
                    null
                ))}
            </div>

        </section>
    );
}

export default LogUsername;