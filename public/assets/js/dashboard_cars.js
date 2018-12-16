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

        console.log(`you want to edit : ${car}`)
        console.log('full details : ' + JSON.stringify(edittedCar))
        $('#editCarImage').val(image)
        $('#editCarImage').prop('disabled', true)
        $('#editMake').val(make)
        $('#editModel').val(model)
        $('#editYear').val(year)
        $('#editDownPayment').val(down)
        $('#editWeeklyPayment').val(weekly)
        $('#editCarForm').attr('action', `/api/cars/${carId}?_method=PUT`)
    })
    $('#table_cars').on('click', '.delete', function() {
        const currectCar = $(this).closest('tr')
        let car = currectCar.data('car')
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

        console.log(`you want to edit : ${car} ${year}`)
        console.log('full details : ' + JSON.stringify(edittedCar))
        $('#car_details').text(` : ${car} ${year}`)
            // $('#editCarImage').val(image)
            // $('#editCarImage').prop('disabled', true)
            // $('#editMake').val(make)
            // $('#editModel').val(model)
            // $('#editYear').val(year)
            // $('#editDownPayment').val(down)
            // $('#editWeeklyPayment').val(weekly)
        $('#deleteCarForm').attr('action', `/api/cars/${carId}?_method=DELETE`)

        console.log($('#deleteCarForm').attr('action'))
    })
    $('#deleteCar').click(() => {
        currectCar.remove()
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
        '<button type="button" data-type="confirm"data-toggle="modal" data-target="#deletecar"  class="btn btn-danger js-sweetalert btn-sm delete" title="Delete"><i class="fa fa-trash"></i></button> ' +
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