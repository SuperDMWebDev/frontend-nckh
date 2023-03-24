import * as React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/UserPages/HomePage/HomePage';
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

const App = () => {
  return (
    <div>
      <ToastContainer {...defaultToastConfig} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="*" element={<NoMatch />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/home-page" element={<ResearchHomepage />} />
          <Route path="/detail-page" element={<DetailPage />} />
          <Route path="/test" element={<ModalTeacher />} />
          <Route path="/loader" element={<Loader />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
