/* eslint-disable no-implicit-coercion */
/* eslint-disable no-negated-condition */
import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import HomePage from './pages/UserPages/HomePage/HomePage';
import SearchPage from './pages/UserPages/SearchPage/SearchPage';
import NoMatch from './components/NoMatch';
import SignIn from './pages/SignIn';
import './all.scss';
import Admin from './pages/AdminPages/Admin';
import EditProfile from './components/User/EditProfile/EditProfile';
import Loader from './components/Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { defaultToastConfig } from './utils/config';
import NavBarUser from './components/User/NavBarUser/NavBarUser';
import Profile from './pages/UserPages/Profile/Profile';
import AnonymousNavBar from './components/User/AnonymousNavBar/AnonymousNavBar';
import CreateArticle from './pages/UserPages/CreateArticle/CreateArticle';
import ArticleDetail from './pages/UserPages/ArticleDetail/ArticleDetail';
import RetrieveScopusAuthor from './pages/UserPages/RetrieveScopusAuthor/RetrieveScopusAuthor';
import LecturerDetail from './pages/UserPages/LecturerDetail/LecturerDetail';
import UpdateArticle from './pages/UserPages/UpdateArticle/UpdateArticle';
import MyArticles from './pages/UserPages/MyArticles/MyArticles';
import NavBarRetrieveScopus from './components/User/NavBarRetrieveScopus/NavBarRetrieveScopus';

const App = () => {
  const isLogin = !!localStorage.getItem('accessToken');
  console.log('🚀 ~ file: App.tsx:35 ~ App ~ isLogin:', isLogin);
  const scopusId = localStorage.getItem('scopusId');
  const roleUser = localStorage.getItem('role');

  return (
    <div>
      <ToastContainer {...defaultToastConfig} />

      <BrowserRouter>
        {roleUser !== '0' ? (
          <div>
            {scopusId === 'null' ? (
              <>
                <NavBarRetrieveScopus />
                <Routes>
                  <Route path="/" element={<RetrieveScopusAuthor />} />
                  <Route path="/*" element={<RetrieveScopusAuthor />} />
                </Routes>
              </>
            ) : (
              <>
                {isLogin ? <NavBarUser /> : <AnonymousNavBar />}
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route
                    path="/signin"
                    element={!isLogin ? <SignIn /> : <Navigate replace to="/" />}
                  />
                  <Route path="/lecturer/:id" element={<LecturerDetail />}></Route>
                  <Route path="/profile" element={<Profile />}>
                    {/* <Route
                  index
                  path="/about"

                /> */}
                  </Route>
                  {/* <Route path="/profile/edit" element={<EditProfileLecturer />} /> */}
                  <Route path="/create-article" element={<CreateArticle />} />
                  <Route path="/update-article/:id" element={<UpdateArticle />} />
                  <Route path="/my-articles" element={<MyArticles />} />
                  <Route path="/test" element={<EditProfile />} />
                  <Route path="/article-detail/:id" element={<ArticleDetail />} />
                  <Route path="/retrieve-scopus-author" element={<RetrieveScopusAuthor />} />
                </Routes>
              </>
            )}
          </div>
        ) : (
          <Routes>
            <Route path="*" element={<NoMatch />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/" element={!isLogin ? <SignIn /> : <Navigate replace to="/admin" />} />
            {/* <Route path="/admin/create" element={<CreateLecturer />} /> */}
            {/* <Route path="/home-page" element={<ResearchHomepage />} /> */}
            {/* <Route path="/detail-page" element={<DetailPage />} />
            <Route path="/test" element={<ModalTeacher />} /> */}
            <Route path="/loader" element={<Loader />} />
            {/* <Route path="/report" element={<Report />} /> */}
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;

// git fetch -a
// git pull origin develop
// fix conflict neu co
// git push
