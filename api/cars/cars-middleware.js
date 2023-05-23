const carsModel = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  // HOKUS POKUS
  try {
    const isExistingId = await carsModel.getById(req.params.id);
    if (!isExistingId) {
      res.status(404).json({ message: "car is not found" });
    } else {
      req.currentCar = isExistingId;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkCarPayload = (req, res, next) => {
  // HOKUS POKUS
  try {
    //Buradaki algoritma çok iyi***
    const allFields = ["vin", "make", "model", "mileage", "transmission"];
    let missingFields = [];
    for (let i = 0; i < allFields.length; i++) {
      const item = allFields[i];
      if (!req.body[item]) {
        missingFields.push(item);
      }
    }
    if (missingFields.length > 0) {
      res.status(400).json({
        message: `${missingFields.toString()} ${
          missingFields.length == 1 ? "is" : "are"
        } missing`,
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkVinNumberValid = (req, res, next) => {
  // HOKUS POKUS
  try {
    let isValidVin = vinValidator.validate(req.body.vin);
    if (!isValidVin) {
      res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  // HOKUS POKUS
  try {
    //kötü çözüm: tüm dataların (carsModel.getAll()) alınıp kontrol edilmesi.

    //iyi çözüm.
    let isExistingVin = await carsModel.getByVin(req.body.vin);
    if (isExistingVin) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};
