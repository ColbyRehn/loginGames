import React from "react";
import './regAge.scss';
import { useState, useEffect, useCallback } from 'react';
import { match } from "assert";
import { Link } from 'react-router-dom';

const RegAge:React.FC = () => {
    const [age,setAge] = useState<number>(0)
    // const matchAge = Math.floor(Math.random()*1000)
    const matchAge = 100
    // const [matchAge, setMatchAge] =useState<number>(Math.floor(Math.random()*1000));
    const [blackout, setBlackout] = useState<boolean>(false);
    const [guessCorrect, setGuessCorrect] =useState<boolean>(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    console.log("The correct answer is here",matchAge)
    useEffect(() => {
        // Toggle allowInput every 5 seconds
        const intervalId = setInterval(() => {
            setBlackout(true);
        },Math.floor(Math.random()*10 + 7)*1000);
        console.log(blackout)
        setIntervalId(intervalId);
        setAge(Math.floor(Math.random()*1000))
        return () => clearInterval(intervalId);
    }, [blackout])

    const isClose  = () => {
        if (Math.abs(age - matchAge) > 200) {
            window.alert("Super Cold")
            setBlackout(true)
        } else if (Math.abs(age - matchAge) > 150) {
            window.alert("Cold")
            setBlackout(true)
        } else if (Math.abs(age - matchAge) > 100) {
            window.alert("warm")
        } else if (Math.abs(age - matchAge) > 50) {
            window.alert("hotter")
        } else if (Math.abs(age - matchAge) > 0) {
            if (age > matchAge ) {
                window.alert("super hot! go lower")
            } else {
                window.alert("super hot! go higher")
            }
            
        } else {
            const startTimeStr = localStorage.getItem("regStartTime");
            if (! startTimeStr) {
                return
            }
            const startTime = parseInt(startTimeStr)
            const finalTime = Date.now();

            const diff = finalTime - startTime;
            
            window.alert("You registered an account! You only took "+diff/1000+" seconds in total. Score is recoreded on leaderboard.")
            
            // add to leaderboard
            const userData = {
                "name" : localStorage.getItem("regUsername"),
                "password":localStorage.getItem("regPassword"),
                "email":localStorage.getItem("regEmail"),
                "time": diff/1000
            }
            // Store login finish time
            let leader = localStorage.getItem("regLeaderboard")
            if (!leader){
                localStorage.setItem("regLeaderboard",JSON.stringify([userData]))
            } else {
                const leader_list = JSON.parse(leader)
                leader_list.push(userData)
                localStorage.setItem("regLeaderboard",JSON.stringify(leader_list))
            }
            
            if (intervalId){
                clearInterval(intervalId)
            }
            
            setGuessCorrect(true)
        }
    }

    return (
        <>
            {blackout ?
                <section id="blackout">
                    <p>Boo!!! I properly changed you slider while you weren't looking 👻👻👻👻<br/> I hope you remembered</p>
                    <button onClick={(e) => {setBlackout(false)}}>Scare the Ghosts with your uni debt</button>
                </section>
                :
                <section>
                    <h1>Age</h1>
                    <p>Slide the bar until you get the right age to enter. Even we don't know but we'll tell you if you're close<br />
                    Watch out for blackouts & Ghosts!</p>
                    
                    <input type="range" id="volume" name="volume" min="0" max="1000" value={age} onChange={(e) => setAge(parseInt(e.target.value))} />
                    <p>Age: {age}</p>
                    <button onClick={(e) => isClose()}>Check age</button>
                    {guessCorrect ? 
                        <Link className="link" to={`/`} onClick={(e) => localStorage.setItem("regAge", age.toString())}>Finish registering</Link>
                        : <p>Your age is not valid to continue 🥱</p>
                    }
                </section>
            }
        </>
    )
}

export default RegAge;