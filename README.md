# 概要
行きたいお店や場所を写真付きで登録して
リストやGoogleマップで確認をすることができるアプリです。

画像で装飾することでリストを作成する楽しさを感じ
後日見たときに行きたいと思えるように作成しました。

UIや使用方法をX(旧 Twitter)など使い慣れたSNSに近づけるよう意識しているため
比較的使いやすいアプリになっているかと思います。

# URL
https://togolist-app.web.app/login  
・Google accountをクリックしてグーグルアカウントでログイン  
・鍵のマークの隣のテキストボックスに「testtogo」と入力後
ログインボタンをクリック  

# 使用技術
・React  
・Firebase  
　・Authentication  
　・Firestore Database  
　・Storage  
　・Hosting  
・Google Maps API  
・normalize-japanese-addresses  

# 機能一覧
・ログイン機能(keyによって表示されるリストを変える)  
・投稿機能  
　・テキスト、画像投稿  
　・位置情報検索機能(normalize-japanese-addresses)  
・検索機能  
・フィルター機能  
・リスト一覧機能  
・Google MapによるMap表示機能  

# 使用方法
## 投稿方法
ホーム画面右下の「+」ボタンをクリック  
・施設名や店舗名  
・郵便番号  
・住所(都道府県から)  
・期間(期間限定のイベントなど)  
を枠内のテキストボックスに記載  

背景画像をつける場合は  
「背景画像を設定」から画像を選択  

投稿するボタンで投稿  

## List
ヘッダーにある検索で店舗名などの検索  

詳細検索で  
・期間  
・投稿者  
・投稿日時  
・都道府県  
を絞り込むことができる  

## Map
Listに該当した場所にピンが刺さった状態のgoogle mapを閲覧できる  