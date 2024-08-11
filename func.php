<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Funcionario</title>
</head>
<body>
<?php
include 'conect_db.inc';
$email=$_POST['nome'];
$senha=$_POST['tranca'];

$login="select * from funcionario where email='$email' and senha='$senha'";
$result=mysqli_query($conect , $login);
$linha = mysqli_affected_rows($conect);
if ($linha>0){
    $num=rand(100000, 900000);
    setcookie("numlogin",$num);
    header("Location:praguesias.php?num1='$num'");
}
else{
    echo "</br> usuario incorreto";
    echo "<a href='index.html'>voltar</a>";
}
mysqli_close($conect);
?>

</body>
</html>
