$(function() {
    $(document).scroll(function() {
        var $nav = $(".bosscoop__navbar");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});