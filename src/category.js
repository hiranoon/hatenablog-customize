document.addEventListener('DOMContentLoaded', function () {
  /**
   * anchor を生成します
   * @param  {String} href href属性値
   * @param  {String} text コンテンツ
   * @return {HTMLElement} anchorタグ
   */
  const createAnchor = (href, text) => {
    const anchor = document.createElement('a');
    anchor.setAttribute('href', href);
    anchor.textContent = text;
    return anchor;
  };

  /**
   * 設定オブジェクトを取得します
   * @return {Object} 設定オブジェクト
   */
  const getSettings = () => {
    // 設定を定義したタグを取得します
    const settingsElem = document.getElementById('category-settings');
    // タグの data 属性から設定値を取得しオブジェクト化します
    const settings = {};
    if (settingsElem) {
      settings.delimiter = settingsElem.dataset.delimiter;
    } else {
      // 取得できなかった場合はデフォルト値を用意します
      settings.delimiter = '-';
    }
    return settings;
  };

  /**
   * サイドバーのカテゴリを再編成します
   * @param  {Object} settings 設定オブジェクト
   */
  const rebuildSidebarCategory = (settings) => {
    // カテゴリ領域の取得
    const categoryArea = document.querySelector(
      'div.hatena-module-category > div.hatena-module-body'
    );
    if (!categoryArea) return; // 存在チェック

    // カテゴリ内のリストのリンク
    const anchorList = categoryArea.querySelectorAll('ul > li > a');
    if (!anchorList.length) return; // 存在チェック

    // 古いカテゴリの UL を削除
    const oldUl = categoryArea.querySelector('ul.hatena-urllist');
    if (!oldUl) return; // 存在チェック
    oldUl.parentNode.removeChild(oldUl);

    // 新しいカテゴリの UL を作成
    const newTopUl = document.createElement('ul');
    newTopUl.className = 'hatena-urllist';
    categoryArea.appendChild(newTopUl);

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
        const existingLi = newTopUl.querySelector(
          `.${classLevel}.${classText}`
        );
        if (existingLi) {
          if (isLast) {
            // 自身が最後なら existingLi は件数なしのラベルのみのハズなので href 追加版で上書きする
            const childUl = existingLi.querySelector('ul');
            existingLi.textContent = '';
            existingLi.appendChild(createAnchor(href, text));
            existingLi.appendChild(childUl);
          }
          // ループを抜ける前に現在の li を次回ループ用の親に設定
          parentLi = existingLi;
        } else {
          // li の生成
          const currentLi = document.createElement('li');
          currentLi.classList.add(classLevel, classText);
          if (isLast) {
            // a の中に href と text をセット
            currentLi.appendChild(createAnchor(href, text));
          } else {
            // li に直接 text をセット
            currentLi.textContent = text;
          }

          // li の追加
          if (index === 0) {
            // 最上位の場合 => TOPに li を追加
            newTopUl.appendChild(currentLi);
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

    // 開閉ボタンの追加
    newTopUl.querySelectorAll('li').forEach((li, index) => {
      // 開閉対象の ul の存在をチェックする
      if (li.querySelector('ul')) {
        // 開閉ボタン表示用ラベル
        const label = document.createElement('label');
        label.setAttribute('for', `category-toggle-checkbox-${index}`);
        label.classList.add(
          'category-toggle-checkbox-label',
          'category-li-label'
        );
        li.insertBefore(label, li.firstElementChild);
        // 非表示にする開閉ボタン本体
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', `category-toggle-checkbox-${index}`);
        checkbox.classList.add('category-toggle-checkbox');
        li.insertBefore(checkbox, li.firstElementChild);
      } else {
        // 表示のみのラベル
        const label = document.createElement('label');
        label.classList.add('category-not-to-toggle', 'category-li-label');
        li.insertBefore(label, li.firstElementChild);
      }
    });
  };

  /**
   * 記事タイトル下部のカテゴリを再編成します
   * @param  {Object} settings 設定オブジェクト
   */
  const rebuildEntryCategory = (settings) => {
    // タイトル下部のカテゴリの取得
    const entryCategoryLinks = document.querySelectorAll(
      'header.entry-header a.entry-category-link'
    );
    if (!entryCategoryLinks.length) return; // 存在チェック

    // タイトル下部のカテゴリのループ
    entryCategoryLinks.forEach((anchor) => {
      // デリミタで分割した最後の要素で上書きする
      anchor.textContent = anchor.textContent.split(settings.delimiter).pop();
    });
  };

  // 設定オブジェクトを取得します
  const settings = getSettings();

  // サイドバーのカテゴリを再編成します
  rebuildSidebarCategory(settings);

  // 記事タイトル下部のカテゴリを再編成します
  rebuildEntryCategory(settings);
});
