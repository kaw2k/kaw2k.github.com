module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        watch: {
            files: [
                'assets/**/*.less',
                'assets/**/*.css',
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
            tasks: 'exec less'
        },

        exec: {
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
                    'public/assets/css/styles.css': 'assets/less/bootstrap.less'
                }
            }
        }

    });

    // Default task.
    grunt.registerTask('default', 'exec less server watch');

    // Import tasks
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-less');

};
