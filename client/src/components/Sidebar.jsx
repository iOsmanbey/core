import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Sidebar = ({ currentCategory, setCategory, newArrivals }) => {
    const { t, language } = useLanguage();

    const categories = [
        { id: 'all', label: t('products_all'), icon: 'ph ph-caret-right' },
        { id: 'medical', label: t('products_medical'), icon: 'ph ph-caret-right' },
        { id: 'stomatology', label: t('products_stomatology'), icon: 'ph ph-caret-right' },
        { id: 'surgery', label: t('products_surgery'), icon: 'ph ph-caret-right' },
        { id: 'laboratory', label: t('products_laboratory'), icon: 'ph ph-caret-right' },
        { id: 'other', label: t('products_other'), icon: 'ph ph-caret-right' }
    ];

    return (
        <aside className="catalog-sidebar">
            <div className="sidebar-widget">
                <h3>{t('sidebar_categories')}</h3>
                <ul className="category-list">
                    {categories.map(cat => (
                        <li key={cat.id}>
                            <a
                                href="#"
                                className={currentCategory === cat.id ? 'active' : ''}
                                onClick={(e) => { e.preventDefault(); setCategory(cat.id); }}
                            >
                                <i className={cat.icon}></i> <span>{cat.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="sidebar-widget new-arrivals-widget">
                <h3>{t('sidebar_new')}</h3>
                <div className="new-arrivals-list">
                    {newArrivals.length > 0 ? (
                        newArrivals.map(product => {
                            const pName = typeof product.name === 'object' ? (product.name[language] || product.name.en) : product.name;
                            return (
                                <div key={product.id} className="new-arrival-item">
                                    <div className="new-arrival-thumb">
                                        <img src={product.image || '/Assets/placeholder.png'} alt={pName} />
                                    </div>
                                    <div className="new-arrival-info">
                                        <h4 className="new-arrival-name">{pName}</h4>
                                        <p className="new-arrival-model">{product.model}</p>
                                        <button className="btn-view-details-simple">{t('products_view_details')}</button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p style={{ textAlign: 'center', padding: '1rem 0', color: 'var(--text-secondary)' }}>{t('sidebar_no_new')}</p>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
