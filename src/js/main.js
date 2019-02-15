document.body.classList.toggle('nojs');
document.getElementById('drawer-button').addEventListener('click', function () {
    const isExpanded = this.getAttribute('aria-expanded');
    this.setAttribute('aria-expanded', isExpanded !== 'true' || false);

    document.getElementById('main-menu').classList.toggle('navbar__menu--collapsed');
});
