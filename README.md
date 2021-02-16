# hatenablog-customize

はてなブログ向けのカスタマイズ内容をまとめています。以下の2つの目的があります。

- 自サイト https://multimineral-tech.com にて利用しているカスタマイズ内容のまとめです。
- **オリジナルのモジュール**の置き場所です。

独自モジュールについては[ブログ](https://multimineral-tech.com)で説明を行います。
原則、ここでは開発のための情報を掲載します。

## 独自モジュールの使い方

### サイドバーのカテゴリの階層化ツール

| 利用ファイル | 内容 |
| ------------ | ---- |
| [category.js](dist/js/category.js)    | T.B.D. |
| [category.css](dist/css/category.css) | T.B.D. |

T.B.D.


### 記事ヘッダーの更新日追加ツール

| 利用ファイル | 内容 |
| ------------ | ---- |
| [updated-at.js](dist/js/updated-at.js)    | T.B.D. |
| [updated-at.css](dist/css/updated-at.css) | T.B.D. |

T.B.D.


## 開発者向け

### ファイル構成

#### ファイルの種類と内容

```
./
│  .babelrc
│  .gitignore
│  package-lock.json
│  package.json
│  README.md
│
├─demo             表示確認用
│  │  demo_*.html    表示確認用の HTML
│  │  bundle.js      表示確認用にまとめた JavaScript
│  │  bundle.css     表示確認用にまとめた CSS
│  │
│  └─original       demo_*.html で読み込んでいるファイル置き場
│
├─dist             はてなブログコピペ用
│  ├─css
│  │      *.css      直接編集する
│  └─js
│          *.js       Babel により生成される
│
├─node_modules
│  └─...
│
└─src              Babel の変換元
        *.js           直接編集する
```

| ファイル名           | 内容 |
| -------------------- | ---- |
| `./src/*.js`         | カスタマイズ用の JavaScript。**編集対象**です。変換前のため直接利用されません。 |
| `./dist/js/*.js`     | Babel で変換後の JavaSdript。「管理画面＞デザイン＞カスタマイズ＞フッタ」へのコピペ用です。 |
| `./dist/css/*.css`   | カスタマイズ用の CSS。**編集対象**です。はてなブログの「管理画面＞デザイン＞カスタマイズ＞デザインCSS」へのコピペ用です。 |
| `./demo/demo_*.html` | 表示確認用 HTML。直接ブラウザで開いて確認します。 |
| `./demo/bundle.js`   | Babel で変換＆1つにまとめられた後のJavaSdript。表示確認用 HTML で利用しています。 |
| `./demo/bundle.css`  | `@import` 文で1つにまとめたCSS。表示確認用 HTML で利用しています。 |

#### ファイルの関係

表示確認用の `./demo_*.html` では以下のようにファイルを参照しています。

```
./demo_*.html
↑
↑（参照）
↑
├─./demo/bundle.js
│  ↑
│  ↑（変換 : Babel）
│  ↑
│  └─./src/*.js
│
└─./demo/bundle.css
    ↑
    ↑（参照 : @import）
    ↑
    └─./dist/*.css
```


### 作成方法

#### CSS の編集

`./dist/css/*.css` を編集します。以上！

#### JavaScript の編集

`./src/js/*.js` を編集します。

編集後は下記のコマンドで **ES5 変換**と **minify** と **コメント削除** を実行します。

```bash
$ npm run build
```

### 環境構築履歴

環境を構築した実行履歴です。今後のメンテナンス時の参考のため記録しておきます。

当該プロジェクトでは、メンテが簡単であることを第一に考えています。ですので、複雑な設定や機能は行わなず、最低限の設定にしています。（例えば、不要なファイルを clean する機能などはオミットしています。）

#### README.md の作成

当該ファイルを作成します。

```bash
$ touch README.md
```

#### Babel 実行環境の作成

##### node_modules のインストール

`npm init -y` で `package.json` を作成し、 `npm install --save-dev` で Babel に関連するモジュールをインストールします。

```bash
$ npm init -y
$ npm install --save-dev babel-cli babel-preset-env babel-minify babel-preset-minify
```

##### Babel の設定ファイルの追加

Babel の設定を作成します。

```bash
$ touch .babelrc
```

`.babelrc` の中身は以下の通りです。
以下の3つの処理を行います。

1. ES5 変換（ `babel-preset-env` を利用）
2. minify（ `babel-minify` と `babel-preset-minify` を利用）
3. コメント削除

```json
{
  "presets": ["env", "minify"],
  "comments": false
}
```

##### Babel の実行コマンドの追加

`package.json` の中身は以下の通りです。
`"build": "babel ./src --out-dir ./dist/js && babel ./src --out-file ./demo/bundle.js",` を追記しています。
追記部分は以下の2つの処理を行います。

1. はてなブログへコピペ用の `./dist/js/*.js` を出力
2. 表示確認用 HTML で読み込む `./demo/bundle.js` を出力

```json
{
  "name": "hatenablog",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "babel ./src --out-dir ./dist/js && babel ./src --out-file ./demo/bundle.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-minify": "^0.5.1",
    "babel-preset-env": "^1.7.0",
    "babel-preset-minify": "^0.5.1"
  }
}
```

#### Git 実行環境の作成

あらかじめ不要ファイルを指定しておきます。

```bash
$ touch .gitignore
```

`.gitignore` の中身は下記の通り。最低限にしておいて後々メンテをしていくことにします。

```
node_modules
```

`git init` で Git の利用を開始します。

```bash
$ git init
```

あとは、初期コミットし、 GitHub に登録したりを実施します。これは GitHub のサイトでリポジトリを作成したときの案内に従っています。

```bash
$ git add .
$ git commit
$ git branch -M main
$ git remote add origin https://github.com/hiranoon/hatenablog-customize.git
$ git push -u origin main
```
