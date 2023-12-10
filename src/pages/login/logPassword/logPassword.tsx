import React from "react";
import './logPassword.scss';
import { useState, useEffect, useCallback} from 'react';
import { Link } from 'react-router-dom'


const LogPassword:React.FC = () => {
    const [curPass, setCurPass] = useState<string>("")
    const correctPass = localStorage.getItem("regPassword") || "passwo"
    const [shuffledPass, setShuffledPass] = useState<string>(correctPass)
    const [display, setDisplay] = useState<Array<Boolean>>(Array(6).fill(false))
    const [displayAll, setDisplayAll] = useState<boolean>(false)
    const [userCanFlip, setUserCanFlip] = useState<boolean>(false)
    const shuffle = (word:string) => {
        const a = word.split(""),
            n = a.length;
  
        for(var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a.join("");
    }
    
    // no dependency, run only when game start being toggle to true.
    useEffect(() => {
        if (displayAll === true)
        {
            const intervalId = setInterval(() => {
                setDisplayAll(false)
                setUserCanFlip(true)
            },3000);
            return () => clearInterval(intervalId);
        }
    }, [displayAll])

    const start_clicked = ()=>{
      setUserCanFlip(false)
      setShuffledPass(prev=>shuffle(prev))
      setDisplayAll(true)
      setDisplay(Array(6).fill(false))
      setCurPass("")
    }

    const flipBox = (index:number) => {
        if (userCanFlip && display[index] == false) {
            
            const updatedDisplay = [...display]
            updatedDisplay[index] = true
            setDisplay(updatedDisplay)


            console.log(curPass)
            console.log(curPass+shuffledPass[index])
            if (correctPass.startsWith(curPass+shuffledPass[index])) {
                setCurPass(curPass=>curPass+shuffledPass[index])
            } else {
                start_clicked()
                window.alert("Aya, you failed.")
            }
            
        }
    }

    return (
        <section id="logPassword-section">
            <h1>Login: Password</h1>
            <p>Memory game with your password.<br/> To help you remember your password click Start, wait, then click the boxes in the correct order. </p>
            <p>Here is your password you want to match: {correctPass}</p>
            <div id="row">
                    {shuffledPass.split("").map((char, index) => 
                        <>
                            {displayAll ?
                                <div className="box" key={char}>{char}</div>
                                :
                                (display[index] ?
                                    <div className="box" key={char}>{char}</div>
                                    :
                                    <div className="box" onClick={(e) => flipBox(index)} key={char}></div>
                                )
                            }
                        </>
                    )}
            </div>
            {curPass === correctPass? 
                <Link to={`/login/email`} className="link" >Proceed to email</Link>
            :
            
            <button onClick={(e)=>start_clicked()} >Start Game</button>
        }
            
        </section>
    );
}

export default LogPassword;