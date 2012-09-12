module.exports = function(grunt) {
    grunt.initConfig({

        lint: {
            files: ['grunt.js', 'scripts/**/*.js', 'test/**/*.js']
        },

        qunit: {
            files: ['test/**/*.html']
        },

        watch: {
            files: '<config:lint.files>',
            tasks: 'lint qunit'
        }

    });

    // Default task.
    grunt.registerTask('default', 'lint qunit');
};
