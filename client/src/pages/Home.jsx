import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Showcase from '../components/Showcase';
import Sidebar from '../components/Sidebar';
import ProductGrid from '../components/ProductGrid';
import News from '../components/News';
import Contact from '../components/Contact';
import { DEFAULT_PRODUCTS } from '../data';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
    const { t } = useLanguage();
    const [products, setProducts] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const [category, setCategory] = useState('all');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('default');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:3001/api/products');
                if (res.ok) {
                    const json = await res.json();
                    if (json.data) {
                        setProducts(json.data);
                        const newItems = json.data.filter(p => p.is_new == 1 || p.is_new === true).slice(0, 5);
                        setNewArrivals(newItems);
                    }
                } else {
                    throw new Error('API failed');
                }
            } catch (e) {
                console.warn('Backend API unavailable, using default data:', e);
                setProducts(DEFAULT_PRODUCTS);
                setNewArrivals(DEFAULT_PRODUCTS.filter(p => p.isNew).slice(0, 5));
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <main>
            <div className="page-gradient"></div>
            <Hero />
            <Showcase />

            <section id="products" className="catalog-section">
                <div className="container catalog-container">
                    <div className="section-header">
                        <span className="badge">{t('catalog_badge')}</span>
                        <h2>{t('catalog_title_prefix')} <span className="highlight-blue">{t('catalog_title_suffix')}</span></h2>
                        <p>{t('catalog_subtitle')}</p>
                    </div>

                    <div className="catalog-layout">
                        <Sidebar
                            currentCategory={category}
                            setCategory={setCategory}
                            newArrivals={newArrivals}
                        />

                        <div className="catalog-content">
                            <div className="content-header">
                                <h2>{t('products_featured')}</h2>

                                <div className="search-box">
                                    <input
                                        type="text"
                                        placeholder={t('search_placeholder')}
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>

                                <div className="sort-controls">
                                    <span>{t('products_sort')}</span>
                                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                                        <option value="default">{t('products_latest')}</option>
                                        <option value="name-asc">{t('products_name_az')}</option>
                                        <option value="name-desc">{t('products_name_za')}</option>
                                    </select>
                                </div>
                            </div>

                            {loading ? (
                                <div className="loading-container">
                                    <div className="loader">Loading products...</div>
                                </div>
                            ) : (
                                <ProductGrid
                                    products={products}
                                    filters={{ category, search, sort }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <News />
            <Contact />
        </main>
    );
};

export default Home;
