/* jshint strict:false */
/*global module:false */

module.exports = function (grunt) {
    //require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // Project configuration.
    grunt.initConfig({
        myConfig: {
            'tmp_dir': '.tmp',
            'port': 3000
        },
        /* JSHINT CONFIGURATION */
        jshint: {
            options: {
                jshintrc: true
            },
            all: ['Gruntfile.js', 'src/main/js/*.js', 'src/main/tests/js/*.js']
        },
        /*
         * Create .tmp directory for receiving files
         * Only for creating a static server
         */
        mkdir: {
            all: {
                options: {
                    mode: 0755,
                    create: ['<%= myConfig.tmp_dir %>']
                }
            }
        },
        /*
         * Delete directory .tmp
         */
        clean: {
            all: ['<%= myConfig.tmp_dir %>']
        },
        /*
         * Copy files to .tmp directory
         */
        copy: {
            test: {
                files: [
                    {expand: true,
                        src: 'src/main/tests/test.html', dest: '<%= myConfig.tmp_dir %>/',
                        filter: 'isFile',
                        flatten: true
                    },
                    {expand: true,
                        src: 'src/main/tests/js/*.js', dest: '<%= myConfig.tmp_dir %>/tests/',
                        flatten: true
                    },
                    {expand: true,
                        src: 'src/main/tests/libs/**', dest: '<%= myConfig.tmp_dir %>/libs/',
                        flatten: true
                    },
                    {expand: true,
                        src: 'src/main/js/libs/*.js', dest: '<%= myConfig.tmp_dir %>/libs/',
                        flatten: true
                    },
                    {expand: true,
                        src: 'src/main/js/*.js', dest: '<%= myConfig.tmp_dir %>/js/',
                        flatten: true
                    }
                ]
            }
        },
        /**
         * Create server on .test
         */
        connect: {
            options: {
                port: 9001,
                hostname: 'localhost'
            },
            test: {
                options: {
                    /* Set it to true if you want to open browser */
                    open: false,
                    /* The 'BaseDirectory' (where files are copied) */
                    base: ['<%= myConfig.tmp_dir %>']
                }
            }
        },
        /*
         * Mocha runner
         */
        mocha: {
            server: {
                options: {
                    run: true,
                    urls: [ 'http://localhost:9001/test.html' ]
                }
            }
        },
        /*
         * Run tests on files change
         */
        watch: {
            tests: {
                files: ['src/main/**/*.js'],
                tasks: ['clean:all', 'mkdir', 'copy:test', 'mocha:server'],
                options: {
                    spawn: false
                }
            }
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');


    // TASKS .
    /**
     * test :
     * remove data from .tmp directory,
     * create directory,
     * copy files to .tmp directory,
     * run the static server, then run tests
     */
    grunt.registerTask('test', ['clean:all', 'mkdir', 'copy:test', 'connect', 'mocha:server']);

    /**
     * dev :
     * remove data from .tmp directory,
     * create directory,
     * copy files to .tmp directory,
     * run the static server, then run tests
     * watch for filesystem modification and run tests again
     */
    grunt.registerTask('dev', ['jshint', 'test', 'watch']);
};
