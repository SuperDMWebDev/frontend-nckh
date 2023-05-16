import React from 'react';
import Styled from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

const ArticleCard = (props: any) => {
  const { data } = props;
  const handleLink = () => {
    window.location.replace('http://localhost:5000/profile');
  };

  return (
    <Styled>
      <div className="card_article">
        <div className="card-top-part">
          <div className="left-part">
            <div className="user-name">
              <a className="link_title">
                <p className="name">{data?.name}</p>
              </a>
              <p className="role"> Admin </p>
            </div>
            <div className="user-field">
              Industry Fellow School of International Studies and Education
            </div>
            <div className="user-position">
              <p className="position">
                Associate Professor Anne Prescott started her career as a secondary school teacher
                of mathematics. She is currently the coordinator of the primary and secondary
                mathematics teacher education as well as the Master of Teaching (secondary)
              </p>
            </div>
          </div>
          <div className="right-part">
            <div className="right-part_group">
              <div className="right-part__num">857</div>
              <div className="right-part__title">Citations</div>
            </div>
            <div className="right-part_group">
              <div className="right-part__num">368</div>
              <div className="right-part__title">Readers</div>
            </div>
          </div>
        </div>

        <div className="card-bottom-part">
          <div className="card-bottom-part__group">
            <FontAwesomeIcon icon={faAdd} />
            <div className="card-bottom-part__item">Add to library</div>
          </div>
          <div className="card-bottom-part__group">
            <FontAwesomeIcon icon={faFilePdf} />
            <div className="card-bottom-part__item">Sign in to view PDF</div>
          </div>
          <div className="card-bottom-part__group">
            <FontAwesomeIcon icon={faNewspaper} />
            <div className="card-bottom-part__item">Related</div>
          </div>
        </div>
      </div>
    </Styled>
  );
};

export default ArticleCard;
