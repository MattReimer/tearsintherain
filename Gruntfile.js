module.exports = function(grunt) {
  grunt.initConfig({

    // Run compass
    // All the parameters below replace config.rb.
   compass: {
      options: {
        watch: false,
        cssDir: 'Deploy/css',
        sassDir: 'scss',
        imagesDir: 'img',
        javascriptsDir: 'js',
        fontsDir: 'fonts',
        httpPath: '/',
        relativeAssets: true,
        noLineComments: true,
        importPath: [
          'bower_components/foundation/scss',
          'bower_components/ionicons/scss'
        ],
      },
      dist: {
        options: {
          environment: 'production',
          outputStyle: 'compressed',
        },
      },
      dev: {
        options: {
          environment: 'development',
          outputStyle: 'nested',
        },
      },
    },

    copy: {
      deploy: {
        files: [
          { expand:true, cwd:'', src:'index.html', dest: 'Deploy/' },
          { expand:true, cwd:'bower_components/modernizr/', src:'modernizr.js', dest: 'Deploy/js' },
          { expand:true, cwd:'bower_components/jquery/dist/', src:'jquery.min.map', dest: 'Deploy/js' },
          { expand:true, cwd:'bower_components/ionicons/fonts', src:'ionicons.*', dest: 'Deploy/fonts' }
        ],
      },
    },

    // uglify: {
    //   options: {
    //     mangle: false
    //   },
    //   my_target: {
    //     files: {
    //       'dest/output.min.js': ['src/input.js']
    //     }
    //   }
    // },

    // Collect all our js into one script
    concat: {
        options: {
          separator: '\n;\n\n',
        },
        dist: {
          src: [
            'bower_components/jquery/dist/jquery.min.js', 
            'bower_components/foundation/js/foundation.min.js', 
            'bower_components/moment/min/moment.min.js', 
            'bower_components/birthday-picker/bday-picker.min.js', 
            'bower_components/jquery-cookie/jquery.cookie.js',
            'js/data.json',
            'js/app.js',

          ],
          dest: 'Deploy/js/app.js',
        },
      },

    // This is for dev only. Makes use of livereload on file changes.
    watch: {
      deploy: {
        files: ['Deploy/*.html', 'Deploy/css/*.css', 'Deploy/js/*.js'],
        options: { livereload: true}
      },
      html: {
        files: ['*.html'],
        tasks: ['copy'],
      },
      js: {
        files: ['js/*.js'],
        tasks: ['concat'],
      },
      scss: {
        files: ['scss/*.scss'],
        tasks: ['compass:dev'],
      },
    }
  });


  // Define the modules we need for these tasks:
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib-uglify');

  // Here are our tasks 
  grunt.registerTask('default', [ 'deploy' ]);
  grunt.registerTask('init', ['copy:bowerlibs','concat']);
  grunt.registerTask('deploy', [ 'compass:dist', 'concat','copy:deploy']);
  grunt.registerTask('dev', [ 'watch' ]);

};