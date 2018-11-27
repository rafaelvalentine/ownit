const addAdmin = (event) => {
    event.preventDefault()
    let newUser = {
        email: $('#testemail').val(),
        username: $('#testusername').val(),
        password: $('#testpassword').val(),
        passwordConf: $('#testpasswordconf').val()
    }
    $.post('/api/admins', newUser)
        .then((newUser) => {
            // getUser(newUser)
            // let modal2 = $('#thanksModal')
            // let modal = $('.form-body')
            // modal2.css('display', 'block')
            // modal.css('display', 'none')
            // console.log(newUser)
            console.log(newUser)
            $('#inputFirstName').val('')
            $('#inputLastName').val('')
            $('#inputProduct').val('')
            $('#emailAddress').val('')
            $('#inputNumber').val('')

            // if ($('#inputFirstName').val() &&
            //     $('#inputLastName').val() &&
            //     $('#inputProduct').val() &&
            //     $('#emailAddress').val() &&
            //     $('#inputNumber').val()) {
            //     $.post('/api/admins', newUser)
            //         .then((newUser) => {
            //             // getUser(newUser)
            //             // let modal2 = $('#thanksModal')
            //             // let modal = $('.form-body')
            //             // modal2.css('display', 'block')
            //             // modal.css('display', 'none')
            //             // console.log(newUser)
            //             console.log(newUser)
            //             $('#inputFirstName').val('')
            //             $('#inputLastName').val('')
            //             $('#inputProduct').val('')
            //             $('#emailAddress').val('')
            //             $('#inputNumber').val('')

        })
        .catch((err) => {
            alert('Your request did not go throught, Please fill the Form again')
            console.log(err)
        })


}
$('#testform').submit(addAdmin)