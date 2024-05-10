
<?php
// Conexión a la base de datos
$host = '5432';
$dbname = 'suplexa';
$username = 'postgres';
$password = '1234';

try {
    $conn = new PDO("pgsql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}

// Consultas para obtener los datos de los shapefiles
$stmt_departamentos = $conn->prepare("SELECT * FROM departamentos");
$stmt_departamentos->execute();
$departamentos = $stmt_departamentos->fetchAll(PDO::FETCH_ASSOC);

$stmt_distritos = $conn->prepare("SELECT * FROM distritos");
$stmt_distritos->execute();
$distritos = $stmt_distritos->fetchAll(PDO::FETCH_ASSOC);

$stmt_provincias = $conn->prepare("SELECT * FROM provincias");
$stmt_provincias->execute();
$provincias = $stmt_provincias->fetchAll(PDO::FETCH_ASSOC);

$stmt_combinado = $conn->prepare("SELECT * FROM combinado");
$stmt_combinado->execute();
$combinado = $stmt_combinado->fetchAll(PDO::FETCH_ASSOC);

// Cerrar la conexión
$conn = null;
?>
