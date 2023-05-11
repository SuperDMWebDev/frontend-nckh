import React from 'react'
import Styled from './style';

export default function ArticleDetail() {
    return (
        <Styled>
            <div className='detail-article-body'>
                <div className='article-title'>Life-cycle costs approach for private piped water service delivery: a study in rural Viet Nam</div>
                <div className='article-author'>
                    <div>Authors: </div>
                    <ul >
                        <li>Grant,M</li>
                        <li>Foster,T</li>
                        <li>Dinh,DV</li>
                        <li>Willetts,J </li>
                        <li>Davis,G</li>
                    </ul>
                </div>
                <div className='article-info'>
                    <div>
                        <p>
                            Publisher: IWA Publishing
                        </p>
                        <p>
                            Publication Type: Journal Article
                        </p>
                        <p>
                            Citation: Journal of Water, Sanitation and Hygiene for Development, 2020, 10, (4), pp. 659-669
                        </p>
                        <p>
                            Issue Date: 2020-10-05
                        </p>
                    </div>
                </div>

                <div className="article-content">
                    <h2>ABSTRACT: </h2>
                    <p>
                        Sustaining rural water services in Viet Nam requires an improved understanding of the costs and relative opportunities, especially given the government's support for private sector involvement in expanding water schemes. In particular, the life-cycle costs associated with the delivery of safe and sustainable water services in rural Viet Nam, as indeed elsewhere, are not well known, potentially compromising their long-term sustainability. To address this gap, this study assessed the cost structures of 14 water schemes in Viet Nam managed by private enterprises. Results showed that both capital and operational expenditures varied widely across the schemes assessed, reflective of the diversity of the age and characteristics of the schemes studied. Twelve of the 14 schemes generated a cash profit in the most recent calendar year; however, when taking into account depreciation, as well as historical subsidies and connection fee payments, only four of the schemes were profitable based on a 20-year design life assumption. The study complements previous research demonstrating barriers to achieving universal access when relying on user-pays systems. The results provide a useful reference point to inform business planning for enterprises, as well as policy and support mechanisms important for securing sustainable rural water supply services.
                    </p>
                </div>
            </div>
        </Styled>
    )
}
