import { styled } from '@mui/material/styles';
import TopBar from '../../../components/TopBar';
import Header from '../../../components/Header';
import HeaderFixed from '../../../components/HeaderFixed';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Slider from '../../../components/Carousel';
import Styled from './style';
import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Footer from '../../../components/Footer';
import Chart from '../../../components/BarChart';
import { BarChart } from 'recharts';

export default function Report() {
  return (
    <Styled>
      <div className="content-container">
        <HeaderFixed />

        <h1 className="title">Science, Technology, and Innovation</h1>
        <p className="content">
          All information in this page was updated automatically from Scopus on...
        </p>

        <div className="report-chart">
          <Chart />
        </div>

        <p className="detail">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae cupiditate enim
          adipisci illum commodi! Voluptas assumenda quia ad autem laboriosam sapiente dolore nemo
          nam soluta voluptate, ipsum voluptatem blanditiis cumque a in sint officia dicta
          reprehenderit excepturi commodi vero rerum. Sit adipisci facilis ut nihil consequuntur,
          tempore ab labore dolore, voluptate voluptas culpa architecto officia dolorum, cum
          pariatur minima deleniti nemo? Soluta molestiae ex, doloremque nulla ipsam omnis illum
          velit dolore possimus error libero laborum dignissimos consequatur mollitia, nisi sed
          provident, dolorum praesentium minima eligendi perspiciatis non excepturi! Ad qui sed
          cupiditate voluptatem saepe, eos distinctio illo eligendi hic ex?
        </p>
      </div>
    </Styled>
  );
}
