import React from "react";
import './regPassword.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const RegPassword:React.FC = () => {
    const [regPassword,setRegPassword] = useState<string>("");
    const [comfirmPassword,setComfirmPassword] = useState<string>("ABCDEF");
    const [money, setMoney] = useState<number>(100);
    const [lockedCell,setLockedCell] = useState<Set<number>>(new Set<number>());
    const passwordInput = (name:string) =>{
        if (name.length <=6) {
            setRegPassword(name)
            if (name.length === 6) {
                localStorage.setItem('regPassword',"name")
            }
        }
    }

    const gamble = () => {
        if (money >= 10) {
            setMoney(money-10);
            shuffleClicking()
        } else {
            window.alert("Your are broke!");
        }
    }

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

    const shuffleClicking = () => {
        const shuffled = shuffle(comfirmPassword)
        console.log(shuffled)
        setComfirmPassword(shuffled)
        
    }
    const toggleLockCell = (myindex:number) => {
        setLockedCell((prevSet) => {
            const newSet = new Set(prevSet);
            if (newSet.has(myindex)) {
              newSet.delete(myindex); // Remove from set if already present
            } else {
              newSet.add(myindex); // Add to set if not present
            }
            return newSet;
          });
    }
    return (
        <section>
            <h1>Password</h1>
            {regPassword.length != 6?
                <>
                    <p>Enter your password</p>
                    <input type="password" onChange={(e) => passwordInput(e.target.value)} value={regPassword}/>
                </>
                :
                <>
                    <p>Oh no, your password is being set and you cannot change it anymore. And it will be displayed to undermine your securit</p>
                    <p>{regPassword}</p>
                </>
            }
            <p>Now confirm your password</p>

            <div id="slot-machine">
            {comfirmPassword.split('').map((char, index) => (
                <div id="slot">
                    <div key={index} className="box" onClick={(e)=>toggleLockCell(index)}>
                        {char}
                    </div>
                    {lockedCell.has(index) ? <p>locked</p>:<p>unlocked</p>}
                </div>
            ))}
            <button onClick={(e) => shuffleClicking()}>Shuffle</button>
            </div>
            
            {money > 0 ? 
            <button onClick={(e) => gamble()}>Roll for $10</button>
            :
            <button >Go bankrupt</button>
            }


        </section>
    );
}

export default RegPassword;