import React from 'react';
import Styled from './style';
const AuthorCard = () => {
  const handleLink = () => {
    window.location.replace('http://localhost:5000/profile');
  }

  return (
    <Styled>
      <div className="container">
        <div className="left">
          <img className="left_img" src="./assets/images/avatar.jpg" alt="" />
        </div>
        <div className="right">
          <div className="user-name">
            <a className="link_title">
              <p className="name" onClick={handleLink}>Dr. Robert Edison</p>
            </a>
          </div>
          <div className="user-field">Senior Lecturer - Accounting Discipline Group</div>
          <div className="user-position">
            <p className="position">
              Robert's research focus can be broadly categorised as an interest in information
              asymmetry. After graduating from the University of Tasmania, Robert worked in public
              accounting for Coopers+Lybrand and Deloittes. After returning to academia, Robert has
              researched and taught at the University of Tasmania,
            </p>
          </div>
          <div className="right_availability">
            <div className="right_availability_title">Availability: </div>
            <div className="right_availability_content">
              Masters Research or PhD student supervision
            </div>
          </div>
          <div className="right_category">Curriculum and pedagogy</div>
        </div>
      </div>
    </Styled>
  );
};

export default AuthorCard;
