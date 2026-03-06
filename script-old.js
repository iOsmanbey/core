document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // Navigation Logic
    // ==========================================
    // Navigation Logic
    // ==========================================

    // Seed Default Data if Empty
    if (!localStorage.getItem('medico_products')) {
        const DEFAULT_PRODUCTS = [
            {
                name: "Digital X-Ray System",
                category: "medical",
                model: "DR-X500",
                description: "High-resolution digital radiography with wireless flat panel detector.",
                image: ""
            },
            {
                name: "Vital Sign Monitor",
                category: "medical",
                model: "VS-800",
                description: "Multiparameter patient monitor with 12.1\" touchscreen display.",
                image: ""
            },
            {
                name: "Surgical Robot Arm",
                category: "surgery",
                model: "SR-2000",
                description: "Precision robotic assistance for minimally invasive laparoscopic procedures.",
                image: ""
            },
            {
                name: "Hematology Analyzer",
                category: "laboratory",
                model: "HA-300",
                description: "Automated 5-part differential hematology analyzer for high-volume labs.",
                image: ""
            },
            {
                name: "ICU Electric Bed",
                category: "other",
                model: "EB-900",
                description: "Fully adjustable electric hospital bed with integrated weighing scale.",
                image: ""
            },
            {
                name: "Infrared Thermometer",
                category: "medical",
                model: "IR-50",
                description: "Contactless clinical thermometer with 1-second response time.",
                image: ""
            }
        ];
        localStorage.setItem('medico_products', JSON.stringify(DEFAULT_PRODUCTS));
        console.log('Default products seeded to localStorage');
    }

    // Setup basic navigation interactions if any
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // ==========================================
    // Animation Observer
    // ==========================================
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.catalog-card, .service-card, .promo-card').forEach(el => {
        observer.observe(el);
    });

    // ==========================================
    // Product Catalog Logic (Backend Integrated)
    // ==========================================

    // Fetch Data from products-data.json with multilingual support
    let productsDataCache = null;

    async function fetchProducts(queryParams = {}) {
        try {
            // Load from JSON file if not cached
            if (!productsDataCache) {
                const response = await fetch('./products-data.json');
                if (!response.ok) throw new Error('products-data.json not found');
                productsDataCache = await response.json();
            }

            let filtered = [...productsDataCache];

            // Get current language
            const currentLang = localStorage.getItem('language') || 'en';

            // Filter by category
            if (queryParams.category && queryParams.category !== 'all') {
                filtered = filtered.filter(p => p.category === queryParams.category);
            }

            // Filter by search
            if (queryParams.search) {
                const searchLower = queryParams.search.toLowerCase();
                filtered = filtered.filter(p => {
                    const name = p.name[currentLang] || p.name.en || '';
                    const desc = p.description[currentLang] || p.description.en || '';
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
                        const priceA = typeof a.price === 'string' ? 999999 : a.price;
                        const priceB = typeof b.price === 'string' ? 999999 : b.price;
                        return priceA - priceB;
                    });
                }
                if (queryParams.sort === 'price-desc') {
                    filtered.sort((a, b) => {
                        const priceA = typeof a.price === 'string' ? 0 : a.price;
                        const priceB = typeof b.price === 'string' ? 0 : b.price;
                        return priceB - priceA;
                    });
                }
                if (queryParams.sort === 'name-asc') {
                    filtered.sort((a, b) => (a.name[currentLang] || a.name.en).localeCompare(b.name[currentLang] || b.name.en));
                }
                if (queryParams.sort === 'name-desc') {
                    filtered.sort((a, b) => (b.name[currentLang] || b.name.en).localeCompare(a.name[currentLang] || a.name.en));
                }
            }

            return filtered;
        } catch (error) {
            console.error('Error loading products:', error);
            return [];
        }
    }

    // Render Products Function
    async function renderProducts() {
        const productGrid = document.getElementById('product-grid');
        if (!productGrid) return;

        // Get active filter
        const activeLink = document.querySelector('.category-list a.active');
        const category = activeLink ? activeLink.getAttribute('data-filter') : 'all';

        // Get sort
        const sortSelect = document.getElementById('sort-select');
        const sort = sortSelect ? sortSelect.value : 'default';

        // Get Search
        const searchInput = document.getElementById('product-search');
        const search = searchInput ? searchInput.value : '';

        // Show loading state?
        productGrid.style.opacity = '0.5';

        const products = await fetchProducts({ category, sort, search });

        productGrid.style.opacity = '1';
        productGrid.innerHTML = '';

        if (!products || products.length === 0) {
            productGrid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 2rem;"><h3>No products found</h3><p>Try adjusting your search criteria.</p></div>';
            return;
        }

        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card catalog-card';
            card.setAttribute('data-category', product.category);

            // Get current language
            const currentLang = localStorage.getItem('language') || 'en';

            // Get localized product data
            const productName = product.name[currentLang] || product.name.en || 'Unknown Product';
            const productDesc = product.description[currentLang] || product.description.en || '';

            card.setAttribute('data-name', productName);

            let imgContent;
            // Use product image or fallback icon
            if (product.image && product.image.length > 5) {
                imgContent = `<img src="${product.image}" style="display:block; width:100%; height:100%; object-fit:contain;" alt="${productName}">`;
            } else {
                const iconMap = {
                    'medical': 'ph-scan',
                    'stomatology': 'ph-tooth',
                    'surgery': 'ph-scissors',
                    'laboratory': 'ph-dna',
                    'other': 'ph-bed'
                };
                const icon = iconMap[product.category] || 'ph-package';
                imgContent = `<i class="ph-duotone ${icon}"></i>`;
            }

            const hasImage = product.image && product.image.length > 5;
            const imgContainerStyle = hasImage ? 'padding:0; overflow:hidden; display:block; margin: -1.5rem -1.5rem 1.5rem -1.5rem; border-radius: var(--radius-md) var(--radius-md) 0 0; height: 250px; background: #f8fafc;' : '';

            // Handle price display
            const priceDisplay = product.price || 'Contact for Quote';
            const isNumericPrice = typeof product.price === 'number';

            card.innerHTML = `
                <div class="card-image-placeholder" style="${imgContainerStyle}">
                    ${imgContent}
                </div>
                <div class="card-body">
                    <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom: 0.5rem;">
                        <h3 style="margin:0; flex:1;">${productName}</h3>
                        ${isNumericPrice ? `<span style="font-weight:bold; color:var(--primary); white-space:nowrap; margin-left:1rem;">$${product.price.toLocaleString()}</span>` : ''}
                    </div>
                    ${product.model ? `<p class="model" style="color:#64748b; font-size:0.875rem; margin:0 0 0.5rem 0;">Model: ${product.model}</p>` : ''}
                    ${product.isNew ? `<span class="badge-success" style="display:inline-block; margin-bottom:0.5rem;">NEW</span>` : ''}
                    <p class="desc" style="color:#475569; font-size:0.9rem; line-height:1.5; margin-bottom:1rem;">${productDesc}</p>
                    <div class="card-actions" style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                        <span class="badge-outline">${product.category}</span>
                        ${!isNumericPrice ? `<span class="badge-outline">${priceDisplay}</span>` : ''}
                        <button class="btn-secondary btn-sm" style="margin-left:auto;" onclick="openProductDetails('${product.id}')">
                            <i class="ph-fill ph-info"></i> Details
                        </button>
                    </div>
                </div>
            `;

            productGrid.appendChild(card);
            observer.observe(card);
        });
        <a href="detail.html?id=${product.id}" class="btn-icon" title="View Details"><i class="ph ph-arrow-right"></i></a>
                    </div >
                </div >
            `;

            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

            productGrid.appendChild(card);
            observer.observe(card);
        });
    }

    const categoryLinks = document.querySelectorAll('.category-list a');
    const sortSelect = document.getElementById('sort-select');

    // 1. Filtering Logic Update
    if (categoryLinks.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // Update UI Active State
                categoryLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Update Header/Breadcrumb UI (Client side instant update)
                const filterValue = link.getAttribute('data-filter');
                const breadcrumbCat = document.getElementById('current-category-breadcrumb');
                if (breadcrumbCat) breadcrumbCat.textContent = link.innerText;

                const categoryView = document.getElementById('category-detail-view');
                const contentHeader = document.querySelector('.content-header');

                if (filterValue === 'all') {
                    if (categoryView) categoryView.classList.add('hidden');
                    if (contentHeader) contentHeader.style.display = 'flex';
                } else {
                    if (categoryView) {
                        categoryView.classList.remove('hidden');
                        const headerTitle = document.getElementById('cat-header-title');
                        // Allow UI to update text based on selection
                        if (headerTitle) headerTitle.textContent = link.innerText;
                    }
                    if (contentHeader) contentHeader.style.display = 'none';
                }

                // Trigger Fetch
                renderProducts();
            });
        });
    }

    // 2. Sorting Logic Update
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            renderProducts();
        });
    }

    // 3. Product Interaction Logic
    // Left empty as we handle click inline or via other listeners

    // 4. Search Logic
    const searchInput = document.getElementById('product-search');
    if (searchInput) {
        let timeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                renderProducts();
            }, 500); // 500ms debounce
        });
    }

    // 5. Contact Form Handler (Preserved)
    const ctaForm = document.querySelector('.cta-form');
    if (ctaForm) {
        ctaForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = ctaForm.querySelector('button');
            const input = ctaForm.querySelector('input');
            const originalText = btn.textContent;

            btn.textContent = 'Sending...';
            btn.disabled = true;

            // Send to Backend
            try {
                const res = await fetch('http://localhost:3001/api/inquiries', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: input.value, name: 'Guest', message: 'Newsletter Signup' })
                });
                if (!res.ok) throw new Error('API Error');
            } catch (err) {
                console.error(err);
                // Continue to show success for UX even if backend fails (dev mode)
            }

            setTimeout(() => {
                btn.textContent = 'Sent!';
                btn.style.backgroundColor = '#22c55e'; // Success green
                input.value = '';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                }, 3000);
            }, 500);
        });
    }

    // Initial Render
    renderProducts();


    // 6. Hero Image Slider
    // 6. Dynamic Hero Slider
    const heroImg = document.querySelector('.hero-visual img'); // Note: index.html was updated to have <a><img>? No, check index.html again.
    // Index.html has:
    // <div class="hero-visual">
    //    <a href="./Assets/Intro.jpg"></a> 
    // Wait, the original code had <a href...></a> but style.css implies it might just be the background or I missed the img tag?
    // Let's check index.html line 67: <a href="./Assets/Intro.jpg"></a>. It seems there is no IMG tag there?
    // But script.js line 320 says: const heroImg = document.querySelector('.hero-visual img');
    // If the original script.js found it, it must be there.
    // Ah, style.css line 806 has .hero-img but where is it used?
    // Checking index.html again... 
    // Line 87: <img src="./Assets/intro 2.jpg" ... > inside .glass-panel. 
    // Line 67 seems to be a link. 
    // I will target the existing logic's selector.

    const banners = JSON.parse(localStorage.getItem('medico_banners') || '[]');

    // If no banners in local storage, use default (this shouldn't happen if admin visited)
    // We will assume data exists or fallback safely.

    if (banners.length > 0) {
        // Update Title/Subtitle based on first banner
        const titlePrefix = document.querySelector('[data-i18n="hero_title_prefix"]');
        const titleSuffix = document.querySelector('[data-i18n="hero_title_suffix"]');
        // We only have one title field in admin, maybe split it? or just set h1 text.
        // For simplicity, we won't change the H1 text dynamically as it wasn't strictly requested to be per-slide, 
        // but "Manage homepage banners (upload new images, change text overlays)" was requested.
        // So I should try to update text too.

        const heroH1 = document.querySelector('.hero-text h1');
        const heroP = document.querySelector('.hero-text p');
        const heroImg = document.querySelector('.glass-panel img'); // Target the image inside glass panel

        let currentBannerIndex = 0;

        function updateHero(index) {
            const banner = banners[index];
            if (!banner) return;

            // Fade out
            if (heroImg) heroImg.style.opacity = '0';

            setTimeout(() => {
                if (heroImg && banner.image) heroImg.src = banner.image;

                // Update text if provided
                if (banner.title && heroH1) {
                    // Simple replacement
                    heroH1.innerHTML = `< span class="gradient-text" > ${ banner.title }</span > `;
                }
                if (banner.subtitle && heroP) {
                    heroP.textContent = banner.subtitle;
                }

                if (heroImg) heroImg.style.opacity = '1';
            }, 500);
        }

        // Initial Set
        updateHero(0);

        // Rotation
        if (banners.length > 1) {
            setInterval(() => {
                currentBannerIndex = (currentBannerIndex + 1) % banners.length;
                updateHero(currentBannerIndex);
            }, 5000);
        }
    }

    // 7. Render News
    const newsGrid = document.getElementById('news-grid');
    if (newsGrid) {
        const news = JSON.parse(localStorage.getItem('medico_news') || '[]');
        if (news.length === 0) {
            newsGrid.innerHTML = '<p style="grid-column:1/-1; text-align:center;">No recent news.</p>';
        } else {
            newsGrid.innerHTML = news.map(n => `
            < div class="news-card" >
                    <div class="news-img">
                        ${n.image ? `<img src="${n.image}" alt="${n.title}">` : '<div style="width:100%;height:100%;background:#f1f5f9;"></div>'}
                    </div>
                    <div class="news-content">
                        <span class="news-date">${n.date}</span>
                        <h3>${n.title}</h3>
                        <p>${n.content}</p>
                        <button class="action-btn read-more" onclick="openArticle(${n.id})" style="background:none; border:none; padding:0; font-family:inherit; cursor:pointer;">
                            Read Article <i class="ph ph-arrow-right"></i>
                        </button>
                    </div>
                </div >
            `).join('');
        }
    }

    // 8. Render New Arrivals (Sidebar)
    const newArrivalsList = document.getElementById('new-arrivals-list');
    if (newArrivalsList) {
        const products = JSON.parse(localStorage.getItem('medico_products') || '[]');
        // Get last 3 products (assuming pushed to end)
        const newProducts = products.slice(-3).reverse();

        newArrivalsList.innerHTML = newProducts.map(p => {
            let imgContent;
            if (p.image && p.image.length > 5) {
                imgContent = `< img src = "${p.image}" style = "display:block; width:100%; height:100%; object-fit:cover;" > `;
            } else {
                const iconMap = {
                    'medical': 'ph-scan',
                    'stomatology': 'ph-tooth',
                    'surgery': 'ph-scissors',
                    'laboratory': 'ph-dna',
                    'other': 'ph-bed'
                };
                const icon = iconMap[p.category] || 'ph-package';
                imgContent = `< i class="ph-duotone ${icon}" ></i > `;
            }

            const hasImage = p.image && p.image.length > 5;
            const imgContainerStyle = hasImage ? 'padding:0; overflow:hidden; display:block; margin: -1.5rem -1.5rem 1.5rem -1.5rem; border-radius: var(--radius-md) var(--radius-md) 0 0; height: 250px;' : '';

            return `
            < div class="new-arrival-item product-card catalog-card" >
                    <div class="card-image-placeholder" style="${imgContainerStyle}">
                        ${imgContent}
                    </div>
                    <div class="card-body">
                        <h3>${p.name}</h3>
                        ${p.model ? `<p class="model">Model: ${p.model}</p>` : ''}
                        <p class="desc">${p.description || ''}</p>
                        <div class="card-actions">
                            <span class="badge-outline">${p.categoryDisplay || p.category || 'Product'}</span>
                            <a href="detail.html?id=${p.id}" class="btn-icon" title="View Details"><i class="ph ph-arrow-right"></i></a>
                        </div>
                    </div>
                </div >
            `;
        }).join('');

        if (newProducts.length === 0) newArrivalsList.innerHTML = '<p style="text-align:center; padding:2rem 0; color:var(--text-secondary);">No new products.</p>';
    }

    // 9. Render Page Content (About/Contact)
    const content = JSON.parse(localStorage.getItem('medico_content') || '{}');
    if (content.about) {
        // About section was removed from index.html, so we skip rendering it here to avoid errors.
        // But if IDs remain, we can keep it safe.
        const aboutTitle = document.getElementById('about-title');
        const aboutDesc = document.getElementById('about-desc-container');
        if (aboutTitle && content.about.title) aboutTitle.textContent = content.about.title;
        if (aboutDesc && content.about.desc) aboutDesc.innerHTML = `< p > ${ content.about.desc }</p > `;
    }
    if (content.contact) {
        const phone = document.getElementById('contact-phone');
        const email = document.getElementById('contact-email');

        if (phone && content.contact.phone) phone.innerHTML = `< i class="ph-fill ph-phone" ></i > ${ content.contact.phone } `;
        if (email && content.contact.email) email.innerHTML = `< i class="ph-fill ph-envelope" ></i > ${ content.contact.email } `;
    }
});

// Helper to open Article
function openArticle(id) {
    const news = JSON.parse(localStorage.getItem('medico_news') || '[]');
    const article = news.find(n => n.id === id);
    if (!article) return;

    const modalBody = document.getElementById('article-modal-body');
    const img = article.image ? `< img src = "${article.image}" class="article-header-img" > ` : '';

    modalBody.innerHTML = `
        ${ img }
        <span class="article-date">${article.date}</span>
        <h2 style="font-size: 2rem; margin-bottom: 1.5rem; line-height: 1.2;">${article.title}</h2>
        <div class="article-body">${article.content}</div>
        `;

    document.getElementById('articleModal').classList.add('open');
}

// Global scope for onclick
window.openArticle = openArticle;
