import React from 'react';
import Styled from './style';
export default function Footer() {
  return (
    <Styled>
      <div className="footer">
        <div className="footer__container container">
          <nav className="navbar navbar-light">
            <a href="/" className="navbar-brand has-logo">
              <span className="footer__logo">
                <img src="/assets/images/logo_hcmus.jpg" alt="logo hcmus" />
              </span>
            </a>
            <span className="footer__copyright">COPYRIGHT BY VNU-HCMUS 2022-2023</span>
          </nav>
        </div>
      </div>
    </Styled>
  );
}
