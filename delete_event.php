<?php
$user = 'root';
$pass = '';
$host = 'localhost';
$dbname = 'calendar';

try {
    // Create a PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Retrieve the ID from the POST request
    $eventIdToDelete = isset($_POST['id']) ? $_POST['id'] : null;

    if ($eventIdToDelete !== null) {
        // Perform the deletion operation in your database
        $query = "DELETE FROM calendar WHERE id = :id";

        // Prepare the query
        $stmt = $pdo->prepare($query);

        // Bind the parameter
        $stmt->bindParam(':id', $eventIdToDelete, PDO::PARAM_INT);

        // Execute the query and check the result
        if ($stmt->execute()) {
            $response = ['status' => 'success', 'message' => 'Event deleted successfully'];
        } else {
            $response = ['status' => 'error', 'message' => 'Failed to delete event'];
        }
    } else {
        $response = ['status' => 'error', 'message' => 'Invalid request'];
    }
} catch (PDOException $e) {
    // Log the exception details or provide a more user-friendly error message
    $response = ['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()];
}

// Send the JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
