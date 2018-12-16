$(document).ready(function() {
    /*
       ==========================================================================
          Gets All Cars in the database on page Load
       ==========================================================================
    		*/
    $.getJSON('/api/cars')
        .then(getdashboardCars)


    $('#remember_me').click(() => {
        $('#editCarImage').attr('type', 'file')
        $('#editCarImage').val('')
        $('#editCarImage').prop('disabled', false)
    })
    $('#table_cars').on('click', '.edit', function() {
        const currectCar = $(this).closest('tr')
        let car = currectCar.data('car')
            // let editModal = $('#editModal')
            // let body = $('#body-main')
        let make = currectCar.data('make')
        let model = currectCar.data('model')
        let year = currectCar.data('year')
        let down = currectCar.data('down')
        let carId = currectCar.data('id')
        let weekly = currectCar.data('weekly')
        let image = currectCar.data('image')
        let edittedCar = {
                make: make,
                model: model,
                year: year,
                down: down,
                weekly: weekly,
                carid: carId,
                image: image
            }
            // let modalBackdrop = $('<div class="modal-backdrop fade show"></div>')
        console.log(`you want to edit : ${car}`)
        console.log('full details : ' + JSON.stringify(edittedCar))

        // editModal.addClass('show')
        // editModal.css('display', 'block')
        // body.css('overflow-y', 'hidden')
        // body.append(modalBackdrop)
        // $('#editCarImage').attr('type', 'text')
        $('#editCarImage').val(image)
        $('#editCarImage').prop('disabled', true)
        $('#editMake').val(make)
        $('#editModel').val(model)
        $('#editYear').val(year)
        $('#editDownPayment').val(down)
        $('#editWeeklyPayment').val(weekly)
        $('#editCarForm').attr('action', `/api/cars/${carId}?_method=PUT`)
            // console.log($('#editCarForm').attr('action'))

        // $('#saveEdit').click(function() {
        //     let edittedUser = {
        //         firstname: $('#editFirstName').val(),
        //         lastname: $('#editLastName').val(),
        //         email: $('#editEmail').val(),
        //         number: $('#editNumber').val()
        //     }
        //     let updateUser = '/api/ownit/' + userId
        //     if ($('#editFirstName').val() !== first ||
        //         $('#editLastName').val() !== last ||
        //         $('#editEmail').val() !== email ||
        //         $('#editNumber').val() !== number) {
        //         $.ajax({
        //                 method: 'PUT',
        //                 url: updateUser,
        //                 data: edittedUser
        //             })
        //             .then(function(data) {
        //                 body.css('overflow-y', 'visible')
        //                 modalBackdrop.remove()
        //                 editModal.removeClass('show')
        //                 editModal.css('display', 'none')
        //                 currectUser.remove()
        //                 window.onload = timedRefresh(3000)
        //             })
        //             .catch((err) => {
        //                 console.log(err)
        //                 alert('Changes to ' + user + "Didn't get effected")
        //             })
        //         console.log(edittedUser, userId)
        //     } else {
        //         body.css('overflow-y', 'visible')
        //         modalBackdrop.remove()
        //         editModal.removeClass('show')
        //         editModal.css('display', 'none')
        //         console.log(edittedUser, userId)
        //     }
        // })

        // $('#closeeditmodal').click(function() {
        //     body.css('overflow-y', 'visible')
        //     modalBackdrop.remove()
        //     editModal.removeClass('show')
        //     editModal.css('display', 'none')
        // })
    })
})

const getdashboardCars = (cars) => {
    // add users to page
    cars.map((car) => {
        getdashboardCar(car)
    })
}

function getdashboardCar(car) {
    let newCar = $('<tr>' +
        '<td>' +
        '<img src="' + ` ${car.carImage}` + '" class="rounded-circle avatar" alt="">   ' +
        '<p class="c_name">' + `${car.make} ${car.model} ` + '</p>' +
        '</td>' +
        '<td>' +
        '<span class="phone">' + '<i class="fa fa-calendar-check-o"></i> ' + car.year + '</span > ' +
        '</td>' +
        '<td>' +
        '<span>' + '<i class="fa fa-money"></i>  ' + car.downpayment + '</span>' +
        '</td>' +
        '<td>' +
        '<span>' + '<i class="fas fa-hand-holding-usd"></i>  ' + car.weeklypayment + '</span>' +
        '</td>' +
        '<td>' +
        '<button data-toggle="modal" data-target="#editcar" type="button" class="btn btn-info btn-sm edit" title="Edit"><i class="fa fa-edit"></i></button> ' +
        '<button type="button" data-type="confirm" class="btn btn-danger js-sweetalert btn-sm delete" title="Delete"><i class="fa fa-trash"></i></button> ' +
        '</td>' +
        '</tr>')
    newCar.data('id', car._id)
    newCar.data('make', car.make)
    newCar.data('model', car.model)
    newCar.data('year', car.year)
    newCar.data('down', car.downpayment)
    newCar.data('weekly', car.weeklypayment)
    newCar.data('image', car.carImage)
    newCar.data('car', `${car.make} ${car.model} `)
    $('#table_cars').append(newCar)
}