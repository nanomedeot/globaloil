/* Global Oil — interacciones del sitio */
(function () {
  'use strict';

  var ICONS = 'assets/img/icons.svg';
  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function icon(name, cls) {
    return '<svg class="icon ' + (cls || '') + '" aria-hidden="true"><use href="' + ICONS + '#' + name + '"/></svg>';
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function telHref(num) {
    var d = num.replace(/\D/g, '').replace(/^0/, '');
    return 'tel:+54' + d;
  }
  function directionsHref(st) {
    return 'https://www.google.com/maps/dir/?api=1&destination=' + st.lat + ',' + st.lng;
  }
  function flagHtml(st) {
    if (st.bandera === 'YPF') return '<span class="flag flag--ypf">YPF' + (st.full ? ' Full' : '') + '</span>';
    return '<span class="flag flag--puma">Puma</span>';
  }
  function distanceKm(a, b) {
    var R = 6371, toR = Math.PI / 180;
    var dLat = (b.lat - a.lat) * toR, dLng = (b.lng - a.lng) * toR;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(a.lat * toR) * Math.cos(b.lat * toR) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  function fmtKm(km) { return km < 1 ? Math.round(km * 1000) + ' m' : (km < 10 ? km.toFixed(1) : Math.round(km)) + ' km'; }
  function normalize(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }

  /* ---------- Header y navegación ---------- */
  var header = $('.header');
  function onScroll() {
    if (header && !header.classList.contains('header--solid')) header.classList.toggle('is-solid', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var toggle = $('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open);
      toggle.innerHTML = icon(open ? 'x' : 'menu');
    });
    $$('.nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = icon('menu');
      });
    });
  }

  /* ---------- Carrusel del hero ---------- */
  var slides = $$('.hero__slide');
  if (slides.length > 1) {
    var dotsWrap = $('.hero__dots'), word = $('.hero__word'), current = 0, timer;
    slides.forEach(function (s, i) {
      var b = document.createElement('button');
      b.className = 'hero__dot'; b.setAttribute('aria-label', 'Ver imagen ' + (i + 1));
      b.addEventListener('click', function () { go(i); });
      dotsWrap.appendChild(b);
    });
    var dots = $$('.hero__dot');
    function go(i) {
      slides[current].classList.remove('is-active'); dots[current].classList.remove('is-active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      void dots[current].offsetWidth; dots[current].classList.add('is-active');
      if (word) word.textContent = slides[current].dataset.word || '';
      clearTimeout(timer);
      if (!reduceMotion) timer = setTimeout(function () { go(current + 1); }, 7000);
    }
    go(0);
  }

  /* ---------- Aparición al hacer scroll ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(function (el) { io.observe(el); });

    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        co.unobserve(e.target);
        var el = e.target, to = +el.dataset.count, t0 = null, dur = 1400;
        if (reduceMotion) { el.textContent = to; return; }
        requestAnimationFrame(function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        });
      });
    }, { threshold: .5 });
    $$('[data-count]').forEach(function (el) { co.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  $$('[data-years-since]').forEach(function (el) { el.dataset.count = new Date().getFullYear() - (+el.dataset.yearsSince); });

  /* ---------- WhatsApp ---------- */
  var cfg = window.GLOBAL_OIL || {};
  $$('[data-wa]').forEach(function (a) {
    var msg = a.dataset.wa || 'Hola Global Oil, quería hacer una consulta.';
    a.href = 'https://wa.me/' + cfg.whatsapp + '?text=' + encodeURIComponent(msg);
    a.target = '_blank'; a.rel = 'noopener';
  });

  /* ---------- Carrusel de estaciones (home) ---------- */
  var rail = $('#rail-estaciones');
  if (rail && window.ESTACIONES) {
    rail.innerHTML = window.ESTACIONES.map(function (st) {
      return '<a class="st-mini" href="estaciones.html#' + st.id + '">' +
        '<img src="' + st.img + '" alt="Estación ' + esc(st.nombre) + '" loading="lazy" width="400" height="400">' +
        '<div class="st-mini__body">' + flagHtml(st) +
        '<h3>' + esc(st.nombre) + '</h3><p>' + esc(st.localidad) + ', ' + esc(st.provincia) + '</p></div></a>';
    }).join('');
    $$('[data-rail]').forEach(function (b) {
      b.addEventListener('click', function () {
        rail.scrollBy({ left: (+b.dataset.rail) * (rail.clientWidth * .8), behavior: 'smooth' });
      });
    });
  }

  /* ---------- Mapa ---------- */
  function pinIcon(st) {
    var c = st.bandera === 'YPF' ? '#0b4ea2' : '#e2231a';
    var svg = '<svg class="gpin" viewBox="0 0 40 48" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M20 47s16-14.4 16-27A16 16 0 0 0 4 20c0 12.6 16 27 16 27z" fill="' + c + '" stroke="#fff" stroke-width="2.5"/>' +
      '<circle cx="20" cy="20" r="7" fill="#fff"/></svg>';
    return L.divIcon({ html: svg, className: '', iconSize: [40, 48], iconAnchor: [20, 46], popupAnchor: [0, -40] });
  }
  function popupHtml(st) {
    var tel = st.telefonos[0];
    return '<div class="pop"><img src="' + st.img + '" alt="">' +
      '<div class="pop__body">' + flagHtml(st) + '<h4>' + esc(st.nombre) + '</h4>' +
      '<p>' + esc(st.direccion) + '<br>' + esc(st.localidad) + ', ' + esc(st.provincia) + '</p>' +
      '<div class="pop__actions"><a class="go" href="' + directionsHref(st) + '" target="_blank" rel="noopener">' + icon('navigation') + 'Cómo llegar</a>' +
      (tel ? '<a href="' + telHref(tel.numero) + '">' + icon('phone') + 'Llamar</a>' : '') +
      '<a href="estaciones.html#' + st.id + '">Ver más</a></div></div></div>';
  }
  function createMap(el, stations) {
    if (!window.L || !el) return null;
    var map = L.map(el, { scrollWheelZoom: false, zoomControl: true });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19, className: 'map-tiles'
    }).addTo(map);
    var markers = {};
    stations.forEach(function (st) {
      markers[st.id] = L.marker([st.lat, st.lng], { icon: pinIcon(st), title: st.nombre })
        .bindPopup(popupHtml(st), { maxWidth: 260, minWidth: 260 }).addTo(map);
    });
    if ('ResizeObserver' in window) new ResizeObserver(function () { map.invalidateSize(); }).observe(el);
    var bounds = L.latLngBounds(stations.map(function (s) { return [s.lat, s.lng]; }));
    map.fitBounds(bounds, { padding: [40, 40] });
    el.addEventListener('click', function () { map.scrollWheelZoom.enable(); }, { once: true });
    return { map: map, markers: markers, bounds: bounds };
  }
  var userMarker;
  function locate(ctx, cb) {
    if (!navigator.geolocation) { alert('Tu navegador no permite obtener la ubicación.'); return; }
    navigator.geolocation.getCurrentPosition(function (p) {
      var pos = { lat: p.coords.latitude, lng: p.coords.longitude };
      if (ctx) {
        if (userMarker) userMarker.remove();
        userMarker = L.marker([pos.lat, pos.lng], {
          icon: L.divIcon({ html: '<div class="user-dot"></div>', className: '', iconSize: [18, 18], iconAnchor: [9, 9] }),
          title: 'Tu ubicación'
        }).addTo(ctx.map);
      }
      cb(pos);
    }, function () {
      alert('No pudimos obtener tu ubicación. Revisá los permisos del navegador.');
    }, { enableHighAccuracy: true, timeout: 10000 });
  }
  function nearest(pos) {
    return window.ESTACIONES.map(function (s) { return { st: s, km: distanceKm(pos, s) }; })
      .sort(function (a, b) { return a.km - b.km; });
  }

  var homeMapEl = $('#map-home');
  if (homeMapEl && window.ESTACIONES) {
    var homeCtx = createMap(homeMapEl, window.ESTACIONES);
    var lb = $('#locate-home');
    if (lb && homeCtx) lb.addEventListener('click', function () {
      locate(homeCtx, function (pos) {
        var n = nearest(pos)[0];
        homeCtx.map.fitBounds(L.latLngBounds([[pos.lat, pos.lng], [n.st.lat, n.st.lng]]), { padding: [80, 80], maxZoom: 14 });
        homeCtx.markers[n.st.id].openPopup();
        lb.innerHTML = icon('locate') + 'La más cercana: ' + esc(n.st.nombre) + ' (' + fmtKm(n.km) + ')';
      });
    });
  }

  /* ---------- Buscador de estaciones ---------- */
  var listEl = $('#st-list');
  if (listEl && window.ESTACIONES) {
    var SV = window.SERVICIOS;
    var state = { q: '', bandera: '', provincia: '', servicios: [], pos: null };
    var ctx = createMap($('#map-finder'), window.ESTACIONES);

    function cardHtml(st, km) {
      var phones = st.telefonos.map(function (t) {
        return '<a class="btn btn--outline btn--sm" href="' + telHref(t.numero) + '">' + icon('phone') + esc(t.numero) + '</a>';
      }).join('');
      var mails = st.emails.map(function (m) {
        return '<a href="mailto:' + m + '">' + esc(m) + '</a>';
      }).join('<br>');
      return '<article class="st-card" id="' + st.id + '" data-id="' + st.id + '">' +
        '<div class="st-card__img"><img src="' + st.img + '" alt="Estación ' + esc(st.nombre) + '" loading="lazy" width="400" height="400">' + flagHtml(st) + '</div>' +
        '<div class="st-card__body">' +
        '<div class="st-card__top"><div><h3>' + esc(st.nombre) + '</h3><p class="loc">' + esc(st.localidad) + ', ' + esc(st.provincia) +
        (st.sede ? ' · <strong style="color:var(--azul)">Administración central</strong>' : '') + '</p></div>' +
        (km != null ? '<span class="dist">' + fmtKm(km) + '</span>' : '') + '</div>' +
        '<div class="addr">' + icon('pin') + '<span>' + esc(st.direccion) + '</span></div>' +
        '<div class="svc-icons">' + st.servicios.map(function (k) {
          return SV[k] ? '<span title="' + esc(SV[k].label) + '">' + icon(SV[k].icon) + '<span class="sr-only">' + esc(SV[k].label) + '</span></span>' : '';
        }).join('') + '</div>' +
        '<div class="st-card__actions"><a class="btn btn--primary btn--sm" href="' + directionsHref(st) + '" target="_blank" rel="noopener">' + icon('navigation') + 'Cómo llegar</a>' +
        phones + '</div>' +
        '<details><summary>Servicios y medios de pago ' + icon('chevron-down') + '</summary>' +
        '<div class="svc-list">' + st.servicios.map(function (k) { return SV[k] ? '<span>' + esc(SV[k].label) + '</span>' : ''; }).join('') + '</div>' +
        '<p>' + esc(st.detalle) + '</p>' +
        '<dl><dt>Medios de pago</dt><dd>' + esc(st.pagos) + '</dd>' +
        (mails ? '<dt>E-mail</dt><dd>' + mails + '</dd>' : '') + '</dl>' +
        (st.promo ? '<div class="promo"><strong>Promociones:</strong> ' + esc(st.promo) + '</div>' : '') +
        '</details></div></article>';
    }

    function render() {
      var q = normalize(state.q.trim());
      var items = window.ESTACIONES.filter(function (st) {
        if (state.bandera && st.bandera !== state.bandera) return false;
        if (state.provincia && st.provincia !== state.provincia) return false;
        for (var i = 0; i < state.servicios.length; i++) if (st.servicios.indexOf(state.servicios[i]) < 0) return false;
        if (q) {
          var hay = normalize([st.nombre, st.localidad, st.provincia, st.direccion, st.bandera, st.detalle].join(' '));
          if (hay.indexOf(q) < 0) return false;
        }
        return true;
      }).map(function (st) { return { st: st, km: state.pos ? distanceKm(state.pos, st) : null }; });
      if (state.pos) items.sort(function (a, b) { return a.km - b.km; });

      $('#results-count').textContent = items.length === 1 ? '1 estación' : items.length + ' estaciones';
      listEl.innerHTML = items.length ? items.map(function (it) { return cardHtml(it.st, it.km); }).join('')
        : '<div class="empty">No encontramos estaciones con esos filtros.<br>Probá quitando alguno.</div>';

      if (ctx) {
        var ids = items.map(function (it) { return it.st.id; });
        Object.keys(ctx.markers).forEach(function (id) {
          var m = ctx.markers[id];
          if (ids.indexOf(id) >= 0) { if (!ctx.map.hasLayer(m)) m.addTo(ctx.map); } else m.remove();
        });
        if (items.length) {
          var pts = items.map(function (it) { return [it.st.lat, it.st.lng]; });
          if (state.pos) pts.push([state.pos.lat, state.pos.lng]);
          ctx.map.fitBounds(L.latLngBounds(pts), { padding: [50, 50], maxZoom: 14 });
        }
      }
      $$('.st-card', listEl).forEach(function (card) {
        card.addEventListener('mouseenter', function () { highlight(card.dataset.id, false); });
        card.querySelector('.st-card__img').addEventListener('click', function () { highlight(card.dataset.id, true); });
      });
    }

    function highlight(id, open) {
      $$('.st-card.is-active', listEl).forEach(function (c) { c.classList.remove('is-active'); });
      var card = document.getElementById(id);
      if (card) card.classList.add('is-active');
      if (!ctx) return;
      $$('.gpin.is-active').forEach(function (p) { p.classList.remove('is-active'); });
      var m = ctx.markers[id];
      if (m && m._icon) m._icon.querySelector('.gpin').classList.add('is-active');
      if (open && m) { ctx.map.setView(m.getLatLng(), 14); m.openPopup(); }
    }

    if (ctx) Object.keys(ctx.markers).forEach(function (id) {
      ctx.markers[id].on('click', function () {
        var card = document.getElementById(id);
        if (card) { card.scrollIntoView({ behavior: 'smooth', block: 'start' }); highlight(id, false); }
      });
    });

    $('#q').addEventListener('input', function (e) { state.q = e.target.value; render(); });
    $$('[data-filter]').forEach(function (b) {
      b.addEventListener('click', function () {
        var key = b.dataset.filter, val = b.dataset.value;
        if (key === 'servicios') {
          var i = state.servicios.indexOf(val);
          if (i >= 0) state.servicios.splice(i, 1); else state.servicios.push(val);
          b.setAttribute('aria-pressed', i < 0);
        } else {
          state[key] = state[key] === val ? '' : val;
          $$('[data-filter="' + key + '"]').forEach(function (o) { o.setAttribute('aria-pressed', o.dataset.value === state[key]); });
        }
        render();
      });
    });
    $('#reset').addEventListener('click', function () {
      state.q = ''; state.bandera = ''; state.provincia = ''; state.servicios = [];
      $('#q').value = '';
      $$('[data-filter]').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
      render();
    });
    var nb = $('#near-me');
    nb.addEventListener('click', function () {
      locate(ctx, function (pos) {
        state.pos = pos; nb.setAttribute('aria-pressed', 'true');
        nb.innerHTML = icon('locate') + 'Ordenadas por cercanía';
        render();
        listEl.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Filtro inicial desde la URL (?servicio=parrilla) y estación destacada (#id)
    var params = new URLSearchParams(location.search);
    ['bandera', 'provincia'].forEach(function (k) {
      if (params.get(k)) { state[k] = params.get(k); $$('[data-filter="' + k + '"][data-value="' + state[k] + '"]').forEach(function (o) { o.setAttribute('aria-pressed', 'true'); }); }
    });
    if (params.get('servicio')) {
      state.servicios = [params.get('servicio')];
      $$('[data-filter="servicios"][data-value="' + state.servicios[0] + '"]').forEach(function (o) { o.setAttribute('aria-pressed', 'true'); });
    }
    render();
    function focusHash() {
      var id = location.hash.slice(1);
      if (!id) return;
      if (!document.getElementById(id)) $('#reset').click();
      setTimeout(function () {
        var card = document.getElementById(id);
        if (card) { card.scrollIntoView({ block: 'start' }); highlight(id, true); card.querySelector('details').open = true; }
      }, 300);
    }
    focusHash();
    window.addEventListener('hashchange', focusHash);
  }

  /* ---------- Formularios ----------
   * Sin servidor: se abre el correo del usuario con el mensaje armado.
   * Si en el futuro hay un endpoint (PHP, Formspree, etc.), poné su URL
   * en el atributo data-endpoint del <form> y se enviará por POST.
   */
  $$('form[data-form]').forEach(function (form) {
    var tabs = $$('.tabs button', form);
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        tabs.forEach(function (o) { o.setAttribute('aria-selected', o === t); });
        form.dataset.to = t.dataset.to;
        form.elements.motivo.value = t.dataset.motivo;
        $$('[data-only]', form).forEach(function (f) { f.hidden = f.dataset.only !== t.dataset.motivo; });
      });
    });
    var initial = new URLSearchParams(location.search).get('motivo') || (location.hash === '#trabaja' ? 'Trabajá con nosotros' : '');
    if (initial) tabs.forEach(function (t) { if (t.dataset.motivo === initial) t.click(); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var ok = $('.form-ok', form);
      if (form.dataset.endpoint) {
        fetch(form.dataset.endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (r) { if (!r.ok) throw r; ok.textContent = '¡Gracias! Recibimos tu mensaje y te responderemos a la brevedad.'; ok.classList.add('is-visible'); form.reset(); })
          .catch(function () { alert('No pudimos enviar el mensaje. Probá de nuevo o escribinos por WhatsApp.'); });
        return;
      }
      var lines = [];
      data.forEach(function (v, k) { if (v && k !== 'motivo' && typeof v === 'string') lines.push(k.charAt(0).toUpperCase() + k.slice(1) + ': ' + v); });
      var motivo = data.get('motivo') || 'Consulta';
      var to = form.dataset.to || cfg.email;
      var body = lines.join('\n') + (motivo === 'Trabajá con nosotros' ? '\n\n(Adjuntá tu CV a este correo)' : '');
      location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(motivo + ' — web Global Oil') + '&body=' + encodeURIComponent(body);
      ok.textContent = 'Se abrió tu aplicación de correo con el mensaje listo para enviar.';
      ok.classList.add('is-visible');
    });
  });
})();
