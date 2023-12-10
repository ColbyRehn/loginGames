import './App.scss';
import { Link, Route, Routes } from "react-router-dom"
import { useState, useEffect } from 'react';

import Home from './pages/home/home';
import Leaderboard from './pages/leaderboard/leaderboard';
import RegHome from './pages/register/regHome/regHome';
import RegUsername from './pages/register/regUsername/regUsername';
import RegPassword from './pages/register/regPassword/regPassword';
import RegEmail from './pages/register/regEmail/regEmail';
import RegAge from './pages/register/regAge/regAge';
import LogHome from './pages/login/logHome/logHome';
import LogUsername from './pages/login/logUsername/logUsername';
import LogPassword from './pages/login/logPassword/logPassword';
import LogEmail from './pages/login/logEmail/logEmail';
import LogCaptcha from './pages/login/logCaptcha/logCaptcha';

const App: React.FC = () => {
  // const [loading, setLoading] = useState<boolean>(true);

  return (
    <>
      <header>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/register" element={<RegHome />} />
          <Route path="/register/username" element={<RegUsername />} />
          <Route path="/register/password" element={<RegPassword />} />
          <Route path="/register/email" element={<RegEmail />} />
          <Route path="/register/age" element={<RegAge />} />
          <Route path="/login" element={<LogHome />} />
          <Route path="/login/username" element={<LogUsername />} />
          <Route path="/login/password" element={<LogPassword />} />
          <Route path="/login/email" element={<LogEmail />} />
          <Route path="/login/captcha" element={<LogCaptcha />} />
        </Routes>
      </main>
      <footer>
        <p>By Colby & Zijie</p>
      </footer>
    </>
  );
}

export default App;