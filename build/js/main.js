document.body.classList.toggle('nojs');
document.getElementById('drawer-button').addEventListener('click', function () {
    document.getElementById('main-menu').classList.toggle('navbar__menu--collapsed');
    this.classList.toggle('drawer-button--close');
});
