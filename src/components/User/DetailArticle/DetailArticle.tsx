import React from 'react';
import Styled from './style';
import { Tab, Tabs } from 'react-bootstrap';
import ClearIcon from '@mui/icons-material/Clear';

const DetailArticle = () => {
  function handleDeleteDetail() {
    document.getElementById('detail_article')!.classList.remove('detail_article_active');
  }

  return (
    <Styled>
      <div className="detail_article" id="detail_article">
        <div>
          <Tabs defaultActiveKey="info" id="uncontrolled-tab-example" className="mb-4">
            <Tab eventKey="info" title="Info" style={{ fontSize: '12px' }}>
              <div style={{ paddingRight: '30px' }}>
                <div className="detail_content">
                  <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                    The future of bioenergy
                  </div>
                  <div style={{ fontStyle: 'italic', marginTop: '10px' }}>
                    Walter V. ReidMariam K. AliChristopher B. Field Global Change Biology (2020)
                  </div>
                </div>
                <hr></hr>
                <div>
                  <span className="detail_title">LINK</span>
                  <div>
                    <a href="#">
                      https://www.mendeley.com/search/?page=1&query=Bioenergy&sortBy=relevance
                    </a>
                  </div>
                </div>
                <hr></hr>
                <div>
                  <span className="detail_title">ABSTRACT</span>
                  <div className="detail_content">
                    Energy from biomass plays a large and growing role in the global energy system.
                    Energy from biomass can make significant contributions to reducing carbon
                    emissions, especially from difficult-to-decarbonize sectors like aviation, heavy
                    transport, and manufacturing. But land-intensive bioenergy often entails
                    substantial carbon emissions from land-use change as well as production,
                    harvesting, and transportation. In addition, land-intensive bioenergy scales
                    only with the utilization of vast amounts of land, a resource that is
                    fundamentally limited in supply. Because of the land constraint, the
                    intrinsically low yields of energy per unit of land area, land intensive
                    bioenergy makes the most sense. Managing an effective trajectory will require an
                    unusual mix of policies and incentives that encourage appropriate utilization in
                    the short term but minimize lock-in in the longer term.
                  </div>
                </div>
                <hr></hr>
                <div>
                  <span className="detail_title">IDENTIFIERS</span>
                  <div className="detail_content">
                    DOI: 10.1111/gcb.14883 <br></br>
                    ISSN: 13652486
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="related" title="Related">
              <div className="popup_container">
                <div className="mini_card_article">
                  <div className="card-top-part">
                    <div className="left-part">
                      <div className="user-name">
                        <a className="link_title">
                          <p className="mini_name">A/Prof Anne Prescott</p>
                        </a>
                        <p className="role"> Admin </p>
                      </div>
                      <div className="user-field">Industry Fellow School</div>
                      <div className="user-position">
                        <p className="position">
                          Associate Professor Anne Prescott started her career as a secondary school
                          teacher of mathematics.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mini_card_article">
                  <div className="card-top-part">
                    <div className="left-part">
                      <div className="user-name">
                        <a className="link_title">
                          <p className="mini_name">
                            Bioenergy production and environmental impactst
                          </p>
                        </a>
                        <p className="role"> Admin </p>
                      </div>
                      <div className="user-field">Industry Fellow School</div>
                      <div className="user-position">
                        <p className="position">
                          Associate Professor Anne Prescott started her career as a secondary school
                          teacher of mathematics.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mini_card_article">
                  <div className="card-top-part">
                    <div className="left-part">
                      <div className="user-name">
                        <a className="link_title">
                          <p className="mini_name">The rise and fall of bioenergy</p>
                        </a>
                        <p className="role"> Admin </p>
                      </div>
                      <div className="user-field">Industry Fellow School</div>
                      <div className="user-position">
                        <p className="position">
                          Associate Professor Anne Prescott started her career as a secondary school
                          teacher of mathematics.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mini_card_article">
                  <div className="card-top-part">
                    <div className="left-part">
                      <div className="user-name">
                        <a className="link_title">
                          <p className="mini_name">A/Prof Anne Prescott</p>
                        </a>
                        <p className="role"> Admin </p>
                      </div>
                      <div className="user-field">Industry Fellow School</div>
                      <div className="user-position">
                        <p className="position">
                          Associate Professor Anne Prescott started her career as a secondary school
                          teacher of mathematics.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mini_card_article">
                  <div className="card-top-part">
                    <div className="left-part">
                      <div className="user-name">
                        <a className="link_title">
                          <p className="mini_name">The rise and fall of bioenergy</p>
                        </a>
                        <p className="role"> Admin </p>
                      </div>
                      <div className="user-field">Industry Fellow School</div>
                      <div className="user-position">
                        <p className="position">
                          Associate Professor Anne Prescott started her career as a secondary school
                          teacher of mathematics.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mini_card_article">
                  <div className="card-top-part">
                    <div className="left-part">
                      <div className="user-name">
                        <a className="link_title">
                          <p className="mini_name">The rise and fall of bioenergy</p>
                        </a>
                        <p className="role"> Admin </p>
                      </div>
                      <div className="user-field">Industry Fellow School</div>
                      <div className="user-position">
                        <p className="position">
                          Associate Professor Anne Prescott started her career as a secondary school
                          teacher of mathematics.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mini_card_article">
                  <div className="card-top-part">
                    <div className="left-part">
                      <div className="user-name">
                        <a className="link_title">
                          <p className="mini_name">A/Prof Anne Prescott</p>
                        </a>
                        <p className="role"> Admin </p>
                      </div>
                      <div className="user-field">Industry Fellow School</div>
                      <div className="user-position">
                        <p className="position">
                          Associate Professor Anne Prescott started her career as a secondary school
                          teacher of mathematics.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mini_card_article">
                  <div className="card-top-part">
                    <div className="left-part">
                      <div className="user-name">
                        <a className="link_title">
                          <p className="mini_name">AThe rise and fall of bioenergy</p>
                        </a>
                        <p className="role"> Admin </p>
                      </div>
                      <div className="user-field">Industry Fellow School</div>
                      <div className="user-position">
                        <p className="position">
                          Associate Professor Anne Prescott started her career as a secondary school
                          teacher of mathematics.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mini_card_article">
                  <div className="card-top-part">
                    <div className="left-part">
                      <div className="user-name">
                        <a className="link_title">
                          <p className="mini_name">A/Prof Anne Prescott</p>
                        </a>
                        <p className="role"> Admin </p>
                      </div>
                      <div className="user-field">Industry Fellow School</div>
                      <div className="user-position">
                        <p className="position">
                          Associate Professor Anne Prescott started her career as a secondary school
                          teacher of mathematics.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
        <ClearIcon
          onClick={handleDeleteDetail}
          style={{
            position: 'absolute',
            fontSize: '22px',
            cursor: 'pointer',
            marginTop: '8px',
            top: '20px',
            right: '20px'
          }}
          className="iconClear"
        />
      </div>
    </Styled>
  );
};

export default DetailArticle;
