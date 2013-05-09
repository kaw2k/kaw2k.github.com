module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        watch: {
            files: [
                'assets/**/*.css',
                //'assets/**/*.sass',
                'assets/**/*.js',

                'layouts/*.md',
                'layouts/*.html',

                'pages/*.md',
                'pages/*.html',

                'partials/*.md',
                'partials/*.html',

                'posts/*.md',
                'posts/*.html',

                '*.js'
            ],
            tasks: 'exec'
        },

        exec: {
            //compass: {
                //command: 'compass compile -f',
                //stdout: true
            //},
            compile: {
                command: 'ssc2 b p',
                stdout: true
            }
        },

        server: {
            port: 8080,
            base: 'public'
        }
    });

    // Import tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    // Default task.
    //grunt.registerTask('default', 'exec server watch');
    grunt.registerTask('default', ['exec', 'watch']);

};
