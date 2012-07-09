({
    appDir: './',
    baseUrl: './',
    dir: '../../build/app/',
    paths: {
        "jquery": "../../asset/js/jquery-1.7.2",
        "underscore" : "../../asset/js/underscore",
        "backbone": "../../asset/js/backbone",
        "text": "../../asset/js/text"
    },
    modules: [
          {
              name: 'app.backbone'
          }
    ],
    fileExclusionRegExp: /^\./
})