$(document).ready(function() {

    form.validate({
        debug: true,
        rules: {
            firstname: {
                required: true,
                minlength: 3,
                maxlength: 25
            },
            lastname: {
                required: true,
                minlength: 3,
                maxlength: 25
            },
            email: {
                required: true,
                email: true
            },
            number: 'required'
        },
        messages: {
            firstname: {
                required: 'Please enter a First Name',
                minlength: 'First Name is less that 3 characters!',
                maxlength: 'First Name is more that 25 characters!'
            },
            lastname: {
                required: 'Please enter a Last Name',
                minlength: 'Last Name is less that 3 characters!',
                maxlength: 'Last Name is more that 25 characters!'
            }
        },
        // submitHandler: function() {
        //     form.submit(addUser)
        // }
    })
})