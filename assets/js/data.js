/*
 * Datos de las estaciones de Global Oil.
 * Para agregar, quitar o corregir una estación, editá sólo este archivo:
 * el listado, los filtros y el mapa se generan automáticamente.
 *
 * servicios: claves de SERVICIOS (abajo). Definen íconos y filtros.
 * telefonos: { tipo, numero } con el número tal como se muestra.
 */
window.SERVICIOS = {
  '24h':           { label: 'Abierto 24 h',          icon: 'clock' },
  gnc:             { label: 'GNC',                   icon: 'flame' },
  lubricantes:     { label: 'Lubricantes',           icon: 'droplet' },
  urea:            { label: 'Urea',                  icon: 'droplet' },
  lubricentro:     { label: 'Lubricentro',           icon: 'wrench' },
  cafeteria:       { label: 'Cafetería',             icon: 'coffee' },
  comidas:         { label: 'Comidas',               icon: 'utensils' },
  parrilla:        { label: 'Parrilla',              icon: 'grill' },
  minimercado:     { label: 'Minimercado',           icon: 'bag' },
  duchas:          { label: 'Duchas',                icon: 'shower' },
  wifi:            { label: 'WiFi',                  icon: 'wifi' },
  extracash:       { label: 'Extra cash',            icon: 'cash' },
  inflado:         { label: 'Inflado de neumáticos', icon: 'gauge' },
  garrafas:        { label: 'Garrafas, leña y carbón', icon: 'box' },
  accesorios:      { label: 'Accesorios del automotor', icon: 'car' },
  estacionamiento: { label: 'Estacionamiento',       icon: 'parking' },
  termo:           { label: 'Agua para el termo',    icon: 'mate' },
  bascula:         { label: 'Báscula para camiones', icon: 'truck' },
  accesible:       { label: 'Accesible',             icon: 'accessible' }
};

window.ESTACIONES = [
  {
    id: 'centenario',
    nombre: 'YPF Full Centenario',
    bandera: 'YPF', full: true,
    localidad: 'Centenario', provincia: 'Neuquén',
    direccion: 'Expedicionarios del Desierto y Paraguay — Ruta 7, 1° rotonda',
    lat: -38.8361396, lng: -68.1274809,
    telefonos: [{ tipo: 'Tel', numero: '0299 487-0500' }],
    emails: ['centenarioypf@globaloilsrl.com.ar'],
    img: 'assets/img/estaciones/centenario.webp',
    servicios: ['cafeteria', 'comidas', 'minimercado', 'lubricantes', 'garrafas', 'wifi', 'extracash', 'inflado'],
    detalle: 'Venta de combustibles, lubricantes, aceites y garrafas. Leña, carbón y agua destilada. Cafetería, facturas, comida caliente, sándwiches, bebidas frescas, productos esenciales y helados. Extra cash en playa y en Full.',
    pagos: 'Débito y crédito (Visa, Cabal, Amex y Mastercard), Mercado Pago, Pago Todo, App YPF e YPF en Ruta.'
  },
  {
    id: 'anelo-1',
    nombre: 'YPF Full Añelo',
    bandera: 'YPF', full: true,
    localidad: 'Añelo', provincia: 'Neuquén',
    direccion: 'Calle Intendente Tanuz y Calle 01',
    lat: -38.3520279, lng: -68.7874695,
    telefonos: [{ tipo: 'Tel', numero: '0299 490-4103' }, { tipo: 'Cel', numero: '0299 631-3721' }],
    emails: ['anelo@globaloilsrl.com.ar'],
    img: 'assets/img/estaciones/anelo-1.webp',
    servicios: ['24h', 'cafeteria', 'comidas', 'minimercado', 'duchas', 'lubricentro', 'lubricantes', 'accesorios', 'wifi', 'extracash', 'inflado', 'estacionamiento', 'termo'],
    detalle: 'Servicio las 24 h. Cafetería, hamburguesas, platos elaborados y comidas saludables. Productos esenciales, kiosco móvil, duchas y baños las 24 h. Lubricentro y venta de accesorios para el automotor. Agua caliente sin cargo.',
    pagos: 'Contado, tarjetas de crédito, Ticket Car, Mercado Pago, App YPF, YPF en Ruta y extra cash.'
  },
  {
    id: 'anelo-2',
    nombre: 'YPF Full Añelo 2',
    bandera: 'YPF', full: true,
    localidad: 'Añelo', provincia: 'Neuquén',
    direccion: 'Parque Industrial — Manzana 301, Lote 1',
    lat: -38.342598, lng: -68.803382,
    telefonos: [],
    emails: ['anelo2@globaloilsrl.com.ar'],
    img: 'assets/img/estaciones/anelo-2.webp',
    servicios: ['24h', 'cafeteria', 'comidas', 'minimercado', 'duchas', 'lubricentro', 'lubricantes', 'accesorios', 'wifi', 'extracash', 'inflado', 'estacionamiento', 'termo'],
    detalle: 'Servicio las 24 h. Cafetería, hamburguesas, platos elaborados y comidas saludables. Productos esenciales, kiosco móvil, duchas y baños las 24 h. Lubricentro y venta de accesorios para el automotor. Agua caliente sin cargo.',
    pagos: 'Contado, tarjetas de crédito, Ticket Car, Mercado Pago, App YPF, YPF en Ruta y extra cash.'
  },
  {
    id: 'la-anonima',
    nombre: 'Puma La Anónima',
    bandera: 'PUMA',
    localidad: 'Neuquén Capital', provincia: 'Neuquén',
    direccion: 'Antártida Argentina 1215 (complejo La Anónima)',
    lat: -38.9471229, lng: -68.0755682,
    telefonos: [{ tipo: 'Tel', numero: '0299 447-3060' }, { tipo: 'Cel', numero: '0299 504-8767' }],
    emails: ['laanonima@globaloilsrl.com.ar'],
    img: 'assets/img/estaciones/la-anonima.webp',
    servicios: ['cafeteria', 'comidas', 'minimercado', 'lubricantes', 'accesorios', 'wifi', 'extracash', 'estacionamiento', 'termo'],
    detalle: 'Combustibles líquidos, lubricantes y accesorios para el automotor. Cafetería, minimercado, comida al plato y viandas. Agua para el termo y estacionamiento exclusivo.',
    pagos: 'Tarjetas de crédito y débito, Mercado Pago y extra cash.'
  },
  {
    id: 'el-puente',
    nombre: 'Puma El Puente',
    bandera: 'PUMA',
    localidad: 'Neuquén Capital', provincia: 'Neuquén',
    direccion: 'Perticone 2445 — Puente Carretero Neuquén / Cipolletti',
    lat: -38.954726, lng: -68.0269759,
    telefonos: [{ tipo: 'Tel', numero: '0299 440-3815' }, { tipo: 'Cel', numero: '0299 401-6069' }, { tipo: 'Cel', numero: '0299 504-9032' }],
    emails: ['elpuente@globaloilsrl.com.ar'],
    img: 'assets/img/estaciones/el-puente.webp',
    servicios: ['gnc', 'cafeteria', 'comidas', 'minimercado', 'duchas', 'lubricantes', 'accesorios', 'garrafas', 'wifi', 'extracash', 'inflado', 'estacionamiento', 'termo', 'accesible'],
    detalle: 'Combustibles líquidos y GNC, lubricantes y accesorios. Cafetería, minimercado, comida al plato y viandas. Duchas, agua caliente, aire acondicionado, garrafas, leña, carbón y hielo. Silla de ruedas al servicio del cliente, estacionamiento y surtidor para personas con movilidad reducida. Carga virtual de teléfonos.',
    pagos: 'Tarjetas de crédito y débito, Mercado Pago, pagos con QR y extra cash.'
  },
  {
    id: 'cipolletti',
    nombre: 'Puma Cipolletti',
    bandera: 'PUMA',
    localidad: 'Cipolletti', provincia: 'Río Negro',
    direccion: 'Av. Luis Toschi 101 (esquina Tres Arroyos)',
    lat: -38.94465, lng: -67.99095,
    telefonos: [{ tipo: 'Tel', numero: '0299 578-9143' }],
    emails: ['eesscipolletti@globaloilsrl.com.ar'],
    img: 'assets/img/estaciones/cipolletti.webp',
    servicios: ['cafeteria', 'comidas', 'minimercado', 'lubricantes', 'urea', 'accesorios', 'garrafas', 'wifi', 'extracash', 'inflado', 'estacionamiento', 'termo'],
    detalle: 'Combustibles líquidos, lubricantes, urea y accesorios para el automotor. Atención personalizada. Shop Express con cafetería, minimercado, comida al plato y viandas. Agua para el termo, estacionamiento exclusivo, poste de inflado, aire acondicionado, carga virtual de teléfonos, leña, carbón y hielo.',
    pagos: 'Tarjetas de crédito y débito, Mercado Pago, pagos con QR, extra cash, Edenred, Puma Flota y Puma Pris.'
  },
  {
    id: 'san-martin',
    nombre: 'Puma San Martín y Catriel',
    bandera: 'PUMA',
    localidad: 'Neuquén Capital', provincia: 'Neuquén',
    direccion: 'Av. San Martín 1795 (esquina Catriel)',
    lat: -38.954838, lng: -68.084126,
    telefonos: [],
    emails: ['sanmartin1795@globaloilsrl.com.ar'],
    img: 'assets/img/estaciones/san-martin.webp',
    servicios: ['cafeteria', 'comidas', 'minimercado', 'lubricantes', 'accesorios', 'garrafas', 'wifi', 'extracash', 'estacionamiento', 'termo'],
    detalle: 'Combustibles líquidos, lubricantes y accesorios para el automotor. Atención personalizada, cafetería, minimercado, comida al plato y viandas. Hielo, leña y carbón. Agua para el termo y estacionamiento exclusivo.',
    pagos: 'Tarjetas de crédito y débito, Mercado Pago y extra cash.'
  },
  {
    id: 'general-roca',
    nombre: 'Puma General Roca',
    bandera: 'PUMA',
    localidad: 'General Roca', provincia: 'Río Negro',
    direccion: 'La Plata 14',
    lat: -39.0268829, lng: -67.5632393,
    telefonos: [{ tipo: 'Tel', numero: '0298 443-0348' }, { tipo: 'Tel', numero: '0298 442-2942' }, { tipo: 'Cel', numero: '0299 401-7124' }],
    emails: ['eessroca@globaloilsrl.com.ar'],
    img: 'assets/img/estaciones/general-roca.webp',
    servicios: ['cafeteria', 'comidas', 'lubricantes', 'extracash'],
    detalle: 'Combustibles y lubricantes. Baños, agua caliente, comidas calientes y cafetería.',
    pagos: 'Contado, tarjetas de débito y crédito, Mercado Pago y extra cash.'
  },
  {
    id: 'el-chanar',
    nombre: 'Puma San Patricio del Chañar',
    bandera: 'PUMA',
    localidad: 'San Patricio del Chañar', provincia: 'Neuquén',
    direccion: 'Chos Malal y acceso principal',
    lat: -38.626891, lng: -68.300373,
    telefonos: [{ tipo: 'Tel', numero: '0299 498-4345' }],
    emails: [],
    img: 'assets/img/estaciones/el-chanar.webp',
    servicios: ['gnc', 'lubricantes', 'accesorios', 'wifi', 'extracash', 'estacionamiento', 'termo'],
    detalle: 'Combustibles, GNC y lubricantes. Accesorios para el automotor, atención personalizada, agua para el termo y estacionamiento exclusivo.',
    pagos: 'Contado, tarjetas de débito y crédito, Mercado Pago y extra cash.'
  },
  {
    id: 'villa-regina',
    nombre: 'Puma Villa Regina',
    bandera: 'PUMA',
    localidad: 'Villa Regina', provincia: 'Río Negro',
    direccion: 'Ruta 22 N° 290 y 388 — Colectora Sur',
    lat: -39.0920942, lng: -67.0887322,
    telefonos: [{ tipo: 'Tel', numero: '0298 446-4928' }, { tipo: 'Cel', numero: '0299 438-1207' }, { tipo: 'Cel', numero: '0298 472-1683' }],
    emails: ['estacionvr@globaloilsrl.com.ar', 'administracionvr@globaloilsrl.com.ar'],
    img: 'assets/img/estaciones/villa-regina.webp',
    servicios: ['duchas', 'lubricantes', 'accesorios', 'wifi', 'extracash', 'estacionamiento', 'termo'],
    detalle: 'Combustibles y lubricantes. Accesorios para el automotor, atención personalizada, agua para el termo y estacionamiento exclusivo. Baños y duchas las 24 h.',
    pagos: 'Contado, tarjetas de débito y crédito, Mercado Pago y extra cash.',
    promo: 'Lunes con Tarjeta La Anónima y martes con Tarjeta Naranja.'
  },
  {
    id: 'campo-grande',
    nombre: 'Puma Campo Grande',
    bandera: 'PUMA',
    localidad: 'Campo Grande', provincia: 'Río Negro',
    direccion: 'Ruta Nacional 151, Km 31',
    lat: -38.7114269, lng: -68.1662984,
    telefonos: [{ tipo: 'Tel', numero: '0299 490-8115' }, { tipo: 'Cel', numero: '0299 476-1984' }],
    emails: ['administracion@globaloilsrl.com.ar'],
    img: 'assets/img/estaciones/campo-grande.webp',
    sede: true,
    servicios: ['24h', 'gnc', 'parrilla', 'cafeteria', 'comidas', 'minimercado', 'duchas', 'lubricantes', 'accesorios', 'wifi', 'extracash', 'estacionamiento', 'termo', 'bascula'],
    detalle: 'Administración central de Global Oil. Combustibles, GNC y lubricantes. Parrilla, comidas calientes, platos del día, viandas y bebidas. Cafetería, minishop, regalería y marroquinería. Baños y duchas las 24 h. Báscula para camiones las 24 h.',
    pagos: 'Contado, tarjetas de débito y crédito, Mercado Pago, Edenred y extra cash.'
  },
  {
    id: 'chimpay',
    nombre: 'YPF Chimpay',
    bandera: 'YPF',
    localidad: 'Chimpay', provincia: 'Río Negro',
    direccion: 'Ruta 22 y Alem, Km 1045',
    lat: -39.1624297, lng: -66.1386824,
    telefonos: [{ tipo: 'Tel', numero: '0294 649-4402' }, { tipo: 'Cel', numero: '0299 575-3112' }],
    emails: ['eesschimpay@globaloilsrl.com.ar'],
    img: 'assets/img/estaciones/chimpay.webp',
    servicios: ['cafeteria', 'comidas', 'lubricantes', 'garrafas', 'wifi', 'extracash'],
    detalle: 'Combustibles, lubricantes, aceites y garrafas. Leña, carbón y agua destilada. Cafetería, facturas, comida caliente, sándwiches y bebidas frescas.',
    pagos: 'Débito y crédito (Visa, Cabal, Amex y Mastercard), App YPF, Mercado Pago, transferencias, cheques, extra cash, YPF en Ruta, YPF de Contado y Edenred.'
  }
];

window.GLOBAL_OIL = {
  whatsapp: '5492994095625',
  telefono: '0299 490-8115',
  email: 'administracion@globaloilsrl.com.ar',
  emailRRHH: 'novedadesrrhh@globaloilsrl.com.ar',
  direccion: 'Ruta Nacional 151, Km 31 — Campo Grande, Río Negro'
};
