'use strict';


module.exports = function copyto(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-copy-to');

    // Options
    return {
        build: {
            files: [{
                cwd: 'assets',
                src: ['**/*'],
                dest: '.build/'
            }],
            options: {
                ignore: [
                    'views/**/*'
                ]
            }
        }
    };
};
