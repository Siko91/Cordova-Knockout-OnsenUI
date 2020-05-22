const common = {
    openMenu: function() {
        document.getElementById("side-menu-container").open();
    },
    closeMenu: function() {
        document.getElementById("side-menu-container").close();
    },
    toggleMenu: function() {
        document.getElementById("side-menu-container").toggle();
    },
};

window.common = common;
export default common;