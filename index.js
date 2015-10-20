/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');
var merge = require('merge');
var mergeTrees  = require('broccoli-merge-trees');
var webfont = require('broccoli-webfont');

module.exports = {
  name: 'ember-cli-webfont',

  options: function() {
    var webfontOptions = this.app.options.webfont || {};
    return merge(true, {}, {
      files: ['**/*.svg'],
      dest: 'assets/webfonts/',
      fontName: 'iconfont',
      cssFontsPath: 'webfonts/',
      cssTemplate: webfont.templates.css,
      templateOptions: {
        classPrefix: 'iconfont-',
        baseClass: 'iconfont'
      }
    }, webfontOptions.options || {});
  },

  webfontPath: function() {
    var path = 'app/webfont-svg';
    if (this.app.options.webfont && this.app.options.webfont.path) {
      path = this.app.options.webfont.path;
    }
    return path;
  },

  treeForStyles: function() {
    var path = this.webfontPath();
    var cssTree = webfont(path, this.options);
    return cssTree;
  },

  treeForPublic: function() {
    var path = this.webfontPath();
    var options = merge(true, { css:false }, this.options());
    var fontTree = webfont(path, options);
    return fontTree;
  }
};
