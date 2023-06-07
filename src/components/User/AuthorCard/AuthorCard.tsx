import React from 'react';
import Styled from './style';

const AuthorCard = (props: any) => {
  const { data } = props;
  const handleLink = (id: any) => {
    window.location.replace(`http://localhost:5000/lecturer/${id}`);
  }

  return (
    <Styled>
      <div className="container" key={data.id} onClick={() => handleLink(data.id)}>
        <div className="left">
          <img className="left_img"
            src={data.avatar == null || data.avatar == "" || data.avatar == "data:image/png;base64," ? "https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" : data.avatar}
            alt=""
          />
        </div>
        <div className="right">
          <div className="user-name">
            <a className="link_title">
              <p className="name" onClick={() => handleLink(data.id)}>{data.name}</p>
            </a>
          </div>
          <div className="user-field">{data.currentDisciplines[0].departmentName} - {data.currentDisciplines[0].universityName}</div>
          <div className="user-position">
            <span className="right_availability_title" style={{ fontSize: "13px" }}>Chức vụ: </span>
            <span className="position">
              {data.currentDisciplines[0].position ? data.currentDisciplines[0].position : <span>Chưa cập nhật</span>}
            </span>
          </div>
          <div className="right_availability">
            <div className="right_availability_title">Tiểu sử: </div>
            <div className="right_availability_content">
              {data.bio ? data.bio : <div style={{ marginLeft: "-5px" }}>Chưa cập nhật</div>}
            </div>
          </div>
          {
            data.researchFields == undefined ? null :
              data.researchFields.map((item: any) => (
                <div className="right_category" style={{ marginRight: "5px" }}>{item.researchName}</div>
              ))
          }
        </div>
      </div>
    </Styled>
  );
};

export default AuthorCard;
