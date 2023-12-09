import React from "react";
import './logHome.scss';
import { Link } from 'react-router-dom'

const LogHome:React.FC = () => {

    return (
        <section>
            <h1>Did you enjoy registering?</h1>
            <p>Well its time to login 😍😍</p>
            <Link className="link" to={`/login/username`}>LETS GOOO</Link>
        </section>
    );
}

export default LogHome;