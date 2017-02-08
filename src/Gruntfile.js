'use strict';

module.exports = function(grunt) {

    // Load the project's grunt tasks from a directory
    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve('tasks')
    });

    require('./tasks/assetsbuild');

    grunt.registerTask('build', ['eslint', 'dustjs', 'copyto']);

    grunt.registerTask('test', ['eslint', 'mochacli']);
};