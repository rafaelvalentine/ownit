$(document).ready(function() {
    /*
       ==========================================================================
          Gets All Cars in the database on page Load
       ==========================================================================
    		*/
    $.getJSON('/api/cars')
        .then(getdashboardCars)


    $("#addProductForm").submit(function(event) {

        //disable the default form submission
        event.preventDefault();
        //grab all form data  
        let newCar = {
            make: $('#addMake').val(),
            model: $('#addModel').val(),
            year: $('#addYear').val(),
            downpayment: $('#addDownpayment').val(),
            carImage: $('#addcarImage').val(),
            weeklypayment: $('#addWeeklypayment').val()
        }
        const formData = $(this)

        console.log(newCar)
        $.ajax({
            url: '/api/cars',
            type: 'POST',
            data: newCar,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function() {
                console.log('Form Submitted!');
            },
            error: function() {
                console.log("error in ajax form submission");
            }
        });

        return false;
    });

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
        '<span>' + '<i class="fa fa-credit-card"></i> ' + car.weeklypayment + '</span>' +
        '</td>' +
        '<td>' +
        '<button data-target="#editModal" type="button" class="btn btn-info btn-sm edit" title="Edit"><i class="fa fa-edit"></i></button> ' +
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