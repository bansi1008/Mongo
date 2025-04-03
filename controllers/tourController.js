const Tour = require('./../models/tourmodel');

exports.getAllTours = async (req, res) => {
  try {
    // Uncomment the following if you want to filter tours by specific conditions:
    // const tours = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy'
    // });
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    const tours = await Tour.find(queryObj);
    // Uncomment and use .where() method for chaining specific queries:
    // .where('duration')
    // .equals(5)
    // .where('difficulty')
    // .equals('easy');

    res.status(200).json({
      status: 'success',
      // requestedAt: req.requestTime, Uncomment if `req.requestTime` is defined earlier
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};
exports.getTour = async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    // requestedAt: req.requestTime,
    results: tour.length,
    data: {
      tour
    }
  });

  // console.log(req.params);
  // const id = req.params.id * 1;
  // // const tour = tours.find(el => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour
  //   }
  // });
};

exports.createTour = async (req, res) => {
  try {
    const newtour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newtour
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err
    });
    //     }
    //   );
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteTour = async (req, res) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null
  });
};
