module.exports = function(config) {
    config.set({
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        files: [
            'src/app/app.component.spec.ts'
        ],
        preprocessors: {
            'src/app/app.component.spec.ts': ['typescript']
        },
        reporters: ['progress'],
        browsers: ['Chrome'],
        singleRun: true,
        typescriptPreprocessor: {
            options: {
                sourceMap: true
            }
        }
    });
};