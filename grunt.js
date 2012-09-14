module.exports = function(grunt) {
    grunt.initConfig({

        lint: {
            files: ['grunt.js', 'scripts/**/*.js', 'test/**/*.js']
        },

        qunit: {
            files: ['test/**/*.html']
        },

        watch: {
            files: ['<config:lint.files>', 'assets/templates/*.md'],
            tasks: 'lint qunit exec'
        },

        exec: {
            // Removes the contents of the pages directory
            //remove_pages: {
                //command: 'rm ./assets/pages/*'
            //},

            // Runs our build script
            run_build: {
                command: 'node scripts/build.js',
                stdout: true
            }
        }

    });

    // Default task.
    grunt.registerTask('default', 'watch');


    // Load NPM tasks
    grunt.loadNpmTasks('grunt-exec');
};
