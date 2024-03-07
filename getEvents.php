<?php
$user = 'root';
$pass = '';

try {
    $pdo = new PDO('mysql:host=localhost;dbname=calendar', $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Log the exception details or provide a more user-friendly error message
    $response = ['error' => 'Database connection error: ' . $e->getMessage()];
    echo json_encode($response);
    exit(); // Terminate script execution
}
//get events
try {
   
    $stmt = $pdo->query('SELECT ID, Title, Categorie, Description, Color, Start, End FROM calendar');
    
    // Fetch the data as an associative array
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Set response header to JSON
    header('Content-Type: application/json');

    // Send JSON-encoded data
    echo json_encode($data);
} catch (PDOException $e) {
    // Log the exception details or provide a more user-friendly error message
    $response = ['error' => 'Database error: ' . $e->getMessage()];
    echo json_encode($response);
    exit(); // Terminate script execution
}
?>
