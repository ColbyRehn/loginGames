import React from "react";
import './regUsername.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const RegUsername:React.FC = () => {
    const [allowInput, setAllowInput] = useState<boolean>(true);
    const [regUsername,setRegUsername] = useState<string>("");
    useEffect(() => {
        // Toggle allowInput every 5 seconds
        const intervalId = setInterval(() => {
            setAllowInput(prevInput => !prevInput);
            const element = document.getElementById("color-input")
            const smile = document.getElementById("smile")
            // if (element && smile) {
            //     if (allowInput) { 
            //         element.style.borderColor = "green";
            //         smile.textContent = "😊";
            //     } else {
            //         element.style.borderColor = "red"; 
            //         smile.textContent = "😡";
            //     }
            // console.log(element)
            // console.log("------")
            // }
        },1000);
        return () => clearInterval(intervalId);
    }, [allowInput])

    useEffect(()=>{
        
    },[allowInput])
    const usernameInput = (name:string) =>{
        if(allowInput && name.match("^(?!.*(.).*\x01)[a-z]+$")) {
            if (name.length <=7 )
            {
                setRegUsername(name)
                if (name.length == 7) {
                    localStorage.setItem('regUsername',name)
                }
            }
        } else {
            setRegUsername("")
        }
    }
    return (
        <section>
            <h1>Username</h1>
            <p>Only type into the box when I am happy</p>
            <p>* Must be length 7, no duplicated characters, all characters must be lowercases</p>
            
            <input id="color-input" type="text" pattern="[a-zA-Z]"  onChange={(e) => usernameInput(e.target.value)} value = {regUsername}/>
            {allowInput ? <p id="smile">😊</p>
            : <p id="smile">😡</p>
            }

            {regUsername.length == 7? 
            <Link className="link" to={`/register/password`}>Next</Link>:
            <p id="length-indicator">{regUsername.length}/7</p>
            }
            
        </section>
    );
}

export default RegUsername;