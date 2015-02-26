'use strict';
app.controller('MapCtrl', ['MarkerFactory', 'TruckFactory', '$scope', function(MarkerFactory, TruckFactory, $scope) {


    $scope.$parent.$watch("trucks", function(newValue, oldValue) {
        var trucks = $scope.$parent.trucks;
        if (trucks && trucks.length > 0) {
            for(var i = 0; i < trucks.length; i++){
                var address = trucks[i].currentAddress;
                var name = trucks[i].truckName;
                if (address) {
                    MarkerFactory.createByAddress(address, function(marker) {
                        $scope.map.markers.push(marker);
                        refresh(marker);
                    });
                }
            }
        }
    });

    $scope.$watch("map.markers", function(newValue, oldValue) {

    }, true);

    $scope.$parent.$watch("myTrucks", function(newValue, oldValue) {
        var myTrucks = $scope.$parent.myTrucks;
        if (myTrucks && myTrucks.length > 0) {
            for(var i = 0; i < myTrucks.length; i++){
                var address = myTrucks[i].currentAddress;
                if (address) {
                    MarkerFactory.createByAddress(address, function(marker) {
                        $scope.map.markers.push(marker);
                        refresh(marker);
                    });
                }
            }
        }
    });

        MarkerFactory.createByCoords(37.779277, -122.41927, function(marker) {
            $scope.sfMarker = marker;
        });

        $scope.address = '';

        $scope.map = {
            center: {
                latitude: $scope.sfMarker.latitude,
                longitude: $scope.sfMarker.longitude
            },
            zoom: 12,
            markers: [],
            control: {},
            options: {
                scrollwheel: false
            }
        };

        $scope.map.markers.push($scope.sfMarker);

        $scope.clearMarkers = function () {
            $scope.map.markers = [];
        }

        $scope.addCurrentLocation = function () {
            MarkerFactory.createByCurrentLocation(function(marker) {
                marker.options.labelContent = 'You´re here';
                $scope.map.markers.push(marker);
                refresh(marker);
            });
        };

        $scope.addAddress = function() {
            var address = $scope.address;
            if (address !== '') {
                MarkerFactory.createByAddress(address, function(marker) {
                    $scope.map.markers.push(marker);
                    refresh(marker);
                });
            }
        };

        function refresh(marker) {
            $scope.map.control.refresh({latitude: marker.latitude,
                longitude: marker.longitude});
        }

    }])