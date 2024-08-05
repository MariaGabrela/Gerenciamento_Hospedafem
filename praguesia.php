<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<?php

if (isset($_COOKIE["numlogin"])) {
    $v1 = $_GET['num1'];
    $v2 = $_COOKIE['numlogin'];

    if ($v1 != $v2) {
        // Redireciona para a página de login se os valores não corresponderem
        header("Location: index.html");
        exit;
    } else {
        // Se os valores corresponderem, tenta conectar ao banco de dados
        include "conect_db.inc";

        if ($conect) {
            // Se a conexão for bem-sucedida, redireciona para a página inicial
            header("Location: index.html");
            mysqli_close($conect);
            exit;
        } else {
            // Se a conexão não for bem-sucedida, exibe uma mensagem de erro
            echo "<p>Usuário/Senha não encontrado</p>";
            echo "<a href='index.html'>Voltar</a>";
        }
    }
} else {
    // Redireciona para a página de login se o cookie não estiver definido
    header("Location: index.html");
    exit;
}
?>
</body>
</html>
