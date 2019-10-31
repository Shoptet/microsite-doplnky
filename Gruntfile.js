module.exports = function(grunt) {

    require("load-grunt-tasks")(grunt);

    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        sass: {
            production: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '../dist/css/shoptet.css': 'node_modules/shoptet-microsite-styles/shoptet.scss',
                    '../dist/css/main.css': '_scss/main.scss'
                }
            }
        },
        watch: {
            css: {
                files: [
                    '_scss/*.scss',
                    '_scss/modules/*.scss'
                ],
                tasks: ['sass:production'],
                options: {
                    livereload: 35729
                }
            },
            js: {
                files: [
                    'js/*.js'
                ],
                tasks: ['uglify:production'],
                options: {
                    livereload: 35729
                }
            }
        },
        uglify: {
            production: {
                options: {
                    mangle: false,
                    compress: true
                },
                files: {
                    '../dist/js/build.js': pkg.jsFiles
                }
            }
        },
        copy: {
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/shoptet-microsite-styles/vendor/fa/webfonts/',
                        src: ['*'],
                        dest: '../dist/fonts/',
                        filter: 'isFile'
                    }
                ]
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/shoptet-microsite-styles/img',
                        src: ['**'],
                        dest: '../dist/img/'
                    }
                ]
            }
        }
    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['copy-images', 'copy-fonts', 'uglify-js', 'compile-css']);
    grunt.registerTask('uglify-js', ['uglify:production']);
    grunt.registerTask('compile-css', ['sass:production']);
    grunt.registerTask('copy-fonts', ['copy:fonts']);
    grunt.registerTask('copy-images', ['copy:images']);

};
