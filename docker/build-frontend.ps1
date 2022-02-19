Set-Location ../web;
$image = docker images -q lewis-frontend;
if(![string]::IsNullOrEmpty($image)){
    docker rmi $($image);
}
./containerize;