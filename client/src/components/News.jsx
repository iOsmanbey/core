import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const News = () => {
    const { t } = useLanguage();
    // Mock news data - in a real app this would come from an API
    const newsItems = [
        {
            id: 1,
            title: "Future of Digital Radiography",
            date: "Oct 24, 2024",
            content: "Detailed insights into how AI is transforming X-ray diagnostics and patient care.",
            image: "/Assets/diagnostic-hub.png"
        },
        {
            id: 2,
            title: "Global Supply Chain Updates",
            date: "Oct 15, 2024",
            content: "Ensuring timely delivery of medical equipment amidst global logistics challenges.",
            image: "/Assets/ultrasound.png"
        },
        {
            id: 3,
            title: "New Stomatology Lab Opened",
            date: "Sept 30, 2024",
            content: "Expanding our service capabilities with a new state-of-the-art stomatology training center.",
            image: "/Assets/intro 2.jpg"
        }
    ];

    return (
        <section id="news" className="news-section">
            <div className="container">
                <div className="section-header center-text">
                    <h2>{t('news_title')}</h2>
                    <p>{t('news_subtitle')}</p>
                </div>
                <div className="news-grid grid-3">
                    {newsItems.map(item => (
                        <div key={item.id} className="news-card">
                            <div className="news-img">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div className="news-content">
                                <span className="news-date">{item.date}</span>
                                <h3>{item.title}</h3>
                                <p>{item.content}</p>
                                <button className="action-btn read-more">
                                    {t('btn_read_article')} <i className="ph ph-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default News;
