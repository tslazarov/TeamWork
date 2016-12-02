module.exports = (models) => {

    let { Fuel } = models;

    function getSpecificFuelByName(fuelType) {
        return new Promise((resolve, reject) => {
            Fuel.findOne({ fuelName: fuelType }, (err, message) => {
                if (err) {
                    return reject(err);
                }

                return resolve(message || null);
            });
        });
    }

    function updateFuels(fuel) {
        const options = {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        };

        console.log(fuel);

        Fuel.findOneAndUpdate({ fuelName: fuel.fuelName }, { fuelPrice: fuel.fuelPrice }, options, (err) => {
            if (err) {
                return err;
            }

            return;
        });
    }

    return {
        updateFuels,
        getSpecificFuelByName
     };
};