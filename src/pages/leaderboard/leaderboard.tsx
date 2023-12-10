import React from "react";
import './leaderboard.scss';
import { Link } from 'react-router-dom'

const Leaderboard:React.FC = () => {
    return (
        <section id="leaderboard-section">
            <h1>Leader Board</h1>
            <div id="Scores">
                <div className="Board">
                    <h2>Login</h2>
                    {JSON.parse(localStorage.getItem("logLeaderboard") ?? '[]').sort((a:any, b:any) => a.time - b.time).map((data:any, _:any) => 
                        <>
                            <div className="row">Username:{data.name}, Password:{data.password}, Email:{data.email}, Time: {data.time}seconds</div>
                        </>
                    )}
                </div>
                <div className="Board">
                    <h2>Register</h2>
                    {JSON.parse(localStorage.getItem("regLeaderboard") ?? '[]').sort((a:any, b:any) => a.time - b.time).map((data:any, _:any) => 
                        <>
                            <div className="row">Username:{data.name}, Password:{data.password}, Email:{data.email}, Time: {data.time}seconds</div>
                        </>
                    )}
                </div>
            </div>
            <Link to={'/'} className="link" >Back to Home</Link>
        </section>
    );
}

export default Leaderboard;