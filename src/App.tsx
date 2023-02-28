import * as React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import SignIn from './pages/SignIn';
import './all.scss';
import Admin from './pages/Admin';
import AdminHomepage from './pages/AdminHomepage';
import DetailPage from './pages/DetailPage';
import Header from './components/Header';
import ModalTeacher from './components/AdminList/ModalTeacher';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/home-page" element={<AdminHomepage />} />
        <Route path="/detail-page" element={<DetailPage />} />
        <Route path="/test" element={<ModalTeacher />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
