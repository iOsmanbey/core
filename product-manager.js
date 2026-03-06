// Product Manager - Handles Admin Modals & Logic

// Global variables (shared with script.js)
// Note: productsDataCache is declared globally in a separate scope or accessed from window


// Embedded default products (works without server)
const DEFAULT_PRODUCTS = [
    {
        "id": "prod-001",
        "model": "DR-X500",
        "category": "medical",
        "image": "./Assets/xray-system.png",
        "isNew": true,
        "name": {
            "en": "Digital X-Ray System",
            "ru": "Цифровая рентгеновская система",
            "uz": "Raqamli rentgen tizimi"
        },
        "description": {
            "en": "High-resolution digital radiography with wireless flat panel detector",
            "ru": "Цифровая рентгенография высокого разрешения с беспроводным плоскопанельным детектором",
            "uz": "Simsiz tekis panel detektori bilan yuqori aniqlikdagi raqamli rentgenografiya"
        },
        "price": "Contact for Quote",
        "features": {
            "en": ["Wireless flat panel detector", "High-resolution imaging up to 4K", "Real-time preview", "Patient dose optimization", "Mobile C-arm support"],
            "ru": ["Беспроводный плоскопанельный детектор", "Высокое разрешение до 4K", "Предпросмотр в реальном времени", "Оптимизация дозы для пациентов", "Поддержка мобильного С-дуга"],
            "uz": ["Simsiz tekis panel detektori", "4K gacha yuqori aniqlik", "Real vaqtli ko'rishtirib chiqish", "Bemor doza optimallashtirishi", "Mobil S-qol qo'llab-quvvatlash"]
        },
        "specifications": {
            "en": {
                "Detector Size": "43 x 43 cm",
                "Resolution": "4K (4096 x 4096 pixels)",
                "Dose Rate": "Low dose DR technology",
                "Connectivity": "Wireless connectivity",
                "Power": "220V, 50-60 Hz",
                "Weight": "45 kg"
            },
            "ru": {
                "Размер детектора": "43 x 43 см",
                "Разрешение": "4K (4096 x 4096 пиксели)",
                "Скорость дозы": "Низкая доза DR технология",
                "Подключение": "Беспроводное подключение",
                "Питание": "220V, 50-60 Гц",
                "Вес": "45 кг"
            },
            "uz": {
                "Detektori hajmi": "43 x 43 sm",
                "Aniqlik": "4K (4096 x 4096 piksel)",
                "Doza tezligi": "Kam doza DR texnologiyasi",
                "Ulanish": "Simsiz ulanish",
                "Quvvat": "220V, 50-60 Gc",
                "Og'irlik": "45 kg"
            }
        }
    },
    {
        "id": "prod-002",
        "model": "CT-1000",
        "category": "medical",
        "image": "./Assets/ct-scanner.png",
        "isNew": false,
        "name": {
            "en": "CT Scanner",
            "ru": "Компьютерный томограф",
            "uz": "Kompyuter tomografiya"
        },
        "description": {
            "en": "64-slice computed tomography scanner with advanced 3D imaging",
            "ru": "64-срезовый компьютерный томограф с продвинутой 3D визуализацией",
            "uz": "Zamonaviy 3D tasvir bilan 64 qatlamli kompyuter tomografiya"
        },
        "price": "Contact for Quote",
        "features": {
            "en": ["64-slice acquisition", "3D reconstruction", "Fast scanning", "Low radiation", "Cardiac imaging"],
            "ru": ["64-срезовое сканирование", "3D реконструкция", "Быстрое сканирование", "Низкая радиация", "Кардиальная визуализация"],
            "uz": ["64 qatlamli talab", "3D qayta tuzish", "Tez skanerlash", "Kam nurlanish", "Yurakni tasvirlashtirish"]
        },
        "specifications": {
            "en": {
                "Slices": "64 slices",
                "Rotation Time": "0.4 seconds",
                "Matrix": "512 x 512",
                "Dose": "Ultra-low dose",
                "Power": "220V, 50-60 Hz",
                "Warranty": "3 years"
            },
            "ru": {
                "Срезы": "64 среза",
                "Время ротации": "0.4 сек",
                "Матрица": "512 x 512",
                "Доза": "Ультранизкая доза",
                "Питание": "220V, 50-60 Гц",
                "Гарантия": "3 года"
            },
            "uz": {
                "Qatlamlar": "64 qatlam",
                "Aylanish vaqti": "0.4 sek",
                "Matrisa": "512 x 512",
                "Doza": "Ultra-kam doza",
                "Quvvat": "220V, 50-60 Gc",
                "Kafolatname": "3 yil"
            }
        }
    },
    {
        "id": "prod-003",
        "model": "MRI-3000",
        "category": "medical",
        "image": "./Assets/mri-scanner.png",
        "isNew": true,
        "name": {
            "en": "MRI Scanner",
            "ru": "МРТ сканер",
            "uz": "MRT skaneri"
        },
        "description": {
            "en": "1.5T MRI system with advanced neuroimaging capabilities",
            "ru": "МРТ система 1.5 Тесла с продвинутыми нейровизуализационными возможностями",
            "uz": "Zamonaviy neyroimaging imkoniyatlari bilan 1.5T MRT tizimi"
        },
        "price": "Contact for Quote",
        "features": {
            "en": ["1.5T magnetic field", "Fast imaging", "Quiet operation", "Brain imaging", "Whole body imaging"],
            "ru": ["Магнитное поле 1.5T", "Быстрое сканирование", "Тихая работа", "Визуализация мозга", "Визуализация всего тела"],
            "uz": ["1.5T magnit maydoni", "Tez tasvir", "Sokin ishlash", "Miya tasvirlanishi", "Butun tana tasvirlanishi"]
        },
        "specifications": {
            "en": {
                "Field Strength": "1.5 Tesla",
                "Bore Diameter": "70 cm",
                "Gradient Strength": "45 mT/m",
                "RF Frequency": "63.86 MHz",
                "Power": "220V, 50-60 Hz",
                "Noise Level": "85 dB"
            },
            "ru": {
                "Напряженность поля": "1.5 Тесла",
                "Диаметр отверстия": "70 см",
                "Напряженность градиента": "45 мT/м",
                "ЧВ частота": "63.86 МГц",
                "Питание": "220V, 50-60 Гц",
                "Уровень шума": "85 дБ"
            },
            "uz": {
                "Maydon kuchi": "1.5 Tesla",
                "Teshik diametri": "70 sm",
                "Gradient kuchi": "45 mT/m",
                "RF chastotasi": "63.86 MHz",
                "Quvvat": "220V, 50-60 Gc",
                "Shovqin darajasi": "85 dB"
            }
        }
    },
    {
        "id": "prod-004",
        "model": "ECG-500",
        "category": "medical",
        "image": "./Assets/ecg-machine.png",
        "isNew": false,
        "name": {
            "en": "ECG Machine",
            "ru": "ЭКГ аппарат",
            "uz": "EKG apparati"
        },
        "description": {
            "en": "12-lead electrocardiograph with digital analysis",
            "ru": "12-канальный электрокардиограф с цифровым анализом",
            "uz": "Raqamli tahlil bilan 12 kanalli elektrokardiograf"
        },
        "price": 3500,
        "features": {
            "en": ["12-lead recording", "Digital analysis", "Portable design", "USB connectivity", "Report printing"],
            "ru": ["12-канальная запись", "Цифровой анализ", "Портативный дизайн", "USB подключение", "Печать отчетов"],
            "uz": ["12-kanalli yozuv", "Raqamli tahlil", "Portativ dizayn", "USB ulanish", "Hisobot chop etish"]
        },
        "specifications": {
            "en": {
                "Leads": "12 leads",
                "Paper Speed": "25/50 mm/s",
                "Recording Time": "10 seconds",
                "Display": "7-inch color LCD",
                "Weight": "2.5 kg",
                "Battery": "Lithium-ion 4 hours"
            },
            "ru": {
                "Отводы": "12 отводов",
                "Скорость бумаги": "25/50 мм/с",
                "Время записи": "10 сек",
                "Дисплей": "7-дюймовый цветной ЖК",
                "Вес": "2.5 кг",
                "Аккумулятор": "Li-ion 4 часа"
            },
            "uz": {
                "Otklon": "12 otklon",
                "Qog'oz tezligi": "25/50 mm/s",
                "Yozuv vaqti": "10 sek",
                "Displey": "7 dyuymli rangli LCD",
                "Og'irlik": "2.5 kg",
                "Batareya": "Li-ion 4 soat"
            }
        }
    },
    {
        "id": "prod-005",
        "model": "VS-800",
        "category": "medical",
        "image": "./Assets/vital-monitor.png",
        "isNew": false,
        "name": {
            "en": "Vital Sign Monitor",
            "ru": "Монитор пациента",
            "uz": "Bemor monitori"
        },
        "description": {
            "en": "Multiparameter patient monitor for continuous vital signs monitoring",
            "ru": "Мультипараметрический монитор для непрерывного мониторинга жизненных показателей",
            "uz": "Doimiy hayoti ko'rsatkichlarni kuzatish uchun ko'p parametr bemor monitori"
        },
        "price": 1200,
        "features": {
            "en": ["ECG monitoring", "SpO2 monitoring", "Blood pressure", "Temperature", "Trends display"],
            "ru": ["Мониторинг ЭКГ", "Мониторинг SpO2", "Кровяное давление", "Температура", "Отображение трендов"],
            "uz": ["EKG kuzatish", "SpO2 kuzatish", "Qon bosimi", "Temperatura", "Trend ko'rinish"]
        },
        "specifications": {
            "en": {
                "Parameters": "ECG, SpO2, NIBP, Temp",
                "Display": "10.4-inch color LCD",
                "Record Time": "160 hours",
                "Battery": "Lithium 6 hours",
                "Alarm": "Audio/Visual",
                "Weight": "3.2 kg"
            },
            "ru": {
                "Параметры": "ЭКГ, SpO2, NIBP, Temp",
                "Дисплей": "10.4-дюймовый цветной ЖК",
                "Время записи": "160 часов",
                "Аккумулятор": "Li 6 часов",
                "Сигнал": "Аудио/Видео",
                "Вес": "3.2 кг"
            },
            "uz": {
                "Parametrlar": "EKG, SpO2, NIBP, Temp",
                "Displey": "10.4-dyuymli rangli LCD",
                "Yozuv vaqti": "160 soat",
                "Batareya": "Li 6 soat",
                "Sигнал": "Audio/Video",
                "Og'irlik": "3.2 kg"
            }
        }
    },
    {
        "id": "prod-006",
        "model": "SR-2000",
        "category": "surgery",
        "image": "./Assets/surgical-robot.png",
        "isNew": true,
        "name": {
            "en": "Surgical Robot Arm",
            "ru": "Хирургический робот",
            "uz": "Jarrohlik roboti"
        },
        "description": {
            "en": "Precision robotic surgery assistance with haptic feedback",
            "ru": "Роботизированная хирургия с тактильной обратной связью",
            "uz": "Gaptik qayta aloqa bilan robot jarrohlik yordami"
        },
        "price": "Contact for Quote",
        "features": {
            "en": ["Haptic feedback", "High precision", "Tremor filtering", "3D vision", "Scalable motion"],
            "ru": ["Тактильная обратная связь", "Высокая точность", "Фильтрация тремора", "3D видение", "Масштабируемое движение"],
            "uz": ["Gaptik qayta aloqa", "Yuqori aniqlik", "Tremor filtrlash", "3D ko'rish", "Masshtabli harakat"]
        },
        "specifications": {
            "en": {
                "Degrees": "7 degrees of freedom",
                "Precision": "±0.5 mm",
                "Reach": "800 mm",
                "Payload": "10 kg",
                "Response": "<50 ms",
                "Input": "Controller with joystick"
            },
            "ru": {
                "Степени": "7 степеней свободы",
                "Точность": "±0.5 мм",
                "Радиус": "800 мм",
                "Грузоподъемность": "10 кг",
                "Отклик": "<50 мс",
                "Ввод": "Контроллер с джойстиком"
            },
            "uz": {
                "Darajalar": "7 erkinlik darajasi",
                "Aniqlik": "±0.5 mm",
                "Erishish": "800 mm",
                "Yuk": "10 kg",
                "Javob": "<50 ms",
                "Kiritma": "Joystik bilan kontroller"
            }
        }
    },
    {
        "id": "prod-007",
        "model": "HA-300",
        "category": "laboratory",
        "image": "./Assets/hematology-analyzer.png",
        "isNew": false,
        "name": {
            "en": "Hematology Analyzer",
            "ru": "Гематологический анализатор",
            "uz": "Gematologiya analizatori"
        },
        "description": {
            "en": "Automated hematology analyzer for complete blood count analysis",
            "ru": "Автоматический гематологический анализатор для полного анализа крови",
            "uz": "To'liq qon tahlili uchun avtomatik gematologiya analizatori"
        },
        "price": 8500,
        "features": {
            "en": ["CBC analysis", "Fast processing", "High accuracy", "Wireless LAN", "50-sample carousel"],
            "ru": ["Анализ ОАК", "Быстрая обработка", "Высокая точность", "Беспроводная LAN", "Карусель на 50 образцов"],
            "uz": ["CBC tahlili", "Tez qayta ishlash", "Yuqori aniqlik", "Simsiz LAN", "50 namuna karusel"]
        },
        "specifications": {
            "en": {
                "Test Time": "35 seconds",
                "Throughput": "60 samples/hour",
                "Parameters": "19 parameters",
                "Accuracy": "Excellent",
                "Sample": "20 μL whole blood",
                "Size": "600 x 480 x 460 mm"
            },
            "ru": {
                "Время теста": "35 сек",
                "Пропускная способность": "60 образцов/час",
                "Параметры": "19 параметров",
                "Точность": "Отличная",
                "Образец": "20 μL цельной крови",
                "Размер": "600 x 480 x 460 мм"
            },
            "uz": {
                "Sinov vaqti": "35 sek",
                "Propuskanligi": "60 namuna/soat",
                "Parametrlar": "19 parametr",
                "Aniqlik": "A'lo",
                "Namuna": "20 μL butun qon",
                "Hajm": "600 x 480 x 460 mm"
            }
        }
    },
    {
        "id": "prod-008",
        "model": "EB-900",
        "category": "other",
        "image": "./Assets/icu-bed.png",
        "isNew": false,
        "name": {
            "en": "ICU Electric Bed",
            "ru": "Кровать реанимационная",
            "uz": "Reanimatsiya karavoti"
        },
        "description": {
            "en": "Electric hospital bed with advanced patient positioning",
            "ru": "Электрическая больничная кровать с продвинутым позиционированием пациента",
            "uz": "Zamonaviy bemor pozitsionlash bilan elektr shifoxona karavoti"
        },
        "price": 2800,
        "features": {
            "en": ["6 electric motors", "Memory positions", "Weight capacity 300kg", "Trendelenburg function", "CPR position"],
            "ru": ["6 электромоторов", "Памятные позиции", "Грузоподъемность 300 кг", "Функция Тренделенбурга", "Позиция ИПР"],
            "uz": ["6 elektr motorlari", "Eslab qoluvchi pozitsiyalar", "300 kg sig'imi", "Trendelenburg funksiyasi", "CPR pozitsiyasi"]
        },
        "specifications": {
            "en": {
                "Motors": "6 electric motors",
                "Capacity": "300 kg",
                "Length": "2100 mm",
                "Width": "900 mm",
                "Height Range": "500-700 mm",
                "Mattress": "Anti-pressure ulcer"
            },
            "ru": {
                "Моторы": "6 электромоторов",
                "Грузоподъемность": "300 кг",
                "Длина": "2100 мм",
                "Ширина": "900 мм",
                "Высота": "500-700 мм",
                "Матрас": "Противопролежневый"
            },
            "uz": {
                "Motorlar": "6 elektr motorlari",
                "Sig'imi": "300 kg",
                "Uzunligi": "2100 mm",
                "Kengligi": "900 mm",
                "Balandligi": "500-700 mm",
                "Tashah": "Teshiqlarga qarshi"
            }
        }
    },
    {
        "id": "prod-009",
        "model": "IR-50",
        "category": "medical",
        "image": "",
        "isNew": false,
        "name": {
            "en": "Infrared Thermometer",
            "ru": "Инфракрасный термометр",
            "uz": "Infraqizil termometr"
        },
        "description": {
            "en": "Contactless infrared thermometer for rapid temperature measurement",
            "ru": "Бесконтактный инфракрасный термометр для быстрого измерения температуры",
            "uz": "Tezkor haroratliq o'lchash uchun kontaktsiz infraqizil termometr"
        },
        "price": 45,
        "features": {
            "en": ["Non-contact", "Fast reading <1 second", "Memory storage 32 readings", "Fever alarm", "LCD display"],
            "ru": ["Бесконтактный", "Быстрое считывание <1 сек", "Память на 32 показания", "Сигнал лихорадки", "ЖК дисплей"],
            "uz": ["Kontaktsiz", "Tezkor o'qish <1 sek", "32 o'qish xotirasi", "Issiqlik signali", "LCD displey"]
        },
        "specifications": {
            "en": {
                "Range": "32.0-43.0°C",
                "Accuracy": "±0.1°C",
                "Response": "<1 second",
                "Memory": "32 readings",
                "Power": "2 AA batteries",
                "Certification": "CE, FDA"
            },
            "ru": {
                "Диапазон": "32.0-43.0°C",
                "Точность": "±0.1°C",
                "Ответ": "<1 сек",
                "Память": "32 показания",
                "Питание": "2 батареи AA",
                "Сертификат": "CE, FDA"
            },
            "uz": {
                "Oraliq": "32.0-43.0°C",
                "Aniqlik": "±0.1°C",
                "Javob": "<1 sek",
                "Xotira": "32 o'qish",
                "Quvvat": "2 AA batareya",
                "Sertifikat": "CE, FDA"
            }
        }
    },
    {
        "id": "prod-010",
        "model": "DC-PRO",
        "category": "stomatology",
        "image": "",
        "isNew": true,
        "name": {
            "en": "Dental Chair Pro",
            "ru": "Стоматологическое кресло Про",
            "uz": "Stomatologik kreslo Pro"
        },
        "description": {
            "en": "Electric dental chair with LED light and patient comfort features",
            "ru": "Электрическое стоматологическое кресло с LED светом и удобством пациента",
            "uz": "LED yorug'lik va bemor qulayligiga ega elektr stomatologik kreslo"
        },
        "price": 4500,
        "features": {
            "en": ["Electric adjustment", "LED light 6000K", "Foot control", "Patient comfort", "Durable construction"],
            "ru": ["Электрическая регулировка", "LED свет 6000K", "Управление ногой", "Удобство пациента", "Прочная конструкция"],
            "uz": ["Elektr sozlash", "LED yorug'lik 6000K", "Oyoq boshqaruvi", "Bemor qulayligi", "Chidamli konstruksiya"]
        },
        "specifications": {
            "en": {
                "Power": "220V, 50-60 Hz",
                "Max Height": "800 mm",
                "Min Height": "400 mm",
                "LED Light": "6000K 20W",
                "Seat Width": "700 mm",
                "Weight": "150 kg"
            },
            "ru": {
                "Питание": "220V, 50-60 Гц",
                "Макс высота": "800 мм",
                "Мин высота": "400 мм",
                "LED свет": "6000K 20W",
                "Ширина сиденья": "700 мм",
                "Вес": "150 кг"
            },
            "uz": {
                "Quvvat": "220V, 50-60 Gc",
                "Maks balandlik": "800 mm",
                "Min balandlik": "400 mm",
                "LED yorug'lik": "6000K 20W",
                "O'rindiq kengligi": "700 mm",
                "Og'irlik": "150 kg"
            }
        }
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProductData();
    setupModalHandlers();

});

async function loadProductData() {
    try {
        const response = await fetch('./products-data.json');
        if (response.ok) {
            window.productsDataCache = await response.json();
        } else {
            throw new Error('Fetch failed');
        }
    } catch (e) {
        console.warn('Using embedded products in product-manager');
        // Use embedded products
        window.productsDataCache = [...DEFAULT_PRODUCTS];

        // Merge localStorage products
        const localProducts = JSON.parse(localStorage.getItem('medico_products') || '[]');
        localProducts.forEach(lp => {
            if (!window.productsDataCache.find(p => p.id === lp.id)) {
                window.productsDataCache.push(lp);
            }
        });
    }
}

function setupModalHandlers() {
    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function () {
            this.closest('.modal').classList.remove('active');
        });
    });

    // Click outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === this) this.classList.remove('active');
        });
    });
}



// ==========================================
// Product Details Modal
// ==========================================
function openProductDetails(productId) {
    console.log('openProductDetails called with ID:', productId);

    // Get products - use global cache or fallback to DEFAULT_PRODUCTS
    let products = window.productsDataCache;
    if (!products) {
        console.warn('productsDataCache not loaded, using DEFAULT_PRODUCTS');
        products = DEFAULT_PRODUCTS;
    }

    console.log('Available products:', products.length);
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    console.log('Found product:', product.name);

    const modal = document.getElementById('product-details-modal');
    if (!modal) {
        console.error('Modal not found');
        return;
    }

    console.log('Modal found, populating data...');

    // Track current product for the Edit button
    currentViewingProductId = productId;

    const lang = localStorage.getItem('language') || localStorage.getItem('medico_lang') || 'en';

    // Handle image - with fallback for missing/broken images
    const imgEl = document.getElementById('modal-product-image');
    if (imgEl) {
        if (product.image && product.image.length > 5) {
            imgEl.src = product.image;
            imgEl.onerror = () => { imgEl.style.display = 'none'; };
            imgEl.style.display = 'block';
        } else {
            imgEl.style.display = 'none';
        }
    }

    const nameEl = document.getElementById('modal-product-name');
    if (nameEl) nameEl.textContent = getLocalized(product.name, lang);

    const modelEl = document.getElementById('modal-product-model');
    if (modelEl) {
        const tr = typeof translations !== 'undefined' ? (translations[lang] || translations.en) : null;
        const modelLabel = tr ? tr.modal_model : 'Model: ';
        modelEl.textContent = `${modelLabel}${product.model}`;
    }

    const priceEl = document.getElementById('modal-product-price');
    if (priceEl) {
        if (typeof product.price === 'number' && product.price > 0) {
            priceEl.textContent = `$${product.price.toLocaleString()}`;
        } else {
            priceEl.textContent = (typeof product.price === 'string' && product.price) ? product.price : '';
        }
    }
    const descEl = document.getElementById('modal-product-description');
    if (descEl) {
        // Prefer detailed description, fallback to short description
        let descText = '';
        if (product.detailedDescription) {
            descText = getLocalized(product.detailedDescription, lang);
        }
        if (!descText) {
            descText = getLocalized(product.description, lang);
        }
        descEl.textContent = descText;
    }

    // Specs
    const specsTable = document.getElementById('modal-product-specs');
    if (specsTable) {
        let specs = product.specifications && product.specifications[lang] ? product.specifications[lang] : null;
        if (!specs || Object.keys(specs).length === 0) {
            specs = product.specifications && product.specifications['en'] ? product.specifications['en'] : {};
        }
        const entries = Object.entries(specs);
        specsTable.innerHTML = entries.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('');

        // Hide section if empty
        const section = specsTable.closest('.product-section');
        if (section) section.style.display = entries.length > 0 ? 'block' : 'none';
    }

    // Features
    const featuresList = document.getElementById('modal-product-features');
    if (featuresList) {
        let features = product.features && product.features[lang] ? product.features[lang] : null;
        if (!features || features.length === 0) {
            features = product.features && product.features['en'] ? product.features['en'] : [];
        }
        featuresList.innerHTML = features.map(f => `<li>${f}</li>`).join('');

        // Hide section if empty
        const section = featuresList.closest('.product-section');
        if (section) section.style.display = features.length > 0 ? 'block' : 'none';
    }

    modal.classList.add('active');
}

function getLocalized(field, lang) {
    if (typeof field === 'object') return field[lang] || field.en || '';
    return field;
}

// Track the currently viewing product in details modal
let currentViewingProductId = null;

function requestQuote() {
    document.getElementById('product-details-modal').classList.remove('active');
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}



// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    const emailInput = document.getElementById('contact-email-input');
    if (emailInput && emailInput.value) {
        alert(`Thank you! We will contact you at: ${emailInput.value}`);
        emailInput.value = '';
    }
}

window.openProductDetails = openProductDetails;
window.requestQuote = requestQuote;
window.handleContactSubmit = handleContactSubmit;
