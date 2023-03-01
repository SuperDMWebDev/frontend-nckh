import { styled } from '@mui/material/styles';
import TopBar from '../../components/TopBar';
import Header from '../../components/Header';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Slider from '../../components/Carousel';
import Styled from './style';

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

export default function AdminHomepage() {
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

            <Header />

            <Slider />

            {/* <div className="carousel slide" data-ride="carousel" id="our-vehicles-slider">
                <ol className="carousel-indicators d-none d-md-flex list-unstyled justify-content-around mx-auto">
                    <li className="active" data-slide-to="0" data-target="#our-vehicles-slider"></li>
                    <li data-slide-to="1" data-target="#our-vehicles-slider"></li>
                    <li data-slide-to="2" data-target="#our-vehicles-slider"></li>
                    <li data-slide-to="3" data-target="#our-vehicles-slider"></li>
                    <li data-slide-to="4" data-target="#our-vehicles-slider"></li>
                </ol>

                <div className="carousel-inner">
                    <div className="carousel-item active item-1">
                        Item-1
                    </div>

                    <div className="carousel-item item-2">
                        Item-2
                    </div>

                    <div className="carousel-item item-3">
                        Item-3
                    </div>

                    <div className="carousel-item item-4">
                        Item-4
                    </div>

                    <div className="carousel-item item-5">
                        Item-5
                    </div>

                    <div className="carousel-item item-5">
                        Item-6
                    </div>
                </div>

                <a href="#our-vehicles-slider" className="carousel-control-prev" data-slide="prev">
                    <i className="fa fa-angle-left"></i>
                </a>
                <a href="#our-vehicles-slider" className="carousel-control-next" data-slide="next">
                    <i className="fa fa-angle-right"></i>
                </a>
            </div> */}
        </Styled>
    );
}
