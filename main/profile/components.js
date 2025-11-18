let userData = {
    name: 'Username',
    email: 'email.pengguna@example.com',
    phone: '',
    birthday: '',
    gender: '',
    address: '',
    profilePicture: ''
};

function init() {
    // Load saved data from localStorage if exists
    const savedData = localStorage.getItem('user');
        console.log("hi");
    if (savedData) {
        console.log("hi");
        userData = JSON.parse(savedData);
        updateDisplay();
    }
}

function updateDisplay() {
    document.getElementById('displayName').textContent = userData.name;
    document.getElementById('displayEmail').textContent = userData.email;
    document.getElementById('infoName').textContent = userData.name;
    document.getElementById('infoEmail').textContent = userData.email;
    
    updateField('infoPhone', userData.phone);
    updateField('infoBirthday', userData.birthday);
    updateField('infoGender', userData.gender);
    updateField('infoAddress', userData.address);

    if (userData.profilePicture) {
        document.getElementById('profilePicture').innerHTML = 
            `<img src="${userData.profilePicture}" alt="Profile">`;
    }
}

init();
