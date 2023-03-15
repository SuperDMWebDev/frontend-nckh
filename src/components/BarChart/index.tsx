import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import Styled from './style';

const data = [{ year: '2010', publication: 400 },
{ year: '2011', publication: 300 },
{ year: '2012', publication: 123 },
{ year: '2013', publication: 678 },
{ year: '2014', publication: 345 },
{ year: '2015', publication: 89 },
{ year: '2016', publication: 129 },
{ year: '2017', publication: 4000 },
{ year: '2018', publication: 378 },
{ year: '2019', publication: 906 },
{ year: '2020', publication: 497 },
{ year: '2021', publication: 572 },
{ year: '2022', publication: 854 }];

export default function Chart() {
    return (
        <Styled>
            <div className="chart">
                <div className="statistic">
                    <h3 className="statistic-title">Publications of VNUHCM-US (2010-2022)</h3>
                    <div className="statistic-content">
                        <BarChart width={730} height={300} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year">
                                <Label value="Year" offset={0} position="insideBottom" />
                            </XAxis>
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="publication" fill="rgba(24, 71, 139, 0.8)" />
                        </BarChart>
                    </div>
                </div>
            </div>
        </Styled>
    );
};
