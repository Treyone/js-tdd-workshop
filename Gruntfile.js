/*global module:false*/
var coptions =
    module.exports = function (grunt) {

        //require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
        // Project configuration.
        grunt.initConfig({
            myConfig: {
                "tmp_dit": ".tmp"
            },
            mkdir: {
                all: {
                    options: {
                        mode: 0755,
                        create: ['<%= myConfig.tmp_dit %>']
                    }
                }
            },
            clean: {
                all: ['<%= myConfig.tmp_dit %>']
            },
            copy: {

                test: {
                    files: [
                        {expand: true,
                            src: "src/main/tests/test.html", dest: "<%= myConfig.tmp_dit %>/",
                            filter: 'isFile',
                            flatten: true
                        },
                        {expand: true,
                            src: "src/main/tests/js/*.js", dest: "<%= myConfig.tmp_dit %>/tests/",
                            flatten: true
                        },
                        {expand: true,
                            src: "src/main/tests/libs/**", dest: "<%= myConfig.tmp_dit %>/libs/",
                            flatten: true
                        },
                        {expand: true,
                            src: "src/main/js/libs/*.js", dest: "<%= myConfig.tmp_dit %>/libs/",
                            flatten: true
                        },
                        {expand: true,
                            src: "src/main/js/*.js", dest: "<%= myConfig.tmp_dit %>/js/",
                            flatten: true
                        }
                    ]
                }
            },
            mocha:{
                server:{
                    options: {
                        run:true,
                        urls: [ 'http://localhost/javascript-tps/.tmp/test.html' ]
                    }
                }
            },
            watch:{
                tests:{
                    files: ['src/main/**/*.js'],
                    tasks: ['test'],
                    options: {
                        spawn: false,
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


        // Default task.
        grunt.registerTask('test', ['clean:all', 'mkdir', 'copy:test', 'mocha:server','watch']);

    };
