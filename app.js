/* ═══════════════════════════════════════════════
   IDEA TECH STORE — app.js
   UI Logic: i18n · Theme · Lang · Particles · UI
═══════════════════════════════════════════════ */

/* ══════════════════════════════════════
   TRANSLATIONS (AR / EN / FR)
══════════════════════════════════════ */
const TRANSLATIONS = {
  ar: {
    /* NAV */
    'nav.admin':   'لوحة التحكم',
    'nav.login':   'دخول',
    'nav.logout':  'خروج',
    'nav.wa':      'واتساب',
    /* HERO */
    'hero.badge':  'متجر الخدمات التقنية',
    'hero.h1a':    'كل اللي تحتاجه',
    'hero.h1b':    'في عالم التقنية',
    'hero.sub':    'مواقع ويب · تطبيقات · طباعة 3D · بوتات AI · تصاميم · أنظمة',
    'hero.s1':     'عميل سعيد',
    'hero.s2':     'خدمة متاحة',
    'hero.s3':     'سنوات خبرة',
    'hero.s4':     'رضا العملاء',
    'search.ph':   'ابحث عن خدمة...',
    /* AUTH */
    'auth.title.login':    'تسجيل الدخول',
    'auth.title.register': 'إنشاء حساب',
    'auth.sub.login':      'أدخل بياناتك للوصول لحسابك',
    'auth.sub.register':   'أنشئ حسابك الجديد الآن',
    'auth.google':         'الدخول بحساب Google',
    'auth.or':             'أو',
    'auth.email':          'البريد الإلكتروني',
    'auth.pass':           'كلمة المرور',
    'auth.btn.login':      'دخول',
    'auth.btn.register':   'إنشاء الحساب',
    'auth.switch.login':   'عندك حساب؟ <a onclick="toggleAuthMode()">سجّل الدخول</a>',
    'auth.switch.register':'ما عندكش حساب؟ <a onclick="toggleAuthMode()">سجّل الآن</a>',
    /* AUTH ERRORS */
    'err.empty':       'أدخل البريد وكلمة المرور',
    'err.notfound':    'البريد غير موجود',
    'err.wrongpass':   'كلمة المرور غير صحيحة',
    'err.exists':      'البريد مستخدم بالفعل',
    'err.invalidemail':'بريد إلكتروني غير صالح',
    'err.weakpass':    'كلمة المرور ضعيفة جداً',
    'err.credential':  'بيانات الدخول غير صحيحة',
    'err.google':      'فشل الدخول بـ Google',
    'err.general':     'حدث خطأ، حاول مجدداً',
    /* ROLES */
    'role.admin':    '👑 مدير',
    'role.worker':   '🔧 عامل',
    'role.customer': '👤 عميل',
    /* CATEGORIES */
    'cat.all':    '🌐 الكل',
    'cat.web':    '💻 مواقع',
    'cat.3d':     '🖨️ طباعة 3D',
    'cat.app':    '📱 تطبيقات',
    'cat.bot':    '🤖 بوتات AI',
    'cat.design': '🎨 تصميم',
    'cat.sys':    '⚙️ أنظمة',
    'cat.label.web':    'موقع ويب',
    'cat.label.3d':     'طباعة 3D',
    'cat.label.app':    'تطبيق',
    'cat.label.bot':    'بوت AI',
    'cat.label.design': 'تصميم',
    'cat.label.sys':    'نظام',
    'cat.label.solar':  'طاقة شمسية',
    /* STORE */
    'btn.order':        'اطلب',
    'results.count':    'خدمة',
    'results.admin':    'وضع المدير 👑',
    'results.worker':   'وضع العامل 🔧',
    'results.link':     'لوحة التحكم ↗',
    'product.contact':  'تواصل للتفاصيل',
    'product.wa.btn':   'تواصل واتساب الآن',
    'product.msg':      'السلام عليكم، أنا مهتم بخدمة "{t}" بسعر {p} {c}. ممكن توضح أكتر؟',
    'order.msg':        'السلام عليكم، أريد الاستفسار عن "{t}" — السعر {p} {c}',
    'badge.new':        'جديد',
    'badge.hot':        '🔥 رائج',
    'empty.text':       'لا توجد نتائج',
    /* BUTTONS */
    'btn.save':   'حفظ',
    'btn.cancel': 'إلغاء',
    'btn.edit':   'تعديل',
    'btn.delete': 'حذف',
    'btn.add':    'إضافة',
    /* ADMIN SECTIONS */
    'admin.panel':     'لوحة التحكم',
    'admin.overview':  'نظرة عامة',
    'admin.messages':  'الرسائل',
    'admin.products':  'المنتجات',
    'admin.pricing':   'الأسعار',
    'admin.services':  'الخدمات',
    'admin.settings':  'الإعدادات',
    'admin.users':     'المستخدمون',
    'admin.backStore': 'العودة للمتجر',
    'admin.logout':    'تسجيل الخروج',
    'admin.welcome':   'مرحباً بك في لوحة تحكم IDEA TECH',
    'admin.general':   'عام',
    'admin.manage':    'إدارة المتجر',
    'admin.team':      'الفريق',
    'admin.addProduct':'إضافة منتج',
    'admin.addService':'إضافة خدمة',
    'admin.recentMsgs':'آخر الرسائل',
    /* STATS */
    'stat.msgs':     'إجمالي الرسائل',
    'stat.newMsgs':  'رسائل جديدة',
    'stat.users':    'إجمالي المستخدمين',
    'stat.products': 'المنتجات',
    /* FILTERS */
    'filter.all':     'الكل',
    'filter.new':     'جديدة',
    'filter.read':    'مقروءة',
    'filter.replied': 'تم الرد',
    /* TABLE */
    'table.user':      'المستخدم',
    'table.email':     'البريد',
    'table.role':      'الدور',
    'table.date':      'تاريخ التسجيل',
    'table.action':    'الإجراء',
    'table.protected': 'محمي',
    'table.noUsers':   'لا يوجد مستخدمون بعد',
    /* MESSAGES */
    'msg.new':         'جديد',
    'msg.read':        'مقروء',
    'msg.replied':     'تم الرد',
    'msg.visitor':     'زائر',
    'msg.fullMsg':     'الرسالة الكاملة:',
    'msg.markReplied': 'تم الرد',
    'msg.markRead':    'تحديد كمقروء',
    'noMsgs':          'لا توجد رسائل',
    'noMsgsYet':       'لا توجد رسائل بعد',
    /* SETTINGS */
    'settings.company': 'معلومات الشركة',
    'settings.name':    'اسم الشركة',
    'settings.email':   'البريد الإلكتروني',
    'settings.address': 'العنوان',
    'settings.social':  'التواصل والسوشيال ميديا',
    'settings.addWa':   'إضافة رقم',
    /* PRODUCT FORM */
    'form.add':       'إضافة منتج جديد',
    'form.edit':      'تعديل المنتج',
    'form.title':     'عنوان المنتج *',
    'form.desc':      'وصف المنتج',
    'form.price':     'السعر',
    'form.currency':  'العملة',
    'form.cat':       'التصنيف',
    'form.badge':     'الشارة',
    'form.none':      'بدون',
    'form.icon':      'أيقونة (Emoji)',
    'form.stars':     'التقييم (1-5)',
    'form.img':       'رابط الصورة',
    'form.features':  'المميزات (افصل بفاصلة ،)',
    'form.required':  'أدخل اسم المنتج',
    /* TOASTS */
    'toast.welcome':      'مرحباً 👋',
    'toast.loggedOut':    'تم تسجيل الخروج',
    'toast.productAdded': 'تم إضافة المنتج ✔',
    'toast.productEdited':'تم تعديل المنتج ✔',
    'toast.productDel':   'تم حذف المنتج',
    'toast.saveErr':      'خطأ في الحفظ',
    'toast.delErr':       'خطأ في الحذف',
    'toast.saved':        'تم الحفظ ✓',
    'toast.roleChanged':  'تم تحديث الدور ✓',
    'toast.userDel':      'تم حذف المستخدم',
    'toast.msgStatus':    'تم تحديث حالة الرسالة ✓',
    'toast.msgDel':       'تم حذف الرسالة',
    /* CONFIRMS */
    'confirm.delProduct': 'تأكيد حذف المنتج؟',
    'confirm.delUser':    'هل تريد حذف هذا المستخدم؟',
    'confirm.delMsg':     'هل تريد حذف هذه الرسالة؟',
  },

  en: {
    'nav.admin':   'Dashboard',
    'nav.login':   'Login',
    'nav.logout':  'Logout',
    'nav.wa':      'WhatsApp',
    'hero.badge':  'Tech Services Store',
    'hero.h1a':    'Everything You Need',
    'hero.h1b':    'In The Tech World',
    'hero.sub':    'Websites · Apps · 3D Printing · AI Bots · Design · Systems',
    'hero.s1':     'Happy Clients',
    'hero.s2':     'Services',
    'hero.s3':     'Years Experience',
    'hero.s4':     'Client Satisfaction',
    'search.ph':   'Search for a service...',
    'auth.title.login':    'Sign In',
    'auth.title.register': 'Create Account',
    'auth.sub.login':      'Access your account',
    'auth.sub.register':   'Create your account now',
    'auth.google':         'Continue with Google',
    'auth.or':             'or',
    'auth.email':          'Email Address',
    'auth.pass':           'Password',
    'auth.btn.login':      'Sign In',
    'auth.btn.register':   'Create Account',
    'auth.switch.login':   'Have an account? <a onclick="toggleAuthMode()">Sign In</a>',
    'auth.switch.register':"Don't have an account? <a onclick=\"toggleAuthMode()\">Sign Up</a>",
    'err.empty':       'Enter email and password',
    'err.notfound':    'Email not found',
    'err.wrongpass':   'Wrong password',
    'err.exists':      'Email already in use',
    'err.invalidemail':'Invalid email address',
    'err.weakpass':    'Password is too weak',
    'err.credential':  'Invalid credentials',
    'err.google':      'Google sign-in failed',
    'err.general':     'An error occurred, please try again',
    'role.admin':    '👑 Admin',
    'role.worker':   '🔧 Worker',
    'role.customer': '👤 Customer',
    'cat.all':    '🌐 All',
    'cat.web':    '💻 Websites',
    'cat.3d':     '🖨️ 3D Printing',
    'cat.app':    '📱 Apps',
    'cat.bot':    '🤖 AI Bots',
    'cat.design': '🎨 Design',
    'cat.sys':    '⚙️ Systems',
    'cat.label.web':    'Website',
    'cat.label.3d':     '3D Printing',
    'cat.label.app':    'App',
    'cat.label.bot':    'AI Bot',
    'cat.label.design': 'Design',
    'cat.label.sys':    'System',
    'cat.label.solar':  'Solar Energy',
    'btn.order':       'Order',
    'results.count':   'service(s)',
    'results.admin':   'Admin Mode 👑',
    'results.worker':  'Worker Mode 🔧',
    'results.link':    'Dashboard ↗',
    'product.contact': 'Contact for details',
    'product.wa.btn':  'Contact on WhatsApp',
    'product.msg':     'Hello, I\'m interested in "{t}" at {p} {c}. Can you give more details?',
    'order.msg':       'Hello, I\'d like to inquire about "{t}" — Price: {p} {c}',
    'badge.new':       'New',
    'badge.hot':       '🔥 Hot',
    'empty.text':      'No results found',
    'btn.save':   'Save',
    'btn.cancel': 'Cancel',
    'btn.edit':   'Edit',
    'btn.delete': 'Delete',
    'btn.add':    'Add',
    'admin.panel':     'Dashboard',
    'admin.overview':  'Overview',
    'admin.messages':  'Messages',
    'admin.products':  'Products',
    'admin.pricing':   'Pricing',
    'admin.services':  'Services',
    'admin.settings':  'Settings',
    'admin.users':     'Users',
    'admin.backStore': 'Back to Store',
    'admin.logout':    'Sign Out',
    'admin.welcome':   'Welcome to IDEA TECH Dashboard',
    'admin.general':   'General',
    'admin.manage':    'Store Management',
    'admin.team':      'Team',
    'admin.addProduct':'Add Product',
    'admin.addService':'Add Service',
    'admin.recentMsgs':'Recent Messages',
    'stat.msgs':     'Total Messages',
    'stat.newMsgs':  'New Messages',
    'stat.users':    'Total Users',
    'stat.products': 'Products',
    'filter.all':     'All',
    'filter.new':     'New',
    'filter.read':    'Read',
    'filter.replied': 'Replied',
    'table.user':      'User',
    'table.email':     'Email',
    'table.role':      'Role',
    'table.date':      'Registration Date',
    'table.action':    'Action',
    'table.protected': 'Protected',
    'table.noUsers':   'No users yet',
    'msg.new':         'New',
    'msg.read':        'Read',
    'msg.replied':     'Replied',
    'msg.visitor':     'Visitor',
    'msg.fullMsg':     'Full Message:',
    'msg.markReplied': 'Mark Replied',
    'msg.markRead':    'Mark as Read',
    'noMsgs':          'No messages',
    'noMsgsYet':       'No messages yet',
    'settings.company': 'Company Info',
    'settings.name':    'Company Name',
    'settings.email':   'Email',
    'settings.address': 'Address',
    'settings.social':  'Contact & Social Media',
    'settings.addWa':   'Add Number',
    'form.add':       'Add New Product',
    'form.edit':      'Edit Product',
    'form.title':     'Product Title *',
    'form.desc':      'Description',
    'form.price':     'Price',
    'form.currency':  'Currency',
    'form.cat':       'Category',
    'form.badge':     'Badge',
    'form.none':      'None',
    'form.icon':      'Icon (Emoji)',
    'form.stars':     'Rating (1-5)',
    'form.img':       'Image URL',
    'form.features':  'Features (comma separated)',
    'form.required':  'Enter product title',
    'toast.welcome':      'Welcome 👋',
    'toast.loggedOut':    'Signed out',
    'toast.productAdded': 'Product added ✔',
    'toast.productEdited':'Product updated ✔',
    'toast.productDel':   'Product deleted',
    'toast.saveErr':      'Save error',
    'toast.delErr':       'Delete error',
    'toast.saved':        'Saved ✓',
    'toast.roleChanged':  'Role updated ✓',
    'toast.userDel':      'User deleted',
    'toast.msgStatus':    'Message status updated ✓',
    'toast.msgDel':       'Message deleted',
    'confirm.delProduct': 'Confirm delete product?',
    'confirm.delUser':    'Delete this user?',
    'confirm.delMsg':     'Delete this message?',
  },

  fr: {
    'nav.admin':   'Tableau de bord',
    'nav.login':   'Connexion',
    'nav.logout':  'Déconnexion',
    'nav.wa':      'WhatsApp',
    'hero.badge':  'Boutique de Services Tech',
    'hero.h1a':    'Tout ce dont vous avez besoin',
    'hero.h1b':    'Dans le monde tech',
    'hero.sub':    'Sites web · Apps · Impression 3D · Bots IA · Design · Systèmes',
    'hero.s1':     'Clients satisfaits',
    'hero.s2':     'Services',
    'hero.s3':     'Ans d\'expérience',
    'hero.s4':     'Satisfaction client',
    'search.ph':   'Rechercher un service...',
    'auth.title.login':    'Connexion',
    'auth.title.register': 'Créer un compte',
    'auth.sub.login':      'Accédez à votre compte',
    'auth.sub.register':   'Créez votre compte maintenant',
    'auth.google':         'Continuer avec Google',
    'auth.or':             'ou',
    'auth.email':          'Adresse e-mail',
    'auth.pass':           'Mot de passe',
    'auth.btn.login':      'Se connecter',
    'auth.btn.register':   'Créer le compte',
    'auth.switch.login':   'Vous avez un compte ? <a onclick="toggleAuthMode()">Se connecter</a>',
    'auth.switch.register':'Pas de compte ? <a onclick="toggleAuthMode()">S\'inscrire</a>',
    'err.empty':       'Entrez l\'e-mail et le mot de passe',
    'err.notfound':    'E-mail introuvable',
    'err.wrongpass':   'Mot de passe incorrect',
    'err.exists':      'E-mail déjà utilisé',
    'err.invalidemail':'Adresse e-mail invalide',
    'err.weakpass':    'Mot de passe trop faible',
    'err.credential':  'Identifiants incorrects',
    'err.google':      'Échec de la connexion Google',
    'err.general':     'Une erreur est survenue',
    'role.admin':    '👑 Admin',
    'role.worker':   '🔧 Employé',
    'role.customer': '👤 Client',
    'cat.all':    '🌐 Tout',
    'cat.web':    '💻 Sites web',
    'cat.3d':     '🖨️ Impression 3D',
    'cat.app':    '📱 Applications',
    'cat.bot':    '🤖 Bots IA',
    'cat.design': '🎨 Design',
    'cat.sys':    '⚙️ Systèmes',
    'cat.label.web':    'Site Web',
    'cat.label.3d':     'Impression 3D',
    'cat.label.app':    'Application',
    'cat.label.bot':    'Bot IA',
    'cat.label.design': 'Design',
    'cat.label.sys':    'Système',
    'cat.label.solar':  'Énergie Solaire',
    'btn.order':       'Commander',
    'results.count':   'service(s)',
    'results.admin':   'Mode Admin 👑',
    'results.worker':  'Mode Employé 🔧',
    'results.link':    'Tableau de bord ↗',
    'product.contact': 'Contactez-nous pour les détails',
    'product.wa.btn':  'Contacter sur WhatsApp',
    'product.msg':     'Bonjour, je suis intéressé par "{t}" à {p} {c}. Pouvez-vous donner plus de détails ?',
    'order.msg':       'Bonjour, je voudrais me renseigner sur "{t}" — Prix : {p} {c}',
    'badge.new':       'Nouveau',
    'badge.hot':       '🔥 Populaire',
    'empty.text':      'Aucun résultat',
    'btn.save':   'Enregistrer',
    'btn.cancel': 'Annuler',
    'btn.edit':   'Modifier',
    'btn.delete': 'Supprimer',
    'btn.add':    'Ajouter',
    'admin.panel':     'Tableau de bord',
    'admin.overview':  'Vue d\'ensemble',
    'admin.messages':  'Messages',
    'admin.products':  'Produits',
    'admin.pricing':   'Tarifs',
    'admin.services':  'Services',
    'admin.settings':  'Paramètres',
    'admin.users':     'Utilisateurs',
    'admin.backStore': 'Retour au magasin',
    'admin.logout':    'Déconnexion',
    'admin.welcome':   'Bienvenue sur le tableau de bord IDEA TECH',
    'admin.general':   'Général',
    'admin.manage':    'Gestion du magasin',
    'admin.team':      'Équipe',
    'admin.addProduct':'Ajouter un produit',
    'admin.addService':'Ajouter un service',
    'admin.recentMsgs':'Derniers messages',
    'stat.msgs':     'Total messages',
    'stat.newMsgs':  'Nouveaux messages',
    'stat.users':    'Total utilisateurs',
    'stat.products': 'Produits',
    'filter.all':     'Tous',
    'filter.new':     'Nouveaux',
    'filter.read':    'Lus',
    'filter.replied': 'Répondus',
    'table.user':      'Utilisateur',
    'table.email':     'E-mail',
    'table.role':      'Rôle',
    'table.date':      'Date d\'inscription',
    'table.action':    'Action',
    'table.protected': 'Protégé',
    'table.noUsers':   'Pas encore d\'utilisateurs',
    'msg.new':         'Nouveau',
    'msg.read':        'Lu',
    'msg.replied':     'Répondu',
    'msg.visitor':     'Visiteur',
    'msg.fullMsg':     'Message complet :',
    'msg.markReplied': 'Marquer répondu',
    'msg.markRead':    'Marquer comme lu',
    'noMsgs':          'Aucun message',
    'noMsgsYet':       'Pas encore de messages',
    'settings.company': 'Informations de la société',
    'settings.name':    'Nom de la société',
    'settings.email':   'E-mail',
    'settings.address': 'Adresse',
    'settings.social':  'Contact & Réseaux sociaux',
    'settings.addWa':   'Ajouter un numéro',
    'form.add':       'Ajouter un nouveau produit',
    'form.edit':      'Modifier le produit',
    'form.title':     'Titre du produit *',
    'form.desc':      'Description',
    'form.price':     'Prix',
    'form.currency':  'Devise',
    'form.cat':       'Catégorie',
    'form.badge':     'Badge',
    'form.none':      'Aucun',
    'form.icon':      'Icône (Emoji)',
    'form.stars':     'Note (1-5)',
    'form.img':       'URL de l\'image',
    'form.features':  'Fonctionnalités (séparer par virgule)',
    'form.required':  'Entrez le titre du produit',
    'toast.welcome':      'Bienvenue 👋',
    'toast.loggedOut':    'Déconnecté',
    'toast.productAdded': 'Produit ajouté ✔',
    'toast.productEdited':'Produit modifié ✔',
    'toast.productDel':   'Produit supprimé',
    'toast.saveErr':      'Erreur de sauvegarde',
    'toast.delErr':       'Erreur de suppression',
    'toast.saved':        'Sauvegardé ✓',
    'toast.roleChanged':  'Rôle mis à jour ✓',
    'toast.userDel':      'Utilisateur supprimé',
    'toast.msgStatus':    'Statut mis à jour ✓',
    'toast.msgDel':       'Message supprimé',
    'confirm.delProduct': 'Confirmer la suppression ?',
    'confirm.delUser':    'Supprimer cet utilisateur ?',
    'confirm.delMsg':     'Supprimer ce message ?',
  }
};

/* ══════════════════════════════════════
   GLOBALS
══════════════════════════════════════ */
let currentLang  = localStorage.getItem('it_lang')  || 'ar';
let currentTheme = localStorage.getItem('it_theme') || 'dark';
let currentFilter = 'all';
let searchTerm    = '';
let isRegisterMode = false;

/* ══════════════════════════════════════
   TRANSLATION HELPER
══════════════════════════════════════ */
function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key])
      || (TRANSLATIONS['ar'][key])
      || key;
}

/* ══════════════════════════════════════
   THEME
══════════════════════════════════════ */
function applyTheme(theme) {
  currentTheme = theme;
  localStorage.setItem('it_theme', theme);
  document.documentElement.setAttribute('data-theme', theme);

  const icon = theme === 'dark' ? 'light_mode' : 'dark_mode';
  document.querySelectorAll('.theme-icon').forEach(el => {
    el.textContent = icon;
  });
}

function toggleTheme() {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

/* ══════════════════════════════════════
   LANGUAGE
══════════════════════════════════════ */
function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('it_lang', lang);

  const html = document.documentElement;
  if (lang === 'ar') {
    html.setAttribute('lang', 'ar');
    html.setAttribute('dir', 'rtl');
    document.body.style.fontFamily = "'Cairo','Tajawal',sans-serif";
  } else {
    html.setAttribute('lang', lang);
    html.setAttribute('dir', 'ltr');
    document.body.style.fontFamily = "'Inter','Cairo',sans-serif";
  }

  // Update all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (el.tagName === 'INPUT' && el.getAttribute('type') !== 'button') {
      el.placeholder = val;
    } else if (el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });

  // Search placeholder
  const si = document.getElementById('searchInput');
  if (si) si.placeholder = t('search.ph');

  // Lang buttons highlight
  ['AR','EN','FR'].forEach(code => {
    document.querySelectorAll(`.lang-btn-${code.toLowerCase()}`).forEach(btn => {
      btn.classList.toggle('active', code.toLowerCase() === lang);
    });
  });

  // Re-render dynamic UI
  renderFilterTabs();
  if (typeof renderProducts === 'function') renderProducts();
  updateAuthModalTexts();
}

function setLang(lang) { applyLang(lang); }

/* ══════════════════════════════════════
   FILTER TABS
══════════════════════════════════════ */
function renderFilterTabs() {
  const container = document.getElementById('filterTabs');
  if (!container) return;

  const tabs = ['all','web','3d','app','bot','design','sys'];
  container.innerHTML = tabs.map(key => `
    <button class="ftab${currentFilter === key ? ' active' : ''}"
            onclick="setFilter('${key}', this)">
      ${t('cat.' + key)}
    </button>
  `).join('');
}

function setFilter(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (typeof renderProducts === 'function') renderProducts();
}

function filterProducts() {
  searchTerm = (document.getElementById('searchInput')?.value || '').trim().toLowerCase();
  if (typeof renderProducts === 'function') renderProducts();
}

/* ══════════════════════════════════════
   AUTH MODAL TEXTS
══════════════════════════════════════ */
function updateAuthModalTexts() {
  const mode = isRegisterMode ? 'register' : 'login';

  const titleEl = document.getElementById('authTitle');
  const subEl   = document.getElementById('authSub');
  const btnEl   = document.getElementById('authSubmitBtn');
  const swEl    = document.getElementById('authSwitchLine');

  if (titleEl) titleEl.textContent = t(`auth.title.${mode}`);
  if (subEl)   subEl.textContent   = t(`auth.sub.${mode}`);
  if (btnEl)   btnEl.textContent   = t(`auth.btn.${mode}`);
  if (swEl)    swEl.innerHTML      = t(`auth.switch.${mode}`);
}

function toggleAuthMode() {
  isRegisterMode = !isRegisterMode;
  updateAuthModalTexts();
  const errEl = document.getElementById('authErr');
  if (errEl) errEl.textContent = '';
}

function openAuth() {
  isRegisterMode = false;
  updateAuthModalTexts();
  document.getElementById('authModal').classList.add('open');
  const errEl = document.getElementById('authErr');
  if (errEl) errEl.textContent = '';
}

function closeAuth() {
  document.getElementById('authModal').classList.remove('open');
}

/* Password visibility toggle */
function togglePassVisibility(inputId, btnEl) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isText = input.type === 'text';
  input.type = isText ? 'password' : 'text';
  const icon = btnEl.querySelector('.material-symbols-outlined');
  if (icon) icon.textContent = isText ? 'visibility' : 'visibility_off';
}

/* ══════════════════════════════════════
   TOAST
══════════════════════════════════════ */
let _toastTimer;
function showToast(msg, isErr = false) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.className = 'toast show' + (isErr ? ' err' : '');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

/* ══════════════════════════════════════
   PARTICLES
══════════════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];

  const resize = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 55; i++) {
    pts.push({
      x: Math.random() * 2000,
      y: Math.random() * 2000,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r:  Math.random() * 1.5 + 0.5,
      a:  Math.random() * 0.45 + 0.1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${p.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ══════════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════════ */
function runCounters(productTotal) {
  const targets = [
    { id: 'sc1', val: 150, suffix: '+' },
    { id: 'sc2', val: productTotal, suffix: '' },
    { id: 'sc3', val: 4, suffix: '+' },
    { id: 'sc4', val: 98, suffix: '%' },
  ];
  targets.forEach(({ id, val, suffix }) => {
    const el = document.getElementById(id);
    if (!el) return;
    let current = 0;
    const steps = 60;
    const inc = val / steps;
    const interval = setInterval(() => {
      current = Math.min(current + inc, val);
      el.textContent = Math.floor(current) + suffix;
      if (current >= val) clearInterval(interval);
    }, 30);
  });
}

/* ══════════════════════════════════════
   REVEAL ON SCROLL
══════════════════════════════════════ */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ══════════════════════════════════════
   ADMIN SIDEBAR TOGGLE
══════════════════════════════════════ */
function toggleSidebar() {
  const s = document.getElementById('adm-sidebar');
  const o = document.getElementById('sidebar-overlay');
  if (!s || !o) return;
  s.classList.toggle('open');
  o.classList.toggle('open');
  document.body.style.overflow = s.classList.contains('open') ? 'hidden' : '';
}

/* ══════════════════════════════════════
   INIT — called after DOM ready
══════════════════════════════════════ */

function toggleContactMenu() {
  const menu    = document.getElementById('contactMenu');
  const overlay = document.getElementById('contactOverlay');
  const isOpen  = menu.style.display === 'block';
  menu.style.display    = isOpen ? 'none' : 'block';
  overlay.style.display = isOpen ? 'none' : 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);
  applyLang(currentLang);
  initParticles();
  initReveal();
});

