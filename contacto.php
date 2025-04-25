<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recuperar el token de reCAPTCHA
    $recaptchaToken = $_POST['g-recaptcha-response'];
    $recaptchaSecret = '6Ld7XSMrAAAAADSkW-eTmIKb2MyIMGeaXiBXKlC-';

    // Validar el token con Google
    $recaptchaURL = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptchaResponse = file_get_contents($recaptchaURL . '?secret=' . $recaptchaSecret . '&response=' . $recaptchaToken);
    $recaptchaData = json_decode($recaptchaResponse);

    // Comprobar si la verificación fue exitosa y con buena puntuación
    if ($recaptchaData->success && $recaptchaData->score >= 0.5) {
        // Recuperar los datos del formulario
        $nombre = $_POST['nombre'];
        $correo = $_POST['correo'];
        $telefono = $_POST['telefono'];
        $comentarios = $_POST['comentarios'];

        // Configurar el destinatario del correo electrónico
        $destinatario = 'robextremo@gmail.com';

        // Construir el mensaje de correo electrónico
        $asunto = 'Nuevo mensaje de formulario de contacto';
        $mensaje = "Nombre: $nombre\n\n";
        $mensaje .= "Correo electrónico: $correo\n\n";
        $mensaje .= "Teléfono: $telefono\n\n";
        $mensaje .= "Comentarios: $comentarios\n\n";

        // Enviar el correo electrónico
        $headers = "From: $nombre <$correo>\r\n";
        $headers .= "Reply-To: $correo\r\n";
        if (mail($destinatario, $asunto, $mensaje, $headers)) {
            // Redirigir a una página de agradecimiento
            header('Location: /thankyou');
            exit;
        } else {
            echo 'Lo siento, hubo un error al enviar el correo.';
        }
    } else {
        echo 'Verificación de reCAPTCHA fallida. Por favor, inténtelo de nuevo.';
    }
}
?>
