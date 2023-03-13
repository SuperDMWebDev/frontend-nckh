import * as React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import SignIn from './pages/SignIn';
import './all.scss';
import Admin from './pages/Admin';
import AdminHomepage from './pages/AdminHomepage';
import DetailPage from './pages/DetailPage';
import ModalTeacher from './components/AdminList/ModalTeacher';
import Loader from './components/Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { defaultToastConfig } from './utils/config';

const App = () => {
  return (
    <div>
      <ToastContainer {...defaultToastConfig} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/home-page" element={<AdminHomepage />} />
          <Route path="/detail-page" element={<DetailPage />} />
          <Route path="/test" element={<ModalTeacher />} />
          <Route path="/loader" element={<Loader />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
