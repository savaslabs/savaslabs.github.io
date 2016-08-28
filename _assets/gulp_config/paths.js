/**
 * Define variables for gulpfile.
 *
 * Kudos to https://github.com/robwise for the code and the lovely use of
 * whitespace.
 */

var paths = {};

// Directory locations.
paths.assetsDir          = '_assets/';  // The files Gulp will handle.
paths.jekyllDir          = '';          // The files Jekyll will handle.
paths.siteDir            = '_site/';    // The resulting static site.

// Folder naming conventions.
paths.postFolderName   = '_posts';
paths.draftFolderName  = '_drafts';
paths.fontFolderName   = 'fonts';
paths.imageFolderName  = 'img';
paths.scriptFolderName = 'js';
paths.stylesFolderName = 'styles';

// Asset files locations.
paths.sassFiles   = paths.assetsDir + paths.stylesFolderName;
paths.jsFiles     = paths.assetsDir + paths.scriptFolderName;
paths.imageFiles  = paths.assetsDir + paths.imageFolderName;
paths.fontFiles   = paths.assetsDir + paths.fontFolderName;

// Jekyll files locations.
paths.jekyllPostFiles  = paths.jekyllDir + paths.postFolderName;
paths.jekyllDraftFiles = paths.jekyllDir + paths.draftFolderName;
paths.jekyllImageFiles = paths.jekyllDir + paths.imageFolderName;
paths.jekyllFontFiles  = paths.jekyllDir + paths.fontFolderName;

// Site files locations.
paths.siteImageFiles = paths.siteDir + paths.imageFolderName;
paths.siteFontFiles  = paths.siteDir + paths.fontFolderName;

// Glob patterns by file type.
paths.sassPattern     = '/**/*.scss';
paths.jsPattern       = '/**/*.js';
paths.imagePattern    = '/**/*.+(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|gif|GIF|webp|WEBP|tif|TIF)';
paths.markdownPattern = '/**/*.+(md|MD|markdown|MARKDOWN)';
paths.htmlPattern     = '/**/*.html';
paths.xmlPattern      = '/**/*.xml';

// Asset files globs
paths.sassFilesGlob  = paths.sassFiles  + paths.sassPattern;
paths.jsFilesGlob    = paths.jsFiles    + paths.jsPattern;
paths.imageFilesGlob = paths.imageFiles + paths.imagePattern;

// Jekyll files globs
paths.jekyllPostFilesGlob  = paths.jekyllPostFiles  + paths.markdownPattern;
paths.jekyllDraftFilesGlob = paths.jekyllDraftFiles + paths.markdownPattern;
paths.jekyllHtmlFilesGlob  = paths.jekyllDir        + paths.htmlPattern;
paths.jekyllXmlFilesGlob   = paths.jekyllDir        + paths.xmlPattern;
paths.jekyllImageFilesGlob = paths.jekyllImageFiles + paths.imagePattern;

// Site files globs
paths.siteHtmlFilesGlob = paths.siteDir + paths.htmlPattern;

module.exports = paths;