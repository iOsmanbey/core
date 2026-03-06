import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Showcase = () => {
    const { t } = useLanguage();
    return (
        <section className="featured-showcase">
            <div className="container">
                {/* Background Elements */}
                <div className="showcase-bg-circle c1"></div>
                <div className="showcase-bg-circle c2"></div>

                <div className="showcase-grid">
                    {/* Product Card 1: AI Hub */}
                    <div className="showcase-card white-card" id="showcase-card-1">
                        <div className="card-content">
                            <h3 className="showcase-title">{t('showcase_title_1')}</h3>
                        </div>
                        <div className="showcase-image">
                            <img id="showcase-img-1" src="/Assets/diagnostic-hub.png" alt="Showcase Product 1" />
                        </div>
                    </div>

                    {/* Product Card 2: Portable Ultrasound */}
                    <div className="showcase-card white-card" id="showcase-card-2">
                        <div className="card-content">
                            <h3 className="showcase-title">{t('showcase_title_2')}</h3>
                        </div>
                        <div className="showcase-image">
                            <img id="showcase-img-2" src="/Assets/ultrasound.png" alt="Showcase Product 2" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Showcase;
