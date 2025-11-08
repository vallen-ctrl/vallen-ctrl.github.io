
let isLoginMode = true;

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');
    const nameField = document.getElementById('nameField');
    const confirmPasswordField = document.getElementById('confirmPasswordField');
    const forgotPassword = document.getElementById('forgotPassword');
    const submitText = document.getElementById('submitText');
    const toggleQuestion = document.getElementById('toggleQuestion');
    const toggleButton = document.getElementById('toggleButton');

    if (isLoginMode) {
        authTitle.textContent = 'Masuk';
        authSubtitle.textContent = 'Selamat datang kembali!';
        nameField.classList.add('hidden');
        confirmPasswordField.classList.add('hidden');
        forgotPassword.style.display = 'block';
        submitText.textContent = 'Masuk';
        toggleQuestion.textContent = 'Belum punya akun?';
        toggleButton.textContent = 'Daftar di sini';
    } else {
        authTitle.textContent = 'Daftar';
        authSubtitle.textContent = 'Buat akun baru Anda';
        nameField.classList.remove('hidden');
        confirmPasswordField.classList.remove('hidden');
        forgotPassword.style.display = 'none';
        submitText.textContent = 'Daftar Sekarang';
        toggleQuestion.textContent = 'Sudah punya akun?';
        toggleButton.textContent = 'Masuk di sini';
    }

    clearForm();
}

function togglePassword(fieldId) {
    const input = document.getElementById(fieldId);
    const icon = document.getElementById(fieldId + 'Icon');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function handleSubmit() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!email || !password) {
        alert('Mohon isi email dan password!');
        return;
    }

    if (isLoginMode) {
        console.log('Login dengan:', { email, password });
        alert('Login berhasil!\n\nEmail: ' + email);
    } else {
        if (!name) {
            alert('Mohon isi nama lengkap!');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Password dan konfirmasi password tidak cocok!');
            return;
        }
        
        if (password.length < 6) {
            alert('Password minimal 6 karakter!');
            return;
        }

        console.log('Register dengan:', { name, email, password });
        alert('Registrasi berhasil!\n\nNama: ' + name + '\nEmail: ' + email);
    }

    clearForm();
}

function forgotPasswordHandler() {
    const email = prompt('Masukkan email Anda untuk reset password:');
    if (email) {
        alert('Link reset password telah dikirim ke: ' + email);
    }
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirmPassword').value = '';
}

document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleSubmit();
    }
});
