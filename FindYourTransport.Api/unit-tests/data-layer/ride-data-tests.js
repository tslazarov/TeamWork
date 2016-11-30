/* globals describe it beforeEach afterEach*/

let chai = require("chai");
let expect = chai.expect;
let sinonModule = require("sinon");
let Ride = require("./utils/fakeRide");
let data = require("../../server/data/ride-data")({ Ride });

describe("Test ride data", () => {
    let sinon;
    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("getAllRides", () => {
        it("should return 1 ride", (done) => {
            let rides = ["Sofia"];
            sinon.stub(Ride, "find", callback => {
                callback(null, rides);
            });

            data.getAllRides()
                .then(actualRides => {
                    console.log("AAAAAAAAA");
                    expect(actualRides).to.be.equal(rides);
                });
            done();
        });
    });

    describe("getSpecificRide", () => {
        let existingId = 1;
        let rideForTest = {
            id: existingId,
            driver: "Gopeto",
            fromCity: "Sofia",
            toCity: "Burgas"
        };

        let rides = [rideForTest];
        beforeEach(() => {
            sinon.stub(Ride, "findOne", (query, callback) => {
                let rideId = query.id;
                let foundRide = rides.find(ride => ride.id === rideId);
                callback(null, foundRide);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("should return specific ride by id", (done) => {
            data.getSpecificRide(existingId)
                .then(actualRide => {
                    expect(actualRide).to.equal(rideForTest);

                });
            done();
        });

        it("should not return specific ride if passed parameter is incorrect", (done) => {
            let notValidId = 3;
            data.getSpecificRide(notValidId)
                .then(actualUser => {
                    expect(actualUser).to.equal(null);
                });
            done();
        });
    });
});