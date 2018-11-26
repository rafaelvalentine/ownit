/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.getElementById('mySidenav').style.width = '250px'
        // document.getElementById("main").style.transform = "translateX(250px)";
    document.body.style.backgroundColor = 'rgba(0,0,0,0.4)'
    document.body.style.overflow = 'hidden'
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById('mySidenav').style.width = '0'
        // document.getElementById("main").style.transform = "translateX(0)";
    document.body.style.backgroundColor = 'white'
    document.body.style.overflow = 'visible'
}
$(function() {
    $('li').on('click', function(e) { // See here, i have our selector set to "li", so this jQuery object will grab all li tags on the page
        $(this).addClass('here').siblings().removeClass('here')
    })
})