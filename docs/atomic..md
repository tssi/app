# Atomic Design Library Usage Guide

 ## Overview of Atomic Design

This library appears to implement a subset of Atomic Design principles, providing reusable components and a structured approach to building user interfaces. Atomic Design breaks down UIs into fundamental building blocks:

*   **Atoms:** Basic HTML elements (e.g., buttons, inputs, labels). The provided code doesn't explicitly show atoms, but `atomic/bomb.js` likely contains functionality for managing them.

*   **Molecules:** Combinations of atoms that form simple UI components (e.g., a search form consisting of an input and a button).  The modal service could be considered a molecule.

*   **Organisms:** More complex UI sections composed of molecules and atoms (e.g., a header with navigation).

*   **Templates:** Page-level layouts that define the structure of content.

*   **Pages:** Specific instances of templates with real content.

This guide outlines how to integrate and use the core features of this Atomic Design implementation within your application. The focus seems to be on providing a framework for managing components and their interactions.

## Atomic Design Implementation in AngularJS

This library leverages AngularJS directives and services to implement the Atomic Design principles. Here's how the concepts are realized:

*   **Atoms:** Basic HTML elements are used directly in templates or wrapped in directives for added functionality. `atomic/bomb.js` likely contains global configurations or helper functions for managing these fundamental elements.
*   **Molecules:**  AngularJS directives such as `mNavpillDept` (defined in `molecule/mNavpillDept.js`) encapsulate combinations of atoms. These directives often use `templateUrl` to include pre-defined HTML structures and `scope` to manage data binding. The modal service mentioned, and presumably implemented in `atomic/bomb.js`, would also be considered a molecule.
*   **Organisms:** Organisms are likely constructed by combining molecules and atoms within AngularJS templates or within more complex directives. There is no explicit example of an organism in the provided files.
*   **Templates:** Templates are represented by the `.html` files referenced in directives using `templateUrl` (e.g., `aPath.url('/view/molecule/mNavPillDept.html')` in `molecule/mNavpillDept.js`). These files define the structure of UI components.
*   **Pages:** Pages are composed by assembling templates and populating them with data within AngularJS controllers.

The `Atomic` service, injected into controllers (as seen in `admin/app/vendors/atomic_design/__docs/js/basic.js`), provides access to shared data or functionality across the application, likely managing the state and interactions of the atomic components. The `atomic.ready()` function ensures that the Atomic library is fully initialized before components rely on its services.

To understand the full scope of the implementation, you should inspect the contents of `atomic/bomb.js` to see the service and how it manages the components.


## Integrating the Atomic Design Library

To effectively use the Atomic Design Library within your AngularJS application, follow these steps. This guide assumes you are using RequireJS for module management.  A complete code example can be found at [admin/app/docs/atomic/code_sample.md](atomic/code_sample.md).

1.  **Define Dependencies (RequireJS):**

    *   In your `define` function, include `'atomic/bomb'` as a dependency. This makes the Atomic module available.
    *   Example:

        ```javascript
        define(['app', 'api', 'atomic/bomb', function (app) { ... });
        ```

2.  **Controller Injection:**

    *   Inject the `Atomic` provider into your controller.
    *   Example:

        ```javascript
        app.register.controller('YourController', ['$scope', '$rootScope', 'api', 'Atomic', function ($scope, $rootScope, api, atomic) { ... });
        ```

3.  **Scope Management (Recommended):**

    *   For better `this` context management within your controller, consider the following pattern:

        ```javascript
        const $selfScope = $scope;
        $scope = this;
        ```

4.  **Module Name (Optional):**

    *   Set the module name for potential use in your application.
    *   Example:

        ```javascript
        $rootScope.__MODULE_NAME = "Your Module Name";
        ```

5.  **Atomic Ready Function:**

    *   The `atomic.ready()` function can be used to execute code after the Atomic library is fully loaded and ready.
    *   Example:

        ```javascript
        atomic.ready(function(){
          // Your code here
        });
        ```


6.  **Atomic Alive Module:**

    *   The `atomic/alive/index` module is available, potentially for health checks or similar functionality. Include it via `define(['app','atomic/alive/index'], function (app,alive) {});`. Its specific usage requires further investigation of its API.

7.  **Modal Service:**

    *   Example: `aModal.open('TestModal');` and `aModal.close('TestModal');`
8.  **Further Exploration:**

    *   The provided files represent a basic structure. To fully understand the capabilities of the Atomic Design library, you'll need to:
        *   Examine the code within `atomic/bomb.js` (not provided) to understand the functions and services it exposes.
        *   Look for additional documentation or examples related to the Atomic Design library within the project.
