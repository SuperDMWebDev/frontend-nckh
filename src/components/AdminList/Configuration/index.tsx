import React, { useState, useEffect } from 'react';
import Loader from '../../Loader/Loader';
import './style.css';
import { Tab, Tabs } from 'react-bootstrap';
import TabContact from './TabContact/TabContact';
import TabAcademicRank from './TabAcademicRank/TabAcademicRank';
import TabAcademicTitle from './TabAcademicTitle/TabAcademicTitle';
import TabTag from './TabTag/TabTag';
import TabUniversity from './TabUniversity/TabUniversity';

const Configuration: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [])

    return <>
        {
            loading ? <Loader /> : <div>
                <Tabs
                    defaultActiveKey="contact"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="contact" title="Liên hệ">
                        <TabContact />
                    </Tab>

                    <Tab eventKey="academic-rank" title="Học hàm">
                        <TabAcademicRank />
                    </Tab>

                    <Tab eventKey="academic-title" title="Học vị">
                        <TabAcademicTitle />
                    </Tab>

                    <Tab eventKey="tag" title="Thẻ">
                        <TabTag />
                    </Tab>

                    <Tab eventKey="university" title="Trường đại học">
                        <TabUniversity />
                    </Tab>
                </Tabs>
            </div>
        }
    </>
}

export default Configuration;
