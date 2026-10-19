<?php
/*
 * Global Oil — envío del formulario de contacto por e-mail.
 * Recibe el formulario de contacto.html (POST) y responde JSON { ok, error }.
 *
 * CONFIGURACIÓN: cambiá estas direcciones si hace falta.
 * REMITENTE debe ser una casilla del dominio globaloilsrl.com.ar para que
 * los correos no terminen en spam.
 */
$REMITENTE = 'administracion@globaloilsrl.com.ar';
$DESTINOS = [
    'Consulta'             => 'administracion@globaloilsrl.com.ar',
    'Ventas mayoristas'    => 'administracion@globaloilsrl.com.ar',
    'Trabajá con nosotros' => 'novedadesrrhh@globaloilsrl.com.ar',
];
$CV_MAX_BYTES = 5 * 1024 * 1024;
$CV_EXTENSIONES = ['pdf', 'doc', 'docx'];
$LIMITE_ENVIOS = 5;          // envíos por IP...
$LIMITE_VENTANA = 10 * 60;   // ...cada 10 minutos

date_default_timezone_set('America/Argentina/Buenos_Aires');
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function responder($ok, $error = null, $codigo = 200) {
    http_response_code($codigo);
    echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error], JSON_UNESCAPED_UNICODE);
    exit;
}
function campo($nombre, $max = 200) {
    $v = isset($_POST[$nombre]) && is_string($_POST[$nombre]) ? trim($_POST[$nombre]) : '';
    return function_exists('mb_substr') ? mb_substr($v, 0, $max, 'UTF-8') : substr($v, 0, $max);
}
function una_linea($v) {
    return trim(preg_replace('/[\r\n\t]+/', ' ', $v));
}
function codificar_asunto($v) {
    return '=?UTF-8?B?' . base64_encode($v) . '?=';
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(false, 'Método no permitido.', 405);
}

// Trampa para robots: este campo está oculto y las personas lo dejan vacío.
if (campo('sitio_web') !== '') {
    responder(true);
}

// Límite simple de envíos por IP.
$ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'desconocida';
$registro = sys_get_temp_dir() . '/globaloil_form_' . md5($ip);
$ahora = time();
$envios = [];
if (is_readable($registro)) {
    $envios = array_filter(array_map('intval', explode(',', (string) file_get_contents($registro))),
        function ($t) use ($ahora, $LIMITE_VENTANA) { return $t > $ahora - $LIMITE_VENTANA; });
}
if (count($envios) >= $LIMITE_ENVIOS) {
    responder(false, 'Recibimos varios mensajes seguidos. Probá de nuevo en unos minutos.', 429);
}

// Datos del formulario.
$motivo    = campo('motivo', 60);
$nombre    = una_linea(campo('nombre', 120));
$email     = una_linea(campo('email', 160));
$telefono  = una_linea(campo('telefono', 60));
$localidad = una_linea(campo('localidad', 120));
$empresa   = una_linea(campo('empresa', 200));
$puesto    = una_linea(campo('puesto', 120));
$mensaje   = campo('mensaje', 5000);

if (!isset($DESTINOS[$motivo])) $motivo = 'Consulta';
if ($nombre === '' || $mensaje === '') {
    responder(false, 'Completá tu nombre y el mensaje.', 422);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder(false, 'Revisá tu e-mail: no parece válido.', 422);
}

// CV adjunto (solo para Trabajá con nosotros).
$adjunto = null;
if ($motivo === 'Trabajá con nosotros' && isset($_FILES['cv']) && $_FILES['cv']['error'] !== UPLOAD_ERR_NO_FILE) {
    $cv = $_FILES['cv'];
    if ($cv['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($cv['tmp_name'])) {
        responder(false, 'No pudimos recibir el CV. Probá de nuevo.', 422);
    }
    if ($cv['size'] > $CV_MAX_BYTES) {
        responder(false, 'El CV supera los 5 MB.', 422);
    }
    $ext = strtolower(pathinfo($cv['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $CV_EXTENSIONES, true)) {
        responder(false, 'El CV tiene que ser PDF o Word (.doc, .docx).', 422);
    }
    $nombre_archivo = preg_replace('/[^A-Za-z0-9._-]+/', '_', pathinfo($cv['name'], PATHINFO_FILENAME));
    $adjunto = [
        'nombre' => 'CV_' . substr($nombre_archivo, 0, 60) . '.' . $ext,
        'datos'  => file_get_contents($cv['tmp_name']),
        'tipo'   => $ext === 'pdf' ? 'application/pdf'
                  : ($ext === 'doc' ? 'application/msword'
                  : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
    ];
}

// Armado del correo.
$destino = $DESTINOS[$motivo];
$asunto = codificar_asunto($motivo . ' — ' . $nombre . ' (web Global Oil)');
$lineas = [
    'Nuevo mensaje desde el sitio web de Global Oil',
    '',
    'Motivo:    ' . $motivo,
    'Nombre:    ' . $nombre,
    'E-mail:    ' . $email,
];
if ($telefono !== '')  $lineas[] = 'Teléfono:  ' . $telefono;
if ($localidad !== '') $lineas[] = 'Localidad: ' . $localidad;
if ($empresa !== '')   $lineas[] = 'Empresa:   ' . $empresa;
if ($puesto !== '')    $lineas[] = 'Puesto:    ' . $puesto;
if ($adjunto)          $lineas[] = 'CV:        adjunto (' . $adjunto['nombre'] . ')';
$lineas[] = '';
$lineas[] = 'Mensaje:';
$lineas[] = $mensaje;
$lineas[] = '';
$lineas[] = '—';
$lineas[] = 'Enviado el ' . date('d/m/Y H:i') . ' desde ' . $ip;
$texto = implode("\r\n", $lineas);

$cabeceras = [
    'From: ' . codificar_asunto('Web Global Oil') . ' <' . $REMITENTE . '>',
    'Reply-To: ' . codificar_asunto($nombre) . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'X-Mailer: GlobalOil-Web',
];

if ($adjunto) {
    $limite = 'go_' . md5(uniqid('', true));
    $cabeceras[] = 'Content-Type: multipart/mixed; boundary="' . $limite . '"';
    $cuerpo = '--' . $limite . "\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($texto)) . "\r\n"
        . '--' . $limite . "\r\n"
        . 'Content-Type: ' . $adjunto['tipo'] . '; name="' . $adjunto['nombre'] . "\"\r\n"
        . "Content-Transfer-Encoding: base64\r\n"
        . 'Content-Disposition: attachment; filename="' . $adjunto['nombre'] . "\"\r\n\r\n"
        . chunk_split(base64_encode($adjunto['datos'])) . "\r\n"
        . '--' . $limite . '--';
} else {
    $cabeceras[] = 'Content-Type: text/plain; charset=UTF-8';
    $cabeceras[] = 'Content-Transfer-Encoding: base64';
    $cuerpo = chunk_split(base64_encode($texto));
}

$enviado = @mail($destino, $asunto, $cuerpo, implode("\r\n", $cabeceras), '-f' . $REMITENTE);
if (!$enviado) {
    responder(false, 'No pudimos enviar el mensaje. Escribinos a ' . $destino . ' o por WhatsApp.', 500);
}

$envios[] = $ahora;
@file_put_contents($registro, implode(',', $envios), LOCK_EX);
responder(true);
