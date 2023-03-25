import React, { useState, useEffect } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import Loader from '../../Loader/Loader';
import './style.css';

export default function ListArticle() {
    function handleClickArticle() {
        document.getElementById('detail_article').classList.add("detail_article_active");
    }

    function handleDeleteDetail() {
        document.getElementById('detail_article').classList.remove("detail_article_active");
    }

    return (
        <div>
            <div className='header_article'>
                <input type="text" className='input_search' placeholder='Search for articles...' />
                <button className='btn_search'>Search</button>
            </div>
            <div className='content_article'>
                <div className='sort_article'>
                    <span style={{ fontWeight: "bold", marginRight: "20px" }}>Sort by</span>
                    <button className='btn_sort'>Most relevant</button>
                    <button className='btn_sort'>Most recent</button>
                    <button className='btn_sort'>Most cited</button>
                </div>
                <div className='list_article'>
                    <div className="card_article" onClick={handleClickArticle}>
                        <div className="card-top-part">
                            <div className="left-part">
                                <div className="user-name">
                                    <a className='link_title'>
                                        <p className="name">A/Prof Anne Prescott</p>
                                    </a>
                                    <p className="role"> Admin </p>
                                </div>
                                <div className="user-field">
                                    Industry Fellow School of International Studies and Education
                                </div>
                                <div className="user-position">
                                    <p className="position">
                                        Associate Professor Anne Prescott started her career as a secondary school teacher of mathematics. She is currently the coordinator of the primary and secondary mathematics teacher education as well as the Master of Teaching (secondary). 2015-2018 Australian Mathematics and Science Partnership Program Grant $1 919 500 Maths...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card_article" onClick={handleClickArticle}>
                        <div className="card-top-part">
                            <div className="left-part">
                                <div className="user-name">
                                    <a className='link_title'>
                                        <p className="name">The future of bioenergy</p>
                                    </a>
                                    <p className="role"> Admin </p>
                                </div>
                                <div className="user-field">
                                    Industry Fellow School of International Studies and Education
                                </div>
                                <div className="user-position">
                                    <p className="position">
                                        Associate Professor Anne Prescott started her career as a secondary school teacher of mathematics. She is currently the coordinator of the primary and secondary mathematics teacher education as well as the Master of Teaching (secondary). 2015-2018 Australian Mathematics and Science Partnership Program Grant $1 919 500 Maths...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card_article" onClick={handleClickArticle}>
                        <div className="card-top-part">
                            <div className="left-part">
                                <div className="user-name">
                                    <a className='link_title'>
                                        <p className="name">The rise and fall of bioenergy</p>
                                    </a>
                                    <p className="role"> Admin </p>
                                </div>
                                <div className="user-field">
                                    Industry Fellow School of International Studies and Education
                                </div>
                                <div className="user-position">
                                    <p className="position">
                                        Associate Professor Anne Prescott started her career as a secondary school teacher of mathematics. She is currently the coordinator of the primary and secondary mathematics teacher education as well as the Master of Teaching (secondary). 2015-2018 Australian Mathematics and Science Partnership Program Grant $1 919 500 Maths...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='detail_article' id='detail_article'>
                    <div className='detail_header'>
                        <div className='title_detail'>Info</div>
                        <ClearIcon onClick={handleDeleteDetail} style={{ fontSize: "22px", cursor: "pointer" }} className="iconClear" />
                    </div>
                    <hr></hr>
                    <div className='detail_content'>
                        <span style={{ fontWeight: "bold", fontSize: "18px" }}>The future of bioenergy</span>
                        <div style={{ fontStyle: "italic", marginTop: "10px" }}>
                            Walter V. ReidMariam K. AliChristopher B. Field
                            Global Change Biology (2020)
                        </div>
                    </div>
                    <hr></hr>
                    <div>
                        <span className='detail_title'>
                            LINK
                        </span>
                        <div>
                            <a href="#">https://www.mendeley.com/search/?page=1&query=Bioenergy&sortBy=relevance</a>
                        </div>
                    </div>
                    <hr></hr>
                    <div>
                        <span className='detail_title'>
                            ABSTRACT
                        </span>
                        <div className='detail_content'>
                            Energy from biomass plays a large and growing role in the global energy system.
                            Energy from biomass can make significant contributions to reducing carbon emissions,
                            especially from difficult-to-decarbonize sectors like aviation, heavy transport,
                            and manufacturing. But land-intensive bioenergy often entails substantial carbon emissions
                            from land-use change as well as production, harvesting, and transportation. In addition,
                            land-intensive bioenergy scales only with the utilization of vast amounts of land, a resource
                            that is fundamentally limited in supply. Because of the land constraint, the intrinsically low
                            yields of energy per unit of land area,
                            land intensive bioenergy makes the most sense.
                            Managing an effective trajectory will require an unusual mix of policies
                            and incentives that encourage appropriate utilization in the short term but minimize lock-in in the
                            longer term.
                        </div>
                    </div>
                    <hr></hr>
                    <div>
                        <span className='detail_title'>
                            IDENTIFIERS
                        </span>
                        <div className='detail_content'>
                            DOI: 10.1111/gcb.14883 <br></br>
                            ISSN: 13652486
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
