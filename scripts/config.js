require.config({
    deps: ['main'],

    paths: {
        // Directories
        libs: '../assets/js/libs/',
        bootstrap: '../assets/js/libs/bootstrap/',
        templates: '../assets/templates/',
        pages: '../assets/pages/',

        // Libs
        backbone: '../assets/js/libs/backbone/backbone',
        lodash: '../assets/js/libs/lodash/lodash',
        jquery: '../assets/js/libs/jquery/jquery',
        require: '../assets/js/libs/require/require',
        text: '../assets/js/libs/require/text',
        qunit: '../assets/js/libs/qunit/qunit'
    },

    shim: {
        backbone: {
            deps: ['lodash', 'jquery'],
            exports: 'Backbone'
        }
    },

    // Cache busting
    urlArgs: 'bust=' + (new Date()).getTime()
});
