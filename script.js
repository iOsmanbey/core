document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // Navigation Logic
    // ==========================================

    // Setup basic navigation interactions
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // ==========================================
    // Data Loading (Centralized)
    // ==========================================
    let bannersDataCache = [];
    let newsDataCache = [];

    // Embedded default products (works without server)
    const DEFAULT_PRODUCTS = [
        { "id": "prod-001", "model": "DR-X500", "category": "medical", "image": "./Assets/xray-system.png", "isNew": true, "name": { "en": "Digital X-Ray System", "ru": "Цифровая рентгеновская система", "uz": "Raqamli rentgen tizimi" }, "description": { "en": "High-resolution digital radiography with wireless flat panel detector", "ru": "Цифровая рентгенография высокого разрешения", "uz": "Simsiz tekis panel detektori bilan yuqori aniqlikdagi raqamli rentgenografiya" }, "price": "Contact for Quote" },
        { "id": "prod-002", "model": "CT-1000", "category": "medical", "image": "./Assets/ct-scanner.png", "isNew": false, "name": { "en": "CT Scanner", "ru": "Компьютерный томограф", "uz": "Kompyuter tomografiya" }, "description": { "en": "64-slice computed tomography scanner", "ru": "64-срезовый компьютерный томограф", "uz": "64 qatlamli kompyuter tomografiya" }, "price": "Contact for Quote" },
        { "id": "prod-003", "model": "MRI-3000", "category": "medical", "image": "./Assets/mri-scanner.png", "isNew": true, "name": { "en": "MRI Scanner", "ru": "МРТ сканер", "uz": "MRT skaneri" }, "description": { "en": "1.5T Magnetic Resonance Imaging system", "ru": "МРТ система 1.5 Тесла", "uz": "1.5T MRT tizimi" }, "price": "Contact for Quote" },
        { "id": "prod-004", "model": "ECG-500", "category": "medical", "image": "./Assets/ecg-machine.png", "isNew": false, "name": { "en": "ECG Machine", "ru": "ЭКГ аппарат", "uz": "EKG apparati" }, "description": { "en": "12-lead electrocardiograph with touchscreen", "ru": "12-канальный электрокардиограф", "uz": "12 kanalli elektrokardiograf" }, "price": 3500 },
        { "id": "prod-005", "model": "VS-800", "category": "medical", "image": "./Assets/vital-monitor.png", "isNew": false, "name": { "en": "Vital Sign Monitor", "ru": "Монитор пациента", "uz": "Bemor monitori" }, "description": { "en": "Multiparameter patient monitor with 12.1\" touchscreen display", "ru": "Мультипараметрический монитор пациента", "uz": "12.1\" sensorli ekranli bemor monitori" }, "price": 1200 },
        { "id": "prod-006", "model": "SR-2000", "category": "surgery", "image": "./Assets/surgical-robot.png", "isNew": true, "name": { "en": "Surgical Robot Arm", "ru": "Хирургический робот", "uz": "Jarrohlik roboti" }, "description": { "en": "Precision robotic assistance for minimally invasive procedures", "ru": "Роботизированная система для хирургии", "uz": "Minimal invaziv jarrohlik uchun robot" }, "price": "Contact for Quote" },
        { "id": "prod-007", "model": "HA-300", "category": "laboratory", "image": "./Assets/hematology-analyzer.png", "isNew": false, "name": { "en": "Hematology Analyzer", "ru": "Гематологический анализатор", "uz": "Gematologiya analizatori" }, "description": { "en": "Automated 5-part differential hematology analyzer", "ru": "Автоматический гематологический анализатор", "uz": "Avtomatlashtirilgan gematologik tahlilchi" }, "price": 8500 },
        { "id": "prod-008", "model": "EB-900", "category": "other", "image": "./Assets/icu-bed.png", "isNew": false, "name": { "en": "ICU Electric Bed", "ru": "Кровать реанимационная", "uz": "Reanimatsiya karavoti" }, "description": { "en": "Fully adjustable electric hospital bed", "ru": "Электрическая больничная кровать", "uz": "Elektr shifoxona karavoti" }, "price": 2800 },
        { "id": "prod-009", "model": "IR-50", "category": "medical", "image": "", "isNew": false, "name": { "en": "Infrared Thermometer", "ru": "Инфракрасный термометр", "uz": "Infraqizil termometr" }, "description": { "en": "Contactless clinical thermometer", "ru": "Бесконтактный термометр", "uz": "Kontaktsiz termometr" }, "price": 45 },
        { "id": "prod-010", "model": "DC-PRO", "category": "stomatology", "image": "", "isNew": true, "name": { "en": "Dental Chair Pro", "ru": "Стоматологическое кресло Про", "uz": "Stomatologik kreslo Pro" }, "description": { "en": "Electric dental chair with LED light and touchscreen control", "ru": "Электрическое стоматологическое кресло с LED-подсветкой", "uz": "LED yoritgich bilan elektr stomatologik kreslo" }, "price": 4500 }
    ];

    async function loadAllData() {
        try {
            const res = await fetch('./products-data.json');
            if (res.ok) {
                window.productsDataCache = await res.json();
                console.log('Loaded products from products-data.json:', window.productsDataCache.length);
            } else {
                throw new Error('File fetch failed');
            }
        } catch (e) {
            console.warn('Loading from products-data.json failed, using default products:', e);
            // Fallback to embedded default products
            window.productsDataCache = [...DEFAULT_PRODUCTS];
        }

        // Apply local storage edits/additions over the fetched JSON correctly
        const localProducts = JSON.parse(localStorage.getItem('medico_products') || '[]');
        localProducts.forEach(lp => {
            const idx = window.productsDataCache.findIndex(p => p.id == lp.id);
            if (idx !== -1) {
                window.productsDataCache[idx] = Object.assign({}, window.productsDataCache[idx], lp);
            } else {
                window.productsDataCache.push(lp);
            }
        });

        // Filter out deleted products
        const deletedProducts = JSON.parse(localStorage.getItem('medico_deleted_products') || '[]');
        if (deletedProducts.length > 0) {
            window.productsDataCache = window.productsDataCache.filter(p => !deletedProducts.includes(p.id.toString()));
        }

        // Load Banners (mock from localStorage for now)
        bannersDataCache = JSON.parse(localStorage.getItem('medico_banners') || '[]');

        // Load News (mock from localStorage for now)
        newsDataCache = JSON.parse(localStorage.getItem('medico_news') || '[]');

        // Trigger Renders
        renderProducts();
        renderNewArrivals();
        renderShowcase(); // New function
        renderHero();
        renderNews();
        renderPageContent();
    }

    // ==========================================
    // Product Catalog Logic
    // ==========================================

    // Render Showcase (Top Section)
    function renderShowcase() {
        // read left/right for backwards compatibility but prefer card1/2/3/4
        const showcaseConfig = JSON.parse(localStorage.getItem('medico_showcase_config') || '{}');

        // Helper to update a card
        const updateCard = (slotId, productId, fallbackImg, fallbackTitle) => {
            const card = document.getElementById(`showcase-card-${slotId}`);
            if (!card) return;

            const titleEl = document.getElementById(`showcase-title-${slotId}`);
            const imgEl = document.getElementById(`showcase-img-${slotId}`);

            if (!productId) {
                // If no product selected, keep default logic or hide? 
                // We'll keeps defaults intact if config is empty to avoid broken UI
                return;
            }

            const product = window.productsDataCache ? window.productsDataCache.find(p => p.id == productId) : null;

            if (product) {
                if (titleEl) titleEl.innerHTML = getProductName(product).toUpperCase();
                if (imgEl) imgEl.src = product.image || fallbackImg;
            }
        };

        const sc1 = showcaseConfig.card1 || showcaseConfig.left;
        const sc2 = showcaseConfig.card2 || showcaseConfig.right;
        const sc3 = showcaseConfig.card3;
        const sc4 = showcaseConfig.card4;

        if (sc1) updateCard('1', sc1, './Assets/diagnostic-hub.png');
        if (sc2) updateCard('2', sc2, './Assets/ultrasound.png');
        if (sc3) updateCard('3', sc3, './Assets/mri-scanner.png');
        if (sc4) updateCard('4', sc4, './Assets/xray-system.png');
    }


    async function getProducts(queryParams = {}) {
        if (!window.productsDataCache) await loadAllData();

        let filtered = [...window.productsDataCache];
        const currentLang = localStorage.getItem('language') || localStorage.getItem('medico_lang') || 'en';

        // Filter by category
        if (queryParams.category && queryParams.category !== 'all') {
            filtered = filtered.filter(p => p.category === queryParams.category);
        }

        // Filter by search
        if (queryParams.search) {
            const searchLower = queryParams.search.toLowerCase();
            filtered = filtered.filter(p => {
                const name = p.name[currentLang] || p.name.en || (typeof p.name === 'string' ? p.name : '');
                const desc = p.description[currentLang] || p.description.en || (typeof p.description === 'string' ? p.description : '');
                const model = p.model || '';

                return name.toLowerCase().includes(searchLower) ||
                    desc.toLowerCase().includes(searchLower) ||
                    model.toLowerCase().includes(searchLower);
            });
        }

        // Sort
        if (queryParams.sort) {
            if (queryParams.sort === 'price-asc') {
                filtered.sort((a, b) => {
                    const priceA = parsePrice(a.price);
                    const priceB = parsePrice(b.price);
                    return priceA - priceB;
                });
            }
            if (queryParams.sort === 'price-desc') {
                filtered.sort((a, b) => {
                    const priceA = parsePrice(a.price);
                    const priceB = parsePrice(b.price);
                    return priceB - priceA;
                });
            }
            if (queryParams.sort === 'name-asc') {
                filtered.sort((a, b) => getProductName(a).localeCompare(getProductName(b)));
            }
            if (queryParams.sort === 'name-desc') {
                filtered.sort((a, b) => getProductName(b).localeCompare(getProductName(a)));
            }
        }

        return filtered;
    }

    function parsePrice(price) {
        if (typeof price === 'number') return price;
        if (typeof price === 'string') {
            const num = parseFloat(price.replace(/[^0-9.]/g, ''));
            return isNaN(num) ? 0 : num;
        }
        return 0;
    }

    function getProductName(product) {
        const lang = localStorage.getItem('language') || localStorage.getItem('medico_lang') || 'en';
        if (typeof product.name === 'object') {
            return product.name[lang] || product.name.en || 'Unknown Product';
        }
        return product.name || 'Unknown Product';
    }

    function getProductDesc(product) {
        const lang = localStorage.getItem('language') || localStorage.getItem('medico_lang') || 'en';
        if (typeof product.description === 'object') {
            return product.description[lang] || product.description.en || '';
        }
        return product.description || '';
    }

    // Render Main Product Grid
    async function renderProducts() {
        const productGrid = document.getElementById('product-grid');
        if (!productGrid) return;

        // Get Filters
        const activeLink = document.querySelector('.category-list a.active');
        const category = activeLink ? activeLink.getAttribute('data-filter') : 'all';
        const sortSelect = document.getElementById('sort-select');
        const sort = sortSelect ? sortSelect.value : 'default';
        const searchInput = document.getElementById('product-search');
        const search = searchInput ? searchInput.value : '';

        // Fetch
        productGrid.style.opacity = '0.5';
        const products = await getProducts({ category, sort, search });
        productGrid.style.opacity = '1';
        productGrid.innerHTML = '';

        console.log('renderProducts called, found products:', products?.length || 0);

        if (!products || products.length === 0) {
            productGrid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 2rem;"><h3>No products found</h3><p>Try adjusting your search criteria.</p></div>';
            return;
        }

        // Render Cards
        const currentLang = localStorage.getItem('language') || localStorage.getItem('medico_lang') || 'en';
        const tr = typeof translations !== 'undefined' ? (translations[currentLang] || translations.en) : null;
        const modelLabel = tr ? tr.modal_model : 'MODEL: ';
        const detailsBtnStr = tr ? tr.btn_details : 'Details';

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card catalog-card';
            card.setAttribute('data-category', product.category);
            card.setAttribute('data-name', getProductName(product));

            const imgContent = getProductImageHTML(product);
            const hasImage = product.image && product.image.length > 5;
            const imgContainerStyle = hasImage
                ? 'height: 250px; display:flex; align-items:center; justify-content:center; background: #fff; border-radius: 12px; margin-bottom: 1rem;'
                : '';

            const name = getProductName(product);
            const desc = getProductDesc(product);
            const price = product.price || 'Contact for Quote';
            const isNumericPrice = typeof product.price === 'number' && product.price > 0;

            card.innerHTML = `
                <div class="card-image-placeholder" style="${imgContainerStyle}">
                    ${imgContent}
                </div>
                <div class="card-body">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 0.25rem;">
                        <h3>${name}</h3>
                        ${isNumericPrice ? `<span class="product-price">$${product.price.toLocaleString()}</span>` : ''}
                    </div>
                    
                    ${product.model ? `<div class="product-model">${modelLabel}${product.model}</div>` : ''}
                    
                    <p class="product-desc">${desc}</p>
                    
                    <div class="card-footer">
                        <span class="product-badge">${product.category}</span>
                        <button class="btn-details" onclick="openProductDetails('${product.id}')">
                            <i class="ph-fill ph-info"></i> ${detailsBtnStr}
                        </button>
                    </div>
                </div>
            `;
            productGrid.appendChild(card);

            // Observe for animation
            observer.observe(card);
        });
    }

    // Render Sidebar New Arrivals
    async function renderNewArrivals() {
        const newArrivalsList = document.getElementById('new-arrivals-list');
        if (!newArrivalsList) return;

        if (!window.productsDataCache) await loadAllData();

        // Filter for new items (manual control via admin)
        // Backend returns integer 0/1 for boolean
        let newProducts = window.productsDataCache.filter(p => p.isNew == 1 || p.isNew === true);

        // If nothing is marked as new, maybe show empty or hidden? 
        // For now, let's just limit to 5 items if many are marked
        newProducts = newProducts.slice(0, 5);

        if (newProducts.length === 0) {
            newArrivalsList.innerHTML = '<p style="text-align:center; padding:2rem 0; color:var(--text-secondary);">No new products.</p>';
            return;
        }

        const currentLang = localStorage.getItem('language') || localStorage.getItem('medico_lang') || 'en';
        const tr = typeof translations !== 'undefined' ? (translations[currentLang] || translations.en) : null;
        const modelLabel = tr ? tr.modal_model : 'MODEL: ';
        const viewDetailsBtnStr = tr ? tr.btn_view_details : 'View Details';

        newArrivalsList.innerHTML = newProducts.map(p => {
            const imgContent = getProductImageHTML(p);
            const hasImage = p.image && p.image.length > 5;
            const imgContainerStyle = hasImage
                ? 'padding:0; overflow:hidden; display:block; margin: -1.5rem -1.5rem 1.5rem -1.5rem; border-radius: var(--radius-md) var(--radius-md) 0 0; height: 250px;'
                : '';

            return `
            <div class="new-arrival-item product-card">
                <div class="new-arrival-image">
                    ${imgContent}
                </div>
                <div class="new-arrival-body">
                    <div class="new-arrival-title">${getProductName(p)}</div>
                    ${p.model ? `<div class="new-arrival-model">${modelLabel}${p.model}</div>` : ''}
                    <button class="btn-view-details-simple" onclick="openProductDetails('${p.id}')">${viewDetailsBtnStr}</button>
                </div>
            </div>
            `;
        }).join('');
    }

    function getProductImageHTML(product) {
        const name = getProductName(product);
        if (product.image && product.image.length > 5) {
            return `<img src="${product.image}" 
                         style="display:block; width:100%; height:100%; object-fit:contain; padding:1rem;" 
                         alt="${name}"
                         onerror="this.onerror=null; this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:150px;color:#94a3b8;\\'><i class=\\'ph-duotone ph-package\\' style=\\'font-size:4rem;\\'></i></div>';">`;
        } else {
            const iconMap = {
                'medical': 'ph-scan',
                'stomatology': 'ph-tooth',
                'surgery': 'ph-scissors',
                'laboratory': 'ph-dna',
                'other': 'ph-bed'
            };
            const icon = iconMap[product.category] || 'ph-package';
            return `<div style="display:flex;align-items:center;justify-content:center;height:150px;color:#94a3b8;">
                        <i class="ph-duotone ${icon}" style="font-size:4rem;"></i>
                    </div>`;
        }
    }


    /* Animation Observer */
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.catalog-card, .service-card, .promo-card').forEach(el => observer.observe(el));


    /* Event Listeners for Filters */
    const categoryLinks = document.querySelectorAll('.category-list a');
    const sortSelect = document.getElementById('sort-select');
    const searchInput = document.getElementById('product-search');

    if (categoryLinks.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                categoryLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Update UI text
                const text = link.innerText;
                const breadcrumb = document.getElementById('current-category-breadcrumb');
                if (breadcrumb) breadcrumb.textContent = text;
                const headerTitle = document.getElementById('cat-header-title');
                if (headerTitle) headerTitle.textContent = text;

                // View switching logic (optional, preserved from original)
                const filterValue = link.getAttribute('data-filter');
                const contentHeader = document.querySelector('.content-header');
                const categoryView = document.getElementById('category-detail-view');

                if (filterValue === 'all') {
                    if (categoryView) categoryView.classList.add('hidden');
                    if (contentHeader) contentHeader.style.display = 'flex';
                } else {
                    if (categoryView) categoryView.classList.remove('hidden');
                    if (contentHeader) contentHeader.style.display = 'none';
                }

                renderProducts();
            });
        });
    }

    if (sortSelect) sortSelect.addEventListener('change', renderProducts);

    if (searchInput) {
        let timeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(renderProducts, 500);
        });
    }

    // Hero Logic
    function renderHero() {
        // Rotational text replacement removed as requested. 
        // Translations will now naturally bind to the data-i18n attributes in the HTML.
        return;
    }

    // News Render
    function renderNews() {
        const newsGrid = document.getElementById('news-grid');
        if (!newsGrid) return;

        const currentLang = localStorage.getItem('language') || localStorage.getItem('medico_lang') || 'en';
        const tr = typeof translations !== 'undefined' ? (translations[currentLang] || translations.en) : null;
        const readArticleStr = tr && tr.btn_read_article ? tr.btn_read_article : 'Read Article';

        let news = newsDataCache;
        if (news.length === 0) {
            news = [
                { id: 1, title: 'New Diagnostic Hub Launch', date: 'October 15, 2024', content: 'We are thrilled to announce the launch of our new AI-Powered Diagnostic Hub, revolutionizing efficiency in early detection.', image: './Assets/intro 2.jpg' },
                { id: 2, title: 'Global Healthcare Summit 2024', date: 'September 20, 2024', content: 'Our team will be presenting the latest medical solutions at the upcoming Global Summit in Geneva.', image: './Assets/ultrasound.png' },
                { id: 3, title: 'Partnership with MedTech Innovators', date: 'August 05, 2024', content: 'A strategic partnership to bring next-generation surgical robots to clinics worldwide.', image: './Assets/diagnostic-hub.png' }
            ];
        }

        newsGrid.innerHTML = news.map(n => `
        <div class="news-card">
            <div class="news-img">
                ${n.image ? `<img src="${n.image}" alt="${n.title}">` : '<div style="width:100%;height:100%;background:#f1f5f9;"></div>'}
            </div>
            <div class="news-content">
                <span class="news-date">${n.date}</span>
                <h3>${n.title}</h3>
                <p>${n.content}</p>
                <button class="action-btn read-more" onclick="openArticle(${n.id})" style="background:none; border:none; padding:0; font-family:inherit; cursor:pointer;">
                    ${readArticleStr} <i class="ph ph-arrow-right"></i>
                </button>
            </div>
        </div>
        `).join('');
    }

    // Page Content Render
    function renderPageContent() {
        const content = JSON.parse(localStorage.getItem('medico_content') || '{}');
        if (content.contact) {
            const phone = document.getElementById('contact-phone');
            const email = document.getElementById('contact-email');
            const address = document.getElementById('contact-address');

            if (phone && content.contact.phone) {
                phone.innerHTML = `<i class="ph-fill ph-phone"></i> ${content.contact.phone}`;
            }
            if (email && content.contact.email) {
                email.innerHTML = `<i class="ph-fill ph-envelope"></i> ${content.contact.email}`;
            }
            if (address) {
                if (content.contact.address) {
                    address.style.display = 'inline-flex';
                    address.innerHTML = `<i class="ph-fill ph-map-pin"></i> <span>${content.contact.address}</span>`;
                } else {
                    address.style.display = 'none';
                }
            }
        }
    }

    // Initialize
    loadAllData().then(() => {
        renderProducts();
        renderNewArrivals();
        renderHero();
        renderNews();
        renderPageContent();
    });

    // Expose functions to window for i18n language switching
    window.renderProducts = renderProducts;
    window.renderNewArrivals = renderNewArrivals;
    window.renderNews = renderNews;
    window.handleContactSubmit = function (e) {
        e.preventDefault();
        alert('Thank you for your interest! We will contact you shortly.');
        e.target.reset();
    };
});

// Helper - Open News Article
function openArticle(id) {
    const news = JSON.parse(localStorage.getItem('medico_news') || '[]');
    const article = news.find(n => n.id === id);
    if (!article) return;

    const modalBody = document.getElementById('article-modal-body');
    if (!modalBody) return;

    const img = article.image ? `<img src="${article.image}" class="article-header-img">` : '';

    modalBody.innerHTML = `
        ${img}
        <span class="article-date">${article.date}</span>
        <h2 style="font-size: 2rem; margin-bottom: 1.5rem; line-height: 1.2;">${article.title}</h2>
        <div class="article-body">${article.content}</div>
    `;

    document.getElementById('articleModal').classList.add('open');
}
window.openArticle = openArticle;
