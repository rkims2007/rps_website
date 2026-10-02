/* ============================================================
   RISHIKUL PUBLIC SCHOOL – MAIN JAVASCRIPT
   ============================================================ */

/* ---------- LOAD DYNAMIC CONTENT FROM ADMIN PANEL ---------- */
// Called after revealObserver is set up (see bottom of file)
function loadDynamicContent() {

  // 1. BRANDING
  const branding = JSON.parse(localStorage.getItem('rps_branding') || '{}');
  const logoData  = localStorage.getItem('rps_logo') || '';
  if (branding.schoolName) {
    document.querySelectorAll('.logo-title, .f-name').forEach(el => { if (el) el.textContent = branding.schoolName; });
  }
  if (branding.tagline) {
    document.querySelectorAll('.logo-sub, .f-sub').forEach(el => { if (el) el.textContent = branding.tagline; });
  }
  if (branding.heroBadge) {
    const hb = document.querySelector('.hero-badge');
    if (hb) hb.innerHTML = '<i class="fas fa-star"></i> ' + branding.heroBadge;
  }
  if (branding.heroSubtitle) {
    const hs = document.querySelector('.hero-subtitle');
    if (hs) hs.innerHTML = branding.heroSubtitle;
  }
  if (logoData) {
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) logoIcon.innerHTML = '<img src="' + logoData + '" alt="Logo" style="width:42px;height:42px;object-fit:contain;border-radius:8px;"/>';
    // Footer logo icon (new markup: .footer-logo-icon > i)
    const footerLogoIcon = document.querySelector('.footer-logo-icon');
    if (footerLogoIcon) {
      footerLogoIcon.innerHTML = '<img src="' + logoData + '" alt="Logo" style="width:40px;height:40px;object-fit:contain;border-radius:8px;"/>';
    }
  }

  // Contact info from sections or branding
  const sect = JSON.parse(localStorage.getItem('rps_sections') || '{}');
  const _sf = (sel, val) => { if (!val) return; document.querySelectorAll(sel).forEach(el => { if (el) el.textContent = val; }); };
  const phone1   = sect.contactPhone1  || branding.phone1  || '';
  const phone2   = sect.contactPhone2  || branding.phone2  || '';
  const email    = sect.contactEmail   || branding.email   || '';
  const address  = sect.contactAddr    || branding.address || '';
  const timings  = sect.contactTimings || branding.timings || '';
  const office   = sect.contactOffice  || '';
  // Footer
  _sf('.footer-phone1',  phone1);
  _sf('.footer-phone2',  phone2);
  _sf('.footer-email',   email);
  _sf('.footer-address', address);
  _sf('.footer-timings', timings);
  // Contact section cards
  _sf('.con-phone1',  phone1);
  _sf('.con-phone2',  phone2);
  _sf('.con-email',   email);
  _sf('.con-address', address);
  _sf('.con-timings', timings);
  if (office) _sf('.con-office', office);
  // Top bar
  _sf('.tb-phone',   phone1);
  _sf('.tb-email',   email);
  _sf('.tb-timings', timings ? timings.replace('Monday', 'Mon').replace('Saturday', 'Sat').replace('– S', '–S') : '');

  // 2. ADMISSION YEAR
  const savedYear = localStorage.getItem('rps_admission_year');
  if (savedYear) {
    const heroSpan = document.getElementById('heroAdmissionYear');
    const tagSpan  = document.getElementById('admissionYearTag');
    if (heroSpan) heroSpan.textContent = savedYear;
    if (tagSpan)  tagSpan.textContent  = savedYear;
  }

  // 3. ABOUT SECTION
  if (sect.aboutTag)  { const el = document.querySelector('.about-tag');         if (el) el.textContent = sect.aboutTag; }
  if (sect.aboutH1 || sect.aboutH2) {
    const h = document.querySelector('.about-heading');
    if (h) h.innerHTML = (sect.aboutH1||'') + ' <span class="highlight">' + (sect.aboutH2||'') + '</span>';
  }
  if (sect.aboutP1)   { const el = document.querySelector('.about-p1');          if (el) el.textContent = sect.aboutP1; }
  if (sect.aboutP2)   { const el = document.querySelector('.about-p2');          if (el) el.textContent = sect.aboutP2; }
  if (sect.aboutYears){ const el = document.querySelector('.about-years-num');   if (el) el.textContent = sect.aboutYears; }

  // 4. PRINCIPAL / CHAIRMAN messages
  ['principal', 'chairman'].forEach(role => {
    const name  = sect[role + 'Name'];
    const title = sect[role + 'Title'];
    const msg   = sect[role + 'Msg'];
    const photo = sect[role + 'Photo'];
    if (name)  { const el = document.querySelector('.' + role + '-name');  if (el) el.textContent = name; }
    if (title) { const el = document.querySelector('.' + role + '-title'); if (el) el.textContent = title; }
    if (msg)   { const el = document.querySelector('.' + role + '-msg');   if (el) el.textContent = msg; }
    if (photo) {
      const imgEl = document.querySelector('.' + role + '-photo');
      if (imgEl) { imgEl.src = photo; imgEl.style.display = 'block'; }
      const phEl  = document.querySelector('.' + role + '-photo-ph');
      if (phEl)  phEl.style.display = 'none';
    }
  });

  // 5. FEATURES / ACADEMICS
  const features = JSON.parse(localStorage.getItem('rps_features') || 'null');
  if (sect.featuresH)  { const el = document.querySelector('.features-heading'); if (el) el.textContent = sect.featuresH; }
  if (sect.featuresSub){ const el = document.querySelector('.features-sub');     if (el) el.textContent = sect.featuresSub; }
  if (features) {
    const fg = document.getElementById('featuresGrid');
    if (fg) {
      fg.innerHTML = features.map(fc =>
        '<div class="feature-card reveal">'
        + '<div class="feat-icon" style="background:' + fc.gradient + ';"><i class="fas ' + fc.icon + '"></i></div>'
        + '<h3>' + fc.title + '</h3><p>' + fc.desc + '</p></div>'
      ).join('');
      document.querySelectorAll('#featuresGrid .reveal').forEach(el => revealObserver && revealObserver.observe(el));
    }
  }

  // 6. ADMISSIONS
  if (sect.admH)    { const el = document.querySelector('.adm-heading'); if (el) el.textContent = sect.admH; }
  if (sect.admIntro){ const el = document.querySelector('.adm-intro');   if (el) el.textContent = sect.admIntro; }
  for (let s = 1; s <= 4; s++) {
    if (sect['admStep'+s+'T']) { const el = document.querySelector('.adm-step-'+s+'-title'); if (el) el.textContent = sect['admStep'+s+'T']; }
    if (sect['admStep'+s+'D']) { const el = document.querySelector('.adm-step-'+s+'-desc');  if (el) el.textContent = sect['admStep'+s+'D']; }
  }

  // 7. LEADERSHIP
  const leaders = JSON.parse(localStorage.getItem('rps_leaders') || 'null');
  const vision  = localStorage.getItem('rps_vision') || '';
  if (vision) { const el = document.querySelector('.vision-text'); if (el) el.textContent = vision; }
  if (leaders) {
    const lg = document.getElementById('leadersGrid');
    if (lg) {
      lg.innerHTML = leaders.map(l => {
        const photoEl = l.photo
          ? '<img src="' + l.photo + '" alt="' + l.name + '" style="width:100%;height:100%;object-fit:cover;" loading="lazy"/>'
          : '<div class="leader-img-placeholder"><i class="fas fa-user-tie"></i></div>';
        const badgeClass = (() => {
          const r = (l.badge || l.role || '').toLowerCase();
          if (r.includes('managing'))   return 'managing-badge';
          if (r.includes('director'))   return 'director-badge';
          if (r.includes('principal') && r.includes('sub')) return 'svp-badge';
          if (r.includes('principal') && r.includes('vice')) return 'vp-badge';
          if (r.includes('principal'))  return 'principal-badge';
          return 'managing-badge';
        })();
        return '<div class="leader-card reveal">'
          + '<div class="leader-img-wrap">' + photoEl
          + '<span class="leader-badge ' + badgeClass + '">' + (l.badge || l.role) + '</span></div>'
          + '<div class="leader-info">'
          + '<h3>' + l.name + '</h3>'
          + '<span class="leader-role">' + l.role + '</span>'
          + '<div class="leader-divider"></div>'
          + '<p class="leader-msg"><i class="fas fa-quote-left leader-quote-icon"></i> ' + (l.msg || '') + '</p>'
          + '</div></div>';
      }).join('');
      document.querySelectorAll('#leadersGrid .reveal').forEach(el => revealObserver && revealObserver.observe(el));
    }
  }

  // 8. TESTIMONIALS
  const testis = JSON.parse(localStorage.getItem('rps_testimonials') || 'null');
  if (testis) {
    const tg = document.getElementById('testimonialsGrid');
    if (tg) {
      const stars = n => Array.from({length:5},(_,i)=>'<i class="fas fa-star" style="color:'+(i<n?'#f5a623':'#d1d5db')+';"></i>').join('');
      tg.innerHTML = testis.map((t, idx) => {
        const isFeatured = idx === 1 && testis.length >= 3;
        const avatarInner = t.photo
          ? '<img src="' + t.photo + '" alt="' + t.name + '" loading="lazy" style="width:46px;height:46px;object-fit:cover;border-radius:50%;"/>'
          : '<i class="fas fa-user"></i>';
        return '<div class="testi-card reveal' + (isFeatured ? ' testi-featured' : '') + '">'
          + '<div class="testi-quote"><i class="fas fa-quote-left"></i></div>'
          + '<div class="testi-stars">' + stars(t.rating||5) + '</div>'
          + '<p>' + t.text + '</p>'
          + '<div class="testi-author"><div class="testi-avatar-wrap"><div class="testi-avatar">' + avatarInner + '</div><div class="testi-avatar-ring"></div></div>'
          + '<div><strong>' + t.name + '</strong><span>' + (t.label||'') + '</span></div></div></div>';
      }).join('');
      document.querySelectorAll('#testimonialsGrid .reveal').forEach(el => revealObserver && revealObserver.observe(el));
    }
  }

  // 9. GALLERY
  const galleryGrid = document.getElementById('galleryGrid');
  if (galleryGrid) {
    const images = JSON.parse(localStorage.getItem('rps_gallery_images') || '[]');
    if (images.length === 0) {
      const defaults = [
        { icon: 'fa-school',        label: 'School Campus',   large: true  },
        { icon: 'fa-microscope',    label: 'Science Lab',     large: false },
        { icon: 'fa-book-reader',   label: 'Library',         large: false },
        { icon: 'fa-futbol',        label: 'Sports Ground',   large: false },
        { icon: 'fa-theater-masks', label: 'Annual Function', large: true  },
        { icon: 'fa-paint-brush',   label: 'Art Room',        large: false },
      ];
      galleryGrid.innerHTML = defaults.map(d =>
        '<div class="gallery-item' + (d.large?' g-large':'') + ' reveal">'
        + '<div class="gallery-ph"><i class="fas ' + d.icon + '"></i><span>' + d.label + '</span></div>'
        + '<div class="gallery-overlay"><i class="fas fa-search-plus"></i></div></div>'
      ).join('');
    } else {
      galleryGrid.innerHTML = images.map((img, i) =>
        '<div class="gallery-item' + (i===0||i===4?' g-large':'') + ' reveal" data-src="' + img.data + '" data-label="' + img.name + '">'
        + '<img src="' + img.data + '" alt="' + img.name + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;"/>'
        + '<div class="gallery-overlay"><i class="fas fa-search-plus"></i></div>'
        + '<div class="gallery-ph-label">' + img.name + '</div></div>'
      ).join('');
    }
    document.querySelectorAll('#galleryGrid .reveal').forEach(el => revealObserver && revealObserver.observe(el));
  }

  // 10. CAMPUS VIDEO
  const campusVideoData = JSON.parse(localStorage.getItem('rps_campus_video') || 'null');
  if (campusVideoData && campusVideoData.url) {
    const videoSection = document.getElementById('campus-video');
    const videoIframe  = document.getElementById('campusVideoIframe');
    const videoSub     = document.getElementById('campusVideoSubtitle');
    if (videoSection && videoIframe) {
      // Convert YouTube URL to embed
      let embedUrl = '';
      const url = campusVideoData.url.trim();
      let m;
      m = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
      if (m) embedUrl = 'https://www.youtube.com/embed/' + m[1];
      if (!embedUrl) { m = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/); if (m) embedUrl = 'https://www.youtube.com/embed/' + m[1]; }
      if (!embedUrl) { m = url.match(/embed\/([a-zA-Z0-9_-]{11})/); if (m) embedUrl = 'https://www.youtube.com/embed/' + m[1]; }
      if (!embedUrl) { m = url.match(/shorts\/([a-zA-Z0-9_-]{11})/); if (m) embedUrl = 'https://www.youtube.com/embed/' + m[1]; }
      if (embedUrl) {
        videoIframe.src = embedUrl;
        videoSection.style.display = '';
        if (videoSub && campusVideoData.title) videoSub.textContent = campusVideoData.title;
        document.querySelectorAll('#campus-video .reveal').forEach(el => revealObserver && revealObserver.observe(el));
      }
    }
  }

  // 11. AWARD WINNING IMAGES
  const awardImages = JSON.parse(localStorage.getItem('rps_award_images') || '[]');
  const awardsSection = document.getElementById('awards');
  const awardsGrid    = document.getElementById('awardsGrid');
  if (awardsGrid && awardImages.length > 0) {
    awardsGrid.innerHTML = awardImages.map((img, i) =>
      '<div class="gallery-item' + (i === 0 || i === 3 ? ' g-large' : '') + ' reveal" data-src="' + img.data + '">'
      + '<img src="' + img.data + '" alt="' + img.name + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;"/>'
      + '<div class="gallery-overlay"><i class="fas fa-search-plus"></i></div>'
      + '<div class="gallery-ph-label">' + img.name + '</div></div>'
    ).join('');
    if (awardsSection) awardsSection.style.display = '';
    document.querySelectorAll('#awardsGrid .reveal').forEach(el => revealObserver && revealObserver.observe(el));
  }

  // 12. SMART CLASSES IMAGES
  const smartImages   = JSON.parse(localStorage.getItem('rps_smart_images') || '[]');
  const smartSection  = document.getElementById('smart-classes');
  const smartGrid     = document.getElementById('smartGrid');
  if (smartGrid && smartImages.length > 0) {
    smartGrid.innerHTML = smartImages.map((img, i) =>
      '<div class="gallery-item' + (i === 0 || i === 3 ? ' g-large' : '') + ' reveal" data-src="' + img.data + '">'
      + '<img src="' + img.data + '" alt="' + img.name + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;"/>'
      + '<div class="gallery-overlay"><i class="fas fa-search-plus"></i></div>'
      + '<div class="gallery-ph-label">' + img.name + '</div></div>'
    ).join('');
    if (smartSection) smartSection.style.display = '';
    document.querySelectorAll('#smartGrid .reveal').forEach(el => revealObserver && revealObserver.observe(el));
  }

  // 13. NOTICE BOARD MARQUEE
  const marqueeContent = document.querySelector('.marquee-content');
  if (marqueeContent) {
    const notices = JSON.parse(localStorage.getItem('rps_notices') || '[]');
    if (notices.length > 0) {
      const doubled = [...notices, ...notices];
      marqueeContent.innerHTML = doubled.map(n => '<span>' + n + '</span>').join('');
    }
  }
}
/* ---------- TOP BAR OFFSET ---------- */
(function applyTopBarOffset() {
  const tb = document.getElementById('topBar');
  if (tb && window.innerWidth > 480) {
    document.body.classList.add('has-topbar');
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 480) {
      document.body.classList.remove('has-topbar');
    } else if (tb) {
      document.body.classList.add('has-topbar');
    }
  });
})();

/* ---------- PRELOADER ---------- */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    animateCounters();
  }, 1400);
});

/* ---------- NAVBAR SCROLL EFFECT ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('scrollTop').classList.toggle('show', window.scrollY > 400);
  updateActiveNav();
});

/* ---------- MOBILE HAMBURGER MENU ---------- */
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');
const navOverlay = document.createElement('div');
navOverlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:998;display:none;';
document.body.appendChild(navOverlay);

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
  navOverlay.style.display = isOpen ? 'block' : 'none';
  document.body.style.overflow  = isOpen ? 'hidden' : '';
});

navOverlay.addEventListener('click', closeMenu);

function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  navOverlay.style.display = 'none';
  document.body.style.overflow  = '';
}

document.querySelectorAll('.nav-link, .nav-btn').forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* ---------- SMOOTH SCROLL ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 10;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  let current    = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - navbar.offsetHeight - 80) {
      current = section.id;
    }
  });
  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

/* ---------- SCROLL REVEAL ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const parent = entry.target.parentElement;
      const isGrid = parent && parent.matches(
        '.features-grid,.testimonials-grid,.gallery-grid,.message-grid'
      );
      const delay = isGrid
        ? Array.from(parent.children).indexOf(entry.target) * 80
        : 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// Load dynamic content AFTER revealObserver is ready
loadDynamicContent();

/* ---------- COUNTER ANIMATION ---------- */
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(counter => {
    const target   = parseInt(counter.getAttribute('data-target'), 10);
    const step     = Math.ceil(target / (1800 / 16));
    let current    = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      counter.textContent = current;
    }, 16);
  });
}

/* ---------- ADMISSION FORM ---------- */
const admissionForm = document.getElementById('admissionForm');
const formSuccess   = document.getElementById('formSuccess');

if (admissionForm) {
  admissionForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name   = document.getElementById('studentName').value.trim();
    const cls    = document.getElementById('classSelect').value;
    const parent = document.getElementById('parentName').value.trim();
    const mobile = document.getElementById('mobile').value.trim();

    if (!name || !cls || !parent || !mobile) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }
    if (!/^[0-9+\s\-]{8,15}$/.test(mobile)) {
      showToast('Please enter a valid mobile number.', 'error');
      return;
    }

    const btn = admissionForm.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    btn.disabled  = true;

    setTimeout(() => {
      admissionForm.style.display = 'none';
      formSuccess.classList.add('show');
      showToast('Enquiry submitted successfully!', 'success');
    }, 1500);
  });
}

/* ---------- TOAST NOTIFICATION ---------- */
function showToast(message, type) {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.style.cssText = `
    position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);
    background:${type === 'success' ? '#27ae60' : '#e74c3c'};
    color:#fff;padding:.85rem 2rem;border-radius:50px;font-size:.88rem;
    font-weight:600;z-index:9999;box-shadow:0 6px 24px rgba(0,0,0,.25);
    font-family:'Poppins',sans-serif;white-space:nowrap;
    animation:toastIn .4s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut .4s ease forwards';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

/* ---------- SCROLL TO TOP ---------- */
document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- GALLERY LIGHTBOX ---------- */
document.addEventListener('click', e => {
  const item = e.target.closest('.gallery-item');
  if (!item) return;
  const _labelEl = item.querySelector('.gallery-ph span');
  const label   = item.dataset.label || (_labelEl ? _labelEl.textContent : '') || 'Gallery';
  const _imgEl  = item.querySelector('img');
  const imgSrc  = item.dataset.src   || (_imgEl ? _imgEl.src : null) || null;
  const lb = document.createElement('div');
  lb.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,.94);z-index:9999;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    gap:1.5rem;animation:fadeIn .3s ease;padding:1.5rem;`;
  lb.innerHTML = imgSrc
    ? `<img src="${imgSrc}" alt="${label}" style="max-width:90vw;max-height:75vh;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.5);object-fit:contain;"/>
       <div style="text-align:center;color:#fff;">
         <p style="font-size:1rem;font-weight:600;opacity:.9;">${label}</p>
         <p style="font-size:.78rem;opacity:.45;margin-top:.3rem;">Rishikul Public School – Gallery</p>
       </div>`
    : `<div style="text-align:center;color:#fff;">
         <i class="fas fa-image" style="font-size:5rem;opacity:.3;display:block;margin-bottom:1rem;"></i>
         <p style="font-size:1.1rem;font-weight:600;opacity:.85;">${label}</p>
         <p style="font-size:.8rem;opacity:.45;margin-top:.4rem;">Rishikul Public School – Gallery</p>
       </div>`;
  lb.innerHTML += `<button id="lbClose" style="background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);
    color:#fff;padding:.65rem 2rem;border-radius:50px;font-size:.9rem;cursor:pointer;
    font-family:'Poppins',sans-serif;font-weight:600;margin-top:.5rem;">
    <i class="fas fa-times"></i> Close</button>`;
  document.body.appendChild(lb);
  document.body.style.overflow = 'hidden';
  const close = () => { lb.remove(); document.body.style.overflow = ''; };
  lb.querySelector('#lbClose').addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
});

/* ---------- MARQUEE PAUSE ON HOVER ---------- */
const marquee = document.querySelector('.marquee-content');
if (marquee) {
  marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
  marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
}

/* ---------- FEATURE CARD TILT (desktop hover only) ---------- */
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5) * 14;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * -14;
      card.style.transform = `translateY(-8px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ---------- INJECT KEYFRAMES ---------- */
const ks = document.createElement('style');
ks.textContent = `
  @keyframes toastIn  { from{opacity:0;transform:translateX(-50%) translateY(16px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
  @keyframes toastOut { from{opacity:1;transform:translateX(-50%) translateY(0)} to{opacity:0;transform:translateX(-50%) translateY(16px)} }
  @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes shake    { 0%,100%{transform:translateX(0)} 25%,75%{transform:translateX(-8px)} 50%{transform:translateX(8px)} }
`;
document.head.appendChild(ks);

