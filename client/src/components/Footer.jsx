import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();
    return (
        <footer>
            <div className="container footer-grid">
                <div className="footer-brand">
                    <a href="#" className="logo">
                        <img src="/original.png" alt="Medicore Logo" className="logo-img" />
                    </a>
                    <p>{t('footer_tagline')}</p>
                </div>
                <div className="footer-links">
                    <h4>{t('footer_company')}</h4>
                    <ul>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Press</a></li>
                    </ul>
                </div>
                <div className="footer-links">
                    <h4>{t('footer_support')}</h4>
                    <ul>
                        <li><a href="#">Contact Support</a></li>
                        <li><a href="#">Documentation</a></li>
                        <li><a href="#">Warranty</a></li>
                    </ul>
                </div>
                <div className="footer-social">
                    <h4>{t('footer_connect')}</h4>
                    <div className="social-icons">
                        <a href="#"><i className="ph-fill ph-linkedin-logo"></i></a>
                        <a href="#"><i className="ph-fill ph-twitter-logo"></i></a>
                        <a href="#"><i className="ph-fill ph-facebook-logo"></i></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom container">
                <p>&copy; 2024 Medicore Supplier Inc. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
