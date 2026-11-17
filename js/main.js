/* ==========================================================================
   DR. OSCAR CRUZ — SITIO WEB OFICIAL DE PRODUCCIÓN
   VANILLA JAVASCRIPT: INTERACTIVE LOGIC & CONTROLLERS
   ========================================================================== */

const WHATSAPP_URL = "https://wa.me/573103363291";

// Clinical Before/After Cases Data (Local Production Assets)
const CLINICAL_CASES = {
    1: {
        before: "assets/img/caso_01_antes.jpg",
        after: "assets/img/caso_01_despues.jpg"
    },
    2: {
        before: "assets/img/caso_02_antes.jpg",
        after: "assets/img/caso_02_despues.jpg"
    },
    3: {
        before: "assets/img/caso_03_antes.jpg",
        after: "assets/img/caso_03_despues.jpg"
    }
};

// Quiz State
const quizAnswers = {
    q1: '',
    q2: '',
    q3: ''
};

// Set Current Year
const currentYearEl = document.getElementById('currentYear');
if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
}

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    if (window.scrollY > 40) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });

// Mobile Drawer Toggle, Close Button, Escape Key & Body Scroll Lock
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
const mobileBackdrop = document.getElementById('mobileBackdrop');
const drawerCloseBtn = document.getElementById('drawerClose');

function toggleDrawer() {
    if (!mobileDrawer) return;
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
        closeDrawer();
    } else {
        mobileDrawer.classList.add('open');
        if (mobileBackdrop) mobileBackdrop.classList.add('open');
        if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
        mobileDrawer.setAttribute('aria-hidden', 'false');
    }
}

function closeDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('open');
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
}

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleDrawer);
}
if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeDrawer);
}
if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
        closeDrawer();
        if (hamburgerBtn) hamburgerBtn.focus();
    }
});

if (mobileDrawer) {
    new MutationObserver(function () {
        const open = mobileDrawer.classList.contains('open');
        document.body.style.overflow = open ? 'hidden' : '';
        if (open && drawerCloseBtn) drawerCloseBtn.focus();
    }).observe(mobileDrawer, { attributes: true, attributeFilter: ['class'] });
}

// Treatment Tabs Switcher (V8 Editorial Showcase)
function switchTreatmentTab(tabKey) {
    document.querySelectorAll('.tab-btn, .tr8-tab').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    const activeBtn = document.getElementById('tab-' + tabKey);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.setAttribute('aria-selected', 'true');
    }

    document.querySelectorAll('.treatment-tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    const activePane = document.getElementById('pane-' + tabKey);
    if (activePane) {
        activePane.classList.add('active');
    }
}

// Before/After Comparison Drag Slider (Full-Surface Touch & Mouse Support)
const compViewer = document.getElementById('compViewer');
const compBeforeLayer = document.getElementById('compBeforeLayer');
const sliderDivider = document.getElementById('sliderDivider');
const sliderHandle = document.getElementById('sliderHandle');
let isDragging = false;

function updateSliderPosition(xPercent) {
    if (!compBeforeLayer || !sliderDivider || !sliderHandle) return;
    const bounded = Math.max(0, Math.min(100, xPercent));
    compBeforeLayer.style.width = '100%';
    compBeforeLayer.style.clipPath = `inset(0 ${100 - bounded}% 0 0)`;
    compBeforeLayer.style.webkitClipPath = `inset(0 ${100 - bounded}% 0 0)`;
    sliderDivider.style.left = bounded + '%';
    sliderHandle.style.left = bounded + '%';
    sliderHandle.setAttribute('aria-valuenow', Math.round(bounded));
}

function handlePointerMove(e) {
    if (!isDragging || !compViewer) return;
    const rect = compViewer.getBoundingClientRect();
    const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : undefined);
    if (clientX === undefined) return;
    const xOffset = clientX - rect.left;
    const xPercent = (xOffset / rect.width) * 100;
    updateSliderPosition(xPercent);
}

if (compViewer && sliderHandle) {
    // Mouse events across entire viewer and handle
    compViewer.addEventListener('mousedown', (e) => {
        isDragging = true;
        handlePointerMove(e);
    });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', handlePointerMove);

    // Touch events across entire viewer and handle so mobile users can slide from anywhere on the photo
    compViewer.addEventListener('touchstart', (e) => {
        isDragging = true;
        handlePointerMove(e);
    }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; }, { passive: true });
    window.addEventListener('touchcancel', () => { isDragging = false; }, { passive: true });
    compViewer.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Keyboard accessibility
    sliderHandle.addEventListener('keydown', (e) => {
        const current = parseFloat(sliderHandle.getAttribute('aria-valuenow')) || 50;
        if (e.key === 'ArrowLeft') {
            updateSliderPosition(current - 5);
            e.preventDefault();
        } else if (e.key === 'ArrowRight') {
            updateSliderPosition(current + 5);
            e.preventDefault();
        }
    });
}

// Initialize Comparison Slider at 50%
updateSliderPosition(50);
window.addEventListener('load', () => updateSliderPosition(50));

function switchClinicalCase(caseId) {
    const data = CLINICAL_CASES[caseId];
    if (!data) return;
    const beforeImg = document.getElementById('baBeforeImg');
    const afterImg = document.getElementById('baAfterImg');
    if (beforeImg) beforeImg.src = data.before;
    if (afterImg) afterImg.src = data.after;

    [1, 2, 3].forEach(id => {
        const btn = document.getElementById('caseBtn' + id);
        if (btn) {
            btn.classList.toggle('active', caseId === id);
            btn.setAttribute('aria-selected', caseId === id ? 'true' : 'false');
        }
    });
    updateSliderPosition(50);
}

// ==========================================================================
// QUIET LUXURY INTRO PRELOADER CONTROLLER
// ==========================================================================
function initPreloader() {
    const preloader = document.getElementById('sitePreloader');
    if (!preloader) return;

    // Minimum display time for luxury reveal: 950ms, maximum failsafe: 2200ms
    const startTime = Date.now();
    const minDisplayTime = 950;

    function hidePreloader() {
        const elapsed = Date.now() - startTime;
        const delay = Math.max(0, minDisplayTime - elapsed);

        setTimeout(() => {
            preloader.classList.add('preloader-hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 900);
        }, delay);
    }

    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        window.addEventListener('load', hidePreloader);
        setTimeout(hidePreloader, 2200);
    }
}
initPreloader();

// Video Reels Sound Controller & Viewport-Aware Continuous Playback
function toggleReelSound(videoId, btn) {
    const targetVid = document.getElementById(videoId);
    if (!targetVid) return;

    // Mute all other videos first so audio doesn't overlap
    document.querySelectorAll('.reel-video-wrap video').forEach(v => {
        if (v.id !== videoId) {
            v.muted = true;
        }
    });
    document.querySelectorAll('.reel-audio-fab, .reel-sound-btn').forEach(b => {
        if (b !== btn) {
            b.classList.remove('unmuted');
            b.setAttribute('aria-label', 'Activar sonido');
            b.setAttribute('title', 'Activar sonido');
        }
    });

    if (targetVid.muted) {
        targetVid.muted = false;
        targetVid.play().catch(() => {});
        btn.classList.add('unmuted');
        btn.setAttribute('aria-label', 'Silenciar sonido');
        btn.setAttribute('title', 'Silenciar sonido');
    } else {
        targetVid.muted = true;
        btn.classList.remove('unmuted');
        btn.setAttribute('aria-label', 'Activar sonido');
        btn.setAttribute('title', 'Activar sonido');
    }
}

// Carousel Navigation for Luxury Reels Track
function scrollReels(direction) {
    const grid = document.getElementById('reelsGrid');
    if (!grid) return;
    const cards = grid.querySelectorAll('.reel-card');
    if (!cards.length) return;
    
    // Amount to scroll: card width + gap
    const cardWidth = cards[0].offsetWidth;
    const gap = 20;
    const scrollAmount = (cardWidth + gap) * direction;
    grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

function jumpToReel(index) {
    const grid = document.getElementById('reelsGrid');
    if (!grid) return;
    const targetCard = grid.querySelector(`.reel-card[data-index="${index}"]`);
    if (!targetCard) return;
    
    const targetLeft = targetCard.offsetLeft - grid.offsetLeft;
    grid.scrollTo({ left: targetLeft, behavior: 'smooth' });
}

// Sync active indicator dot with scroll position
const reelsGrid = document.getElementById('reelsGrid');
if (reelsGrid) {
    let scrollTimeout;
    reelsGrid.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const cards = reelsGrid.querySelectorAll('.reel-card');
            const dots = document.querySelectorAll('.reel-dot');
            if (!cards.length || !dots.length) return;
            
            const gridCenter = reelsGrid.scrollLeft + reelsGrid.offsetWidth / 2;
            let closestIndex = 0;
            let minDistance = Infinity;
            
            cards.forEach((card, idx) => {
                const cardCenter = (card.offsetLeft - reelsGrid.offsetLeft) + card.offsetWidth / 2;
                const dist = Math.abs(gridCenter - cardCenter);
                if (dist < minDistance) {
                    minDistance = dist;
                    closestIndex = idx;
                }
            });
            
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === closestIndex);
            });
        }, 60);
    }, { passive: true });
}

// ==========================================================================
// CONTINUOUS GALLERY VIDEO PLAYBACK & CLICK-TO-UNMUTE
// ==========================================================================
function startAllReelVideos() {
    const reelVideos = document.querySelectorAll('.reel-video-wrap video');
    reelVideos.forEach(v => {
        v.muted = true;
        v.playsInline = true;
        v.loop = true;
        v.setAttribute('autoplay', '');
        v.setAttribute('playsinline', '');
        v.setAttribute('muted', '');
        v.setAttribute('loop', '');

        const playPromise = v.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // If browser requires user interaction before autoplaying,
                // activate all videos on the first touch, scroll or click anywhere
                const resumeAll = () => {
                    reelVideos.forEach(vid => vid.play().catch(() => {}));
                    window.removeEventListener('touchstart', resumeAll);
                    window.removeEventListener('scroll', resumeAll);
                    window.removeEventListener('click', resumeAll);
                };
                window.addEventListener('touchstart', resumeAll, { passive: true, once: true });
                window.addEventListener('scroll', resumeAll, { passive: true, once: true });
                window.addEventListener('click', resumeAll, { passive: true, once: true });
            });
        }
    });
}

// Start immediately on DOM ready and window load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startAllReelVideos);
} else {
    startAllReelVideos();
}
window.addEventListener('load', startAllReelVideos);

// Clicking anywhere on the video wrap toggles the sound without stopping the video
document.querySelectorAll('.reel-video-wrap').forEach(wrap => {
    wrap.addEventListener('click', (e) => {
        const video = wrap.querySelector('video');
        const fab = wrap.querySelector('.reel-audio-fab');
        if (video && fab) {
            toggleReelSound(video.id, fab);
        }
    });
});

// Re-ensure continuous playback if browser visibility changes or tab is revisited
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        document.querySelectorAll('.reel-video-wrap video').forEach(v => {
            if (v.paused) v.play().catch(() => {});
        });
    }
});

// ==========================================================================
// SCROLL REVEAL ENTRANCE ANIMATIONS
// ==========================================================================
function initScrollReveal() {
    const revealTargets = document.querySelectorAll('.treatments-section, .cases-section, .reels-section, .process-section, .about-section, .quiz-section, .faqs-section, .contact-section, .instagram-section');
    revealTargets.forEach(el => el.classList.add('reveal-on-scroll'));

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealTargets.forEach(el => observer.observe(el));
    } else {
        revealTargets.forEach(el => el.classList.add('is-revealed'));
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
    initScrollReveal();
}

// Interactive Questionnaire Logic (3-Step Mini Assistant)
function answerQuiz(stepNumber, answerText) {
    if (stepNumber === 1) {
        quizAnswers.q1 = answerText;
        document.getElementById('quiz-step-1').classList.remove('active');
        document.getElementById('quiz-step-2').classList.add('active');
        document.getElementById('quizProgressFill').style.width = '66.66%';
    } else if (stepNumber === 2) {
        quizAnswers.q2 = answerText;
        document.getElementById('quiz-step-2').classList.remove('active');
        document.getElementById('quiz-step-3').classList.add('active');
        document.getElementById('quizProgressFill').style.width = '100%';
    } else if (stepNumber === 3) {
        quizAnswers.q3 = answerText;
        document.getElementById('quiz-step-3').classList.remove('active');
        document.getElementById('quiz-step-result').classList.add('active');
        renderQuizResult();
    }
}

function renderQuizResult() {
    const summaryQ1 = document.getElementById('summaryQ1');
    const summaryQ2 = document.getElementById('summaryQ2');
    const summaryQ3 = document.getElementById('summaryQ3');
    const titleEl = document.getElementById('quizRecommendationTitle');
    const descEl = document.getElementById('quizRecommendationDesc');
    const ctaBtn = document.getElementById('quizWhatsAppCta');

    summaryQ1.innerHTML = "• <strong>Objetivo:</strong> " + quizAnswers.q1;
    summaryQ2.innerHTML = "• <strong>Historial:</strong> " + quizAnswers.q2;
    summaryQ3.innerHTML = "• <strong>Plazo:</strong> " + quizAnswers.q3;

    let recTitle = "Lentes Cerámicos • Armonización Estética";
    let recDesc = "Su interés apunta a optimizar proporciones y coloración. Recomendamos una cita de valoración con diseño digital preliminar para estudiar su armonía facial.";
    
    if (quizAnswers.q1.includes("Desgaste") || quizAnswers.q1.includes("fracturas")) {
        recTitle = "Rehabilitación Oral • Restauración Funcional";
        recDesc = "Para casos con desgaste o ausencia de piezas, la prioridad médica es recuperar la altura de mordida y estabilidad masticatoria antes de la fase estética final.";
    }

    titleEl.textContent = recTitle;
    descEl.textContent = recDesc;

    const waMsg = "Hola Dr. Oscar Cruz, completé el test en su página web:\n" +
                  "- Objetivo: " + quizAnswers.q1 + "\n" +
                  "- Estado actual: " + quizAnswers.q2 + "\n" +
                  "- Tiempo previsto: " + quizAnswers.q3 + "\n" +
                  "Quisiera agendar una cita de valoración personalizada.";

    ctaBtn.href = WHATSAPP_URL + "?text=" + encodeURIComponent(waMsg);
}

function restartQuiz() {
    quizAnswers.q1 = '';
    quizAnswers.q2 = '';
    quizAnswers.q3 = '';
    document.getElementById('quiz-step-result').classList.remove('active');
    document.getElementById('quiz-step-1').classList.add('active');
    document.getElementById('quizProgressFill').style.width = '33.33%';
}

// FAQ Accordion Toggle
function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('active');
        const t = el.querySelector('.faq-trigger-btn');
        if (t) t.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
    }
}

// Contact Valuation Form Handler (Direct WhatsApp +57 310 336 3291)
function handleFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const service = document.getElementById('serviceInterest').value;
    const notes = document.getElementById('clientNotes').value.trim();

    if (!name || !phone) {
        alert(currentLang === 'en' ? "Please complete all required fields." : "Por favor complete los campos obligatorios.");
        return;
    }

    let message = currentLang === 'en'
        ? "Hello Dr. Oscar Cruz, I would like to schedule a consultation:\n• Name: " + name + "\n• Phone: " + phone + "\n• Interest: " + service
        : "Hola Dr. Oscar Cruz, solicito agendar una valoración:\n• Nombre: " + name + "\n• Teléfono: " + phone + "\n• Interés: " + service;
    
    if (notes) {
        message += (currentLang === 'en' ? "\n• Inquiry: " : "\n• Consulta: ") + notes;
    }

    const targetUrl = WHATSAPP_URL + "?text=" + encodeURIComponent(message);
    window.open(targetUrl, '_blank', 'noopener');
}

/* ==========================================================================
   BILINGUAL SYSTEM (ESPAÑOL / ENGLISH) — INSTANT FULL-PAGE TRANSLATION
   ========================================================================== */
let currentLang = 'es';

const EN_TRANSLATIONS = [
    // 1. Header & Mobile Drawer
    ['.main-nav a[href="#tratamientos"]', 'Treatments'],
    ['.main-nav a[href="#casos"]', 'Clinical Cases'],
    ['.main-nav a[href="#proceso"]', 'Process'],
    ['.main-nav a[href="#doctor"]', 'The Doctor'],
    ['.main-nav a[href="#preguntas"]', 'FAQ'],
    ['.header-cta .btn-gold-primary', 'Book Consultation'],
    ['.mobile-menu-links a[href="#tratamientos"]', 'Treatments'],
    ['.mobile-menu-links a[href="#casos"]', 'Clinical Cases'],
    ['.mobile-menu-links a[href="#proceso"]', 'Process'],
    ['.mobile-menu-links a[href="#doctor"]', 'About the Doctor'],
    ['.mobile-menu-links a[href="#preguntas"]', 'FAQ'],
    ['.mobile-menu-links a[href="#contacto"]', 'Contact &amp; Location'],
    ['.drawer-footer-cta .btn-gold-primary', 'Book via WhatsApp'],

    // 2. Hero Section
    ['.hero-content .kicker-gold', 'Precision Dentistry &bull; Bucaramanga'],
    ['.hero-headline', 'Your smile, crafted with <span class="text-gold-gradient">precision</span>.'],
    ['.hero-sub', 'Ceramic veneers and oral rehabilitation in Bucaramanga, Colombia.'],
    ['.hero-cta-group .btn-gold-primary', 'Book Consultation <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'],
    ['.hero-cta-group .btn-gold-outline', 'Explore Treatments'],
    ['.avail-chip span:last-child', 'Open Schedule &bull; WhatsApp 310 336 3291'],
    ['.cert-role', 'Oral Rehabilitation'],
    ['.cert-meta', '+10 years of experience &bull; Bucaramanga'],
    ['.ribbon-services', '<span>Ceramic Veneers</span><i aria-hidden="true"></i><span>Smile Design</span><i aria-hidden="true"></i><span>Oral Rehabilitation</span>'],
    ['.hero-ribbon > p', '+10 years of experience &bull; Bucaramanga, Colombia'],

    // 3. Treatments Section
    ['#tratamientos .section-header-centered .kicker-gold', 'Specialized Focus'],
    ['#tratamientos .section-header-centered .section-title-editorial', 'Precision Treatments'],
    ['#tratamientos .section-header-centered .section-subtitle-editorial', 'Three clinical disciplines designed to restore proportion, luminance, and masticatory function with minimal invasion.'],
    ['#tab-veneers .tr8-tab-label', 'Ceramic Veneers'],
    ['#tab-smile .tr8-tab-label', 'Smile Design'],
    ['#tab-rehab .tr8-tab-label', 'Oral Rehabilitation'],

    // Treatment Pane 1: Veneers
    ['#pane-veneers .tr8-badge-text', 'Real Case &bull; Ceramic Veneers'],
    ['#pane-veneers .tr8-eyebrow', 'Specialty 01 / 03'],
    ['#pane-veneers .tr8-pill-tag', 'Minimal Invasion'],
    ['#pane-veneers .tr8-title', 'Porcelain <em>Ceramic Veneers</em>'],
    ['#pane-veneers .tr8-lead', 'Ultra-thin ceramic laminates custom-crafted tooth by tooth to perfect shape, color, and surface texture while preserving healthy natural enamel.'],
    ['#pane-veneers .tr8-feature-row:nth-child(1) .tr8-feature-content', '<h4>Maximum Biological Preservation</h4><p>Minimally invasive technique guided by magnification, respecting healthy tooth structure.</p>'],
    ['#pane-veneers .tr8-feature-row:nth-child(2) .tr8-feature-content', '<h4>Unalterable Luminance &amp; Luster</h4><p>Layered feldspathic porcelain with natural fluorescence that remains stable over time.</p>'],
    ['#pane-veneers .tr8-feature-row:nth-child(3) .tr8-feature-content', '<h4>Prior Mockup &amp; Adhesive Protocol</h4><p>Digital preview in your mouth before microscopic precision bonding.</p>'],
    ['#pane-veneers .tr8-cta-btn span', 'Inquire About Ceramic Veneers'],

    // Treatment Pane 2: Smile Design
    ['#pane-smile .tr8-badge-text', 'Real Case &bull; Smile Design'],
    ['#pane-smile .tr8-eyebrow', 'Specialty 02 / 03'],
    ['#pane-smile .tr8-pill-tag', 'Facial Analysis'],
    ['#pane-smile .tr8-title', 'Bespoke <em>Smile Design</em>'],
    ['#pane-smile .tr8-lead', 'Harmonic study of your facial features, lip dynamics, and gingival frame to project a unique smile that reflects your identity naturally.'],
    ['#pane-smile .tr8-feature-row:nth-child(1) .tr8-feature-content', '<h4>Facial Architecture &amp; Proportion</h4><p>Every curve and inclination is designed in harmony with your smile line, facial features, and skin tone.</p>'],
    ['#pane-smile .tr8-feature-row:nth-child(2) .tr8-feature-content', '<h4>Zero Flat or Artificial Look</h4><p>We reject opaque white blocks; we craft living micro-textures and translucent incisal edges.</p>'],
    ['.tr8-diamond-tag', 'Exclusivity &bull; Dental Micro-Jewelry'],
    ['.tr8-diamond-info strong', 'Certified Diamond Inlay'],
    ['.tr8-diamond-info p', 'Haute dental jewelry detail integrated with microscopic precision onto the ceramic veneer.'],
    ['#pane-smile .tr8-cta-btn span', 'Inquire About Smile Design'],

    // Treatment Pane 3: Oral Rehabilitation
    ['#pane-rehab .tr8-badge-text', 'Real Case &bull; Full Rehabilitation'],
    ['#pane-rehab .tr8-eyebrow', 'Specialty 03 / 03'],
    ['#pane-rehab .tr8-pill-tag', '+10 Years of Track Record'],
    ['#pane-rehab .tr8-title', 'Comprehensive <em>Oral Rehabilitation</em>'],
    ['#pane-rehab .tr8-lead', 'High-complexity functional and aesthetic reconstruction to restore vertical dimension, joint comfort, and chewing strength.'],
    ['#pane-rehab .tr8-feature-row:nth-child(1) .tr8-feature-content', '<h4>Complex Case Resolution</h4><p>Indicated for severe bruxism, tooth loss, ill-fitting prosthetics, or bite collapse.</p>'],
    ['#pane-rehab .tr8-feature-row:nth-child(2) .tr8-feature-content', '<h4>TMJ &amp; Occlusal Balance</h4><p>Restoring proper occlusal contacts to protect muscles and joints long-term.</p>'],
    ['#pane-rehab .tr8-feature-row:nth-child(3) .tr8-feature-content', '<h4>Metal-Free Structures</h4><p>High-strength zirconia and ceramics with superior biocompatibility and micrometric fit.</p>'],
    ['#pane-rehab .tr8-cta-btn span', 'Inquire About Oral Rehabilitation'],

    // 4. Clinical Cases Section
    ['#casos > .container > .section-header-centered .kicker-gold', 'Real Results'],
    ['#casos > .container > .section-header-centered .section-title-editorial', 'Clinical Transformations'],
    ['#casos > .container > .section-header-centered .section-subtitle-editorial', 'Slide the comparator to observe the real change in proportion, color, and texture achieved through ceramic veneers and oral rehabilitation.'],
    ['#caseBtn1 .case-switch-label', 'Rehab &amp; Veneers'],
    ['#caseBtn2 .case-switch-label', 'Design &amp; Lip Harmony'],
    ['#caseBtn3 .case-switch-label', 'Symmetry &amp; Enamel'],
    ['.ba-tag-before', 'Initial Condition'],
    ['.ba-tag-after', 'After &bull; Ceramic Veneers'],
    ['.case-drag-hint span', 'Slide to compare the clinical transformation'],
    ['.macro-trio-grid .macro-card:nth-child(1) figcaption', '<span>Micro-texture</span><strong>Naturalness and surface luster</strong>'],
    ['.macro-trio-grid .macro-card:nth-child(2) figcaption', '<span>Dental harmony</span><strong>Natural proportion and anatomy</strong>'],
    ['.macro-trio-grid .macro-card:nth-child(3) figcaption', '<span>Translucency</span><strong>Enamel and microscopic texture</strong>'],

    // 5. Celebrity Spotlight
    ['.celebrity-spotlight-block .kicker-gold', 'Public Figures &amp; Artists'],
    ['.celebrity-spotlight-block .section-title-editorial', 'Smiles on Stage &amp; Runway'],
    ['.celebrity-spotlight-block .section-subtitle-editorial', 'Leading figures in national modeling and music trust their oral health and aesthetics to Dr. Oscar Cruz.'],
    ['.celebrity-card:nth-child(1) .badge-verified span:last-child', 'Colombian Model &bull; +300K on Instagram'],
    ['.celebrity-card:nth-child(1) .celebrity-kicker', 'Public Figure &bull; Runway &amp; Social Media'],
    ['.celebrity-card:nth-child(1) .celebrity-handle', '@nataliaheaven &bull; +300K followers'],
    ['.celebrity-card:nth-child(1) .celebrity-quote', '&ldquo;I wanted a design that could withstand studio lights and close-up video without ever looking artificial. Dr. Oscar Cruz crafted my ceramic veneers with a micro-diamond inlay that reflects my identity with total naturalness and zero pain.&rdquo;'],
    ['.celebrity-card:nth-child(1) .celebrity-spec-item:nth-child(1)', '<span class="spec-label">Treatment</span><span class="spec-val">Ceramic Veneers &bull; Dental Micro-Jewelry</span>'],
    ['.celebrity-card:nth-child(1) .celebrity-spec-item:nth-child(2)', '<span class="spec-label">Exclusive Detail</span><span class="spec-val">Certified Natural Diamond</span>'],
    ['.celebrity-card:nth-child(2) .badge-verified span:last-child', 'Morales Dynasty &bull; Vallenato Artist'],
    ['.celebrity-card:nth-child(2) .celebrity-kicker', 'Son of Miguel Morales &bull; Brother of Kaleth Morales'],
    ['.celebrity-card:nth-child(2) .celebrity-handle', 'Singer &amp; icon of Colombian Vallenato music'],
    ['.celebrity-card:nth-child(2) .celebrity-quote', '&ldquo;For an artist on stage, your smile is everything in front of the audience and TV cameras. The precision, human warmth, and quality of Dr. Oscar Cruz&rsquo;s zirconia veneers gave me the confidence and strength my musical career demands.&rdquo;'],
    ['.celebrity-card:nth-child(2) .celebrity-spec-item:nth-child(1)', '<span class="spec-label">Treatment</span><span class="spec-val">Zirconia Ceramic Veneers</span>'],
    ['.celebrity-card:nth-child(2) .celebrity-spec-item:nth-child(2)', '<span class="spec-label">Focus</span><span class="spec-val">High Stage Resistance &bull; Harmony</span>'],

    // 6. Video Reels Showcase
    ['#experiencias .kicker-gold', 'Live Stories &amp; Detail'],
    ['#experiencias .section-title-editorial', 'Patients &amp; Cases in Motion'],
    ['#experiencias .section-subtitle-editorial', 'Six cinematic perspectives: first-person testimonials from public figures, artists, and patients, alongside the microscopic precision of dental ceramics.'],
    ['.reel-card[data-index="0"] .reel-badge span:last-child', 'Morales Dynasty'],
    ['.reel-card[data-index="0"] .reel-tag-spec', 'Morales Dynasty'],
    ['.reel-card[data-index="0"] .reel-caption-desc', 'Son of Miguel Morales and brother of Kaleth Morales. Transformation and stage-ready smile.'],
    ['.reel-card[data-index="1"] .reel-badge span:last-child', '+300K on Instagram'],
    ['.reel-card[data-index="1"] .reel-tag-spec', 'Veneers + Diamond'],
    ['.reel-card[data-index="1"] .reel-caption-desc', 'Colombian model with over 300K followers. Certified dental micro-jewelry.'],
    ['.reel-card[data-index="2"] .reel-badge span:last-child', 'Real Testimonial'],
    ['.reel-card[data-index="2"] .reel-caption-meta strong', 'Experience &amp; Comfort'],
    ['.reel-card[data-index="2"] .reel-tag-spec', '100% Ceramic &bull; Pain-Free'],
    ['.reel-card[data-index="2"] .reel-caption-desc', 'Absolute comfort and immediate biological adaptation with zero discomfort.'],
    ['.reel-card[data-index="3"] .reel-badge span:last-child', 'Success Story'],
    ['.reel-card[data-index="3"] .reel-caption-meta strong', 'Real Testimonial'],
    ['.reel-card[data-index="3"] .reel-tag-spec', 'Rehab &amp; Aesthetics'],
    ['.reel-card[data-index="3"] .reel-caption-desc', '&laquo;After searching everywhere online, I found Dr. Oscar Cruz&raquo;. Safe and life-changing change.'],
    ['.reel-card[data-index="4"] .reel-badge span:last-child', 'Real Clinical Case'],
    ['.reel-card[data-index="4"] .reel-caption-meta strong', 'Male Clinical Case'],
    ['.reel-card[data-index="4"] .reel-tag-spec', 'Zirconia Veneers'],
    ['.reel-card[data-index="4"] .reel-caption-desc', 'High-definition design and strength for a masculine, harmonious dental anatomy.'],
    ['.reel-card[data-index="5"] .reel-badge span:last-child', 'Full Arch'],
    ['.reel-card[data-index="5"] .reel-caption-meta strong', 'Occlusal Precision'],
    ['.reel-card[data-index="5"] .reel-tag-spec', 'Oral Rehabilitation'],
    ['.reel-card[data-index="5"] .reel-caption-desc', 'Micrometric fit and optimal gingival health across both dental arches.'],
    ['.case-legal-notice', '<strong>Ethical &amp; Privacy Notice:</strong> Real clinical and testimonial material from the official profile @dr.oscarcruz published with patient authorization (Law 1581 of 2012). Results depend on the initial biological condition of each case.'],

    // 7. Process Section
    ['#proceso .kicker-gold', 'Care Pathway'],
    ['#proceso .section-title-editorial', 'Your Step-by-Step Process'],
    ['#proceso .section-subtitle-editorial', 'A methodical and transparent protocol designed to guarantee predictability, comfort, and high-fidelity results.'],
    ['.timeline-phase-card:nth-child(1) .phase-body-box', '<span class="phase-number-tag">Step 01 &bull; Consultation</span><h4 class="phase-title">Assessment &amp; Diagnosis</h4><p class="phase-desc">Comprehensive clinical evaluation, high-resolution photography, and analysis of individual expectations.</p>'],
    ['.timeline-phase-card:nth-child(2) .phase-body-box', '<span class="phase-number-tag">Step 02 &bull; Planning</span><h4 class="phase-title">Digital Smile Design</h4><p class="phase-desc">Dental proportion planning and preliminary aesthetic trial (mockup) in the mouth before any definitive procedure.</p>'],
    ['.timeline-phase-card:nth-child(3) .phase-body-box', '<span class="phase-number-tag">Step 03 &bull; Laboratory</span><h4 class="phase-title">Micro-Preparation</h4><p class="phase-desc">Millimetric preparation and artisanal crafting of ceramic veneers with our precision laboratory.</p>'],
    ['.timeline-phase-card:nth-child(4) .phase-body-box', '<span class="phase-number-tag">Step 04 &bull; Delivery</span><h4 class="phase-title">Final Bonding</h4><p class="phase-desc">Adhesive fixation under absolute isolation, marginal polishing, and micrometric bite adjustment.</p>'],
    ['.timeline-phase-card:nth-child(5) .phase-body-box', '<span class="phase-number-tag">Step 05 &bull; Aftercare</span><h4 class="phase-title">Follow-Up &amp; Warranty</h4><p class="phase-desc">Occlusion review, personalized hygiene protocol, and periodic preventive check-up schedule.</p>'],
    ['#proceso .btn-gold-primary', 'Start my consultation pathway &rarr;'],

    // 8. Quiz Section
    ['#asistente .section-header-centered .kicker-gold', 'Clinical Mini-Assistant'],
    ['#asistente .section-header-centered .section-title-editorial', 'Which Option Might Be Right for Me?'],
    ['#asistente .section-header-centered .section-subtitle-editorial', 'Answer 3 quick questions to receive an initial orientation on the treatment best suited to your case.'],
    ['#quiz-step-1 .quiz-step-indicator', 'Question 1 of 3'],
    ['#quiz-step-1 .quiz-question-title', 'What aspect would you primarily like to improve in your smile?'],
    ['#quiz-step-1 .quiz-option-btn:nth-child(1) span', 'A. Tooth shape, uneven edges, or size'],
    ['#quiz-step-1 .quiz-option-btn:nth-child(2) span', 'B. Permanent color or stains that do not lighten'],
    ['#quiz-step-1 .quiz-option-btn:nth-child(3) span', 'C. Severe wear, fractures, or missing teeth'],
    ['#quiz-step-1 .quiz-option-btn:nth-child(4) span', 'D. Comprehensive, natural harmonization of the entire smile'],
    ['#quiz-step-2 .quiz-step-indicator', 'Question 2 of 3'],
    ['#quiz-step-2 .quiz-question-title', 'Have you had relevant previous dental treatments?'],
    ['#quiz-step-2 .quiz-option-btn:nth-child(1) span', 'A. I previously completed orthodontics'],
    ['#quiz-step-2 .quiz-option-btn:nth-child(2) span', 'B. I have old veneers or bonding I wish to renew'],
    ['#quiz-step-2 .quiz-option-btn:nth-child(3) span', 'C. Natural teeth with no prior cosmetic treatments'],
    ['#quiz-step-3 .quiz-step-indicator', 'Question 3 of 3'],
    ['#quiz-step-3 .quiz-question-title', 'When would you like to begin your treatment?'],
    ['#quiz-step-3 .quiz-option-btn:nth-child(1) span', 'A. As soon as possible (within this month)'],
    ['#quiz-step-3 .quiz-option-btn:nth-child(2) span', 'B. Within the next 1 to 3 months'],
    ['#quiz-step-3 .quiz-option-btn:nth-child(3) span', 'C. I am gathering information and quotes to plan ahead'],
    ['#quiz-step-result .kicker-gold', 'Preliminary Orientation'],
    ['#quizSummaryBox strong', 'Summary of your answers:'],
    ['#quizWhatsAppCta', 'Send my answers via WhatsApp &rarr;'],
    ['#quiz-step-result button', 'Retake questionnaire'],
    ['.quiz-disclaimer', '* Important Notice: For informational orientation only. Does not constitute a medical diagnosis. Only Dr. Oscar Cruz can determine the appropriate clinical treatment after an in-person evaluation.'],

    // 9. About the Doctor Section
    ['#doctor .kicker-gold', 'The Doctor'],
    ['.ab2-numeral', '<b>10</b><span>+ years</span>'],
    ['.ab2-quote', '&ldquo;A well-designed smile goes unnoticed: <em>it feels natural</em>.&rdquo;'],
    ['.ab2-lead', 'Over ten years dedicated to oral rehabilitation and smile design in Bucaramanga.'],
    ['.ab2-text', 'Every case begins by listening. Before thinking about ceramics or shades, Dr. Cruz studies function, facial harmony, and the health of each tooth, proposing only what each patient truly needs.'],
    ['.ab2-pillars li:nth-child(1) div', '<h4>Listen First</h4><p>Every plan is born from an individual assessment, never repeated formulas.</p>'],
    ['.ab2-pillars li:nth-child(2) div', '<h4>Minimal Intervention</h4><p>Preserving the maximum amount of healthy natural tooth structure.</p>'],
    ['.ab2-pillars li:nth-child(3) div', '<h4>Precision &amp; Laboratory</h4><p>Coordinated work with master ceramists to achieve natural shape, shade, and texture.</p>'],

    // 10. Instagram Community
    ['#comunidad .kicker-gold', 'Community'],
    ['#comunidad .section-title-editorial', 'Follow Us on Instagram'],
    ['#comunidad .section-subtitle-editorial', 'Clinical cases, laboratory craftsmanship, and daily practice directly from the doctor&rsquo;s official profile.'],
    ['.ig-bio', 'Smile Design &bull; Oral Rehabilitation'],
    ['.ig-follow', 'Follow'],
    ['.ig-stat:nth-child(1)', '<strong>+10</strong><span>years of experience</span>'],
    ['.ig-stat:nth-child(2)', '<strong>21.4K</strong><span>followers</span>'],

    // 11. FAQs Section
    ['#preguntas .kicker-gold', 'Patient Information'],
    ['#preguntas .section-title-editorial', 'Frequently Asked Questions'],
    ['#preguntas .section-subtitle-editorial', 'Medical clarity regarding procedures, treatment timelines, and recommended care.'],
    ['.faq-item:nth-child(1) .faq-trigger-btn span', 'What exactly are porcelain ceramic veneers?'],
    ['.faq-item:nth-child(1) .faq-content-panel', 'They are ultra-thin, high-strength porcelain laminates permanently bonded to the visible surface of the tooth. They correct shape, resistant discoloration, and proportions without unnecessarily altering healthy tooth structure.'],
    ['.faq-item:nth-child(2) .faq-trigger-btn span', 'How does the initial consultation work?'],
    ['.faq-item:nth-child(2) .faq-content-panel', 'During the initial assessment, Dr. Oscar Cruz performs a thorough clinical examination, takes diagnostic photographs, and listens to your aesthetic and functional goals to create a tailored treatment plan.'],
    ['.faq-item:nth-child(3) .faq-trigger-btn span', 'How long does it take to complete a smile design?'],
    ['.faq-item:nth-child(3) .faq-content-panel', 'Each case is strictly individual. Generally, a ceramic veneer treatment requires 3 to 4 appointments over 2 to 3 weeks, allowing proper planning, aesthetic trials, and master ceramic laboratory work.'],
    ['.faq-item:nth-child(4) .faq-trigger-btn span', 'Do the treatments wear down the natural tooth?'],
    ['.faq-item:nth-child(4) .faq-content-panel', 'Contemporary dentistry is guided by minimal invasion. When teeth are well aligned, enamel preparation is micrometric (typically 0.3 to 0.5 mm), and in specific cases can be non-invasive. Preserving dental vitality is always the priority.'],
    ['.faq-item:nth-child(5) .faq-trigger-btn span', 'What special care do ceramic veneers require?'],
    ['.faq-item:nth-child(5) .faq-content-panel', 'They are maintained with rigorous oral hygiene: regular brushing, daily flossing, and professional cleanings every 6 months. For patients with night bruxism, a protective nightguard is prescribed.'],
    ['.faq-item:nth-child(6) .faq-trigger-btn span', 'Do you treat patients visiting from other cities or abroad?'],
    ['.faq-item:nth-child(6) .faq-content-panel', 'Yes. We offer a pre-consultation protocol via WhatsApp where we evaluate preliminary photos to schedule a concentrated appointment itinerary during your stay in Bucaramanga.'],

    // 12. Contact & Location Section
    ['#contacto .kicker-gold', 'Private Consultation'],
    ['#contacto .section-title-editorial', 'Book Your Assessment in Bucaramanga'],
    ['#contacto .section-subtitle-editorial', 'Personalized care by appointment only. Message us directly or complete your request to coordinate your schedule.'],
    ['.ct9-maps-link', 'Open in Maps &nearr;'],
    ['.ct9-detail-item:nth-child(1) .ct9-detail-content', '<span class="ct9-detail-kicker">Practice Location &bull; Cabecera del Llano</span><h4>Clínica Odontológica Bianco</h4><p>Cra. 34 # 52-25, Cabecera del Llano, Bucaramanga, Santander, Colombia.</p>'],
    ['.ct9-detail-item:nth-child(2) .ct9-detail-content', '<span class="ct9-detail-kicker">Consultation Hours</span><h4>By Scheduled Appointment</h4><p>Monday to Friday: 8:00 a.m. – 12:00 m. &amp; 2:00 p.m. – 6:00 p.m.<br>Saturdays: By prior arrangement.</p>'],
    ['.ct9-detail-item:nth-child(3) .ct9-detail-content', '<span class="ct9-detail-kicker">National &amp; International Patients</span><h4>Priority Travel Scheduling</h4><p>Preliminary photo assessment via WhatsApp and intensive scheduling for patients visiting from other cities or abroad.</p>'],
    ['.ct9-strip-label', 'Direct Concierge Line &bull; +57 310 336 3291'],
    ['.ct9-direct-strip strong', 'Immediate response via WhatsApp'],
    ['.ct9-wa-pill', 'Message Now &rarr;'],
    ['.ct9-form-eyebrow', 'Appointment Request'],
    ['.ct9-form-card h3', 'Request an Assessment'],
    ['.ct9-form-card > p', 'Complete your details and WhatsApp will open with your structured request for priority attention.'],
    ['label[for="clientName"]', 'Full Name *'],
    ['label[for="clientPhone"]', 'Phone / WhatsApp *'],
    ['label[for="serviceInterest"]', 'Treatment of Interest *'],
    ['#serviceInterest option:nth-child(1)', 'Porcelain Ceramic Veneers'],
    ['#serviceInterest option:nth-child(2)', 'Bespoke Smile Design'],
    ['#serviceInterest option:nth-child(3)', 'Comprehensive Oral Rehabilitation'],
    ['#serviceInterest option:nth-child(4)', 'General Assessment &amp; Diagnosis'],
    ['label[for="clientNotes"]', 'Brief details or inquiry (optional)'],
    ['label[for="dataConsent"]', 'I accept the processing of my contact data to manage my appointment request in accordance with Colombian Law 1581 of 2012.'],
    ['.btn-submit-form', 'Send Request via WhatsApp &rarr;'],

    // 13. Footer
    ['.footer-brand-p', 'Dental practice dedicated to high-precision aesthetic dentistry, ceramic veneers, and oral rehabilitation in Bucaramanga, Colombia.'],
    ['.footer-grid > div:nth-child(2) .footer-col-title', 'Navigation &amp; Contact'],
    ['.footer-links-list li:nth-child(1) a', 'Ceramic Veneers'],
    ['.footer-links-list li:nth-child(2) a', 'Clinical Cases'],
    ['.footer-links-list li:nth-child(3) a', 'Consultation Pathway'],
    ['.footer-links-list li:nth-child(4) a', 'About the Doctor'],
    ['.footer-links-list li:nth-child(5) a', 'FAQ'],
    ['.footer-grid > div:nth-child(3) .footer-col-title', 'Ethics &amp; Legal'],
    ['.footer-grid > div:nth-child(3) p:nth-of-type(1)', 'The information published on this website is strictly for educational and oral health awareness purposes. It does not constitute a guarantee of outcome nor replace an in-person clinical evaluation.'],
    ['.footer-grid > div:nth-child(3) .footer-links-list li:nth-child(1) a', 'Terms &amp; Conditions &bull; Clinical Disclaimer'],
    ['.footer-grid > div:nth-child(3) .footer-links-list li:nth-child(2) a', 'Privacy Policy &bull; Data Protection'],
    ['.footer-grid > div:nth-child(3) p:nth-of-type(2)', 'Clínica Odontológica Bianco &bull; Cra. 34 # 52-25, Cabecera &bull; Bucaramanga'],
    ['.footer-legal-bar-links a:nth-child(1)', 'Terms &amp; Conditions'],
    ['.footer-legal-bar-links a:nth-child(3)', 'Privacy Policy'],
    ['.footer-bottom-bar > div:last-child', 'Developed by <span class="dpc-credit">DPC &bull; Web Design &amp; Development</span>']
];

function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    // Update all toggle buttons (Header & Mobile Drawer)
    document.querySelectorAll('.lang-toggle-btn .lang-code').forEach(el => {
        el.classList.toggle('active', el.getAttribute('data-lang') === lang);
    });

    // Translate mapped elements
    EN_TRANSLATIONS.forEach(([selector, enHtml]) => {
        const el = document.querySelector(selector);
        if (!el) return;
        if (el.dataset.esHtml === undefined) {
            el.dataset.esHtml = el.innerHTML;
        }
        el.innerHTML = (lang === 'en') ? enHtml : el.dataset.esHtml;
    });

    // Translate Instagram grid overlays (multiple elements)
    document.querySelectorAll('.ig-post-overlay span').forEach(el => {
        if (el.dataset.esHtml === undefined) {
            el.dataset.esHtml = el.innerHTML;
        }
        el.innerHTML = (lang === 'en') ? 'View on Instagram &nearr;' : el.dataset.esHtml;
    });

    try {
        localStorage.setItem('oc_lang', lang);
    } catch (e) {}
}

function toggleLanguage(e) {
    if (e && e.target && e.target.getAttribute) {
        const clickedLang = e.target.getAttribute('data-lang');
        if (clickedLang && clickedLang !== currentLang) {
            applyLanguage(clickedLang);
            return;
        }
    }
    const nextLang = currentLang === 'es' ? 'en' : 'es';
    applyLanguage(nextLang);
}
window.toggleLanguage = toggleLanguage;
window.applyLanguage = applyLanguage;

// Restore saved language preference if any
try {
    const savedLang = localStorage.getItem('oc_lang');
    if (savedLang === 'en') {
        applyLanguage('en');
    }
} catch (e) {}

