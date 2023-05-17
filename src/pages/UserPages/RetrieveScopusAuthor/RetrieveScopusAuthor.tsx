import React, { useState } from 'react';
import Styled from './style';
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify';
import { getScopusAuthors } from '../../../api/Lecturer';

interface AuthorScopus {
    surname: string,
    givenName: string,
    scopusId: string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function RetrieveScopusAuthor() {
    const [scopusAuthors, setScopusAuthors] = useState<AuthorScopus[]>();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [scopusID, setScopusID] = useState<string>("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleConfirm = () => {
        console.log(firstName, lastName);
        if (firstName == "" || lastName == "") {
            toast.error("Bạn chưa điền đầy đủ thông tin để xác nhận!")
        } else {
            const data = getScopusAuthors(firstName, lastName);
            data.then(result => {
                setScopusAuthors(result.data);
            }).catch(err => {
                console.log("Can't get scopus authors: ", err)
            });
        }
    }

    const handleConfirmAuthorScopus = () => {
        console.log(scopusID);
        setFirstName("");
        setLastName("");
        handleClose();
        toast.success("Xác nhận thành công!");
    }

    const handleChoose = () => {
        !scopusID ? toast.error("Vui lòng chọn tài khoản Scopus!") : handleOpen();
    }

    return (
        <Styled>
            <div className='form-body'>
                <div className='form-data'>
                    <h1> Truy xuất tác giả Scopus </h1>
                    <div className='form-input'>
                        <div className="wrapper">
                            <input type="text" className="name-input" onChange={(e) => setFirstName(e.target.value)}
                                required={true} />
                            <label className="name-label">Tên</label>
                        </div>

                        <div className="wrapper">
                            <input type="text" className="name-input" onChange={(e) => setLastName(e.target.value)}
                                required={true} />
                            <label className="name-label">Họ tên</label>
                        </div>
                    </div>
                    <div className='btn-confirm'>
                        <button className="cta" onClick={handleConfirm}>
                            <span>Xác nhận</span>
                            <svg viewBox="0 0 13 10" height="10px" width="15px">
                                <path d="M1,5 L11,5"></path>
                                <polyline points="8 1 12 5 8 9"></polyline>
                            </svg>
                        </button>
                    </div>

                    {
                        scopusAuthors?.length == 0 ? <div style={{ margin: "0 auto", fontSize: "14px", marginTop: "10px", fontStyle: "italic" }}>Không tìm thấy tài khoản nào!</div> : <>
                            <div className='author-list'>
                                {!scopusAuthors ? null : <h3>Chọn tài khoản Scopus của bạn: </h3>}

                                {scopusAuthors?.map((scopusAuthor) => (
                                    <div key={scopusAuthor.scopusId} onChange={() => setScopusID(scopusAuthor.scopusId)}>
                                        <div className="radio-inputs">
                                            <label>
                                                <input className="radio-input" type="radio" name="engine" />
                                                <span className="radio-tile">
                                                    <span className="radio-label">{scopusAuthor.givenName} {scopusAuthor.surname}</span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                ))}

                                {!scopusAuthors ? null : <>
                                    <button className='btn-choose' onClick={handleChoose}>Chọn</button>
                                </>}
                            </div>
                        </>
                    }

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h5" component="h2"
                                style={{
                                    margin: "0 auto",
                                    fontSize: "16px",
                                    marginLeft: "10px"
                                }}
                            >
                                Xác nhận đây là tài khoản Scopus của bạn
                            </Typography>
                            <div
                                className="button_notification"
                                style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    marginTop: "20px"
                                }}
                            >
                                <div>
                                    <Button
                                        className="btn_notification"
                                        variant="contained"
                                        color="error"
                                        onClick={handleClose}
                                        style={{
                                            width: "100px",
                                            textTransform: "none",
                                            height: "45px",
                                            fontSize: "14px"
                                        }}
                                    >
                                        Quay lại
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        className="btn_notification"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleConfirmAuthorScopus}
                                        style={{
                                            width: "100px",
                                            textTransform: "none",
                                            marginBottom: "1rem",
                                            height: "45px",
                                            fontSize: "14px"
                                        }}
                                    >
                                        Xác nhận
                                    </Button>
                                </div>
                            </div>
                        </Box>
                    </Modal>
                </div>
            </div>
        </Styled>
    )
}
