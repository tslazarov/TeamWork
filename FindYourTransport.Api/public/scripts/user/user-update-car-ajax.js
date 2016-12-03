/* globals window $*/

var app = app || {};

$("#tb-update-car").on("click", (ev) => {
    console.log("here");
    const manufacturer = $("#tb-manufacturer").val();
    const model = $("#tb-model").val();
    const seats = $("#tb-seats option:selected").text();
    const fuelType = $("#tb-fuel-type option:selected").text();
    const transmissionType = $("#tb-transmission-type option:selected").text();
    const registrationNumber = $("#tb-registration-number").val();

    let data = {
        manufacturer,
        model,
        seats,
        fuelType,
        transmissionType,
        registrationNumber
    };

    if (app.validator.validateUpdateCar(data)) {
        app.requester.put("/profile/update-car", data)
            .then(response => {
                let parsedResponce = JSON.parse(response);

                if (parsedResponce.success) {
                    app.notificator.showNotification(parsedResponce.success, "success");
                    setTimeout(() => {
                        window.location.href = "/profile";
                    }, 1500);
                } else if (parsedResponce.error) {
                    app.notificator.showNotification(parsedResponce.error, "error");
                }
            })
            .catch(err => {
                let parsedError = JSON.parse(err);
                app.notificator.showNotification(parsedError.error, "error");
            });
    }

});