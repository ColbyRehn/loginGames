import React from "react";
import './home.scss';

const Home:React.FC = () => {

    return (
        <section id="home-section">
            <h1>The Login Games 😈</h1>
            <p>⭐⭐⭐⭐⭐ "Who would have thought logging in would be this much fun" - The Times</p>
            <a href="/register">Register a new account</a>
            <a href="/login">Login</a>
            <a href="/leaderboard">Leaderboard</a>
        </section>
    );
}

export default Home;