import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
    const { t } = useLanguage();
    const handleContactSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your interest! We will contact you soon.');
    };

    return (
        <section id="contact" className="cta-section">
            <div className="container">
                <div className="cta-card">
                    <div className="cta-content">
                        <h2>{t('cta_title')}</h2>
                        <p>{t('cta_desc')}</p>

                        <div id="contact-info-dynamic" style={{ marginTop: '1.5rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <span><i className="ph-fill ph-phone"></i> +1 (555) 000-0000</span>
                            <span><i className="ph-fill ph-envelope"></i> info@medicore.com</span>
                        </div>
                    </div>
                    <form className="cta-form" onSubmit={handleContactSubmit}>
                        <input type="email" placeholder="Enter your work email" required />
                        <button type="submit" className="btn btn-light">{t('btn_get_started')}</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
