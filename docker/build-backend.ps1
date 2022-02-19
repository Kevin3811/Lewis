Set-Location ../server;
$image = docker images -q lewis-backend;
if(![string]::IsNullOrEmpty($image)){
    docker rmi $($image);
}
./containerize;