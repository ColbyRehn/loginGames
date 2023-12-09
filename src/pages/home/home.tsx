import React from "react";
import './home.scss';
import { Link } from 'react-router-dom'

const Home:React.FC = () => {

    return (
        <section>
            <h1>The Login Games 😈</h1>
            <p>⭐⭐⭐⭐⭐ "Who would have thought logging in would be this much fun" - The Times</p>
            <Link className="link" to={`/register`}>Register a new account</Link>
            <Link className="link" to={`/login`}>Login</Link>
            <Link className="link" to={`/leaderboard`}>Leaderboard</Link>

        </section>
    );
}

export default Home;