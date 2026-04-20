/* ═══════════════════════════════════════════════
   IDEA TECH STORE — firebase-init.js
   Firebase: Auth · Firestore · Products · Admin
═══════════════════════════════════════════════ */

import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* ══════════════════════════════════════
   FIREBASE CONFIG
══════════════════════════════════════ */
const firebaseConfig = {
  apiKey:            "AIzaSyCH5K-zXdh0v8lZz4PiSFocAs_rklBZe1A",
  authDomain:        "ideatech1.github.io",
  projectId:         "web1-94067",
  storageBucket:     "web1-94067.firebasestorage.app",
  messagingSenderId: "106677179670",
  appId:             "1:106677179670:web:1388a0d28f7bbce8186c37",
};

/* ── ADMIN EMAIL (always gets role=admin) ── */
const ADMIN_EMAIL = "ideatech829@gmail.com";
const WA_NUMBER   = "201283328730";

const app       = initializeApp(firebaseConfig);
const auth      = getAuth(app);
const db        = getFirestore(app);
const gProvider = new GoogleAuthProvider();

/* ══════════════════════════════════════
   STATE
══════════════════════════════════════ */
let currentUser  = null;
let currentRole  = 'customer';
let allMessages  = [];
let allUsers     = [];
let pricingData  = {};
let servicesData = [];
let productsCache  = [];
let editingProductId = null;

/* ══════════════════════════════════════
   HELPERS
══════════════════════════════════════ */
const catClsMap = {
  web:'cat-web', '3d':'cat-3d', app:'cat-app',
  bot:'cat-bot', design:'cat-design', sys:'cat-sys', solar:'cat-solar',
};

const svgWA = `<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15
  -.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475
  -.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52
  .149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207
  -.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372
  -.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2
  5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085
  1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347
  m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648
  -.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0
  5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885
  9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0
  2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683
  1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0
  00-3.48-8.413Z"/></svg>`;

function waMsg(template, title, price, currency) {
  return template
    .replace('{t}', title)
    .replace('{p}', price)
    .replace('{c}', currency || '');
}

/* ══════════════════════════════════════
   AUTH STATE LISTENER
══════════════════════════════════════ */
onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    const ref  = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      /* First login — create user document */
      const role = user.email === ADMIN_EMAIL ? 'admin' : 'customer';
      await setDoc(ref, {
        uid:         user.uid,
        email:       user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL:    user.photoURL || '',
        role,
        createdAt:   serverTimestamp(),
      });
      currentRole = role;
    } else {
      currentRole = snap.data().role || 'customer';
      /* Always keep admin email as admin */
      if (user.email === ADMIN_EMAIL && currentRole !== 'admin') {
        await updateDoc(ref, { role: 'admin' });
        currentRole = 'admin';
      }
    }

    closeAuth();
    showToast(t('toast.welcome'));
  } else {
    currentUser = null;
    currentRole = 'customer';
  }

  updateNavUI();
  renderProducts();
});

/* ── Update nav bar based on auth state ── */
function updateNavUI() {
  const btnLogin  = document.getElementById('btnLogin');
  const btnLogout = document.getElementById('btnLogout');
  const btnAdmin  = document.getElementById('btnOpenAdmin');
  const userInfo  = document.getElementById('navUserInfo');

  if (currentUser) {
    btnLogin.style.display  = 'none';
    btnLogout.style.display = 'flex';
    userInfo.style.display  = 'flex';

    const name = currentUser.displayName || currentUser.email.split('@')[0];
    const nameEl = document.getElementById('navDisplayName');
    if (nameEl) nameEl.textContent = name;

    const av = document.getElementById('navAvatar');
    if (av && currentUser.photoURL) {
      av.src = currentUser.photoURL;
      av.style.display = 'block';
    }

    const roleTag = document.getElementById('navRoleTag');
    if (roleTag) {
      roleTag.textContent = t('role.' + currentRole);
      roleTag.className   = 'nav-role-tag role-' + currentRole;
    }

    const isStaff = currentRole === 'admin' || currentRole === 'worker';
    btnAdmin.style.display = isStaff ? 'flex' : 'none';
  } else {
    btnLogin.style.display  = 'flex';
    btnLogout.style.display = 'none';
    userInfo.style.display  = 'none';
    btnAdmin.style.display  = 'none';
  }
}

/* ══════════════════════════════════════
   AUTH ACTIONS — exposed to window
══════════════════════════════════════ */
window.doLogout = async () => {
  await signOut(auth);
  closeAdminPanel();
  showToast(t('toast.loggedOut'));
};

window.doGoogleLogin = async () => {
  clearAuthErr();
  try {
    await signInWithPopup(auth, gProvider);
  } catch (e) {
    setAuthErr(t('err.google'));
  }
};

window.submitAuth = async () => {
  const email = document.getElementById('authEmail')?.value.trim();
  const pass  = document.getElementById('authPass')?.value.trim();
  clearAuthErr();

  if (!email || !pass) { setAuthErr(t('err.empty')); return; }

  // Show loading state
  const btn = document.getElementById('authSubmitBtn');
  if (btn) { btn.disabled = true; btn.style.opacity = '0.7'; }

  try {
    if (isRegisterMode) {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(cred.user, { displayName: email.split('@')[0] });
    } else {
      // Try login first
      try {
        await signInWithEmailAndPassword(auth, email, pass);
      } catch (loginErr) {
        // If admin email and account not found → create it automatically
        if (
          email === ADMIN_EMAIL &&
          (loginErr.code === 'auth/user-not-found' ||
           loginErr.code === 'auth/invalid-credential')
        ) {
          const cred = await createUserWithEmailAndPassword(auth, email, pass);
          await updateProfile(cred.user, { displayName: 'IDEA TECH Admin' });
        } else {
          throw loginErr;
        }
      }
    }
  } catch (e) {
    const errMap = {
      'auth/user-not-found':       'err.notfound',
      'auth/wrong-password':       'err.wrongpass',
      'auth/email-already-in-use': 'err.exists',
      'auth/invalid-email':        'err.invalidemail',
      'auth/weak-password':        'err.weakpass',
      'auth/invalid-credential':   'err.credential',
      'auth/too-many-requests':    'err.general',
      'auth/network-request-failed': 'err.general',
    };
    setAuthErr(t(errMap[e.code] || 'err.general'));
  } finally {
    if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
  }
};

function clearAuthErr() {
  const el = document.getElementById('authErr');
  if (el) el.textContent = '';
}
function setAuthErr(msg) {
  const el = document.getElementById('authErr');
  if (el) el.textContent = msg;
}

/* ══════════════════════════════════════
   DEFAULT PRODUCTS
══════════════════════════════════════ */
const DEFAULT_PRODUCTS = [
  {
    id:'p1', cat:'web', badge:'hot', icon:'💻',
    title:'موقع بيزنس احترافي',
    desc:'موقع ويب كامل لشركتك أو مشروعك بتصميم عصري متجاوب وسرعة تحميل عالية.',
    features:['تصميم UI/UX مخصص','متجاوب مع كل الأجهزة','SEO محسّن','لوحة تحكم','دعم شهر بعد التسليم'],
    price:'1,500', currency:'جنيه', stars:5,
    img:'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80',
  },
  {
    id:'p2', cat:'web', badge:'new', icon:'🛒',
    title:'متجر إلكتروني كامل',
    desc:'متجر أونلاين متكامل بسلة تسوق ونظام دفع وإدارة منتجات وإشعارات طلبات.',
    features:['عربة تسوق كاملة','بوابات دفع إلكتروني','إدارة المخزون','تتبع الطلبات','إشعارات واتساب'],
    price:'3,500', currency:'جنيه', stars:5,
    img:'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80',
  },
  {
    id:'p3', cat:'web', badge:null, icon:'🏢',
    title:'موقع شركة متعدد اللغات',
    desc:'موقع شركة احترافي بالعربي والإنجليزي مع صفحات الخدمات والفريق والتواصل.',
    features:['عربي + إنجليزي','صفحات متعددة','نموذج تواصل','ربط السوشيال ميديا'],
    price:'2,000', currency:'جنيه', stars:5,
    img:'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80',
  },
  {
    id:'p4', cat:'3d', badge:'hot', icon:'🖨️',
    title:'طباعة 3D — نماذج هندسية',
    desc:'طباعة ثلاثية الأبعاد دقيقة لنماذج هندسية وبروتوتايب ومجسمات للمشاريع.',
    features:['دقة طباعة 0.1mm','PLA · ABS · PETG','تسليم سريع','تصميم مجاني'],
    price:'يبدأ من 200', currency:'جنيه', stars:5,
    img:'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&q=80',
  },
  {
    id:'p5', cat:'app', badge:'new', icon:'📱',
    title:'تطبيق موبايل Android & iOS',
    desc:'تطبيق مخصص لمشروعك بواجهة جميلة وأداء عالي ونشر على Google Play و App Store.',
    features:['Android & iOS','تصميم Material Design','إشعارات Push','نشر على المتجرين'],
    price:'5,000', currency:'جنيه', stars:5,
    img:'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80',
  },
  {
    id:'p6', cat:'bot', badge:'hot', icon:'🤖',
    title:'بوت واتساب ذكي بـ AI',
    desc:'بوت واتساب يرد على العملاء تلقائياً ويدير الطلبات على مدار الساعة.',
    features:['ردود AI تلقائية','إدارة الطلبات','تكامل ChatGPT','إحصائيات يومية'],
    price:'2,000', currency:'جنيه', stars:5,
    img:'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
  },
  {
    id:'p7', cat:'design', badge:'new', icon:'🎨',
    title:'هوية بصرية كاملة',
    desc:'تصميم هوية بصرية احترافية: لوجو، ألوان، خطوط، بطاقات أعمال، وبراندينج كامل.',
    features:['لوجو احترافي','دليل الهوية البصرية','بطاقة أعمال','ملفات AI · PDF · PNG'],
    price:'800', currency:'جنيه', stars:5,
    img:'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80',
  },
  {
    id:'p8', cat:'sys', badge:'hot', icon:'📊',
    title:'نظام إدارة المبيعات CRM',
    desc:'نظام ويب لإدارة المبيعات والعملاء والمخزون مع فواتير وتقارير تفصيلية.',
    features:['إدارة العملاء CRM','فواتير إلكترونية','تقارير وإحصائيات','صلاحيات متعددة'],
    price:'4,500', currency:'جنيه', stars:5,
    img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
  },
];

/* ══════════════════════════════════════
   PRODUCTS — Firestore
══════════════════════════════════════ */
async function initProducts() {
  try {
    const snap = await getDocs(collection(db, 'products'));
    if (snap.empty) {
      for (const p of DEFAULT_PRODUCTS) {
        await setDoc(doc(db, 'products', p.id), p);
      }
      productsCache = [...DEFAULT_PRODUCTS];
    } else {
      productsCache = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    }
  } catch (e) {
    productsCache = [...DEFAULT_PRODUCTS];
  }

  const stEl = document.getElementById('st-products');
  if (stEl) stEl.textContent = productsCache.length;

  renderProducts();
  runCounters(productsCache.length);
}

/* ── Render store grid ── */
window.renderProducts = function () {
  const grid    = document.getElementById('productsGrid');
  const countEl = document.getElementById('resultsCount');
  if (!grid) return;

  const filtered = productsCache.filter(p => {
    const mc = currentFilter === 'all' || p.cat === currentFilter;
    const ms = !searchTerm
      || p.title.toLowerCase().includes(searchTerm)
      || p.desc.toLowerCase().includes(searchTerm);
    return mc && ms;
  });

  const isAdmin = currentRole === 'admin';
  const isStaff = currentRole === 'admin' || currentRole === 'worker';

  if (countEl) {
    countEl.innerHTML = `
      <span style="display:flex;align-items:center;gap:.35rem">
        <span class="material-symbols-outlined" style="font-size:.95rem;color:var(--cyan)">grid_view</span>
        ${filtered.length} ${t('results.count')}
      </span>
      ${isStaff
        ? `<span style="font-size:.72rem;color:var(--text2)">
             ${isAdmin ? t('results.admin') : t('results.worker')}
             — <button onclick="openAdminPanel()"
                       style="background:none;border:none;color:var(--cyan);
                              cursor:pointer;font-family:inherit;
                              font-size:.72rem;font-weight:700">
                 ${t('results.link')}
               </button>
           </span>`
        : ''}
    `;
  }

  if (!filtered.length) {
    grid.innerHTML = `
      <div class="empty">
        <span class="material-symbols-outlined">search_off</span>
        <p>${t('empty.text')}</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map((p, i) => {
    const cls      = catClsMap[p.cat] || 'cat-web';
    const catLabel = t('cat.label.' + (p.cat || 'web'));
    const badgeHtml = p.badge === 'new'
      ? `<span class="card-badge badge-new">${t('badge.new')}</span>`
      : p.badge === 'hot'
      ? `<span class="card-badge badge-hot">${t('badge.hot')}</span>`
      : '';

    return `
      <div class="card" onclick="openModal('${p.id}')">
        ${isAdmin ? `
          <div class="card-admin-bar visible">
            <button class="card-admin-btn btn-edit-card"
                    onclick="event.stopPropagation();openProductForm('${p.id}')"
                    title="${t('btn.edit')}">✏️</button>
            <button class="card-admin-btn btn-del-card"
                    onclick="event.stopPropagation();deleteProductById('${p.id}')"
                    title="${t('btn.delete')}">🗑️</button>
          </div>` : ''}
        ${badgeHtml}
        <div class="card-img-wrap">
          <img class="card-img"
               src="${p.img || ''}" alt="${p.title}" loading="lazy"
               onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80'"/>
          <div class="card-icon-wrap">${p.icon || '💡'}</div>
        </div>
        <div class="card-body">
          <span class="card-cat ${cls}">${catLabel}</span>
          <div class="stars">${'★'.repeat(p.stars || 5)}${'☆'.repeat(5 - (p.stars || 5))}</div>
          <h3 class="card-title">${p.title}</h3>
          <p class="card-desc">${p.desc}</p>
          <div class="card-footer">
            <div class="card-price">
              <small>${p.currency || 'جنيه'}</small>
              ${p.price}
            </div>
            <button class="btn-order"
                    onclick="event.stopPropagation();orderNow('${p.id}')">
              ${svgWA} <span>${t('btn.order')}</span>
            </button>
          </div>
        </div>
      </div>`;
  }).join('');

  /* Animate cards in */
  requestAnimationFrame(() => {
    grid.querySelectorAll('.card').forEach((el, i) => {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(20px)';
      setTimeout(() => {
        el.style.transition = 'opacity .5s ease, transform .5s ease';
        el.style.opacity    = '1';
        el.style.transform  = 'none';
      }, i * 55);
    });
  });
};

/* ── Open product detail modal ── */
window.openModal = (id) => {
  const p = productsCache.find(x => x.id === id);
  if (!p) return;

  const cls      = catClsMap[p.cat] || 'cat-web';
  const catLabel = t('cat.label.' + (p.cat || 'web'));
  const msgTpl   = waMsg(t('product.msg'), p.title, p.price, p.currency);
  const waLink   = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msgTpl)}`;

  document.getElementById('modalContent').innerHTML = `
    <button class="modal-close"
            onclick="document.getElementById('modal').classList.remove('open');
                     document.body.style.overflow=''">✕</button>
    <img src="${p.img || ''}" alt="${p.title}"
         style="width:100%;height:200px;object-fit:cover;display:block;
                border-radius:1.5rem 1.5rem 0 0"
         onerror="this.style.display='none'"/>
    <div class="modal-body">
      <span class="card-cat ${cls}" style="margin-bottom:.6rem">${p.icon} ${catLabel}</span>
      <div class="stars" style="margin:.45rem 0">${'★'.repeat(p.stars || 5)}${'☆'.repeat(5 - (p.stars || 5))}</div>
      <h2 style="font-size:1.35rem;font-weight:900;color:var(--text);margin-bottom:.55rem;line-height:1.25">
        ${p.title}
      </h2>
      <p style="color:var(--text2);line-height:1.75;margin-bottom:1.25rem;font-size:.875rem">
        ${p.desc}
      </p>
      <ul class="modal-features">
        ${(p.features || []).map(f => `
          <li>
            <span class="material-symbols-outlined">check_circle</span>
            ${f}
          </li>`).join('')}
      </ul>
      <div class="modal-price-row">
        <div class="modal-price">
          <small>${p.currency || 'جنيه'}</small>
          ${p.price}
        </div>
        <span style="font-size:.75rem;color:var(--text2)">${t('product.contact')}</span>
      </div>
      <a href="${waLink}" target="_blank" class="btn-wa-cta">
        ${svgWA} ${t('product.wa.btn')}
      </a>
    </div>`;

  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeModal = (e) => {
  if (e.target === document.getElementById('modal')) {
    document.getElementById('modal').classList.remove('open');
    document.body.style.overflow = '';
  }
};

window.orderNow = (id) => {
  const p = productsCache.find(x => x.id === id);
  if (!p) return;
  const msg = waMsg(t('order.msg'), p.title, p.price, p.currency);
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
};

/* ══════════════════════════════════════
   PRODUCT FORM
══════════════════════════════════════ */
window.openProductForm = (id) => {
  editingProductId = id || null;
  document.getElementById('pfTitle').textContent = t(id ? 'form.edit' : 'form.add');

  if (id) {
    const p = productsCache.find(x => x.id === id);
    if (p) {
      _setVal('pfName',     p.title);
      _setVal('pfDesc',     p.desc);
      _setVal('pfPrice',    p.price);
      _setVal('pfCurrency', p.currency || 'جنيه');
      _setVal('pfCat',      p.cat);
      _setVal('pfBadge',    p.badge || '');
      _setVal('pfIcon',     p.icon || '💡');
      _setVal('pfStars',    p.stars || 5);
      _setVal('pfImg',      p.img || '');
      _setVal('pfFeatures', (p.features || []).join('، '));
    }
  } else {
    ['pfName','pfDesc','pfPrice','pfFeatures','pfImg'].forEach(id => _setVal(id, ''));
    _setVal('pfCurrency', 'جنيه');
    _setVal('pfCat',      'web');
    _setVal('pfBadge',    '');
    _setVal('pfIcon',     '💡');
    _setVal('pfStars',    5);
  }

  document.getElementById('productFormModal').classList.add('open');
};

window.closeProductForm = () =>
  document.getElementById('productFormModal').classList.remove('open');

window.saveProduct = async () => {
  const title = _getVal('pfName').trim();
  if (!title) { showToast(t('form.required'), true); return; }

  const cat      = _getVal('pfCat');
  const features = _getVal('pfFeatures')
    .split(/[،,]/)
    .map(f => f.trim())
    .filter(Boolean);

  const data = {
    title,
    desc:     _getVal('pfDesc'),
    price:    _getVal('pfPrice'),
    currency: _getVal('pfCurrency') || 'جنيه',
    cat,
    badge:    _getVal('pfBadge') || null,
    icon:     _getVal('pfIcon')  || '💡',
    stars:    parseInt(_getVal('pfStars')) || 5,
    img:      _getVal('pfImg')   || '',
    features,
    updatedAt: serverTimestamp(),
  };

  try {
    if (editingProductId) {
      await setDoc(doc(db, 'products', editingProductId), data, { merge: true });
      const idx = productsCache.findIndex(p => p.id === editingProductId);
      if (idx !== -1) productsCache[idx] = { ...productsCache[idx], ...data };
      showToast(t('toast.productEdited'));
    } else {
      const newId = 'p' + Date.now();
      await setDoc(doc(db, 'products', newId), { ...data, id: newId });
      productsCache.push({ ...data, id: newId });
      showToast(t('toast.productAdded'));
    }
    closeProductForm();
    renderProducts();
    _renderAdminProducts();
    _setInner('st-products', productsCache.length);
  } catch (e) {
    showToast(t('toast.saveErr'), true);
  }
};

window.deleteProductById = async (id) => {
  if (!confirm(t('confirm.delProduct'))) return;
  try {
    await deleteDoc(doc(db, 'products', id));
    productsCache = productsCache.filter(p => p.id !== id);
    renderProducts();
    _renderAdminProducts();
    _setInner('st-products', productsCache.length);
    showToast(t('toast.productDel'));
  } catch (e) {
    showToast(t('toast.delErr'), true);
  }
};

function _renderAdminProducts() {
  const grid = document.getElementById('adm-products-grid');
  if (!grid) return;

  const countEl = document.getElementById('adm-product-count');
  if (countEl) countEl.textContent = `${productsCache.length} ${t('results.count')}`;

  const isAdmin = currentRole === 'admin';

  grid.innerHTML = productsCache.map(p => `
    <div class="adm-pcard">
      <img src="${p.img || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=60'}"
           alt="" onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=60'"/>
      <div class="adm-pcard-body">
        <div style="font-size:.88rem;font-weight:800;color:var(--text);
                    margin-bottom:.25rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
          ${p.icon || ''} ${p.title}
        </div>
        <div style="font-size:.78rem;color:var(--cyan);font-weight:700;margin-bottom:.75rem">
          ${p.price} ${p.currency || 'جنيه'}
        </div>
        ${isAdmin
          ? `<div style="display:flex;gap:.5rem">
               <button class="btn-ghost" style="font-size:.72rem;padding:.35rem .7rem"
                       onclick="openProductForm('${p.id}')">
                 <span class="material-symbols-outlined" style="font-size:.75rem">edit</span>
                 ${t('btn.edit')}
               </button>
               <button class="btn-danger" style="font-size:.72rem;padding:.35rem .7rem"
                       onclick="deleteProductById('${p.id}')">
                 <span class="material-symbols-outlined" style="font-size:.75rem">delete</span>
                 ${t('btn.delete')}
               </button>
             </div>`
          : `<span style="font-size:.72rem;color:var(--text3)">${t('role.worker')}</span>`}
      </div>
    </div>`).join('');
}

/* ══════════════════════════════════════
   ADMIN PANEL
══════════════════════════════════════ */
window.openAdminPanel = async () => {
  if (!currentUser) { openAuth(); return; }

  document.getElementById('adminPanel').classList.add('open');
  document.body.style.overflow = 'hidden';

  _setInner('adm-user-name', currentUser.displayName || currentUser.email);

  const av = document.getElementById('adm-avatar');
  if (av && currentUser.photoURL) {
    av.src = currentUser.photoURL;
    av.style.display = 'block';
    const icon = document.getElementById('adm-avatar-icon');
    if (icon) icon.style.display = 'none';
  }

  /* Show/hide role-gated items */
  const isAdmin = currentRole === 'admin';
  _show('navUsersBtn',  isAdmin ? 'flex' : 'none');
  _show('btnAddProduct', isAdmin ? 'flex' : 'none');

  showAdmSection('overview', document.querySelector('#adm-sidebar .adm-nav-item'));
  _loadMessages();
  _loadUsers();
  _loadPricing();
  _loadServices();
  _loadSettings();
  _renderAdminProducts();
};

window.closeAdminPanel = () => {
  document.getElementById('adminPanel').classList.remove('open');
  document.body.style.overflow = '';
};

window.showAdmSection = (name, el) => {
  document.querySelectorAll('.asection').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.adm-nav-item').forEach(n => n.classList.remove('active'));

  document.getElementById('adm-sec-' + name)?.classList.add('active');
  if (el) el.classList.add('active');

  _setInner('adm-section-title', t('admin.' + name) || name);

  if (name === 'products') _renderAdminProducts();
  if (window.innerWidth <= 768) toggleSidebar();
};

/* ══════════════════════════════════════
   MESSAGES
══════════════════════════════════════ */
async function _loadMessages() {
  try {
    const snap = await getDocs(
      query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
    );
    allMessages = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    const nc = allMessages.filter(m => m.status === 'new').length;
    _setInner('st-msgs', allMessages.length);
    _setInner('st-new',  nc);

    const badge = document.getElementById('msg-badge');
    if (badge) {
      badge.textContent   = nc;
      badge.style.display = nc > 0 ? 'inline' : 'none';
    }
    _renderMessages('all');
    _renderRecentMsgs();
  } catch (e) { /* offline fallback */ }
}

function _renderRecentMsgs() {
  const el = document.getElementById('recent-msgs-list');
  if (!el) return;
  if (!allMessages.length) {
    el.innerHTML = `<p style="color:var(--text3);font-size:.85rem">${t('noMsgsYet')}</p>`;
    return;
  }
  el.innerHTML = allMessages.slice(0, 5).map(m => `
    <div style="display:flex;align-items:center;justify-content:space-between;
                padding:.75rem 1rem;border-radius:.625rem;
                background:rgba(0,0,0,.03);border:1px solid var(--border2)">
      <div style="display:flex;align-items:center;gap:.75rem">
        <div style="width:36px;height:36px;border-radius:50%;
                    background:rgba(0,212,255,.1);display:flex;align-items:center;justify-content:center">
          <span class="material-symbols-outlined" style="font-size:1rem;color:var(--cyan)">person</span>
        </div>
        <div>
          <p style="font-size:.875rem;font-weight:700;color:var(--text)">${m.name || t('msg.visitor')}</p>
          <p style="font-size:.75rem;color:var(--text3)">
            ${(m.message || '').substring(0, 50)}${(m.message || '').length > 50 ? '...' : ''}
          </p>
        </div>
      </div>
      <span style="background:rgba(0,212,255,.1);color:var(--cyan);
                   border:1px solid rgba(0,212,255,.2);
                   padding:3px 10px;border-radius:9999px;font-size:.7rem;font-weight:700">
        ${m.status === 'new' ? t('msg.new') : m.status === 'read' ? t('msg.read') : t('msg.replied')}
      </span>
    </div>`).join('');
}

function _renderMessages(filter) {
  const filtered = filter === 'all'
    ? allMessages
    : allMessages.filter(m => (m.status || 'new') === filter);

  const el = document.getElementById('msgs-list');
  if (!el) return;

  if (!filtered.length) {
    el.innerHTML = `<p style="color:var(--text3);font-size:.85rem;padding:2rem 0">${t('noMsgs')}</p>`;
    return;
  }

  el.innerHTML = filtered.map(m => {
    const status = m.status || 'new';
    const statusLabel = status === 'new' ? t('msg.new')
      : status === 'read' ? t('msg.read') : t('msg.replied');

    return `
      <div class="msg-card ${status === 'new' ? 'unread' : ''}"
           onclick="toggleMsg('${m.id}')">
        <div style="display:flex;align-items:flex-start;
                    justify-content:space-between;gap:1rem;flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:.75rem">
            <div style="width:42px;height:42px;border-radius:50%;
                        background:rgba(0,212,255,.1);display:flex;
                        align-items:center;justify-content:center;flex-shrink:0">
              <span class="material-symbols-outlined" style="color:var(--cyan)">person</span>
            </div>
            <div>
              <p style="font-weight:700;color:var(--text)">${m.name || t('msg.visitor')}</p>
              <p style="font-size:.8rem;color:var(--text3);direction:ltr">${m.email || ''}</p>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap">
            <span style="background:rgba(0,212,255,.1);color:var(--cyan);
                         border:1px solid rgba(0,212,255,.2);
                         padding:3px 10px;border-radius:9999px;font-size:.7rem;font-weight:700">
              ${statusLabel}
            </span>
            <span style="font-size:.75rem;color:var(--text3)">
              ${m.createdAt?.toDate ? m.createdAt.toDate().toLocaleDateString() : ''}
            </span>
          </div>
        </div>
        <p style="font-size:.875rem;color:var(--text2);margin-top:.75rem">
          ${(m.message || '').substring(0, 100)}${(m.message || '').length > 100 ? '...' : ''}
        </p>
        <div class="msg-expanded" id="msg-exp-${m.id}">
          <p style="font-size:.75rem;font-weight:700;color:var(--text3);margin-bottom:.35rem">
            ${t('msg.fullMsg')}
          </p>
          <p style="font-size:.875rem;color:var(--text);line-height:1.75;margin-bottom:1rem">
            ${m.message || ''}
          </p>
          <div style="display:flex;gap:.75rem;flex-wrap:wrap">
            <button class="btn-ap" style="font-size:.8rem;padding:.5rem 1rem"
                    onclick="event.stopPropagation();markMsg('${m.id}','replied')">
              <span class="material-symbols-outlined" style="font-size:.9rem">reply</span>
              ${t('msg.markReplied')}
            </button>
            <button class="btn-ghost"
                    onclick="event.stopPropagation();markMsg('${m.id}','read')">
              ${t('msg.markRead')}
            </button>
            <button class="btn-danger"
                    onclick="event.stopPropagation();deleteMsg('${m.id}')">
              <span class="material-symbols-outlined" style="font-size:.9rem">delete</span>
            </button>
          </div>
        </div>
      </div>`;
  }).join('');
}

window.toggleMsg = async (id) => {
  const el = document.getElementById('msg-exp-' + id);
  if (!el) return;
  const isOpen = el.style.display === 'block';
  el.style.display = isOpen ? 'none' : 'block';
  const msg = allMessages.find(m => m.id === id);
  if (!isOpen && msg && (msg.status === 'new' || !msg.status)) {
    await updateDoc(doc(db, 'messages', id), { status: 'read' });
    msg.status = 'read';
  }
};

window.markMsg = async (id, status) => {
  await updateDoc(doc(db, 'messages', id), { status });
  const msg = allMessages.find(m => m.id === id);
  if (msg) msg.status = status;
  const f = document.querySelector('.msg-filter.active')?.dataset.filter || 'all';
  _renderMessages(f);
  _renderRecentMsgs();
  showToast(t('toast.msgStatus'));
};

window.deleteMsg = async (id) => {
  if (!confirm(t('confirm.delMsg'))) return;
  await deleteDoc(doc(db, 'messages', id));
  allMessages = allMessages.filter(m => m.id !== id);
  const f = document.querySelector('.msg-filter.active')?.dataset.filter || 'all';
  _renderMessages(f);
  _renderRecentMsgs();
  showToast(t('toast.msgDel'));
};

window.filterMsgs = (filter, btn) => {
  document.querySelectorAll('.msg-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  _renderMessages(filter);
};

/* ══════════════════════════════════════
   USERS
══════════════════════════════════════ */
async function _loadUsers() {
  try {
    const snap = await getDocs(collection(db, 'users'));
    allUsers = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    _setInner('st-users', allUsers.length);
    _renderUsers();
  } catch (e) {}
}

function _renderUsers() {
  const tbody = document.getElementById('users-tbody');
  if (!tbody) return;

  if (!allUsers.length) {
    tbody.innerHTML = `
      <tr><td colspan="5" style="text-align:center;color:var(--text3);padding:2rem">
        ${t('table.noUsers')}
      </td></tr>`;
    return;
  }

  tbody.innerHTML = allUsers.map(u => `
    <tr>
      <td style="display:flex;align-items:center;gap:.75rem">
        <div style="width:34px;height:34px;border-radius:50%;
                    background:rgba(0,212,255,.1);display:flex;
                    align-items:center;justify-content:center;
                    overflow:hidden;flex-shrink:0">
          ${u.photoURL
            ? `<img src="${u.photoURL}" style="width:100%;height:100%;object-fit:cover"/>`
            : `<span class="material-symbols-outlined" style="font-size:.9rem;color:var(--cyan)">person</span>`}
        </div>
        <span style="font-weight:600">${u.displayName || '—'}</span>
      </td>
      <td style="color:var(--text3);direction:ltr">${u.email || '—'}</td>
      <td>
        <select onchange="changeRole('${u.uid || u.id}', this.value)"
                class="ctrl-input"
                style="padding:.4rem .75rem;font-size:.8rem"
                ${u.email === ADMIN_EMAIL ? 'disabled' : ''}>
          <option value="customer" ${u.role === 'customer' ? 'selected' : ''}>${t('role.customer')}</option>
          <option value="worker"   ${u.role === 'worker'   ? 'selected' : ''}>${t('role.worker')}</option>
          <option value="admin"    ${u.role === 'admin'    ? 'selected' : ''}>${t('role.admin')}</option>
        </select>
      </td>
      <td style="color:var(--text3);font-size:.8rem">
        ${u.createdAt?.toDate ? u.createdAt.toDate().toLocaleDateString() : '—'}
      </td>
      <td>
        ${u.email !== ADMIN_EMAIL
          ? `<button class="btn-danger" onclick="deleteUser('${u.uid || u.id}')">
               ${t('btn.delete')}
             </button>`
          : `<span style="color:var(--text3);font-size:.75rem">${t('table.protected')}</span>`}
      </td>
    </tr>`).join('');
}

window.changeRole = async (uid, role) => {
  await updateDoc(doc(db, 'users', uid), { role });
  const u = allUsers.find(u => (u.uid || u.id) === uid);
  if (u) u.role = role;
  showToast(t('toast.roleChanged'));
};

window.deleteUser = async (uid) => {
  if (!confirm(t('confirm.delUser'))) return;
  await deleteDoc(doc(db, 'users', uid));
  allUsers = allUsers.filter(u => (u.uid || u.id) !== uid);
  _renderUsers();
  _setInner('st-users', allUsers.length);
  showToast(t('toast.userDel'));
};

/* ══════════════════════════════════════
   PRICING
══════════════════════════════════════ */
const DEFAULT_PRICING = {
  starter:    { name:'Starter',    nameAr:'المبتدئ',   price:'$2k – $5k',  desc:'مثالي للمشاريع الناشئة',      features:['موقع متجاوب','تصميم أساسي','دعم شهر'] },
  growth:     { name:'Growth',     nameAr:'النمو',     price:'$10k – $25k', desc:'منتجات رقمية متكاملة',        features:['تطبيق + ويب','منطق مخصص','دعم 3 أشهر'] },
  enterprise: { name:'Enterprise', nameAr:'المؤسسات', price:'$50k+',       desc:'برمجيات ذكاء اصطناعي متقدمة', features:['برمجيات ضخمة','تكامل AI كامل','فريق 24/7'] },
};

async function _loadPricing() {
  try {
    const snap = await getDoc(doc(db, 'siteConfig', 'pricing'));
    pricingData = snap.exists() ? snap.data() : DEFAULT_PRICING;
  } catch (e) { pricingData = DEFAULT_PRICING; }
  _renderPricing();
}

function _renderPricing() {
  const el = document.getElementById('pricing-cards');
  if (!el) return;
  el.innerHTML = ['starter','growth','enterprise'].map(k => {
    const p = pricingData[k] || DEFAULT_PRICING[k];
    return `
      <div class="adm-stat-card">
        <p style="font-size:.7rem;font-weight:700;color:var(--text3);
                  letter-spacing:.1em;text-transform:uppercase;margin-bottom:.75rem">
          ${p.name}
        </p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1rem">
          <div><label style="display:block;font-size:.7rem;color:var(--text3);margin-bottom:.35rem">الاسم (عربي)</label>
               <input class="ctrl-input" id="p-${k}-nameAr" value="${p.nameAr || ''}"/></div>
          <div><label style="display:block;font-size:.7rem;color:var(--text3);margin-bottom:.35rem">Name (EN)</label>
               <input class="ctrl-input" id="p-${k}-nameEn" value="${p.nameEn || p.name || ''}" style="direction:ltr"/></div>
        </div>
        <div style="margin-bottom:1rem">
          <label style="display:block;font-size:.7rem;color:var(--text3);margin-bottom:.35rem">السعر</label>
          <input class="ctrl-input" id="p-${k}-price" value="${p.price || ''}" style="direction:ltr"/>
        </div>
        <div style="margin-bottom:1rem">
          <label style="display:block;font-size:.7rem;color:var(--text3);margin-bottom:.35rem">الوصف</label>
          <input class="ctrl-input" id="p-${k}-desc" value="${p.desc || ''}"/>
        </div>
        <div>
          <label style="display:block;font-size:.7rem;color:var(--text3);margin-bottom:.35rem">
            المميزات (سطر لكل ميزة)
          </label>
          <textarea class="ctrl-input" id="p-${k}-features"
                    rows="4" style="resize:vertical">${(p.features || []).join('\n')}</textarea>
        </div>
      </div>`;
  }).join('');
}

window.savePricing = async () => {
  const keys = ['starter','growth','enterprise'];
  const data = {};
  keys.forEach(k => {
    data[k] = {
      name:     DEFAULT_PRICING[k].name,
      nameAr:   _getVal(`p-${k}-nameAr`),
      nameEn:   _getVal(`p-${k}-nameEn`),
      price:    _getVal(`p-${k}-price`),
      desc:     _getVal(`p-${k}-desc`),
      features: _getVal(`p-${k}-features`).split('\n').filter(f => f.trim()),
    };
  });
  await setDoc(doc(db, 'siteConfig', 'pricing'), data);
  pricingData = data;
  showToast(t('toast.saved'));
};

/* ══════════════════════════════════════
   SERVICES
══════════════════════════════════════ */
const DEFAULT_SERVICES = [
  { id:'s1', nameAr:'تطوير الويب',       icon:'language',   color:'#00D4FF', descAr:'تطوير مواقع إلكترونية متجاوبة وعالية الأداء' },
  { id:'s2', nameAr:'تطبيقات الجوال',    icon:'smartphone', color:'#7C3AED', descAr:'تطبيقات ذكية لنظامي Android و iOS' },
  { id:'s3', nameAr:'بوتات AI',           icon:'smart_toy',  color:'#00E676', descAr:'بوتات ذكاء اصطناعي لأتمتة المهام' },
  { id:'s4', nameAr:'تصميم UI/UX',        icon:'brush',      color:'#FFB700', descAr:'تصاميم عصرية تركز على تجربة المستخدم' },
];

async function _loadServices() {
  try {
    const snap = await getDoc(doc(db, 'siteConfig', 'services'));
    servicesData = snap.exists() ? snap.data().list : DEFAULT_SERVICES;
  } catch (e) { servicesData = DEFAULT_SERVICES; }
  _renderServices();
}

function _renderServices() {
  const el = document.getElementById('services-list');
  if (!el) return;
  el.innerHTML = servicesData.map((s, i) => `
    <div class="adm-stat-card"
         style="display:grid;grid-template-columns:auto 1fr 1fr 1fr auto;gap:1rem;align-items:center">
      <span class="material-symbols-outlined" style="color:${s.color};font-size:1.75rem">${s.icon}</span>
      <div>
        <label style="display:block;font-size:.7rem;color:var(--text3);margin-bottom:.35rem">الاسم</label>
        <input class="ctrl-input" id="srv-${i}-nameAr" value="${s.nameAr || ''}"/>
      </div>
      <div>
        <label style="display:block;font-size:.7rem;color:var(--text3);margin-bottom:.35rem">Name (EN)</label>
        <input class="ctrl-input" id="srv-${i}-nameEn" value="${s.nameEn || ''}" style="direction:ltr"/>
      </div>
      <div>
        <label style="display:block;font-size:.7rem;color:var(--text3);margin-bottom:.35rem">الوصف</label>
        <input class="ctrl-input" id="srv-${i}-descAr" value="${s.descAr || ''}"/>
      </div>
      <div>
        <label style="display:block;font-size:.7rem;color:var(--text3);margin-bottom:.35rem">Icon</label>
        <input class="ctrl-input" id="srv-${i}-icon" value="${s.icon || ''}" style="direction:ltr"/>
      </div>
      <button class="btn-danger" onclick="removeService(${i})">
        <span class="material-symbols-outlined" style="font-size:.9rem">delete</span>
      </button>
    </div>`).join('');
}

window.addService = () => {
  servicesData.push({ id:'s'+Date.now(), nameAr:'خدمة جديدة', icon:'star', color:'#00D4FF', descAr:'وصف الخدمة' });
  _renderServices();
};

window.removeService = (i) => { servicesData.splice(i, 1); _renderServices(); };

window.saveServices = async () => {
  servicesData = servicesData.map((s, i) => ({
    ...s,
    nameAr: _getVal(`srv-${i}-nameAr`) || s.nameAr,
    nameEn: _getVal(`srv-${i}-nameEn`) || '',
    descAr: _getVal(`srv-${i}-descAr`) || s.descAr,
    icon:   _getVal(`srv-${i}-icon`)   || s.icon,
  }));
  await setDoc(doc(db, 'siteConfig', 'services'), { list: servicesData });
  showToast(t('toast.saved'));
};

/* ══════════════════════════════════════
   SETTINGS
══════════════════════════════════════ */
async function _loadSettings() {
  _renderWaFields(['https://wa.me/201283328730']);
  try {
    const snap = await getDoc(doc(db, 'siteConfig', 'general'));
    if (!snap.exists()) return;
    const d = snap.data();
    if (d.company)  _setVal('s-company',  d.company);
    if (d.email)    _setVal('s-email',    d.email);
    if (d.address)  _setVal('s-address',  d.address);
    if (d.tagline)  _setVal('s-tagline',  d.tagline);
    if (d.taglineEn) _setVal('s-taglineEn', d.taglineEn);
    if (d.facebook) _setVal('s-facebook', d.facebook);
    if (d.instagram) _setVal('s-instagram', d.instagram);
    if (d.linkedin) _setVal('s-linkedin', d.linkedin);
    const wa = Array.isArray(d.whatsapp) ? d.whatsapp : (d.whatsapp ? [d.whatsapp] : ['']);
    _renderWaFields(wa);
  } catch (e) {}
}

function _renderWaFields(nums) {
  const c = document.getElementById('whatsapp-numbers');
  if (!c) return;
  c.innerHTML = '';
  (nums.length ? nums : ['']).forEach((n, i) => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:.5rem;align-items:center';
    row.innerHTML = `
      <input class="ctrl-input wa-num-input" value="${n}"
             style="flex:1;direction:ltr"
             placeholder="https://wa.me/201XXXXXXXXX"/>
      ${nums.length > 1
        ? `<button onclick="removeWaField(${i})"
                   style="background:rgba(255,60,60,.12);border:1px solid rgba(255,60,60,.25);
                          color:#ff6b6b;border-radius:.5rem;padding:.4rem .6rem;
                          cursor:pointer;display:flex;align-items:center">
             <span class="material-symbols-outlined" style="font-size:.95rem">delete</span>
           </button>`
        : ''}`;
    c.appendChild(row);
  });
}

function _getWaNumbers() {
  return [...document.querySelectorAll('.wa-num-input')]
    .map(el => el.value.trim())
    .filter(v => v);
}

window.addWaField = () => { const n = _getWaNumbers(); n.push(''); _renderWaFields(n); };
window.removeWaField = (i) => {
  const n = _getWaNumbers(); n.splice(i, 1);
  _renderWaFields(n.length ? n : ['']);
};

window.saveSettings = async () => {
  await setDoc(doc(db, 'siteConfig', 'general'), {
    company:    _getVal('s-company'),
    email:      _getVal('s-email'),
    address:    _getVal('s-address'),
    tagline:    _getVal('s-tagline'),
    taglineEn:  _getVal('s-taglineEn'),
    whatsapp:   _getWaNumbers(),
    facebook:   _getVal('s-facebook'),
    instagram:  _getVal('s-instagram'),
    linkedin:   _getVal('s-linkedin'),
    updatedAt:  serverTimestamp(),
  });
  showToast(t('toast.saved'));
};

/* ══════════════════════════════════════
   DOM HELPERS
══════════════════════════════════════ */
function _getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}
function _setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
}
function _setInner(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
function _show(id, disp) {
  const el = document.getElementById(id);
  if (el) el.style.display = disp;
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
initProducts();

