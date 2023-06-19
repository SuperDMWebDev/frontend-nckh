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
import ResetPassword from './pages/UserPages/ResetPassword/ResetPassword';
import Statistics from './pages/SuperUserPages/MyArticles/Statistics';
import NavBarSuperUser from './components/User/NavBarSuperUser/NavBarSuperUser';

const App = () => {
  const isLogin = !!localStorage.getItem('accessToken');
  const scopusId = localStorage.getItem('scopusId');
  const roleUser = localStorage.getItem('role');

  return (
    <div>
      <ToastContainer {...defaultToastConfig} />

      <BrowserRouter>
        {/* {roleUser !== '0' ? (
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
                  <Route path="/profile" element={<Profile />}></Route>
                  <Route path="/create-article" element={<CreateArticle />} />
                  <Route path="/update-article/:id" element={<UpdateArticle />} />
                  <Route path="/my-articles" element={<MyArticles />} />
                  <Route path="/test" element={<EditProfile />} />
                  <Route path="/article-detail/:id" element={<ArticleDetail />} />
                  <Route path="/retrieve-scopus-author" element={<RetrieveScopusAuthor />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
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
            <Route path="/loader" element={<Loader />} />
          </Routes>
        )} */}
        {roleUser == '0' ? (
          // ADMIN
          <Routes>
            <Route path="*" element={<NoMatch />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/" element={!isLogin ? <SignIn /> : <Navigate replace to="/admin" />} />
            <Route path="/loader" element={<Loader />} />
          </Routes>
        ) : roleUser == '1' ? (
          // LECTURER
          <>
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
                <NavBarUser />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route
                    path="/signin"
                    element={!isLogin ? <SignIn /> : <Navigate replace to="/" />}
                  />
                  <Route path="/lecturer/:id" element={<LecturerDetail />}></Route>
                  <Route path="/profile" element={<Profile />}></Route>
                  <Route path="/create-article" element={<CreateArticle />} />
                  <Route path="/update-article/:id" element={<UpdateArticle />} />
                  <Route path="/my-articles" element={<MyArticles />} />
                  <Route path="/test" element={<EditProfile />} />
                  <Route path="/article-detail/:id" element={<ArticleDetail />} />
                  <Route path="/retrieve-scopus-author" element={<RetrieveScopusAuthor />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
              </>
            )}
          </>
        ) : roleUser == '2' ? (
          //SUPERUSER
          <>
            <NavBarSuperUser />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/signin" element={!isLogin ? <SignIn /> : <Navigate replace to="/" />} />
              <Route path="/lecturer/:id" element={<LecturerDetail />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/create-article" element={<CreateArticle />} />
              <Route path="/update-article/:id" element={<UpdateArticle />} />
              <Route path="/my-articles" element={<MyArticles />} />
              <Route path="/test" element={<EditProfile />} />
              <Route path="/article-detail/:id" element={<ArticleDetail />} />
              <Route path="/retrieve-scopus-author" element={<RetrieveScopusAuthor />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/statistics" element={<Statistics />} />
            </Routes>
          </>
        ) : (
          // GUEST
          <>
            <AnonymousNavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/signin" element={!isLogin ? <SignIn /> : <Navigate replace to="/" />} />
              <Route path="/lecturer/:id" element={<LecturerDetail />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/create-article" element={<CreateArticle />} />
              <Route path="/update-article/:id" element={<UpdateArticle />} />
              <Route path="/my-articles" element={<MyArticles />} />
              <Route path="/test" element={<EditProfile />} />
              <Route path="/article-detail/:id" element={<ArticleDetail />} />
              <Route path="/retrieve-scopus-author" element={<RetrieveScopusAuthor />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
