import { styled } from '@mui/material/styles';
import TopBar from '../../components/TopBar';
import Header from '../../components/Header';
import HeaderFixed from '../../components/HeaderFixed';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Slider from '../../components/Carousel';
import Styled from './style';
import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Footer from '../../components/Footer';
import Chart from '../../components/BarChart';

const FacebookIconStyled = styled('i')(({ theme }) => ({
    backgroundImage: 'url(/assets/icons/facebook-fill.svg)',
    width: '18px',
    height: '18px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    display: 'inline-block',

    transition: 'all .3s',
}));

const SocialBarStyled = styled('div')(({ theme }) => ({
    'svg': {
        width: '20px',
        height: '20px',
    },
    'a': {
        transition: 'all .3s',
        cursor: 'pointer',
        color: '#999999',
        lineHeight: '16px',
    },
    'li': {
        margin: '3px 7px 0 7px',
    },

    'li:hover': {
        'a': {
            color: '#3f51b5',
        },
        '.facebook-fill': {
            background: 'none',
            backgroundImage: 'url(/assets/icons/facebook-fill-blue.svg)',
            width: '18px',
            height: '18px',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            display: 'inline-block',
        }
    },
}));

export default function ResearchHomepage() {
    const [isVisible, setIsVisible] = useState(true);
    const [height, setHeight] = useState(0);
    const div = useRef() as MutableRefObject<HTMLDivElement>;


    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        return () =>
            window.removeEventListener("scroll", listenToScroll);
    }, [])

    const listenToScroll = () => {
        let heightToHideFrom = 30;
        let heightToFixedFrom = 47;
        const winScroll = document.body.scrollTop ||
            document.documentElement.scrollTop;
        setHeight(winScroll);

        if (winScroll > heightToHideFrom) {
            isVisible && setIsVisible(false);
        } else {
            setIsVisible(true);
        }

        div.current.style.transition = 'all 0.3s';
        if (winScroll > heightToFixedFrom) {
            div.current.style.transform = 'translateY(-80px)';
            div.current.style.position = "fixed";
            div.current.style.top = '0';
            div.current.style.left = '0';
            div.current.style.width = '100%';
            div.current.style.display = 'block';
            div.current.style.zIndex = '99999999999';
        } else if (winScroll <= heightToFixedFrom) {
            div.current.style.display = 'none';
        }
    };

    return (
        <Styled>
            <TopBar />

            <SocialBarStyled>
                <ul>
                    <li>
                        <a href="" className='social-icon facebook-icon'>
                            <FacebookIconStyled className='facebook-fill'></FacebookIconStyled>
                        </a>
                    </li>
                    <li>
                        <a href="" className='social-icon youtube-icon'>
                            <YouTubeIcon className='logo-youtube'></YouTubeIcon>
                        </a>
                    </li>
                </ul>
            </SocialBarStyled>

            {
                isVisible &&
                <Header />
            }

            <div ref={div}>
                <HeaderFixed />
            </div>
            

            <Slider />

            <Chart />

            <Footer />
        </Styled>
    );
}
