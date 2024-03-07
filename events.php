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

// Store data
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    
    $title = isset($data['title']) ? $data['title'] : '';
    $category = isset($data['Categorie']) ? $data['Categorie'] : '';
    $description = isset($data['Description']) ? htmlspecialchars($data['Description']) : '';
    $color = isset($data['Color']) ? htmlspecialchars($data['Color']) : '';
    $start = isset($data['Start']) ? htmlspecialchars($data['Start']) : '';
    $end = isset($data['End']) ? htmlspecialchars($data['End']) : '';
    
    try {
        $stmt = $pdo->prepare('INSERT INTO calendar (Title, Categorie, Description, Color, Start, End) VALUES (?, ?, ?, ?, ?, ?)');
        $stmt->execute([$title, $category, $description, $color, $start, $end]);

        // Send a JSON response
        $response = ['message' => 'Data stored successfully'];
        echo json_encode($response);
    } catch (PDOException $e) {
        // Log the exception details or provide a more user-friendly error message
        $response = ['error' => 'Database error: ' . $e->getMessage()];
        echo json_encode($response);
        exit(); // Terminate script execution
    }
} else {
    // Send an error response for invalid request method
    $response = ['error' => 'Invalid request method'];
    echo json_encode($response);
}


?>
