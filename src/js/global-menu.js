document.addEventListener('DOMContentLoaded', function () {
  /**
   * anchor を生成します
   * @param {String} href href属性値
   * @param {String} text コンテンツ
   * @return {HTMLElement} anchorタグ
   */
  const createAnchor = (href, text) => {
    const elem = document.createElement('a');
    elem.setAttribute('href', href);
    elem.textContent = text;
    return elem;
  };

  /**
   * label を生成します
   * @param {String} text コンテンツ
   * @param {String} classname クラス
   * @return {HTMLElement} labelタグ
   */
  const createLabel = (text, classname) => {
    const elem = document.createElement('label');
    if (classname) {
      elem.classList.add(classname);
    }
    elem.textContent = text;
    return elem;
  };

  /**
   * 設定オブジェクトを取得します
   * @return {Object} 設定オブジェクト
   */
  const getSettings = () => {
    // 設定を定義したタグを取得します
    const settingsElem = document.getElementById('global-menu-settings');

    // タグの data 属性から設定値を取得しオブジェクト化します
    if (settingsElem) {
      return JSON.parse(settingsElem.text);
    } else {
      // 取得できなかった場合はデフォルト値を用意します
      return {
        delimiter: '__',
      };
    }
  };

  /**
   * グローバルメニューにカテゴリを設定します
   * @param {Object} settings 設定オブジェクト
   */
  const buildGlobalCategoryMenu = (settings) => {
    // カテゴリ領域の取得
    const categoryArea = document.querySelector(
      'div.hatena-module-category > div.hatena-module-body'
    );
    if (!categoryArea) return; // 存在チェック

    // カテゴリ内のリストのリンク
    const anchorList = categoryArea.querySelectorAll('ul > li > a');
    if (!anchorList.length) return; // 存在チェック

    // カテゴリリンクを差し込む先のリストを取得
    const globalMenuContent = document.getElementById('global-menu-content');
    if (!globalMenuContent) return; // 存在チェック

    // 元のカテゴリリンクのループ
    anchorList.forEach((anchor) => {
      // 各種要素の取得
      const href = anchor.getAttribute('href');
      const textArray = anchor.textContent.trim().split(settings.delimiter);

      // カテゴリ名をデリミタで区切ったループ
      let parentLi = null; // 最上位は null, それ以降は上位の li にあたる
      textArray.forEach((text, index) => {
        // anchor の各種要素
        const textWithoutCount = text
          .replace(/\s+/g, '')
          .replace(/\(\d+\)/g, '');
        const classText = `category-${textWithoutCount}`;
        const classLevel = `category-level-${index}`;
        const isLast = index + 1 === textArray.length;

        // 同一レベル＆同一名がすでに存在するかチェック
        const existingLi = globalMenuContent.querySelector(
          `.${classLevel}.${classText}`
        );
        if (existingLi) {
          if (isLast) {
            // 自身が最後なら existingLi は件数なしのラベルのみのハズなので href 追加版で上書きする
            const childUl = existingLi.querySelector('ul');
            existingLi.textContent = '';
            existingLi.appendChild(createAnchor(href, textWithoutCount));
            existingLi.appendChild(childUl);
          }
          // ループを抜ける前に現在の li を次回ループ用の親に設定
          parentLi = existingLi;
        } else {
          // li の生成
          const currentLi = document.createElement('li');
          currentLi.classList.add(classLevel, classText);
          if (isLast) {
            // 最後の場合は必ずリンクなので a タグをセット
            currentLi.appendChild(createAnchor(href, textWithoutCount));
          } else {
            // 最後ではない場合はリンクではないので label タグをセット
            currentLi.appendChild(
              createLabel(textWithoutCount, 'category-li-label')
            );
          }

          // li の追加
          if (index === 0) {
            // 最上位の場合 => TOPに li を追加
            globalMenuContent.appendChild(currentLi);
          } else {
            const existingUl = parentLi.querySelector('ul');
            if (existingUl) {
              // 上位の li に ul が存在する場合 => 上位 li>ul に li を追加
              existingUl.appendChild(currentLi);
            } else {
              // 上位の li に ul が存在しない場合 => 上位 li に ul>li を追加
              const currentUl = document.createElement('ul');
              currentUl.appendChild(currentLi);
              parentLi.appendChild(currentUl);
            }
          }
          // ループを抜ける前に現在の li を次回ループ用の親に設定
          parentLi = currentLi;
        }
      });
    });
  };

  // 設定オブジェクトを取得します
  const settings = getSettings();

  // グローバルメニューにカテゴリを設定します
  buildGlobalCategoryMenu(settings);
});
