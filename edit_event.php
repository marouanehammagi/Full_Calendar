<?php
$user = 'root';
$pass = '';
$host = 'localhost';
$dbname = 'calendar';

try {
    // Create a PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Retrieve data from the POST request
    $requestData = json_decode(file_get_contents('php://input'), true);

    $eventId = isset($requestData['id']) ? $requestData['id'] : null;
    $title = isset($requestData['Title']) ? $requestData['Title'] : null;
    $description = isset($requestData['Description']) ? $requestData['Description'] : null;
    $categorie = isset($requestData['Categorie']) ? $requestData['Categorie'] : null;
    $color = isset($requestData['Color']) ? $requestData['Color'] : null;
    $start = isset($requestData['Start']) ? $requestData['Start'] : null;
    $end = isset($requestData['End']) ? $requestData['End'] : null;

    if ($eventId !== null) {
        // Perform the update operation in your database
        $query = "UPDATE calendar 
                  SET Title = :title, Description = :description, Categorie = :categorie, Color = :color, Start = :start, End = :end 
                  WHERE id = :id";

        // Prepare the query
        $stmt = $pdo->prepare($query);

        // Bind parameters
        $stmt->bindParam(':id', $eventId, PDO::PARAM_INT);
        $stmt->bindParam(':title', $title, PDO::PARAM_STR);
        $stmt->bindParam(':description', $description, PDO::PARAM_STR);
        $stmt->bindParam(':categorie', $categorie, PDO::PARAM_STR);
        $stmt->bindParam(':color', $color, PDO::PARAM_STR);
        $stmt->bindParam(':start', $start, PDO::PARAM_STR);
        $stmt->bindParam(':end', $end, PDO::PARAM_STR);

        // Execute the query and check the result
        if ($stmt->execute()) {
            $response = ['status' => 'success', 'message' => 'Event updated successfully'];
        } else {
            $response = ['status' => 'error', 'message' => 'Failed to update event'];
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
