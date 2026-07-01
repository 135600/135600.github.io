// ===== 固定文字翻译 =====
const T = {
    nav_about: { zh:'关于', en:'About', ja:'About', ko:'About', ar:'About', de:'About', fr:'About' },
    nav_works: { zh:'作品', en:'Works', ja:'Works', ko:'Works', ar:'Works', de:'Works', fr:'Works' },
    nav_fitness: { zh:'健身', en:'Fitness', ja:'Fitness', ko:'Fitness', ar:'Fitness', de:'Fitness', fr:'Fitness' },
    nav_contact: { zh:'联系', en:'Contact', ja:'Contact', ko:'Contact', ar:'Contact', de:'Contact', fr:'Contact' },
    hero_scroll: { zh:'下滑', en:'Scroll', ja:'Scroll', ko:'Scroll', ar:'Scroll', de:'Scroll', fr:'Scroll' },
    about_title: { zh:'关于<em>我</em>', en:'About <em>Me</em>', ja:'About <em>Me</em>', ko:'About <em>Me</em>', ar:'About <em>Me</em>', de:'About <em>Me</em>', fr:'About <em>Me</em>' },
    works_title: { zh:'作品<em>集</em>', en:'Selected <em>Works</em>', ja:'Selected <em>Works</em>', ko:'Selected <em>Works</em>', ar:'Selected <em>Works</em>', de:'Selected <em>Works</em>', fr:'Selected <em>Works</em>' },
    proj_title: { zh:'项目<em>经历</em>', en:'Project <em>Experience</em>', ja:'Project <em>Experience</em>', ko:'Project <em>Experience</em>', ar:'Project <em>Experience</em>', de:'Project <em>Experience</em>', fr:'Project <em>Experience</em>' },
    fitness_title: { zh:'健身<em>生活</em>', en:'Fitness <em>Lifestyle</em>', ja:'Fitness <em>Lifestyle</em>', ko:'Fitness <em>Lifestyle</em>', ar:'Fitness <em>Lifestyle</em>', de:'Fitness <em>Lifestyle</em>', fr:'Fitness <em>Lifestyle</em>' },
    w6_tag: { zh:'更多作品', en:'More Works', ja:'More Works', ko:'More Works', ar:'More Works', de:'More Works', fr:'More Works' },
    w6_title: { zh:'即将呈现', en:'Coming Soon', ja:'Coming Soon', ko:'Coming Soon', ar:'Coming Soon', de:'Coming Soon', fr:'Coming Soon' },
    w6_desc: { zh:'持续创作中...', en:'Creating...', ja:'Creating...', ko:'Creating...', ar:'Creating...', de:'Creating...', fr:'Creating...' },
    c_email_label: { zh:'邮箱', en:'Email', ja:'Email', ko:'Email', ar:'Email', de:'Email', fr:'Email' },
    c_phone_label: { zh:'电话', en:'Phone', ja:'Phone', ko:'Phone', ar:'Phone', de:'Phone', fr:'Phone' },
    c_school_label: { zh:'学校', en:'School', ja:'School', ko:'School', ar:'School', de:'School', fr:'School' },
    c_port_label: { zh:'作品集', en:'Portfolio', ja:'Portfolio', ko:'Portfolio', ar:'Portfolio', de:'Portfolio', fr:'Portfolio' },
    c_port_val: { zh:'完整作品集请邮件联系', en:'Full portfolio available upon request', ja:'Full portfolio available upon request', ko:'Full portfolio available upon request', ar:'Full portfolio available upon request', de:'Full portfolio available upon request', fr:'Full portfolio available upon request' },
    side_edu_label: { zh:'Education', en:'Education', ja:'Education', ko:'Education', ar:'Education', de:'Education', fr:'Education' },
    side_focus_label: { zh:'Focus', en:'Focus', ja:'Focus', ko:'Focus', ar:'Focus', de:'Focus', fr:'Focus' },
    side_lang_label: { zh:'Design Language', en:'Design Language', ja:'Design Language', ko:'Design Language', ar:'Design Language', de:'Design Language', fr:'Design Language' },
    side_fitness_label: { zh:'Fitness', en:'Fitness', ja:'Fitness', ko:'Fitness', ar:'Fitness', de:'Fitness', fr:'Fitness' },
    footer_copy: { zh:'© 2026 陈文亮', en:'© 2026 Wenliang Chen', ja:'© 2026 陳文亮', ko:'© 2026 천원량', ar:'© 2026', de:'© 2026 Wenliang Chen', fr:'© 2026 Wenliang Chen' },
    footer_tag: { zh:'设计未来，投资未来。', en:'Design the future, invest in it.', ja:'未来をデザインし、未来に投資する。', ko:'미래를 디자인하고, 미래에 투자하다.', ar:'صمم المستقبل، استثمر فيه.', de:'Design die Zukunft, investiere in sie.', fr:"Design l'avenir, investis dedans." }
};

const LANG_META = {
    zh: { label: '中文', htmlLang: 'zh-CN', dir: 'ltr' },
    en: { label: 'English', htmlLang: 'en', dir: 'ltr' },
    ja: { label: '日本語', htmlLang: 'ja', dir: 'ltr' },
    ko: { label: '한국어', htmlLang: 'ko', dir: 'ltr' },
    ar: { label: 'العربية', htmlLang: 'ar', dir: 'rtl' },
    de: { label: 'Deutsch', htmlLang: 'de', dir: 'ltr' },
    fr: { label: 'Français', htmlLang: 'fr', dir: 'ltr' }
};

let currentLang = localStorage.getItem('lang') || 'zh';

function ft(key) { if (!T[key]) return ''; if (T[key][currentLang]) return T[key][currentLang]; return T[key]['zh'] || T[key]['en'] || ''; }

function t(obj, field) {
    if (!obj) return '';
    var val = obj[field];
    if (!val) return obj[field + '_en'] || '';
    if (currentLang === 'zh') return val;
    var langField = field + '_' + currentLang;
    if (obj[langField]) return obj[langField];
    return obj[field + '_en'] || val;
}

function renderHero() {
    document.getElementById('heroTitle').innerHTML = t(INFO, 'hero_title');
    document.getElementById('heroTagline').textContent = t(INFO, 'tagline');
    var photoWrap = document.getElementById('heroPhotoWrap');
    var photo = t(INFO, 'hero_photo');
    if (photo) {
        photoWrap.innerHTML = '<img class="hero-photo" src="' + photo + '" alt="Photo">';
    } else {
        photoWrap.innerHTML = '';
    }
    var meta = document.getElementById('heroMeta');
    meta.innerHTML = 
        t(INFO, 'meta_line1') + '<span>' + t(INFO, 'meta_city') + '</span><br>' +
        t(INFO, 'meta_line2') + '<span>' + t(INFO, 'meta_focus') + '</span><br>' +
        t(INFO, 'meta_line3') + '<span>' + t(INFO, 'meta_avail') + '</span>';
}

function renderAbout() {
    var textDiv = document.getElementById('aboutText');
    textDiv.innerHTML = 
        '<p>' + t(ABOUT, 'p1') + '</p>' +
        '<p>' + t(ABOUT, 'p2') + '</p>' +
        '<p>' + t(ABOUT, 'p3') + '</p>';
    var sidebar = document.getElementById('aboutSidebar');
    sidebar.innerHTML = 
        '<div class="info-block"><div class="info-label">' + ft('side_edu_label') + '</div><div class="info-value">' + t(INFO, 'school') + '</div></div>' +
        '<div class="info-block"><div class="info-label">' + ft('side_focus_label') + '</div><div class="info-value">' + t(INFO, 'focus') + '</div></div>' +
        '<div class="info-block"><div class="info-label">' + ft('side_lang_label') + '</div><div class="info-value accent">' + t(INFO, 'design_lang') + '</div><div class="info-value" style="font-size:12px;color:var(--dim);">' + t(INFO, 'design_lang_sub') + '</div></div>' +
        '<div class="info-block"><div class="info-label">' + ft('side_fitness_label') + '</div><div class="info-value">' + t(INFO, 'fitness_label') + '</div></div>';
}

function renderWorks() {
    var container = document.getElementById('worksContainer');
    var html = '';
    var works = WORKS || [];
    for (var i = 0; i < works.length; i++) {
        html += renderWorkCard(works[i], i);
    }
    container.innerHTML = html;
    // bind click events for gallery cards
    container.querySelectorAll('.p-card[data-gallery]').forEach(function(card) {
        card.addEventListener('click', function() {
            var idx = parseInt(this.getAttribute('data-idx'));
            openGallery(idx);
        });
    });
}

function renderWorkCard(w, idx) {
    var hasGallery = w.gallery && w.gallery.length > 0;
    var html = '<div class="p-card"' + (hasGallery ? ' data-gallery="1" data-idx="' + idx + '"' : '') + '>';
    var img = w.image || '';
    var gKeys = ['alfa','hummer','tesla','volvo'];
    var gK = gKeys[idx];
    if (typeof GALLERY_DATA !== 'undefined' && gK && GALLERY_DATA[gK] && GALLERY_DATA[gK].length > 0) {
        img = GALLERY_DATA[gK][0];
    }
    if (img) {
        html += '<div class="p-img"><img src="' + img + '" alt=""></div>';
    } else {
        html += '<div class="p-icon">' + (w.icon || '◆') + '</div>';
    }
    html += '<span class="p-tag">' + t(w, 'tag') + '</span>';
    html += '<span class="p-year">' + w.year + '</span>';
    html += '<h3>' + t(w, 'title') + '</h3>';
    html += '<p class="p-desc">' + t(w, 'desc') + '</p>';
    html += '</div>';
    return html;
}

function renderProjects() {
    var container = document.getElementById('projectsContainer');
    var html = '';
    var projects = PROJECTS || [];
    for (var i = 0; i < projects.length; i++) {
        var p = projects[i];
        html += '<div class="proj-item" data-idx="' + i + '">';
        html += '<div class="proj-marker"><div class="y">' + p.year + '</div><div class="dot"></div></div>';
        html += '<h3>' + t(p, 'title') + '</h3>';
        html += '<p>' + t(p, 'desc') + '</p>';
        html += '<div class="proj-tags">';
        var tags = currentLang === 'zh' ? p.tags : (p['tags_' + currentLang] || p.tags_en || p.tags);
        if (tags) { for (var j = 0; j < tags.length; j++) { html += '<span>' + tags[j] + '</span>'; } }
        html += '</div></div>';
    }
    container.innerHTML = html;
}

function renderFitness() {
    var narrative = document.getElementById('investNarrative');
    narrative.innerHTML = '<p>' + t(FITNESS, 'p1') + '</p><p>' + t(FITNESS, 'p2') + '</p>';
    var tracksDiv = document.getElementById('investTracks');
    var html = '';
    var tracks = (FITNESS && FITNESS.tracks) || [];
    for (var i = 0; i < tracks.length; i++) {
        var tr = tracks[i];
        html += '<div class="track-item"><div><h4>' + t(tr, 'title') + '</h4><div class="track-desc">' + t(tr, 'desc') + '</div></div>';
        if (tr.image) {
            html += '<img class="track-img" src="' + tr.image + '" alt="">';
        } else {
            html += '<div class="track-arrow">→</div>';
        }
        html += '</div>';
    }
    tracksDiv.innerHTML = html;
}

function renderContact() {
    document.getElementById('contactBig').innerHTML = t(INFO, 'contact_big');
    var links = document.getElementById('contactLinks');
    links.innerHTML = 
        '<a class="contact-link" href="mailto:' + INFO.email + '"><div class="cl-icon">✉</div><div><span class="cl-label">' + ft('c_email_label') + '</span>' + INFO.email + '</div></a>' +
        '<a class="contact-link" href="tel:' + INFO.phone + '"><div class="cl-icon">☎</div><div><span class="cl-label">' + ft('c_phone_label') + '</span>' + INFO.phone + '</div></a>' +
        '<div class="contact-link"><div class="cl-icon">✦</div><div><span class="cl-label">' + ft('c_school_label') + '</span>' + t(INFO, 'school') + '</div></div>' +
        '<div class="contact-link"><div class="cl-icon">◇</div><div><span class="cl-label">' + ft('c_port_label') + '</span>' + ft('c_port_val') + '</div></div>';
}

function renderFooter() {
    document.getElementById('footerCopy').innerHTML = ft('footer_copy');
    document.getElementById('footerTag').textContent = ft('footer_tag');
}

function applyLang(lang) {
    if (!T.nav_about || !T.nav_about[lang]) lang = 'zh';
    currentLang = lang;
    localStorage.setItem('lang', lang);
    var meta = LANG_META[lang];
    document.documentElement.lang = meta.htmlLang;
    document.documentElement.dir = meta.dir;
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var key = el.getAttribute('data-i18n');
        if (T[key]) el.innerHTML = ft(key);
    });
    document.getElementById('langBtn').textContent = meta.label;
    document.querySelectorAll('.lang-dropdown div').forEach(function(d) {
        d.classList.toggle('active', d.getAttribute('data-lang') === lang);
    });
    document.getElementById('langDropdown').classList.remove('open');
    renderHero(); renderAbout(); renderWorks(); renderProjects(); renderFitness(); renderContact(); renderFooter();
}

document.getElementById('langBtn').addEventListener('click', function(e) {
    e.stopPropagation();
    document.getElementById('langDropdown').classList.toggle('open');
});
document.querySelectorAll('.lang-dropdown div').forEach(function(d) {
    d.addEventListener('click', function() { applyLang(d.getAttribute('data-lang')); });
});
document.addEventListener('click', function() {
    document.getElementById('langDropdown').classList.remove('open');
});

document.addEventListener('mousemove', function(e) {
    var cursor = document.getElementById('cursor');
    cursor.style.left = e.clientX - 3 + 'px';
    cursor.style.top = e.clientY - 3 + 'px';
});

function initReveal() {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });
}

// ===== GALLERY VIEWER =====
var galleryImages = [];
var galleryCurrentIdx = 0;

function openGallery(workIdx) {
    var work = WORKS[workIdx];
    if (!work) return;
    // Try GALLERY_DATA (base64 embedded images) first, fall back to file paths
    var galleryKeys = ['alfa','hummer','tesla','volvo'];
    var gKey = galleryKeys[workIdx];
    if (typeof GALLERY_DATA !== 'undefined' && gKey && GALLERY_DATA[gKey] && GALLERY_DATA[gKey].length > 0) {
        galleryImages = GALLERY_DATA[gKey];
    } else if (work.gallery && work.gallery.length > 0) {
        galleryImages = work.gallery;
    } else {
        return;
    }
    galleryCurrentIdx = 0;

    var viewer = document.getElementById('galleryViewer');
    var titleEl = document.getElementById('galleryTitle');
    var scrollEl = document.getElementById('galleryScroll');
    var counterEl = document.getElementById('galleryCounter');
    var hintEl = document.getElementById('galleryHint');

    // set title
    titleEl.innerHTML = t(work, 'title') + (work.year ? ' · <em>' + work.year + '</em>' : '');

    // build slides
    var html = '';
    for (var i = 0; i < galleryImages.length; i++) {
        html += '<div class="gallery-slide" data-slide-idx="' + i + '">' +
                '<img src="' + galleryImages[i] + '" alt="">' +
                '<div class="gallery-slide-number">' + String(i + 1).padStart(2, '0') + ' / ' + String(galleryImages.length).padStart(2, '0') + '</div>' +
                '</div>';
    }
    scrollEl.innerHTML = html;

    // lazy load images
    scrollEl.querySelectorAll('img').forEach(function(img) {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
        img.onload = function() { this.classList.add('loaded'); };
    });

    // progress & counter update on scroll
    scrollEl.onscroll = function() {
        var scrollTop = scrollEl.scrollTop;
        var scrollHeight = scrollEl.scrollHeight - scrollEl.clientHeight;
        var progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        document.getElementById('galleryProgress').style.height = progress + '%';

        // update counter based on which slide is in view
        var slideIdx = Math.round(scrollTop / scrollEl.clientHeight);
        if (slideIdx !== galleryCurrentIdx) {
            galleryCurrentIdx = slideIdx;
            counterEl.textContent = String(slideIdx + 1) + ' / ' + galleryImages.length;
        }

        // hide hint after first scroll
        if (scrollTop > 50) {
            hintEl.style.opacity = '0';
        } else {
            hintEl.style.opacity = '';
        }
    };

    counterEl.textContent = '1 / ' + galleryImages.length;
    hintEl.style.opacity = '';

    viewer.classList.add('open');
    document.body.style.overflow = 'hidden';
    scrollEl.scrollTop = 0;
}

function closeGallery() {
    var viewer = document.getElementById('galleryViewer');
    viewer.classList.remove('open');
    document.body.style.overflow = '';
    galleryImages = [];
    galleryCurrentIdx = 0;
}

// close button
document.getElementById('galleryClose').addEventListener('click', closeGallery);

// ESC key to close
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        var viewer = document.getElementById('galleryViewer');
        if (viewer.classList.contains('open')) {
            closeGallery();
        }
    }
});

// click backdrop (on scroll area outside image) to close
document.getElementById('galleryScroll').addEventListener('click', function(e) {
    if (e.target === this) {
        closeGallery();
    }
});

applyLang(currentLang);
setTimeout(initReveal, 100);


// ===== PROJECT DETAIL MODAL =====
function openProjectDetail(projIdx) {
    var proj = PROJECTS[projIdx];
    if (!proj) return;
    
    var modal = document.getElementById('projectModal');
    if (!modal) return;
    
    var titleEl = modal.querySelector('.pm-title');
    var tagsEl = modal.querySelector('.pm-tags');
    var descEl = modal.querySelector('.pm-desc');
    var detailEl = modal.querySelector('.pm-detail');
    
    if (titleEl) titleEl.innerHTML = t(proj, 'title');
    if (tagsEl) {
        var tags = t(proj, 'tags');
        tagsEl.innerHTML = Array.isArray(tags) ? tags.map(function(tag) { return '<span>' + tag + '</span>'; }).join('') : '';
    }
    if (descEl) descEl.textContent = t(proj, 'desc');
    var detailText = t(proj, 'detail');
    if (detailEl) {
        if (detailText) {
            detailEl.textContent = detailText;
            detailEl.style.display = '';
        } else {
            detailEl.style.display = 'none';
        }
    }
    
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeProjectDetail() {
    var modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// ===== HAMBURGER MOBILE NAV =====
var hamburger = document.getElementById('hamburger');
var mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

// close mobile nav on link click
mobileNav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ===== CLICK-BASED TAB NAVIGATION =====

// Project item click delegation
document.addEventListener('click', function(e) {
    var projItem = e.target.closest('.proj-item');
    if (projItem && projItem.dataset.idx) {
        openProjectDetail(parseInt(projItem.dataset.idx));
    }
});


// ESC to close project modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProjectDetail();
    }
});

(function() {
    var dots = document.querySelectorAll('.dot-item');
    var sections = document.querySelectorAll('.snap-section');
    var current = 0;

    function activateSection(index) {
        if (index < 0 || index >= sections.length) return;
        current = index;
        sections.forEach(function(s, i) {
            s.classList.toggle('active', i === current);
        });
        dots.forEach(function(d, i) {
            d.classList.toggle('active', i === current);
        });
        var isMobileView = window.matchMedia('(max-width: 900px)').matches;
        if (isMobileView) {
            // On mobile, reset internal scroll of the active section
            if (sections[current]) sections[current].scrollTop = 0;
        } else {
            // On desktop, scroll container to active section
            if (sections[current]) {
                sections[current].scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    // Dot nav click
    dots.forEach(function(dot, i) {
        dot.addEventListener('click', function() { activateSection(i); });
    });

    // Nav link click
    document.querySelectorAll('nav a[href^="#"], .mobile-nav a[href^="#"]').forEach(function(a) {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            var target = this.getAttribute('href').substring(1);
            sections.forEach(function(s, i) {
                if (s.id === target || (target === 'hero' && i === 0)) activateSection(i);
            });
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); activateSection(current + 1); }
        if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); activateSection(current - 1); }
        if (e.key === 'Home') { e.preventDefault(); activateSection(0); }
        if (e.key === 'End') { e.preventDefault(); activateSection(sections.length - 1); }
    });


    // Touch swipe navigation disabled - sections scroll internally, switching only via dot nav

    // Init - show first section
    activateSection(0);



})();


// Pendant toggle moved to pendant3d.js

