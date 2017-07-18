"use strict";

module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({

    less: {
      style: {
        files: {
          "build/css/style.css": ["less/style.less"]
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")({browsers: [
              "last 2 versions"
            ]})
          ]
        },
        src: "build/css/*.css"
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: ["build/*.html", "build/css/*.css", "build/img/**", "build/js/**"]
        },
        options: {
          server: "build/",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    watch: {
      html: {
        files: ["*.html"],
        tasks: ["copy:html"]
      },
      style: {
        files: ["less/**/*.less"],
        tasks: ["less", "postcss", "csso"]
      },
      image: {
        files: ["img/sprite/*.svg"],
        tasks: ["copy:image", "svgmin", "svgstore"]
      },
      js: {
        files: ["js/**"],
        tasks: ["copy:js"]
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif}"]
        }]
      }
    },

    svgstore: {
      options: {
        svg: {
          style: "display: none"
        }
      },
      sprite: {
        files: {
          "build/img/sprite.svg": ["img/sprite/*.svg"]
        }
      }
    },

    svgmin: {
      sprite: {
        files: [{
          expand: true,
          src: ["build/img/sprite/*.svg"]
        }]
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          src: [
            "fonts/**/*.{woff,woff2}",
            "img/**",
            "js/**",
            "*.html"
          ],
          dest: "build"
        }]
      },
      html: {
        files: [{
          expand: true,
          src: ["*.html"],
          dest: "build"
        }]
      },
      image: {
        files: [{
          expand: true,
          src: ["img/sprite/*.svg"],
          dest: "build"
        }]
      },
      js: {
        files: [{
          expand: true,
          src: ["js/**"],
          dest: "build"
        }]
      }
    },

    clean: {
      build: ["build"]
    }

  });

  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("sprite", ["svgmin", "svgstore"]);

  grunt.registerTask("build", [
    "clean",
    "copy",
    "less",
    "postcss",
    "csso",
    "sprite",
    "imagemin"
  ]);

};
