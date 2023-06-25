import React, { useState, useEffect } from 'react';
import Loader from '../../Loader/Loader';
import './style.css';
import { Tab, Tabs } from 'react-bootstrap';
import TabContact from './TabContact/TabContact';
import TabAcademicRank from './TabAcademicRank/TabAcademicRank';
import TabAcademicTitle from './TabAcademicTitle/TabAcademicTitle';
import TabUniversity from './TabUniversity/TabUniversity';
import TabActivity from './TabActivity/TabActivity';

export default function Configuration() {
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

                    <Tab eventKey="activity-type" title="Hoạt động">
                        <TabActivity />
                    </Tab>

                    <Tab eventKey="university" title="Trường đại học">
                        <TabUniversity />
                    </Tab>
                </Tabs>
            </div>
        }
    </>
}
