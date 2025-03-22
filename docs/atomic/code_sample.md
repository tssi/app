// Example usage based on atomic..md instructions

define(['app', 'api', 'atomic/bomb'], function (app) {

  app.register.controller('YourController', ['$scope', '$rootScope', 'api', 'Atomic', function ($scope, $rootScope, api, atomic) {

    // Scope Management (Recommended)
    const $selfScope = $scope;
    $scope = this;

    // Module Name (Optional)
    $rootScope.__MODULE_NAME = "Your Module Name";

    // You can now use the 'atomic' service here.  For example:
    // atomic.someFunction(); // Assuming atomic/bomb.js exposes a function called someFunction.
    // Remember to examine atomic/bomb.js to understand available functions.

    // Wait for the atomic vars to load
    atomic.ready(function(){
      // Perform actions after atomic is ready. For example:
      console.log("Atomic is ready!");
    });
    $scope.init = function() {
      console.log("YourController initialized with Atomic Design Library");
      // Example of calling a function when the controller initializes
      // Ensure that the fuse function exists in atomic/bomb.js
      // atomic.fuse();
    };

    $scope.init();


  });
});
```