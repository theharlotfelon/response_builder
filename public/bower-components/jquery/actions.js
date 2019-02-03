/*$(document).ready(function() {
    document.getElementById('test').addEventListener('click', function() {
        document.getElementById('response_data').innerHTML = response.description
    });
});*/


$(".list-group .list-group-item.list-group-item-action").click(function(e) {
    $(".list-group .list-group-item").removeClass("active");
    $(e.target).addClass("active");
});
// dont need