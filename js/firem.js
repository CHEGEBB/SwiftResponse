function toggleDropdown(element) {
    var dropdownMenu = element.nextElementSibling;
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

function toggleMenu() {
    var navList = document.getElementById('navList');
    navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
}