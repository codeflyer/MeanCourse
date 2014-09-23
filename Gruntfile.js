//Code example 04-linting
//Gruntfile.js
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-mkdir');

    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-angular-templates');

    // Project configuration.
    grunt.initConfig({
        mkdir: {
            all: {
                options: {
                    create: [
                        'public',
                        'public/styles',
                        'logs'
                    ]
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            ngApp: {
                files: {
                    "public/js/app.js" : "public/js/app.js"
                }
            }
        },
        ngtemplates: {
            render: {
                cwd: 'ngApp',
                src: './**/*.html',
                dest: 'ngApp/templates.js'
            }
        },
        uglify : {
            ngDev: {
                options: {
                    mangle: false,
                    beautify: false,
                    make_seqs : false,
                    report: 'gzip',
                    preserveComments: false,
                    sourceMap: true,
                    banner: "(function(window, angular) {\n   'use strict';\n",
                    footer: '\n\n})(window, angular);'
                },
                files: [
                    {
                        src: [
                            'ngApp/app.js',
                            'ngApp/templates.js',
                            'ngApp/filters/**/*.js',
                            'ngApp/services/**/*.js',
                            'ngApp/directives/**/*.js',
                            'ngApp/controllers/**/*.js'
                        ],
                        dest: "public/js/app.js"
                    }
                ]
            },
            ngProd: {
                options: {
                    compress: {
                        drop_console: true,
                        join_vars: true
                    },
                    beautify: {
                        ascii_only: true,
                        beautify: false
                    },
                    sourceMap: false,
                    preserveComments: false,
                    report: 'gzip',
                    banner: "/**!\n * @Project: <%= pkg.name %>\n * @Author: Esis Italia S.r.L\n * @Link: http://www.esis-italia.com/\n * @License: All Rights Are Reserved\n * @Date: <%= grunt.template.today('yyyy-mm-dd') %>\n * @Version: <%= pkg.version %>\n***/\n\n",
                    footer: '\n'
                },
                files: [
                    {
                        src  : "public/js/app.js",
                        dest : "public/js/app.js"
                    }
                ]
            }
        },
        watch: {
            angular: {
                files: ['ngApp/**/*.js', 'ngApp/**/*.html'],
                tasks: ['ngapp'],
                options: {
                    spawn: false
                }
            }
        }
    });


    grunt.registerTask('prepare', ['mkdir']);
    grunt.registerTask('ngapp', ['ngtemplates', 'uglify:ngDev']);
    grunt.registerTask('ngappprod', ['ngapp', 'ngAnnotate', 'uglify:ngProd']);
};

