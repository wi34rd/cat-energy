document.body.classList.toggle('nojs');
document.getElementById('drawer-button').addEventListener('click', function () {
    const isExpanded = this.getAttribute('aria-expanded') !== 'true' || false;

    this.setAttribute('aria-expanded', isExpanded);
    document.getElementById('main-menu').setAttribute('aria-expanded', isExpanded);
});
