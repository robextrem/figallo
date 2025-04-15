<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recuperar los datos del formulario
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $telefono = $_POST['telefono'];
    $comentarios = $_POST['comentarios'];

    // Configurar el destinatario del correo electrónico
    $destinatario = 'vieri@figallo.com.mx';

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
        header('Location: thankyou-page.html');
        exit; // Para asegurarnos de que el script se detenga después de la redirección
    } else {
        // Mostrar un mensaje de error si no se pudo enviar el correo electrónico
        echo 'Lo siento, hubo un error al procesar su solicitud.';
    }
}
?>