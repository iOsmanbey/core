import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const location = useLocation();
    const { language, toggleLanguage, t } = useLanguage();

    const handleScroll = (id) => (e) => {
        e.preventDefault();
        if (location.pathname !== '/') {
            window.location.href = `/#${id}`;
            return;
        }
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link to="/" className="logo">
                    <img src="/original.png" alt="Medicore Logo" className="logo-img" />
                </Link>
                <div className="nav-links">
                    <a href="#products" onClick={handleScroll('products')}>{t('nav_products')}</a>
                    <a href="#news" onClick={handleScroll('news')}>{t('nav_news')}</a>
                    <Link to="/admin">{t('nav_admin')}</Link>
                </div>
                <div className="nav-actions">
                    <button id="lang-toggle" className="btn btn-sm btn-ghost" onClick={toggleLanguage}>
                        <i className="ph ph-globe"></i> <span>{language.toUpperCase()}</span>
                    </button>
                    <a href="#contact" onClick={handleScroll('contact')} className="btn btn-primary">{t('nav_quote')}</a>
                </div>
                <button className="mobile-menu-btn" aria-label="Toggle menu">
                    <i className="ph ph-list"></i>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
