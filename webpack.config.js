const { exec } = require('child_process');
const path = require('path');

module.exports = (env, options) => {
  const { mode = 'development' } = options;

  const main = {
    mode,
    entry: {
      main: './src/main.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/i,
          loader: "babel-loader",
        },
      ],
    },
    plugins: [
      {
        apply: (compiler) => {
          compiler.hooks.afterDone.tap('pack-zip', () => {
            // run pack-zip.js
            exec('node .vscode/pack-zip.js', (err, stdout, stderr) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(stdout);
            });
          });
        }
      }
    ],
  };

  return [main];
}
