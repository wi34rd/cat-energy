const TABLET_MIN_WIDTH = 768;

function MainMenu() {
    this.mainMenuElement = document.getElementById('main-menu');
    this.drawerButtonElement = document.getElementById('drawer-button');
    this.isExpanded = true;
    this.isMobile = window.innerWidth < TABLET_MIN_WIDTH;

    if (this.isMobile) {
        this.toggleExpandation();
    }

    window.addEventListener('resize', (event) => {
        if (
            (this.isMobile && window.innerWidth >= TABLET_MIN_WIDTH) ||
            (!this.isMobile && window.innerWidth < TABLET_MIN_WIDTH)
        ) {
            this.toggleMobile();
        }
    });

    this.mainMenuElement.addEventListener('transitionend', () => {
        this.style.transition = 'none';
    });

    this.drawerButtonElement.addEventListener('click', () => {
        this.mainMenuElement.style.transition = '0.7s';
        this.toggleExpandation();
    });
}

MainMenu.prototype.toggleExpandation = function() {
    this.isExpanded = !this.isExpanded;
    this.mainMenuElement.setAttribute('aria-expanded', this.isExpanded);
    this.drawerButtonElement.setAttribute('aria-expanded', this.isExpanded);
}

MainMenu.prototype.toggleMobile = function () {
    this.isMobile = !this.isMobile;

    if (this.isMobile) {
        this.toggleExpandation();
    } else {
        this.isExpanded = true;
        this.mainMenuElement.removeAttribute('aria-expanded');
        this.drawerButtonElement.removeAttribute('aria-expanded');
        this.mainMenuElement.style.transition = 'none';
    }
}

function myMap () {
    let mapOptions = {
        center: new google.maps.LatLng(51.5, -0.12),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
    }

    let map = new google.maps.Map(document.getElementById("map"), {
        center: window.innerWidth < 1300 ? { lat: 59.938867, lng: 30.323047 } : { lat: 59.938867, lng: 30.319421},
        zoom: 17
    });

    var marker = new google.maps.Marker({
        position: { lat: 59.938867, lng: 30.323047 },
        map: map,
        title: 'Cat Energy'
    });
}

document.body.classList.toggle('nojs');

const mainMenu = new MainMenu();
