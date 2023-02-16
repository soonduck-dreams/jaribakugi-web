let sidebarManager = {
    currentOpenPageName: "page-make-classroom",
    shuffled: false,

    openPage: function(pageName) {
        let currentOpenPage = document.getElementById(this.currentOpenPageName);
        let newOpenPage = document.getElementById(pageName);

        currentOpenPage.style.display = 'none';
        newOpenPage.style.display = 'flex';

        this.currentOpenPageName = pageName;

        this.shuffled = false;
        if (pageName === "page-shuffle") {
            this.refreshShufflePage();
        }
    },

    refreshShufflePage: function() {
        let refreshH2 = document.getElementById("refresh-shuffle-h2");
        let refreshBtn = document.getElementById("refresh-shuffle-button");
        let refreshBtn2 = document.getElementById("refresh-shuffle-button-2");

        let postTableDisplay = document.getElementById("post-table-display").value;

        if (!this.shuffled) {
            refreshH2.innerHTML = "자리 바꾸기를 할까요?";
            refreshBtn.innerHTML = "자리 바꾸기!";
            refreshBtn2.style = "display: none";
        } else {
            refreshH2.innerHTML = "자리 바꾸기 했어요.";
            refreshBtn.innerHTML = "한 번 더 자리 바꾸기!";
            
            if (postTableDisplay !== "name") {
                refreshBtn2.style = "display: inline";
            } else {
                refreshBtn2.style = "display: none";
            }
        }
    },
}