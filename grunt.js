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
            //clean_pages: {
                //command: 'rm ./assets/pages/*.html ./assets/pages/*.json'
            //},

            // Runs our build script
            build_pages: {
                command: 'node scripts/build.js',
                stdout: true
            }

            // Cleans the production folder
            //clean_production: {
                //command: 'rm ./production/*'
            //}
        },

        requirejs: {
            mainConfigFile: 'scripts/config.js',
            out: 'build/main.js',
            name: 'config',
            wrap: false
        }

        // Removes the less script tag and inserts a css script tag
        //replace: {
            //src: ['index.html'],
            //dest: 'build',
            //variables: {
                //styles: <
            //},
            //prefix: '@@'
        //}

    });

    // Default task.
    grunt.registerTask('default', 'watch');
    grunt.registerTask('production', 'lint qunit ');

    // Load NPM tasks
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-less');
    grunt.loadNpmTasks('grunt-replace');
};
