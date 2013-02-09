module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        watch: {
            files: [
                'assets/**/*.less',
                'assets/**/*.scss',
                //'assets/stylesheets/*.css',
                //'assets/**/*.css',
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
            tasks: 'less exec'
        },

        exec: {
            //compass: {
                //command: 'compass compile',
                //stdout: true
            //},
            compile: {
                command: 'ssc b',
                stdout: true
            }
        },

        server: {
            port: 8080,
            base: 'public'
        },

        less : {
            production: {
                options: {
                    yuicompress: true
                },
                files: {
                    'assets/css/styles.css': 'assets/less/bootstrap.less'
                }
            }
        }
    });

    // Default task.
    grunt.registerTask('default', 'less exec server watch');

    // Import tasks
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-less');
};
