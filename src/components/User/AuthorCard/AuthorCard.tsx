import React from 'react';
import Styled from './style';
import { useNavigate } from 'react-router-dom';

const AuthorCard = (props: any) => {
  const { data } = props;
  const navigate = useNavigate();
  const handleLink = (id: any) => {
    navigate(`/lecturer/${id}`);
  };

  return (
    <Styled>
      <div className="item-container" key={data.id} onClick={() => handleLink(data.id)}>
        <div className="left">
          <img
            className="left_img"
            src={
              data.avatar === null || data.avatar === '' || data.avatar === 'data:image/png;base64,'
                ? 'https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg'
                : data.avatar
            }
            alt=""
          />
        </div>
        <div className="right">
          <div className="user-name">
            <a className="link_title">
              <p className="name" onClick={() => handleLink(data.id)}>
                {data.name}
              </p>
            </a>
          </div>
          <div
            className="user-field"
            style={{
              fontStyle: 'normal'
            }}>
            {data.currentDisciplines === undefined ? (
              <>
                <span
                  style={{
                    fontSize: '13px',
                    fontStyle: 'italic',
                    marginLeft: '1px'
                  }}>
                  Chưa cập nhật
                </span>
              </>
            ) : (
              <>
                {data.currentDisciplines[0].departmentName} -{' '}
                {data.currentDisciplines[0].universityName}
              </>
            )}
          </div>
          <div className="user-position">
            <span
              className="right_availability_title"
              style={{ fontSize: '13px', fontStyle: 'normal' }}>
              Chức vụ:{' '}
            </span>
            <span
              className="user-field"
              style={{
                fontStyle: 'normal',
                fontSize: '13px'
              }}>
              {data.currentDisciplines === undefined ? (
                <>
                  <span
                    style={{
                      fontSize: '13px',
                      fontStyle: 'italic',
                      marginLeft: '1px'
                    }}>
                    Chưa cập nhật
                  </span>
                </>
              ) : (
                <>
                  {!data.currentDisciplines[0].position ? (
                    <>
                      <span
                        style={{
                          fontSize: '13px',
                          fontStyle: 'italic',
                          marginLeft: '1px'
                        }}>
                        Chưa cập nhật
                      </span>
                    </>
                  ) : (
                    data.currentDisciplines[0].position
                  )}
                </>
              )}
            </span>
          </div>
          {/* <div className="right_availability">
            <div className="right_availability_title">Tiểu sử: </div>
            <div className="right_availability_content">
              {data.bio ? data.bio : <div style={{ marginLeft: "-5px" }}>Chưa cập nhật</div>}
            </div>
          </div> */}
          <div className="right_availability">
            {data.researchFields === undefined
              ? null
              : data.researchFields.map((item: any, index: any) => (
                  <div
                    key={`research-field-${index}`}
                    className="right_category"
                    style={{ marginRight: '5px', fontWeight: '400' }}>
                    {item.researchName}
                  </div>
                ))}
          </div>
        </div>
      </div>
    </Styled>
  );
};

export default AuthorCard;
