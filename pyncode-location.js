(function () {

    "use strict";

    const STORAGE_KEY = "pyncode-user-location";

    function saveLocation(position) {

        const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            savedAt: Date.now()
        };

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(location)
        );

        window.dispatchEvent(
            new CustomEvent("pyncodeLocationReady", {
                detail: location
            })
        );
    }


    function requestLocation() {

        if (!navigator.geolocation) {
            console.log("Geolocation is not supported.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            saveLocation,
            function (error) {

                console.log(
                    "Location permission not available:",
                    error.message
                );

            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    }


    function getLocation() {

        try {

            const saved =
                localStorage.getItem(STORAGE_KEY);

            if (!saved) {
                return null;
            }

            return JSON.parse(saved);

        } catch (error) {

            return null;

        }
    }


    window.PyncodeLocation = {

        request: requestLocation,

        get: getLocation

    };


    document.addEventListener(
        "DOMContentLoaded",
        function () {

            requestLocation();

        }
    );

})();
