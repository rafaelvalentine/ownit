$(document).ready(function() {
    let form = $('#registerForm')
    form.validate({
        debug: true,
        rules: {
            username: {
                required: true,
                minlength: 3,
                maxlength: 25
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 12
            },
            confirmPassword: {
                required: true,
                minlength: 3,
                maxlength: 25,
                equalTo: '#registerPassword'
            }
        },
        messages: {
            username: {
                required: 'Please enter a UserName',
                minlength: 'UserName most be at least 3 characters!',
                maxlength: 'UserName cannot be more than 25 characters!'
            },
            password: {
                required: 'Please enter Password!',
                minlength: 'Password most be at least 6 characters',
                maxlength: 'Password cannot be more than 12 characters'
            },
            confirmPassword: {
                required: 'Please Confirm Password',
                minlength: 'Password cannot be less than 6 characters',
                maxlength: 'Password cannot be more than 12 characters',
                equalTo: 'Passwords Do not match!'
            }
        },
        submitHandler: function(form) {
            // do other things for a valid form
            form.submit();
        }

    })
})