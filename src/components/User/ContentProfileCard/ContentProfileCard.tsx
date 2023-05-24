import React from 'react';
import Styled from './style';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function ContentProfileCard(props: any) {
    const { title, lecturer } = props;

    return (
        <Styled>
            <div className="content-profile">
                <div className="main_content">
                    <h2 className="title_content">{title}</h2>
                    {lecturer?.degrees.map((degree: any) => (
                        <div style={{ marginBottom: "2px" }} key={degree.id.toString()}>
                            <h4> <FiberManualRecordIcon style={{ fontSize: "9px", textAlign: "center" }} /> {degree.academicTitleName} ({degree.graduationDate.toString()}) { } {degree.graduationThesisName}</h4>
                            <p className='data_content'>
                                {degree.specialization}, {degree.universityName}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Styled>
    )
}
