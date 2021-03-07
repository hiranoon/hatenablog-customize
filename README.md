# hatenablog-customize

はてなブログ向けのカスタマイズ内容をまとめています。以下の2つの目的があります。

- 自サイト https://multimineral-tech.com にて利用しているカスタマイズ内容のまとめです。
- **独自モジュール**の置き場所です。

独自モジュールについては[ブログ](https://multimineral-tech.com)で説明を行います。
原則、ここでは開発のための情報を掲載します。

## 独自モジュールの使い方

### カテゴリの階層化ツール

| 利用ファイル | 内容 |
| ------------ | ---- |
| [category.html](dist/html/category.html) | T.B.D. |
| [category.css](dist/css/category.css)    | T.B.D. |

T.B.D.


### 記事ヘッダーの更新日追加ツール

| 利用ファイル | 内容 |
| ------------ | ---- |
| [updated-at.html](dist/html/updated-at.html) | T.B.D. |
| [updated-at.css](dist/css/updated-at.css)  | T.B.D. |

T.B.D.


## 開発者向け

### ファイル構成

#### ファイルの種類と内容

```
./
│  .gitignore
│  .prettierrc
│  babel.config.json
│  package-lock.json
│  package.json
│  README.md
│
├─demo             表示確認用
│  │  demo_*.html    表示確認用の HTML
│  │  bundle.js      Babel により生成される
│  │  bundle.css     ★ 直接編集する
│  │
│  └─original       demo_*.html で読み込んでいるファイル置き場
│
├─dist             はてなブログコピペ用
│  ├─css
│  │      *.css      cp により生成される (src から丸ごとコピーするだけ)
│  ├─html
│  │      *.html     inliner により生成される
│  └─js
│          *.js       Babel により生成される
│
├─node_modules
│  └─...
│
├─scripts          npm scripts で実行する複雑なスクリプトの置き場
│      *.sh
│
└─src              Babel の変換元
    ├─css
    │      *.css      ★ 直接編集する
    ├─html
    │      *.html     ★ 直接編集する
    └─js
            *.js       ★ 直接編集する
```

| ファイル名           | 内容 |
| -------------------- | ---- |
| `./src/css/*.css`    | カスタマイズ用の CSS。 **編集対象** です。 |
| `./src/html/*.js`    | カスタマイズ用の HTML。 **編集対象** です。変換前のため直接利用されません。 |
| `./src/js/*.js`      | カスタマイズ用の JavaScript。 **編集対象** です。変換前のため直接利用されません。 |
| `./dist/js/*.js`     | Babel で変換後の JavaSdript。`./src/html/*.js` で参照されます。 |
| `./dist/html/*.html` | inliner で変換後の HTML。はてなブログの **「管理画面＞デザイン＞カスタマイズ＞フッタ」へのコピペ用** です。 |
| `./dist/css/*.css`   | cp でコピー後の CSS。（現在は cp のみのため src/css と中身は同じです。）はてなブログの **「管理画面＞デザイン＞カスタマイズ＞デザインCSS」へのコピペ用** です。 |
| `./demo/demo_*.html` | 表示確認用 HTML。直接ブラウザで開いて確認します。 |
| `./demo/bundle.js`   | Babel で変換＆1つにまとめられた後のJavaSdript。表示確認用 HTML で利用しています。 |
| `./demo/bundle.css`  | `@import` 文で1つにまとめたCSS。 **編集対象** です。 CSS ファイルの増減のたびにこちらの import 文も増やします。表示確認用 HTML で利用しています。 |

#### ファイルの関係

##### はてなブログコピペ用

はてなブログコピペ用のファイルでは以下のようにファイルを参照しています。

```
./dist/html/*.html
↑
↑（変換 : inliner）
↑
└─./src/html/*.js
    ↑
    ↑（参照 : <script src="...">）
    ↑
    └─./dist/js/*.js
        ↑
        ↑（変換 : Babel）
        ↑
        └─./src/*.js
```

```
./dist/css/*.css
↑
↑（コピー : cp） ※現在は変換処理は行っていません
↑
└─./src/css/*.css
```


##### 表示確認用 HTML

表示確認用の `./demo_*.html` では以下のようにファイルを参照しています。
設定値を `<script type="application/json">` タグの JSON データで埋め込むことがありますが、この内容は `./demo_*.html` に直接記述しています。（設定値を変更して稼働確認を行うため。）

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

#### 結果確認

`./demo/demo_*.html` を直接ブラウザで開いて確認をします。（LiveReload 的な機能は使いません。）


### 環境構築履歴

環境を構築した実行履歴です。今後のメンテナンス時の参考のため記録しておきます。

当該プロジェクトでは、メンテが簡単であることを第一に考えています。ですので、複雑な設定や機能は行わなず、最低限の設定にしています。（例えば、不要なファイルを clean する機能などはオミットしています。）

#### README.md の作成

当該ファイルを作成します。

```bash
$ touch README.md
```

#### Babel 実行環境の作成

##### Babel のインストール

```bash
$ npm init -y
$ npm install --save-dev @babel/core @babel/cli @babel/preset-env babel-preset-minify
```

`npm init -y` で `package.json` を作成し、 `npm install --save-dev` で Babel に関連するモジュールをインストールします。（Babel 7 から大体のモジュールは `babel-...` から `@babel/...` という形式に見直されました。が、 `babel-preset-minify` は取り残されている模様。なので minify だけ違和感ありますね。）

##### Babel の設定ファイルの追加

Babel の設定を作成します。（Babel 7 からは、 `babel.config.json` はプロジェクトの全体設定で、 `.babelrc` はファイルごとの設定という位置づけらしい。）

```bash
$ touch babel.config.json
```

`babel.config.json` の中身は以下の通りです。

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "ie": "11"
        }
      }
    ],
    "minify"
  ],
  "comments": false
}
```

以下の3つの設定を行っています。

1. ES5 変換（ `@babel/preset-env` を利用し、 ie11 で利用可能な設定とした）
2. minify（ `babel-preset-minify` を利用）
3. コメント削除

##### Babel の実行コマンドの追加

`package.json` の中身は以下の通りです。

```json
{
  // ...中略...
  "scripts": {
    "build-demojs": "babel ./src/js --out-file ./demo/bundle.js",
    "build-distjs": "babel ./src/js --out-dir ./dist/js",
    // ...中略...
  },
  // ...中略...
}
```

`"build": "babel ./src --out-dir ./dist/js` と `babel ./src --out-file ./demo/bundle.js",` を追記しています。
追記部分は以下の2つの処理を行います。

1. `npm run build-demojs` : はてなブログへコピペ用の `./dist/js/*.js` を出力
2. `npm run build-distjs` : 表示確認用 HTML で読み込む `./demo/bundle.js` を出力


#### inliner 実行環境の作成

inliner は、 HTML ファイルが参照してる js や css や画像ファイルを読み込んで1つの HTML ファイルに変換してくれるツールです。
例えば、 `<script src="hoge.js"></script>` が `<script>console.log('hoge');</script>` のように、外部JS を読み込んだ結果に変換されます。

##### inliner のインストール

```bash
$ npm install --save-dev inliner
```

##### inliner を実行するスクリプトの追加

inliner を実行するスクリプトは若干複雑になるので、別ファイルに切り出しておきます。

```bash
$ mkdir scripts
$ touch ./scripts/build-disthtml.sh
```

中身は [build-disthtml.sh](scripts/build-disthtml.sh) を直接参照ください。 for 文で全ファイルに対して `inliner` コマンドを実行しているだけです。（ `inliner` はディレクトリを対象にできないため。）

##### inliner の実行コマンドの追加

`package.json` の中身は以下の通りです。

```json
{
  // ...中略...
  "scripts": {
    "build-demojs": "babel ./src/js --out-file ./demo/bundle.js",
    "build-distjs": "babel ./src/js --out-dir ./dist/js",
    "build-disthtml": "bash ./scripts/build-disthtml.sh",
    "build": "npm run build-demojs && npm run build-distjs && npm run build-disthtml",
    // ...中略...
  },
  // ...中略...
}
```

`"build-disthtml": "bash ./scripts/build-disthtml.sh",` と `"build": "npm run build-demojs && npm run build-distjs && npm run build-disthtml",` を追記しています。
追記部分は以下の2つの処理を行います。

1. `npm run build-disthtml` : はてなブログへコピペ用の `./dist/html/*.html` を出力
2. `npm run build` : すべての `npm run build-*` をまとめて実行

これで `npm run build` だけ実行すればOKになりました。


##### prettier の設定ファイルの追加

prettier の設定を作成します。VSCode のプラグインで利用されることを想定してのもので、 `npm run build` の中で利用する（自動で変換を掛ける）想定ではありません。

```bash
$ touch .babelrc
```

`.prettierrc` の中身は以下の通りです。

```json
{
  "singleQuote": true
}
```

以下の1つの設定を定義しています。

1. 文字列リテラルにはシングルクォートを利用（非ダブルクォート）

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
