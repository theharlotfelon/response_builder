/*$(document).ready(function() {
    document.getElementById('test').addEventListener('click', function() {
        document.getElementById('response_data').innerHTML = response.description
    });
});*/


$("a.rclick").hover(function(e) {
    $("a.rclick").removeClass("active");
    $(e.target).addClass("active");
});
