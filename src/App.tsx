import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/UserPages/HomePage/HomePage';
import SearchPage from './pages/UserPages/SearchPage/SearchPage';
import NoMatch from './components/NoMatch';
import SignIn from './pages/SignIn';
import './all.scss';
import Admin from './pages/AdminPages/Admin';
import DetailPage from './pages/AdminPages/DetailPage';
import ModalTeacher from './components/AdminList/ModalTeacher';
import Loader from './components/Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { defaultToastConfig } from './utils/config';
import ResearchHomepage from './pages/AdminPages/ResearchHomepage';
import Report from './pages/AdminPages/Report';
import NavBarUser from './components/User/NavBarUser/NavBarUser';
import { ROLE_USER } from './constants/constant';

const App = () => {
  const [role, setRole] = useState<string>(ROLE_USER.USER);

  return (
    <div>
      <ToastContainer {...defaultToastConfig} />

      <BrowserRouter>
        {role == 'user' ? (
          <div>
            <NavBarUser />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </div>
        ) : (
          <Routes>
            <Route path="*" element={<NoMatch />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/home-page" element={<ResearchHomepage />} />
            <Route path="/detail-page" element={<DetailPage />} />
            <Route path="/test" element={<ModalTeacher />} />
            <Route path="/loader" element={<Loader />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
