const fs = require('fs')
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


exports.checkID = (req, res, next, val) => {
    console.log(`Tour ID is ${val}`)
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    next()
}

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        })
    }
    next();
}



exports.getAllTours = (req, res) => {
    console.log(req.requestTime);

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    })
}


exports.getTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((value) => value.id === id)

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }

    })
}

exports.createTour = (req, res) => {
    // console.log(req.body);

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour)

    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
}


exports.updatedTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}


exports.deleteTour = (req, res) => {

    res.status(204).json({
        status: 'success',
        data: null
    })
}




/* exports.deleteTour = (req, res) => {
    const id = parseInt(req.params.id);
    const tour = tours.find((value) => value.id === id)

    if (!tour) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    const updatedTour = tours.filter((value) => value.id !== tour.id);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(updatedTour), err => {
        res.status(204).json({
            status: 'success',
            data: null
        })
    })
} */
