
![Animated electrocat character running energetically on a treadmill in a bright digital workspace with playful and cheerful atmosphere. No visible text in the image.](/docs/assets/forREADME.gif)

<br>

➡️ Live Site: [oooawe Laboratory](https://oooawe.github.io/)  ( github Pages )          

<br>

➡️ Read Me (English) : [About - Motoko Ghosts for RunCat Runner - EN](docs/assets/stash/read-me-eng.txt)     
➡️ Read Me (Japanese): [About - Motoko Ghosts for RunCat Runner - JP](docs/assets/stash/read-me-jpn.txt)           

<br>

➡️ license policy : [LICENSE and POLICY ](LICENSE.md)   

<br>

## About            
### Motoko Ghost が あなたのPCのCPU監視員に ?!　　 

人気アプリ「RunCat」の自作ランナー機能を使わせていただいてます🙏            
Super Special Thanks to         
※ RunCat : [公式サイト](https://kyome.io/runcat/)           

<br>

<br>

## What's Here and What I Did           
自作ランナー用途のImage製作・最適化、紹介配布サイト（ [here](https://oooawe.github.io/) ）の製作
※ macOS用はあえて伝統的な .dmg 配布で懐かしのReadMEアイコンなども楽しめます          

<br>

<br>

## 7/03 2025            
macOSの標準メニューバーに馴染むよう枠罫や大きさを見直し圧縮仕様の調整など行いました         

・既知のサイト不具合（紹介サイトの表示問題）
- 初期読み込み完了時に配置されるmotoko画像の位置ズレ（ブラウザのDOM計算と配置処理のタイミング問題）
- PWAとして起動するとページ全体が右にズレる（スクロールバーの幅が無駄に計算されている）
- JSでappendした要素のanimation終了時（お役目終了）のremove処理が機能せず、動作に問題のない微細なレベルだけどeventListenerの監視とtransitionが無駄に残っている

・Existing Bug on the Site
- The position of the effect (attached with a CSS transition after the page load) is misaligned horizontally.
- when launched a PWA too.

<br>

<br>
