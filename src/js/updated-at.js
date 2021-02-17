document.addEventListener("DOMContentLoaded", function () {
  // 各要素を取得
  const jsonld = JSON.parse(
    document.querySelectorAll('head script[type="application/ld+json"]')[0]
      .innerText
  ); // JSON-LD
  const datePublished = jsonld.datePublished; // 作成日文字列
  const dateModified = jsonld.dateModified; // 更新日文字列
  const entryDate = document.querySelector("header.entry-header .entry-date"); // 日付表示領域

  // 取得できなかったら処理終了
  if (!jsonld) return;
  if (!datePublished) return;
  if (!dateModified) return;
  if (!entryDate) return;

  // 「更新日要素」を作成
  const modifiedElm = document.createElement("span");
  modifiedElm.innerText = dateModified.substr(0, 10);
  modifiedElm.className = "modified-date";

  // 日付が違った場合は「更新日要素」を追加
  if (datePublished.substr(0, 10) !== dateModified.substr(0, 10)) {
    entryDate.appendChild(modifiedElm);
  }
});
