const path = require('path'); //modulo nativo importato per aiutarci con i percorsi assoluti!
const HtmlWebpackPlugin = require('html-webpack-plugin');//12)importo il plugin nel webpackconfig

module.exports={          //esportiamo un oggetto che e' l'oggetto di configurazione di webpack
  entry: {
  index:   './src/js/index.js' //quale deve essere l'entry poit? noi abbiamo creato il file index.js nella cartella js
  },
  output: {
    path: path.resolve(__dirname, 'dist'), //in quale cartella metter la versione finale vuole un percorso assoluto!
    filename: '[name].[contenthash].js', //nome del file
    clean: true
  },
  module: {rules: [
    {
      test: /\.css$/i, //individuiamo il tipo di file con cui lavorare
      use: ['style-loader', 'css-loader']
    }
  ] },  //loaders
  plugins: [
    new HtmlWebpackPlugin ({
      title: 'applicazione webpack',
      template: './src/index.html'
    })
  ],          //loaders
  devServer: {
    port: 5000,
    open: true,
    static: path.resolve(__dirname, 'dist')
  },        //loaders
  mode: 'development'//diamo il valore development, quindi diciamo a webpack che l'applicazione non e' completa
                    //diamo il valore production, quindi diciamo a webpack che l'applicazione e' completa e deploiabile
};
console.log("tutto ok"); //virifico il percorso corretto assoluto es: C:\Users\Admin\Documents\GitHub\ProvaWebPack
