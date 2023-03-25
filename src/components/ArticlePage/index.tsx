import React, { useState, useEffect } from 'react';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '../Loader/Loader';
import './style.css';

export default function ListArticle() {
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
                    <div className='header_table_article'>
                        <span className='title_table_article'>List of Articles</span>
                        <div className="input-group">
                            <input type="email" className="input" id="Email" name="Email" placeholder="Search..." autoComplete='off' />
                            <input className="button--submit" value="Search" type="submit" />
                        </div>
                        {/* <button className='button2' ><PlusOutlined style={{ marginRight: "10px" }} />Add</button> */}
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

                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}
