$(document).ready(function() {
    /*
   ==========================================================================
      Gets All Cars in the database on page Load
   ==========================================================================
		*/
    $.getJSON('/api/cars')
        .then(getCars)

    /*
   ==========================================================================
       Gets All Users in the database on page Load
   ==========================================================================
		*/

    $.getJSON('/api/ownit')
        .then(getUsers)

    /*
       ==========================================================================
            Make PUT for Users into the database
       ==========================================================================
      	*/
    $('#table').on('click', '.edit', function() {
        const currectUser = $(this).closest('tr')
        let user = currectUser.data('name')
        let editModal = $('#editModal')
        let body = $('#body-main')
        let first = currectUser.data('first')
        let last = currectUser.data('last')
        let email = currectUser.data('email')
        let number = currectUser.data('number')
        let userId = currectUser.data('id')
        let modalBackdrop = $('<div class="modal-backdrop fade show"></div>')
        console.log('you want to edit user: ' + user)
        editModal.addClass('show')
        editModal.css('display', 'block')
        body.css('overflow-y', 'hidden')
        body.append(modalBackdrop)
        $('#editFirstName').val(first)
        $('#editLastName').val(last)
        $('#editEmail').val(email)
        $('#editNumber').val(number)

        $('#saveEdit').click(function() {
            let edittedUser = {
                firstname: $('#editFirstName').val(),
                lastname: $('#editLastName').val(),
                email: $('#editEmail').val(),
                number: $('#editNumber').val()
            }
            let updateUser = '/api/ownit/' + userId
            if ($('#editFirstName').val() !== first ||
                $('#editLastName').val() !== last ||
                $('#editEmail').val() !== email ||
                $('#editNumber').val() !== number) {
                $.ajax({
                        method: 'PUT',
                        url: updateUser,
                        data: edittedUser
                    })
                    .then(function(data) {
                        body.css('overflow-y', 'visible')
                        modalBackdrop.remove()
                        editModal.removeClass('show')
                        editModal.css('display', 'none')
                        currectUser.remove()
                        window.onload = timedRefresh(3000)
                    })
                    .catch((err) => {
                        console.log(err)
                        alert('Changes to ' + user + "Didn't get effected")
                    })
                console.log(edittedUser, userId)
            } else {
                body.css('overflow-y', 'visible')
                modalBackdrop.remove()
                editModal.removeClass('show')
                editModal.css('display', 'none')
                console.log(edittedUser, userId)
            }
        })

        $('#closeeditmodal').click(function() {
            body.css('overflow-y', 'visible')
            modalBackdrop.remove()
            editModal.removeClass('show')
            editModal.css('display', 'none')
        })
    })

    /*
           ==========================================================================
           Make DELETE request for Users into the database
           ==========================================================================
           */
    $('#table').on('click', '.delete', function() {
        deleteUser($(this).closest('tr'))
    })

    $('#slick_demo_2').on('click', '.sign_up', function() {
        const selectedCar = $(this).closest('.car').attr('car')
            // let car = selectedCar.data('car')
            // console.log(car)
        let car = $('#car')
        car.val(selectedCar)
        car.css('textTransform', 'capitalize')
        car.prop('disabled', true)
        console.log(selectedCar)
    })

    var loading = $('#loader__index').hide()
    $(document)
        .ajaxStart(function() {
            let modal = $('.form-body')
            modal.css('display', 'none')
            loading.show()
        })
        .ajaxStop(function() {
            loading.hide()
        })
})
$('#table').on('click', '.send_message', function() {
    const currectUser = $(this).closest('tr')
    let user = currectUser.data('name').toUpperCase()
    let car = currectUser.data('car').toUpperCase()
    let form = 'https://goo.gl/forms/5odUOH3FtNIGvy1Q2'
    $('#ownit-message-area').val(`Hi ${user},
	Thank You for choosing OWNIT and showing increase in our ${car} offering, you have passed the first stage of the registration, please kindly follow this link: ${form} 
	to finalise you registration. Thank you again for choosing OWNIT Africa!`)
    $('#ownit-message-area').prop('disabled', true)
    $('#edit-message').prop('disabled', false)
    $("#edit-message").prop("checked", false);
})
$('#edit-message').click(() => {
    $('#ownit-message-area').prop('disabled', false)
    $('#edit-message').prop('disabled', true)
})
const getUsers = (users) => {
    // add users to page
    users.map((user) => {
        getUser(user)
    })
}
const getCars = (cars) => {
    // add users to page
    cars.map((car) => {
        getCar(car)
    })
}

function getUser(user) {
    let newUser = $('<tr>' +
        '<td>' +
        '<img src="assets/img/user_avatar.png" class="rounded-circle avatar" alt="">   ' +
        '<p class="c_name">' + `${user.firstname} ${user.lastname}` + '</p>' +
        '</td>' +
        '<td>' +
        '<span class="phone">' + '<i class="fa fa-phone"></i>  ' + user.number + '</span > ' +
        '</td>' +
        '<td>' +
        '<address>' + '<i class="fa fa-envelope-open"></i>  ' + user.email + '</address>' +
        '</td>' +
        '<td>' +
        '<span>' + '<i class="fa fa-product-hunt"></i> ' + user.product + '</span>' +
        '</td>' +
        '<td>' +
        '<span>' + '<i class="fa fa-car"></i> ' + user.car + '</span>' +
        '</td>' +
        // '<td>' +
        // '<span>' + '<i class="fa fa-product-hunt"></i> ' + user.date + '</span>' +
        // '</td>' +
        '<td>' +
        '<button data-toggle="modal" data-target="#text_message" type="button" class="btn btn-primary btn-sm send_message" title="Text"><i class="fa fa-comment"></i></button> ' +
        '<button data-target="#editModal" type="button" class="btn btn-info btn-sm edit" title="Edit"><i class="fa fa-edit"></i></button> ' +
        '<button type="button" data-type="confirm" class="btn btn-danger js-sweetalert btn-sm delete" title="Delete"><i class="fa fa-trash"></i></button> ' +
        '</td>' +
        '</tr>')
    newUser.data('id', user._id)
    newUser.data('name', `${user.firstname} ${user.lastname}`)
    newUser.data('first', user.firstname)
    newUser.data('last', user.lastname)
    newUser.data('email', user.email)
    newUser.data('number', user.number)
    newUser.data('car', user.car)
    $('#table').append(newUser)
}

function changeupload(upload) {
    return upload.split('').map(a => a === '\\' ? '/' : a).join('')
}

function getCar(car) {
    let image = changeupload(car.carImage)
    let newCar = $('<div class="car-card card">' +
        '<div class="wrapper" style="background-image: url(' + image + ');">' +
        ' <div class="date">' +
        `<span class="day">${car.make}</span>` +
        `<span class="month">${car.model}</span>` +
        `  <span class="year">${car.year}</span>` +
        '</div>' +
        '<div class="data">' +
        '<div class="content">' +
        ' <span class="author">Available</span>' +
        '<div class="car" car="' + `${car.make} ${car.model} ${car.year}` + '">' +
        '<h5>' +
        ` <span> ${car.make} ${car.model} </span>` +
        `<span>${car.year}</span>` +
        '</h5>' +
        `<p>Downpayment: <br> N ${car.downpayment}</p>` +
        `<p> Weeklypayment: <br> N ${car.weeklypayment}</p>` +
        '<div class="buttons_div buttons_div2">' +
        '<div id="container-button">' +
        '<button id="learn-more" data-toggle="modal" data-target="" class="learn-more" type="button">' +
        '<div class="circle">' +
        '<span class="icon arrow"></span>' +
        ' </div>' +
        ' <p class="button-text">Learn More</p>' +
        '</button>' +
        '</div>' +
        '<button type="button" class="btn btn-primary sign_up button-click" data-toggle="modal" data-target="#ownItForm" data-dismiss="modal">sign up</button>' +
        ' </div>' +
        ' </div>' +
        ' </div>' +
        '</div>' +
        '</div>' +
        ' </div>')

    $('.slick_demo_2').slick('slickAdd', newCar)
}
const addUser = (event) => {
    event.preventDefault()
    let newUser = {
        firstname: $('#inputFirstName').val(),
        lastname: $('#inputLastName').val(),
        product: $('#inputProduct').val(),
        email: $('#emailAddress').val(),
        number: $('#inputNumber').val(),
        car: $('#car').val()
    }
    if ($('#inputFirstName').val() &&
        $('#inputLastName').val() &&
        $('#inputProduct').val() &&
        $('#emailAddress').val() &&
        $('#inputNumber').val()) {
        $.post('/api/ownit', newUser)
            .then((newUser) => {
                getUser(newUser)
                let modal2 = $('#thanksModal')
                let modal = $('.form-body')
                modal2.css('display', 'block')
                modal.css('display', 'none')
                console.log(newUser)
                $('#inputFirstName').val('')
                $('#inputLastName').val('')
                $('#inputProduct').val('')
                $('#emailAddress').val('')
                $('#inputNumber').val('')
                $('#car').val('')
            })
            .catch((err) => {
                alert('Your request did not go throught, Please fill the Form again')
                console.log(err)
            })
    }
    // console.log(newUser)
}
const form = $('#ownItForm-main')
$(form).submit(addUser)

const openModal = $('#openmodal')
openModal.click(() => {
    let modal = $('.form-body')
    let block = modal.css('display')
    let modal2 = $('#thanksModal')
    if (block !== 'block') {
        let modal = $('.form-body')
        modal.css('display', 'block')
        modal2.css('display', 'none')
    }
    console.log(block)
})

function deleteUser(user) {
    let userId = user.data('id')
    let deleteUser = '/api/ownit/' + userId
    let userName = user.data('name')
    console.log(userName)
    $.ajax({
            method: 'DELETE',
            url: deleteUser
        })
        .then((message) => {
            alert(userName.toUpperCase() + ' has been deleted')
            console.log(message)
            user.remove()
        })
        .catch((err) => {
            console.log(err)
            alert('User not Deleted')
        })
}

function timedRefresh(timeoutPeriod) {
    setTimeout('location.reload(true);', timeoutPeriod)
}