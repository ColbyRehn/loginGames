import React from "react";
import './home.scss';
import { Link } from 'react-router-dom'

const Home:React.FC = () => {

    return (
        <section>
            <h1>The Login Games 😈</h1>
            <p>Your data is not safe with us. Trust us.</p>
            <Link className="link" to={`/register`}>Register a new account</Link>
            <Link className="link" to={`/login`}>Login a registered account</Link>
            <Link className="link" to={`/leaderboard`}>Leaderboard</Link>

        </section>
    );
}

export default Home;