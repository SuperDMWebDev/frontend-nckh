import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import ClearIcon from '@mui/icons-material/Clear';
=======
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
>>>>>>> develop
import Loader from '../../Loader/Loader';
import './style.css';

export default function ListArticle() {
<<<<<<< HEAD
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
=======
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [])

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <>
            {
                loading ? <Loader /> : <div>
                    <div className='header_table'>
                        <span className='title_table'>List of Artiles</span>
                        <button className='button2' ><PlusOutlined style={{ marginRight: "10px" }} />Add</button>
                    </div>

                    <div className='content'>
                        <div className="card">
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
                                <div className="right-part">
                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <EllipsisOutlined className='icon_more' />
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem style={{ fontSize: "14px" }} onClick={handleClose}>Edit</MenuItem>
                                        <MenuItem style={{ fontSize: "14px" }} onClick={handleClose}>Delete</MenuItem>
                                    </Menu>
                                </div>
                            </div>
                            <div className="card-bottom-part">
                                <div className="bottom-part">
                                    <a href="mailto: example@example.com" className="link">
                                        <span className="icon">
                                            <svg viewBox="0 0 20 20" height="20" width="20" xmlns="http://www.w3.org/2000/svg" data-name="20" id="_20">
                                                <path transform="translate(1.25 3.75)" d="M16.25,12.5h-15A1.252,1.252,0,0,1,0,11.25v-10A1.252,1.252,0,0,1,1.25,0h15A1.251,1.251,0,0,1,17.5,1.25v10A1.251,1.251,0,0,1,16.25,12.5ZM1.25,1.819V11.25h15V1.819L9.106,6.763a.626.626,0,0,1-.713,0ZM2.625,1.25,8.75,5.487,14.875,1.25Z" id="Fill"></path>
                                            </svg>
                                        </span>
                                        Email
                                    </a>
                                </div>
                                <div className="bottom-part">
                                    <a href="tel: 0123456789" className="link">
                                        <span className="icon">
                                            <svg viewBox="0 0 20 20" height="20" width="20" xmlns="http://www.w3.org/2000/svg" data-name="20" id="_20">
                                                <path transform="translate(1.869 1.875)" d="M14.381,16.25h-.106C2,15.544.249,5.179.006,2.019A1.874,1.874,0,0,1,1.731,0H5.175A1.243,1.243,0,0,1,6.337.787l.95,2.337a1.247,1.247,0,0,1-.275,1.35L5.681,5.818a5.875,5.875,0,0,0,4.738,4.75l1.356-1.344a1.25,1.25,0,0,1,1.356-.257l2.356.944a1.245,1.245,0,0,1,.769,1.163v3.3A1.877,1.877,0,0,1,14.381,16.25Zm-12.5-15a.625.625,0,0,0-.625.625v.05C1.545,5.648,3.4,14.375,14.343,15h.038a.625.625,0,0,0,.625-.589V11.075l-2.356-.944-1.794,1.781-.3-.038A6.733,6.733,0,0,1,5.429,8.553,8.171,8.171,0,0,1,4.381,5.7l-.038-.3L6.118,3.606,5.181,1.25Z" id="Fill"></path>
                                            </svg>
                                        </span>
                                        Phone
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card">
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
                                <div className="right-part">
                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <EllipsisOutlined className='icon_more' />
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem style={{ fontSize: "14px" }} onClick={handleClose}>Edit</MenuItem>
                                        <MenuItem style={{ fontSize: "14px" }} onClick={handleClose}>Delete</MenuItem>
                                    </Menu>
                                </div>
                            </div>
                            <div className="card-bottom-part">
                                <div className="bottom-part">
                                    <a href="mailto: example@example.com" className="link">
                                        <span className="icon">
                                            <svg viewBox="0 0 20 20" height="20" width="20" xmlns="http://www.w3.org/2000/svg" data-name="20" id="_20">
                                                <path transform="translate(1.25 3.75)" d="M16.25,12.5h-15A1.252,1.252,0,0,1,0,11.25v-10A1.252,1.252,0,0,1,1.25,0h15A1.251,1.251,0,0,1,17.5,1.25v10A1.251,1.251,0,0,1,16.25,12.5ZM1.25,1.819V11.25h15V1.819L9.106,6.763a.626.626,0,0,1-.713,0ZM2.625,1.25,8.75,5.487,14.875,1.25Z" id="Fill"></path>
                                            </svg>
                                        </span>
                                        Email
                                    </a>
                                </div>
                                <div className="bottom-part">
                                    <a href="tel: 0123456789" className="link">
                                        <span className="icon">
                                            <svg viewBox="0 0 20 20" height="20" width="20" xmlns="http://www.w3.org/2000/svg" data-name="20" id="_20">
                                                <path transform="translate(1.869 1.875)" d="M14.381,16.25h-.106C2,15.544.249,5.179.006,2.019A1.874,1.874,0,0,1,1.731,0H5.175A1.243,1.243,0,0,1,6.337.787l.95,2.337a1.247,1.247,0,0,1-.275,1.35L5.681,5.818a5.875,5.875,0,0,0,4.738,4.75l1.356-1.344a1.25,1.25,0,0,1,1.356-.257l2.356.944a1.245,1.245,0,0,1,.769,1.163v3.3A1.877,1.877,0,0,1,14.381,16.25Zm-12.5-15a.625.625,0,0,0-.625.625v.05C1.545,5.648,3.4,14.375,14.343,15h.038a.625.625,0,0,0,.625-.589V11.075l-2.356-.944-1.794,1.781-.3-.038A6.733,6.733,0,0,1,5.429,8.553,8.171,8.171,0,0,1,4.381,5.7l-.038-.3L6.118,3.606,5.181,1.25Z" id="Fill"></path>
                                            </svg>
                                        </span>
                                        Phone
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card">
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
                                <div className="right-part">
                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <EllipsisOutlined className='icon_more' />
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem style={{ fontSize: "14px" }} onClick={handleClose}>Edit</MenuItem>
                                        <MenuItem style={{ fontSize: "14px" }} onClick={handleClose}>Delete</MenuItem>
                                    </Menu>
                                </div>
                            </div>
                            <div className="card-bottom-part">
                                <div className="bottom-part">
                                    <a href="mailto: example@example.com" className="link">
                                        <span className="icon">
                                            <svg viewBox="0 0 20 20" height="20" width="20" xmlns="http://www.w3.org/2000/svg" data-name="20" id="_20">
                                                <path transform="translate(1.25 3.75)" d="M16.25,12.5h-15A1.252,1.252,0,0,1,0,11.25v-10A1.252,1.252,0,0,1,1.25,0h15A1.251,1.251,0,0,1,17.5,1.25v10A1.251,1.251,0,0,1,16.25,12.5ZM1.25,1.819V11.25h15V1.819L9.106,6.763a.626.626,0,0,1-.713,0ZM2.625,1.25,8.75,5.487,14.875,1.25Z" id="Fill"></path>
                                            </svg>
                                        </span>
                                        Email
                                    </a>
                                </div>
                                <div className="bottom-part">
                                    <a href="tel: 0123456789" className="link">
                                        <span className="icon">
                                            <svg viewBox="0 0 20 20" height="20" width="20" xmlns="http://www.w3.org/2000/svg" data-name="20" id="_20">
                                                <path transform="translate(1.869 1.875)" d="M14.381,16.25h-.106C2,15.544.249,5.179.006,2.019A1.874,1.874,0,0,1,1.731,0H5.175A1.243,1.243,0,0,1,6.337.787l.95,2.337a1.247,1.247,0,0,1-.275,1.35L5.681,5.818a5.875,5.875,0,0,0,4.738,4.75l1.356-1.344a1.25,1.25,0,0,1,1.356-.257l2.356.944a1.245,1.245,0,0,1,.769,1.163v3.3A1.877,1.877,0,0,1,14.381,16.25Zm-12.5-15a.625.625,0,0,0-.625.625v.05C1.545,5.648,3.4,14.375,14.343,15h.038a.625.625,0,0,0,.625-.589V11.075l-2.356-.944-1.794,1.781-.3-.038A6.733,6.733,0,0,1,5.429,8.553,8.171,8.171,0,0,1,4.381,5.7l-.038-.3L6.118,3.606,5.181,1.25Z" id="Fill"></path>
                                            </svg>
                                        </span>
                                        Phone
                                    </a>
>>>>>>> develop
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
<<<<<<< HEAD
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
=======
            }

        </>
>>>>>>> develop
    )
}
