var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "timepicker.css"  
});

module.exports = {
    entry: ["./src/TimePickerExamples.tsx","./src/stylesheets/timepicker.scss"],
    output:  {
        path: path.join(__dirname, "dist"),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
// Enable sourcemaps for debugging webpack's output.
 //   devtool: "source-map",
resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [ ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    plugins: [
       extractSass
  ],
module: {
        // loaders: [
        //     // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        //     { test: /\.tsx?$/, loader: "ts-loader" }
        // ],
        rules: [
            {
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
          },
          {
            test: /\.tsx?$/,  
              use: [{loader: "ts-loader"}]
          }
        ]

    },
// When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
};