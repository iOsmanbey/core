import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const ProductGrid = ({ products, filters }) => {
    const { t, language } = useLanguage();
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Apply filters
    let filtered = [...products];
    if (filters.category && filters.category !== 'all') {
        filtered = filtered.filter(p => p.category === filters.category);
    }
    if (filters.search) {
        const lower = filters.search.toLowerCase();
        filtered = filtered.filter(p => {
            const name = typeof p.name === 'object' ? (p.name[language] || p.name.en) : p.name;
            const desc = typeof p.description === 'object' ? (p.description[language] || p.description.en) : p.description;
            return name.toLowerCase().includes(lower) || (desc && desc.toLowerCase().includes(lower));
        });
    }

    // Sort
    if (filters.sort === 'name-asc') {
        filtered.sort((a, b) => {
            const nameA = typeof a.name === 'object' ? (a.name[language] || a.name.en) : a.name;
            const nameB = typeof b.name === 'object' ? (b.name[language] || b.name.en) : b.name;
            return nameA.localeCompare(nameB);
        });
    } else if (filters.sort === 'name-desc') {
        filtered.sort((a, b) => {
            const nameA = typeof a.name === 'object' ? (a.name[language] || a.name.en) : a.name;
            const nameB = typeof b.name === 'object' ? (b.name[language] || b.name.en) : b.name;
            return nameB.localeCompare(nameA);
        });
    }

    const openModal = (p) => setSelectedProduct(p);
    const closeModal = () => setSelectedProduct(null);

    return (
        <>
            <div className="product-grid compact-grid" id="product-grid">
                {filtered.map(p => {
                    const pName = typeof p.name === 'object' ? (p.name[language] || p.name.en) : p.name;
                    return (
                        <div key={p.id} className="product-card" onClick={() => openModal(p)}>
                            <div className="card-badge">{p.category}</div>
                            <div className="product-img-container">
                                {p.image ? (
                                    <img src={p.image} alt={pName} loading="lazy" />
                                ) : (
                                    <div className="placeholder-img"><i className="ph ph-image"></i></div>
                                )}
                            </div>
                            <div className="product-info">
                                <h3>{pName}</h3>
                                <p className="model">{p.model}</p>
                                <p className="price">{typeof p.price === 'number' ? `$${p.price.toLocaleString()}` : p.price}</p>
                                <button
                                    className="btn-view-details-simple"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openModal(p);
                                    }}
                                >
                                    {t('products_view_details')}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal */}
            {selectedProduct && (
                <div id="product-details-modal" className="modal open" style={{ display: 'block' }}>
                    <div className="modal-content product-modal-content">
                        <span className="modal-close" onClick={closeModal}>&times;</span>
                        <div className="product-modal-header">
                            <img id="modal-product-image" src={selectedProduct.image} alt="Product" />
                            <div className="product-modal-info">
                                {(selectedProduct.isNew || selectedProduct.is_new) && <span id="modal-product-badge" className="product-badge">NEW</span>}
                                <h2 id="modal-product-name">{typeof selectedProduct.name === 'object' ? (selectedProduct.name[language] || selectedProduct.name.en) : selectedProduct.name}</h2>
                                <p id="modal-product-model" className="product-model">Model: {selectedProduct.model}</p>
                                <p id="modal-product-price" className="product-price">{typeof selectedProduct.price === 'number' ? `$${selectedProduct.price.toLocaleString()}` : selectedProduct.price}</p>
                                <div className="product-stock">
                                    <i className="ph-fill ph-check-circle"></i>
                                    <span id="modal-product-stock">{t('modal_in_stock')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="product-modal-body">
                            <div className="product-section">
                                <h3><i className="ph-duotone ph-info"></i> {t('modal_description')}</h3>
                                <p id="modal-product-description">{typeof selectedProduct.description === 'object' ? (selectedProduct.description[language] || selectedProduct.description.en) : selectedProduct.description}</p>
                            </div>

                            <div className="product-modal-actions">
                                <button className="btn-primary" onClick={() => alert(t('modal_quote_alert'))}>
                                    <i className="ph-fill ph-envelope"></i> {t('modal_btn_quote')}
                                </button>
                                <button className="btn-secondary" onClick={() => { closeModal(); window.location.href = '#contact'; }}>
                                    <i className="ph-fill ph-phone"></i> {t('modal_btn_contact')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductGrid;
