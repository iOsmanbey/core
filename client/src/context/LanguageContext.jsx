import React, { createContext, useState, useContext, useEffect } from 'react';

const translations = {
    en: {
        nav_products: 'Products',
        nav_news: 'News',
        nav_admin: 'Admin',
        nav_quote: 'Request Quote',
        hero_badge: 'MEDICAL & DENTAL SYSTEMS',
        hero_h1_prefix: 'Empowering Healthcare with',
        hero_h1_suffix: 'Next-Gen Technology',
        hero_description: 'We are the bridge between world-class medical manufacturers and healthcare providers.',
        hero_btn_explore: 'Explore Catalog',
        hero_btn_network: 'Our Network',
        stat_uptime: 'Service Reliability',
        stat_countries: 'Countries Served',
        catalog_badge: 'OUR CATALOG',
        catalog_title_prefix: 'World-Class',
        catalog_title_suffix: 'Medical Solutions',
        catalog_subtitle: 'Comprehensive medical solutions for efficient patient care.',
        search_placeholder: 'Search products...',
        products_featured: 'Featured Products',
        products_all: 'All Products',
        products_medical: 'Medical Technologies',
        products_stomatology: 'Stomatology Solutions',
        products_surgery: 'Surgery Technologies',
        products_laboratory: 'Laboratory Equipment',
        products_other: 'Other Equipment',
        products_sort: 'Sort by:',
        products_latest: 'Latest',
        products_name_az: 'Name (A-Z)',
        products_name_za: 'Name (Z-A)',
        products_view_details: 'View Details',
        sidebar_categories: 'Categories',
        sidebar_new: 'New Arrivals',
        sidebar_no_new: 'No new products.',
        news_title: 'Latest News & Insights',
        news_subtitle: 'Stay updated with the latest trends in medical technology.',
        cta_title: 'Ready to Upgrade Your Medical Infrastructure?',
        cta_desc: 'Get in touch with our specialists for a catalog consultation and personalized quote.',
        btn_get_started: 'Get Started',
        btn_read_article: 'Read Article',
        footer_tagline: 'Supplying excellence in healthcare technology since 2010.',
        footer_company: 'Company',
        footer_support: 'Support',
        footer_connect: 'Connect',
        showcase_title_1: 'AI-POWERED DIAGNOSTIC HUB',
        showcase_title_2: 'PORTABLE ULTRASOUND SCANNER',
        modal_in_stock: 'In Stock',
        modal_description: 'Description',
        modal_btn_quote: 'Request Quote',
        modal_btn_contact: 'Contact Sales',
        modal_quote_alert: 'Quote requested!'
    },
    ru: {
        nav_products: 'Продукты',
        nav_news: 'Новости',
        nav_admin: 'Админ',
        nav_quote: 'Запрос котировки',
        hero_badge: 'МЕДИЦИНСКИЕ И СТОМАТОЛОГИЧЕСКИЕ СИСТЕМЫ',
        hero_h1_prefix: 'Эффективное здравоохранение с',
        hero_h1_suffix: 'Технологиями будущего',
        hero_description: 'Мы являемся мостом между производителями медицинского оборудования мирового уровня и поставщиками медицинских услуг.',
        hero_btn_explore: 'Посмотреть каталог',
        hero_btn_network: 'Наша сеть',
        stat_uptime: 'Надёжность работы',
        stat_countries: 'Обслуживаемых стран',
        catalog_badge: 'НАШ КАТАЛОГ',
        catalog_title_prefix: 'Мировые',
        catalog_title_suffix: 'медицинские решения',
        catalog_subtitle: 'Комплексные медицинские решения для эффективного ухода за пациентами.',
        search_placeholder: 'Поиск товаров...',
        products_featured: 'Рекомендуемые продукты',
        products_all: 'Все продукты',
        products_medical: 'Медицинские технологии',
        products_stomatology: 'Стоматологические решения',
        products_surgery: 'Хирургические технологии',
        products_laboratory: 'Лабораторное оборудование',
        products_other: 'Прочее оборудование',
        products_sort: 'Сортировать:',
        products_latest: 'Новинки',
        products_name_az: 'Имя (А-Я)',
        products_name_za: 'Имя (Я-А)',
        products_view_details: 'Подробнее',
        sidebar_categories: 'Категории',
        sidebar_new: 'Новинки',
        sidebar_no_new: 'Нет новинок.',
        news_title: 'Последние новости и аналитика',
        news_subtitle: 'Будьте в курсе последних тенденций в области медицинских технологий.',
        cta_title: 'Готовы модернизировать свою медицинскую инфраструктуру?',
        cta_desc: 'Свяжитесь с нашими специалистами для консультации по каталогу и персонализированного предложения.',
        btn_get_started: 'Начать',
        btn_read_article: 'Читать статью',
        footer_tagline: 'Лидер в области медицинских и стоматологических технологий с 2010 года.',
        footer_company: 'Компания',
        footer_support: 'Поддержка',
        footer_connect: 'Связаться',
        showcase_title_1: 'ДИАГНОСТИЧЕСКИЙ ЦЕНТР С ИИ',
        showcase_title_2: 'ПОРТАТИВНЫЙ УЗИ СКАНЕР',
        modal_in_stock: 'В наличии',
        modal_description: 'Описание',
        modal_btn_quote: 'Запрос цены',
        modal_btn_contact: 'Связаться с отделом продаж',
        modal_quote_alert: 'Запрос цены отправлен!'
    },
    uz: {
        nav_products: 'Mahsulotlar',
        nav_news: 'Yangiliklar',
        nav_admin: 'Admin',
        nav_quote: 'Narx so\'rash',
        hero_badge: 'TIBBIY VA STOMATOLOGIK TIZIMLAR',
        hero_h1_prefix: 'Sog\'liqni saqlashni',
        hero_h1_suffix: 'kelajak texnologiyalari bilan',
        hero_description: 'Biz jahon darajasidagi tibbiy ishlab chiqaruvchilar va sog\'liqni saqlash provayderlari o\'rtasidagi ko\'prikdirmiz.',
        hero_btn_explore: 'Katalogni ko\'rish',
        hero_btn_network: 'Bizning tarmoq',
        stat_uptime: 'Ishonchli xizmat',
        stat_countries: 'Xizmat ko\'rsatilgan mamlakatlar',
        catalog_badge: 'BIZNING KATALOG',
        catalog_title_prefix: 'Jahon darajasidagi',
        catalog_title_suffix: 'tibbiy yechimlar',
        catalog_subtitle: 'Bemorlarni samarali parvarish qilish uchun keng qamrovli tibbiy yechimlar.',
        search_placeholder: 'Mahsulotlarni qidirish...',
        products_featured: 'Saralangan mahsulotlar',
        products_all: 'Barcha mahsulotlar',
        products_medical: 'Tibbiy texnologiyalar',
        products_stomatology: 'Stomatologiya yechimlari',
        products_surgery: 'Jarrohlik texnologiyalari',
        products_laboratory: 'Laboratoriya uskunalari',
        products_other: 'Boshqa uskunalar',
        products_sort: 'Saralash:',
        products_latest: 'Yangilari',
        products_name_az: 'Nom (A-Z)',
        products_name_za: 'Nom (Z-A)',
        products_view_details: 'Batafsil',
        sidebar_categories: 'Toifalar',
        sidebar_new: 'Yangiliklar',
        sidebar_no_new: 'Yangi mahsulotlar yoq.',
        news_title: 'So\'nggi yangiliklar va tahlillar',
        news_subtitle: 'Tibbiy texnologiyalardagi so\'nggi tendentsiyalardan xabardor bo\'ling.',
        cta_title: 'Tibbiy infratuzilmangizni yangilashga tayyormisiz?',
        cta_desc: 'Katalog bo\'yicha maslahat va shaxsiy taklif uchun mutaxassislarimiz bilan bog\'laning.',
        btn_get_started: 'Boshlash',
        btn_read_article: 'Maqolani o\'qish',
        footer_tagline: '2010 yildan beri tibbiyot va stomatologiya texnologiyalari sohasida yetakchi.',
        footer_company: 'Kompaniya',
        footer_support: 'Qo\'llab-quvvatlash',
        footer_connect: 'Bog\'lanish',
        showcase_title_1: 'AI DIAGNOSTIKA MARKAZI',
        showcase_title_2: 'PORTATIV ULTRATOVUSH SKANER',
        modal_in_stock: 'Mavjud',
        modal_description: 'Tavsif',
        modal_btn_quote: 'Narx so\'rash',
        modal_btn_contact: 'Sotuvlar bo\'limi',
        modal_quote_alert: 'Narx so\'rovi yuborildi!'
    }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem('medico_lang') || 'en');

    useEffect(() => {
        localStorage.setItem('medico_lang', language);
        localStorage.setItem('language', language);
    }, [language]);

    const t = (key) => {
        if (!translations[language] || !translations[language][key]) {
            return translations['en'][key] || key;
        }
        return translations[language][key];
    };

    const toggleLanguage = () => {
        const langs = ['en', 'ru', 'uz'];
        const next = langs[(langs.indexOf(language) + 1) % langs.length];
        setLanguage(next);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
