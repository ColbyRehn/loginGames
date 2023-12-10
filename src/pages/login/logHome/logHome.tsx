import React from "react";
import './logHome.scss';
import { Link } from 'react-router-dom'

const LogHome:React.FC = () => {

    return (
        <section>
            <h1>Did you enjoy registering?</h1>
            <p>Well its time to login 😍😍<br/>
            Please use your most recent registered account.</p>
            <h2>Your most recent account. Btw we are big on security</h2>
            <p>Your username:{localStorage.getItem("regUsername")}</p>
            <p>Your password: {localStorage.getItem("regPassword")}</p>
            <p>Your email: {localStorage.getItem("regEmail")}</p>

            {localStorage.getItem("regUsername") && localStorage.getItem("regPassword") && localStorage.getItem("regEmail") ?
                <Link className="link" onClick={(e) => {localStorage.setItem("logStartTime", Date.now().toString())}} to={`/login/username`}>LETS GOOO</Link>
                :
                <Link className="link" to={`/register`}>Register an account 😡</Link>
            }

            

        </section>
    );
}

export default LogHome;