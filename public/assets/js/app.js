$(document).ready(function() {

    // Gets All Users in the database on page Load
    $.getJSON('/api/ownit')
        .then(getUsers)

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

    $('#table').on('click', '.delete', function() {
        deleteUser($(this).closest('tr'))
    })
})

const getUsers = (users) => {
    // add users to page
    users.map((user) => {
        getUser(user)
    })
}

function getUser(user) {
    let newUser = $('<tr>' +
        '	<td>' +
        '<img src="assets/img/user_avatar.png" class="rounded-circle avatar" alt="">   ' +
        '<p class="c_name">' + `${user.firstname} ${user.lastname}` + '</p>' +
        '	</td>' +
        '<td>' +
        '	<span class="phone">' + '<i class="fa fa-phone"></i>  ' + user.number + '</span > ' +
        '	</td>' +
        '	<td>' +
        '<address>' + '<i class="fa fa-envelope-open"></i>  ' + user.email + '</address>' +
        '</td>' +
        '	<td>' +
        '<span>' + '<i class="fa fa-product-hunt"></i> ' + user.product + '</span>' +
        '</td>' +
        '<td>' +
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
    $('#table').append(newUser)
}

const addUser = (event) => {
    event.preventDefault()
    let newUser = {
        firstname: $('#inputFirstName').val(),
        lastname: $('#inputLastName').val(),
        product: $('#inputProduct').val(),
        email: $('#emailAddress').val(),
        number: $('#inputNumber').val()
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
            })
            .catch((err) => {
                alert('Your request did not go throught, Please fill the Form again')
                console.log(err)
            })
    }
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
    setTimeout("location.reload(true);", timeoutPeriod);
}