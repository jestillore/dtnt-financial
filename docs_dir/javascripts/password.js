const md5Hash = '60098a00017e00cd4792cf21b6401e53';
let password = sessionStorage.getItem('password');
while (md5(password) !== md5Hash) {
    password = prompt('Enter password');
}
sessionStorage.setItem('password', password);
