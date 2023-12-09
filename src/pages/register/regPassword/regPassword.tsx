import React from "react";
import './regPassword.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import lockImag from "./lock.webp"
import unlockImag from "./unlock.webp"

const RegPassword:React.FC = () => {
    const [regPassword,setRegPassword] = useState<string>("");
    const [comfirmPassword,setComfirmPassword] = useState<string>("");
    const [money, setMoney] = useState<number>(100);
    const [lockedCell,setLockedCell] = useState<Set<number>>(new Set<number>());
    const passwordInput = (name:string) =>{
        if (name.length <=6) {
            setRegPassword(name)
            if (name.length === 6) {
                localStorage.setItem('regPassword',name)
                setComfirmPassword(shuffle(name))
            }
        }
    }

    const mystery = () => {
        const random = Math.random()
        if (random > 0.95) {
            window.alert("Jackpot!!!")
            setMoney(prevmoney => prevmoney + 1000)
        } else if (random >0.85) {
            window.alert("Bad Luck! -500")
            setMoney(prevmoney => prevmoney - 500)
        } else if (random > 0.56) {
            window.alert("Win 20")
            setMoney(prevmoney => prevmoney + 20)
        } else if (random > 0.01){
            window.alert("Lost 10")
            setMoney(prevmoney => prevmoney - 10)
        } else {
            window.alert("Nothing happened")
        }
         
    }

    const gamble = () => {
        if (money >= 10) {
            setMoney(money-10);
            
            const shuffled = shuffle(comfirmPassword)
            console.log(shuffled)
            setComfirmPassword(shuffled)
        } else {
            window.alert("Get a job already 😒");
        }
    }

    const shuffle = (word:string) => {
        const a = word.split(""),
            n = a.length;
    
        for(var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            if (lockedCell.has(i) || lockedCell.has(j)){
                continue
            }
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a.join("");
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
        <section id="regPassword">
            <h1>Password</h1>
            {regPassword.length != 6?
                <>
                    <p>Enter a secure password with length 6</p>
                    <input type="password" onChange={(e) => passwordInput(e.target.value)} value={regPassword}/>
                </>
                :
                <>
                    <p>Oh no, your password cannot be changed anymore.</p>
                    <p>{regPassword}</p>
                    <h2>Now confirm your password</h2>
                    <p>You have ${money} remaining to gamble until you match your password.<br/>
                    You can click on each box to lock the character. A locked character will remain in the same position after a roll.</p>
                    <div id="slot-machine"> 
                    {comfirmPassword.split('').map((char, index) => (
                        <div id="slot">
                            <div key={index} className="box" onClick={(e)=>toggleLockCell(index)}>
                                {char}
                            </div>
                            {lockedCell.has(index) ? <img src={lockImag} />:<img src={unlockImag} />}
                        </div>
                    ))}
                    </div>
                    {comfirmPassword !== regPassword ? 
                        <>
                        <button onClick={(e) => gamble()}>Roll for $10</button>
                        <button onClick={(e) => mystery()}>Possible chance to win money but this cursed 💀</button>
                        </>
                    : 
                    <Link className="link" to={`/register/email`} >Next Step</Link>
                    }
                    
                </>
            }
            

        </section>
    );
}

export default RegPassword;
