$(document).ready(function() {
    /**
     *Gets All Cars in the database and add on page Load
     */

    $.getJSON('/api/cars')
        .then(getCars)
        // getCars(carInfo)
})

/**
 *map over All Cars gotten from database on page Load
 */
const getCars = (cars) => {
    // add users to page
    cars.map((car) => {
        getCar(car)
    })

    /**
     *Select a new car model to display
     */

    $('#select-product-images').on('click', '.selected', function() {
        $('html, body').animate({
            scrollTop: $("#car-details").offset().top
        }, 2000);
        const currectCar = $(this).find('p')
        let text = currectCar.text()
        console.log('click!!!', text)
    })
}


/**
 * Formats car.Image for proper 
 */
function changeupload(upload) {
    return upload.split('').map(a => a === '\\' ? '/' : a).join('')
}


/**
 * Add All Cars gotten from database after page Load
 */
function getCar(car) {

    let image = changeupload(car.carImage)
    let style = `background-image: url( ${image} );`
    let newCarSmaller = $('<div class="div-img-small">' +
        '<div class="">' +
        `<img class="img-small" src="${image}" class="" alt="">` +
        '</div>' +
        '</div>')
    let newCar = $(`<div` +
        `<div style="${style}" class="image-imitation">` +
        // `<img src="${image}" class="" alt="">` +
        '</div>' +
        '</div>')
    let newCar2 = $('<div>' +
        '<div class="selected" ">' +
        `<div style="${style}" class="image-imitation image-imitation-two">` +
        '</div>' +
        '<div class="image-imitation-two-text">' +
        `<p class="card-text car-text">${car.make} ${car.model} ${car.year}</p>` +
        `<p class="card-text car-text-details"> <span>Weekly payment:</span> N ${car.weeklypayment} </p>` +
        '</div>' +
        // '</a>' +
        '</div>' +
        '</div>')
    $('.product-images').slick('slickAdd', newCar)


    $('.product-images-shower').slick('slickAdd', newCarSmaller)
    $('.select-product-images').slick('slickAdd', newCar2)
}
/**
 * Cars to select on the page
 */
const carInfo = [{
            'make': 'toyota',
            'model': 'corolla',
            'year': '2005',
            'downpayment': '100,000',
            'carImage1': 'assets/img/cars/toyota-corolla-frontview-2005.jpg',
            'carImage2': 'assets/img/cars/toyota-corolla-sideview-2005.jpg',
            'carImage3': 'assets/img/cars/toyota-corolla-rearview-2005.jpg',
            'weeklypayment': '25,000'
        },
        {
            'make': 'toyota',
            'model': 'corolla',
            'year': '2006',
            'downpayment': '100,000',
            'carImage1': '',
            'carImage2': '',
            'carImage3': '',
            'weeklypayment': '25,000'
        },
        {
            'make': 'toyota',
            'model': 'corolla',
            'year': '2007',
            'downpayment': '100,000',
            'carImage1': '',
            'carImage2': '',
            'carImage3': '',
            'weeklypayment': '25,000'
        },
        {
            'make': 'toyota',
            'model': 'corolla',
            'year': '2008',
            'downpayment': '100,000',
            'carImage1': '',
            'carImage2': '',
            'carImage3': '',
            'weeklypayment': '25,000'
        },
        {
            'make': 'toyota',
            'model': 'corolla',
            'year': '2009',
            'downpayment': '100,000',
            'carImage1': '',
            'carImage2': '',
            'carImage3': '',
            'weeklypayment': '25,000'
        },
        {
            'make': 'toyota',
            'model': 'corolla',
            'year': '2010',
            'downpayment': '100,000',
            'carImage1': '',
            'carImage2': '',
            'carImage3': '',
            'weeklypayment': '25,000'
        }
    ]
    /**
     * toggle middle to display
     */
$('#full_details-bottom').click(() => {
    if ($('#show-icon').hasClass('fa-plus')) {
        $('#show-icon').toggleClass('fa-plus')
        $('#show-icon').addClass('fa-minus')
        $('#show-hide').text('Hide')
    } else {
        $('#show-icon').removeClass('fa-minus')
        $('#show-icon').addClass('fa-plus')
        $('#show-hide').text('Show')
    }
    $('#full_details-middle ').toggleClass('display-none')
})

/**
 * for form validation
 */
const form = $('#ownItForm-main')