import React from "react";
import './regEmail.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
const RegEmail:React.FC = () => {
    const [email,setEmail] = useState<string>("")
    const [highlightIndex, setHighlightIndex] = useState<number>(0)
    
    const characters =  ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","@",".","0","1","2","3","4","5","6","7","8","9"];
    useEffect(() => {
        // Toggle allowInput every 5 seconds
        const intervalId = setInterval(() => {
            const a = Math.random()
            let increment = 0
            if (a < 0.9) {
                increment = 1
            } else if (a < 0.95) {
                increment = 2
            } else{
                increment = 3
            }
            setHighlightIndex(prevIndex => ((prevIndex+increment) % characters.length))
        },500);
        return () => clearInterval(intervalId);
    }, [highlightIndex])

    const pushStop = () => {
        const curChar = characters.at(highlightIndex)
        if (curChar){
            setEmail(prevEmail => prevEmail.concat("",curChar))
        }
        
    }

    const validateEmail = (email:string) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const magic = () => {
        setHighlightIndex(Math.floor(Math.random() * 33))
    }
    const handleKey = useCallback((e:any) => {
        console.log(`user has pressed ${e.key}`);
        if (e.key === 'ArrowRight') {
            setHighlightIndex(prevIndex => ((prevIndex+1) % characters.length))
        }
    }, []);
    
    useEffect(() => {
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [handleKey]);

    return (
        <section id="regEmail-section">
            <h1>Email</h1>
            <p>Click stop button to enter the character as your input.<br/>
             Use your Right arrow key to increment faster.
            </p>
            <div id="columns">
            {characters.map((char, index) => (
                        (index === highlightIndex?
                            <div key={index} className="highlighted-box">
                                {char}
                            </div>
                        :
                            <div key={index} className="box">
                                {char}
                            </div>
                        )
                    ))}
            </div>
            <button onClick={(e)=>pushStop()}> Stop</button>
            <button onClick={(e)=>magic()}> Random</button>
            <button onClick={(e)=>{setEmail("")}}> Reset</button>
            <p>current index {highlightIndex}</p>
            
            <p>Your email: {email}</p>
            {validateEmail(email) ?
            <Link className="link" to={`/register/age`} onClick={(e) => localStorage.setItem("regEmail",email)}>Next Step</Link>
            : <p>Email must be a valid format 🤷‍♂️</p>
            }
            
        </section>
    );
}

export default RegEmail;