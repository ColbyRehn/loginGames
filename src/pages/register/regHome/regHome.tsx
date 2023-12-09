import React from "react";
import './regHome.scss';
import { Link } from 'react-router-dom'
const RegHome:React.FC = () => {
    console.log(Date.now())
    return (
        <section>
            <h1>Hi new user!!!</h1>
            <p>Are you ready to join the fantanstic Login Games?</p>
            <Link className="link" onClick={(e) => {localStorage.setItem("regStartTime", Date.now().toString())}} to="/register/username">YESSSS</Link>
        </section>
    );
}

export default RegHome;