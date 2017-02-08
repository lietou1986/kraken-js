'use strict';

var path = require('path');

module.exports = function dustjs(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-dustjs');

	// Options
	return {
	    build: {
	        files: [
	            {
	                expand: true,
            
                    cwd: 'views/',
            
	                src: '**/*.dust',
	                dest: '.build/views',
	                ext: '.js'
	            }
	        ],
	        options: {
            
                fullname: function (filepath) {
                    return path.relative('views/', filepath).replace(/[.]dust$/, '');
                }
            
	        }
	    }
	};
};
