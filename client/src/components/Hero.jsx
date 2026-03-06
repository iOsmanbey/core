import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <header className="hero">
            <div className="container hero-content">
                <div className="hero-text">
                    <span className="badge">{t('hero_badge')}</span>
                    <h1><span className="highlight-blue">{t('hero_h1_prefix')}</span> <span className="gradient-text-pink">{t('hero_h1_suffix')}</span></h1>
                    <p>{t('hero_description')}</p>
                    <div className="hero-btns">
                        <a href="#products" className="btn btn-primary">{t('hero_btn_explore')}</a>
                        <a href="#about" className="btn btn-light">{t('hero_btn_network')}</a>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="hero-image-container">
                        <img src="/Assets/intro 2.jpg" alt="Surgery Room" className="hero-main-img" />
                    </div>

                    <div className="floating-card card-1">
                        <div className="icon-box heart-icon">
                            <i className="ph-fill ph-heartbeat"></i>
                        </div>
                        <div>
                            <strong>99.9%</strong>
                            <span>{t('stat_uptime')}</span>
                        </div>
                    </div>

                    <div className="floating-card card-2">
                        <div className="icon-box globe-icon">
                            <i className="ph-fill ph-globe-hemisphere-west"></i>
                        </div>
                        <div>
                            <strong>50+</strong>
                            <span>{t('stat_countries')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Hero;
