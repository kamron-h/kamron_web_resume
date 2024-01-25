document.addEventListener("DOMContentLoaded", function() {
    var collapseElementList = [].slice.call(document.querySelectorAll('.collapse'));
    var collapseList = collapseElementList.map(function (collapseEl) {
        return new bootstrap.Collapse(collapseEl, {
            toggle: false
        });
    });

    collapseElementList.forEach(function(collapseEl) {
        collapseEl.addEventListener('show.bs.collapse', function () {
            this.previousElementSibling.classList.add('collapsed');
        });
        collapseEl.addEventListener('hide.bs.collapse', function () {
            this.previousElementSibling.classList.remove('collapsed');
        });
    });
});
