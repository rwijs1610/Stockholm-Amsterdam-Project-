    <?php
    if (isset($_POST['CMS'])) {
        header("Location: cms/CMS.php");
        exit();
    }
    ?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portal</title>
        <link rel="stylesheet" href="style.css">
        <script src="script.js" defer></script>
    </head>

    <body>
        <form method="post">
            <input type="submit" name="CMS" value="CMS" class="button" onclick="alert('There is going to be a login page right here but it is not yet done. You are now going to be sent to our CMS.');">
        </form>
    </body>

    </html>