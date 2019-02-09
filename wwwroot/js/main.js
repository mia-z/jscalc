$(document).ready(function() {
    $("button.dropdown-item").click(function () {
        var c = new Calc(this.value);
        c.buildCalc();
    });
});