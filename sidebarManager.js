let sidebarManager = {
    currentOpenPageName: "page-make-classroom",

    openPage: function(pageName) {
        let currentOpenPage = document.getElementById(this.currentOpenPageName);
        let newOpenPage = document.getElementById(pageName);

        currentOpenPage.style.display = 'none';
        newOpenPage.style.display = 'flex';

        this.currentOpenPageName = pageName;
    }
}