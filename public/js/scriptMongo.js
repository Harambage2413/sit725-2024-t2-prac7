// const addCards = (items) => {
//     items.forEach(item => {
//         let itemToAppend = '<div class="col s4 center-align">'+
//                 '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.path+'">'+
//                 '</div><div class="card-content">'+
//                 '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#"></a></p></div>'+
//                 '<div class="card-reveal">'+
//                 '<span class="card-title grey-text text-darken-4">'+item.subTitle+'<i class="material-icons right">close</i></span>'+
//                 '<p class="card-text">'+item.description+'</p>'+
//                 '</div></div></div>';
//         $("#card-section").append(itemToAppend)
//     });
// }

const formSubmitted = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.image = $('#image').val();

    console.log(formData);
    postPicture(formData);
}

function postPicture(cat) {
    $.ajax({
        url: '/api/pictures',
        type: 'POST',
        data: cat,
        success: (result) => {
            if (result.statusCode === 201) {
                $('#title').val("");
                $('#image').val("");
                alert('Picture posted successful');
                getAllCats()
            }
        }
    });
}

function getAllCats() {
    $.get('/api/pictures', (response) => {
        // response's data is in array format, so we can use it
        if (response.statusCode === 200) {
            console.log(response.data);
            $('#heading').html(response.data.title)
            $('#index-banner').css('background-image', `url(${response.data.image})` )
            
        }
    });
}

$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        formSubmitted();
    });
    $('.modal').modal();
    $('select').formSelect();
    getAllCats();
});