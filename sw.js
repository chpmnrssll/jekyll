importScripts('workbox-sw.prod.v2.1.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "2017/08/15/Launch.html",
    "revision": "24bb5008f2d9c2f11bf1600363dc96e2"
  },
  {
    "url": "2017/08/28/Space.html",
    "revision": "ef7aaae44929c952100183aa4bdf93cc"
  },
  {
    "url": "2017/08/29/Billions.html",
    "revision": "e0331e42a6403ce078194b3041e50a17"
  },
  {
    "url": "2017/08/30/Pirates.html",
    "revision": "4f0ba79316875b3de9b6101b6a0bfa03"
  },
  {
    "url": "2017/08/31/Zombies.html",
    "revision": "9a8d265c8f901ceba3d39df60f6e708a"
  },
  {
    "url": "2017/10/08/Moustache.html",
    "revision": "4e36f512d13e242e428832d3b7be91e0"
  },
  {
    "url": "2017/10/09/Gangsta.html",
    "revision": "e199e9dbc80e4c0112448f0c24deea4a"
  },
  {
    "url": "2017/10/09/TV.html",
    "revision": "87cd221f10ea18dc0f42847b480f6256"
  },
  {
    "url": "2017/10/10/Corporate.html",
    "revision": "36e7e46ab578af333eb2dd58309c27ae"
  },
  {
    "url": "2017/10/10/Skate.html",
    "revision": "5da4a7a1ba0727ca7104026daa3bfbd2"
  },
  {
    "url": "2017/10/12/Ascii.html",
    "revision": "2cccdd4b56fd9c177864f63a8f41991d"
  },
  {
    "url": "2017/10/17/Fire.html",
    "revision": "26cf3ef289d9bc5a3e714ddf70187f46"
  },
  {
    "url": "2017/10/17/Isometric.html",
    "revision": "8d4884817a4c1aaabd499e9e21219817"
  },
  {
    "url": "2017/10/17/Plasma.html",
    "revision": "12155173ab7ed201ddf60c99844ae549"
  },
  {
    "url": "2017/10/17/Static.html",
    "revision": "a6eeb5d7d467bd529e1ca46dc0237f32"
  },
  {
    "url": "2017/10/17/Timeline.html",
    "revision": "fea6ce126c05a50df51a175ef00626bc"
  },
  {
    "url": "2017/10/21/Github-Pages.html",
    "revision": "23cb7856cc712b445517b92556075817"
  },
  {
    "url": "2017/10/22/Automotive.html",
    "revision": "3cf7367b1d448fc91f798f76056efbcb"
  },
  {
    "url": "2017/10/22/Vanilla-JS-Web-Components.html",
    "revision": "1f2162f04396a5dc84d50de809efcf11"
  },
  {
    "url": "2017/10/23/Professional.html",
    "revision": "f7ab5272ab7da65ad0b89fcdf7d99ac9"
  },
  {
    "url": "2017/10/24/Programming.html",
    "revision": "97d8a1c6909ad945f86b9572b6a5b72d"
  },
  {
    "url": "404.html",
    "revision": "70a3a66522963391bc6da44cd2e7c466"
  },
  {
    "url": "about.html",
    "revision": "269243bec4ad4fb3e3911add92b1607a"
  },
  {
    "url": "assets/components/color-picker.html",
    "revision": "88cf2f01f881904c997859ea53db845e"
  },
  {
    "url": "assets/components/perspective-card.html",
    "revision": "9754bd7c1355da62c7439fabeb084f81"
  },
  {
    "url": "assets/css/style.css",
    "revision": "fe95a2da07a6a8f72b3df0d41b4937a0"
  },
  {
    "url": "assets/css/vendor/font-awesome-4.7.0/css/font-awesome.css",
    "revision": "c495654869785bc3df60216616814ad1"
  },
  {
    "url": "assets/css/vendor/font-awesome-4.7.0/css/font-awesome.min.css",
    "revision": "269550530cc127b6aa5a35925a7de6ce"
  },
  {
    "url": "assets/css/vendor/font-awesome-4.7.0/HELP-US-OUT.txt",
    "revision": "a1e5be58e81e919ba2e579cd1c65283e"
  },
  {
    "url": "assets/css/vendor/font-awesome-4.7.0/less/animated.less",
    "revision": "08baef05e05301cabc91599a54921081"
  },
  {
    "url": "assets/css/vendor/font-awesome-4.7.0/less/bordered-pulled.less",
    "revision": "898f90e40876883214bbd121b0c20e9f"
  },
  {
    "url": "assets/css/vendor/font-awesome-4.7.0/less/core.less",
    "revision": "fb4efe4ae63737706875bbbfc7b7e9af"
  },
  {
    "url": "assets/css/vendor/font-awesome-4.7.0/less/fixed-width.less",
    "revision": "5e07ec001f8d21bd279c12ee542813f7"
  },
  {
    "url": "assets/css/vendor/font-awesome-4.7.0/less/font-awesome.less",
    "revision": "15cb7faa02437c2f9719351c157fe7e7"
  },
  {
    "url": "assets/css/vendor/font-awesome-4.7.0/less/icons.less",
    "revision": "bf95b901c36b646ff457379bdcda94b7"
  },
  {
    "url": "assets/css/vendor/font-awesome-4.7.0/less/larger.less",
    "revision": "8cb65280c0f889daf72626c21a7c8628"
  },
  {
    "url": "assets/css/vendor/font-awesome-4.7.0/less/list.less",
    "revision": "975571323cf880a4a30601998236b027"
  },
  {
    "url": "assets/css/vendor/font-awesome-4.7.0/less/mixins.less",
    "revision": "fbb1f2f1ab96ba020c7f14208aac72b8"
  },
  {
    "url": "assets/css/vendor/font-awesome-4.7.0/less/path.less",
    "revision": "a8c41460c42a4fe9e98550f00c8b3f19"
  },
  {
    "url": "assets/css/vendor/font-awesome-4.7.0/less/rotated-flipped.less",
    "revision": "a8476cdc50c264abd11ff59d6a9dd025"
  },
  {
    "url": "assets/css/vendor/font-awesome-4.7.0/less/screen-reader.less",
    "revision": "0f881617264587bef0df6ce92253ecea"
  },
  {
    "url": "assets/css/vendor/font-awesome-4.7.0/less/stacked.less",
    "revision": "518e2b2d263982d2caa1e6514b4b4eac"
  },
  {
    "url": "assets/css/vendor/font-awesome-4.7.0/less/variables.less",
    "revision": "be3f6eed38aa909483e1bd9ee0876e80"
  },
  {
    "url": "assets/css/vendor/font-awesome-4.7.0/scss/font-awesome.scss",
    "revision": "8c015559216d1654630a839b61c6b83d"
  },
  {
    "url": "assets/fonts/fontawesome-webfont.eot",
    "revision": "674f50d287a8c48dc19ba404d20fe713"
  },
  {
    "url": "assets/fonts/fontawesome-webfont.svg",
    "revision": "912ec66d7572ff821749319396470bde"
  },
  {
    "url": "assets/fonts/fontawesome-webfont.ttf",
    "revision": "b06871f281fee6b241d60582ae9369b9"
  },
  {
    "url": "assets/fonts/fontawesome-webfont.woff",
    "revision": "fee66e712a8a08eef5805a46892932ad"
  },
  {
    "url": "assets/fonts/fontawesome-webfont.woff2",
    "revision": "af7ae505a9eed503f8b8e6982036873e"
  },
  {
    "url": "assets/fonts/FontAwesome.otf",
    "revision": "0d2717cd5d853e5c765ca032dfd41a4d"
  },
  {
    "url": "assets/images/80s/1980sNightFlight.jpg",
    "revision": "2c60d695f71e35bf1fba169f1dad5892"
  },
  {
    "url": "assets/images/80s/80sBoxArt.jpg",
    "revision": "54bf021d501e3a98673f398acf7f8f35"
  },
  {
    "url": "assets/images/80s/tandcSurf.jpg",
    "revision": "1fdc96dca6b2d0ecc5c4eb91cf502744"
  },
  {
    "url": "assets/images/80s/thrilla2.jpg",
    "revision": "b069a839890a78b1f2190784b148682f"
  },
  {
    "url": "assets/images/80s/thrillaGorilla.png",
    "revision": "e6bb322dd7b969a5397825a66ee304b4"
  },
  {
    "url": "assets/images/about/2dmulti.png",
    "revision": "759d9b28f136e900dcb98a3c508baf03"
  },
  {
    "url": "assets/images/about/ascii.png",
    "revision": "52f7daed6280ffa2bb38f476221f20c4"
  },
  {
    "url": "assets/images/about/Fire.png",
    "revision": "b962ca82c985407cfef8a9c2f264053a"
  },
  {
    "url": "assets/images/about/Isometric.png",
    "revision": "906537ea5daec27ee952f35d033885ce"
  },
  {
    "url": "assets/images/about/map.png",
    "revision": "17bb5b1b95e5bc32f15ffa9b23b90657"
  },
  {
    "url": "assets/images/about/obamalien.jpg",
    "revision": "3090cae2be16a23bb65ecc16874aa19f"
  },
  {
    "url": "assets/images/about/pixelpour.jpg",
    "revision": "843511bf3760121814c8a1005df11ea1"
  },
  {
    "url": "assets/images/about/Plasma.png",
    "revision": "fecc3eb9733f9dda7efc40f68da595b9"
  },
  {
    "url": "assets/images/about/purple_tentacle.png",
    "revision": "08e1fc4f2aab79aef3ae2d5bc5d0fe9f"
  },
  {
    "url": "assets/images/about/recoil.jpg",
    "revision": "93a0fffa17bd324f58cd54f98e550eeb"
  },
  {
    "url": "assets/images/about/Static.png",
    "revision": "f7cca28f7f1551ee1dd3cdea1c587c49"
  },
  {
    "url": "assets/images/about/text3D.jpg",
    "revision": "0ea2847789cee546590ce71d4175ddbf"
  },
  {
    "url": "assets/images/about/warp.jpg",
    "revision": "d92d3bd8e44d0ea578d27df23a2b3785"
  },
  {
    "url": "assets/images/automotive/car-poster-art-deco.jpg",
    "revision": "b51244ff0ba3221852fe0a428585a757"
  },
  {
    "url": "assets/images/automotive/car-poster-vintage-style.jpg",
    "revision": "8812759b84116958969f0a1f5fb1ed09"
  },
  {
    "url": "assets/images/automotive/dadsGarage.jpg",
    "revision": "180ae92cd75cf788b0346ccbc3920a08"
  },
  {
    "url": "assets/images/automotive/I-Might-Look-Like-Mechanic-sign.jpg",
    "revision": "fb2d7a8c91e12a327a662adc29d91671"
  },
  {
    "url": "assets/images/automotive/impound.jpg",
    "revision": "2541ffa17dd77cd3d37d169558c8ea47"
  },
  {
    "url": "assets/images/automotive/oldSigns.jpg",
    "revision": "c36e07d68b58c990ec46922915ab347b"
  },
  {
    "url": "assets/images/automotive/oldtimerEngine.jpg",
    "revision": "831710b26333af06039c9486a1faf061"
  },
  {
    "url": "assets/images/automotive/rusty-nuts-jeff-wack.jpg",
    "revision": "9d4f935dbf45f7ce14bdac5c5047d8a8"
  },
  {
    "url": "assets/images/automotive/tin-advertising-retro-signs.jpg",
    "revision": "dfb87cf902ddaccf66ca622b1c23d07b"
  },
  {
    "url": "assets/images/automotive/vintage-car-metal-signs-posters.jpg",
    "revision": "9ba31bdd5572254607e07e1fd9ebdd9e"
  },
  {
    "url": "assets/images/automotive/workshopMechanicTools.jpg",
    "revision": "0b01cdbb70b6ebd2b96d8579fdee11e3"
  },
  {
    "url": "assets/images/automotive/wrenches.jpg",
    "revision": "2bd35d977cd6e12ecd87d2f485ae100d"
  },
  {
    "url": "assets/images/backgrounds/archNightStars.jpg",
    "revision": "908a91f974b1860a4df1fec02dd5993b"
  },
  {
    "url": "assets/images/backgrounds/ascii.jpg",
    "revision": "4f1161b69fa34c8e3aa6378895604f15"
  },
  {
    "url": "assets/images/backgrounds/battleshipEngineRoom.jpg",
    "revision": "e324a7c5cc52c23a4511db658ed1c039"
  },
  {
    "url": "assets/images/backgrounds/bookSkullPotion.jpg",
    "revision": "029f617f609345bf21d334a72a9ec7fe"
  },
  {
    "url": "assets/images/backgrounds/cityGlow.jpg",
    "revision": "89bd1894ba4d0e49d612d38f1c1343f1"
  },
  {
    "url": "assets/images/backgrounds/codeFocus.jpg",
    "revision": "a0deeca48b8a39914c72a7413d0626f5"
  },
  {
    "url": "assets/images/backgrounds/computerMotherboardWires.jpg",
    "revision": "db7c291ea7e7e44ee36d02173253d5fd"
  },
  {
    "url": "assets/images/backgrounds/diceChessBoard.jpg",
    "revision": "920b2295b7b3acc567cab16dfde5d35e"
  },
  {
    "url": "assets/images/backgrounds/forestSun.jpg",
    "revision": "a60f0ee839cc2e7d95bd5e914132c2b4"
  },
  {
    "url": "assets/images/backgrounds/gearCog.jpg",
    "revision": "e4bd1ae3d33c3db6722f8d1bc2afe731"
  },
  {
    "url": "assets/images/backgrounds/github.png",
    "revision": "aec05a21e359f9fc35ea4a2d3dbf2a86"
  },
  {
    "url": "assets/images/backgrounds/graffiti.jpg",
    "revision": "3f14762b31cd8ec5210427fd6c7782b8"
  },
  {
    "url": "assets/images/backgrounds/greenMotherboard.jpg",
    "revision": "3898b6aff6eb7a09864ad06a4bf836ab"
  },
  {
    "url": "assets/images/backgrounds/ideaLightBulb.jpg",
    "revision": "ecd45fad5594fce4b2ddc1ef8340e29b"
  },
  {
    "url": "assets/images/backgrounds/jekyll-github.jpg",
    "revision": "b50dd4bc2598aefe02f7a0bf02e5606e"
  },
  {
    "url": "assets/images/backgrounds/marooned.jpg",
    "revision": "328cae210dfc04c02c9c8769d518bab0"
  },
  {
    "url": "assets/images/backgrounds/moustacheGlass.jpg",
    "revision": "8cdc681c0ddb2245bbc666008167395e"
  },
  {
    "url": "assets/images/backgrounds/puzzle.jpg",
    "revision": "503bc71060b60ca727ad4201695222eb"
  },
  {
    "url": "assets/images/backgrounds/roadBlueSky.jpg",
    "revision": "e95a5c082eb9eb921180aee7c2edeb32"
  },
  {
    "url": "assets/images/backgrounds/roadClearSky.jpg",
    "revision": "d658a9ec2978f692e3bdd9d077ab373e"
  },
  {
    "url": "assets/images/backgrounds/roadForestWet.jpg",
    "revision": "771ff04026da3dc873a818b841da8703"
  },
  {
    "url": "assets/images/backgrounds/roadHillClouds.jpg",
    "revision": "99090772df7bb5b990b8e47fe5be1211"
  },
  {
    "url": "assets/images/backgrounds/roadMountainsCloudy.jpg",
    "revision": "fbc11e18115754436e1dc3681fc6c496"
  },
  {
    "url": "assets/images/backgrounds/roadNightLights.jpg",
    "revision": "b77584a48da7104260450e9c9edf5495"
  },
  {
    "url": "assets/images/backgrounds/roadSunsetMountains.jpg",
    "revision": "3fc29eb2d3a3c33d000e10eba0022345"
  },
  {
    "url": "assets/images/backgrounds/rocketLaunch1.jpg",
    "revision": "ee8611c96fcd29043aa9d10732bc8bff"
  },
  {
    "url": "assets/images/backgrounds/rocketLaunch2.jpg",
    "revision": "51a021f760b2979f31b3047ac10bed9b"
  },
  {
    "url": "assets/images/backgrounds/servers.jpg",
    "revision": "7803365c636cce72f662fc156a57a51c"
  },
  {
    "url": "assets/images/backgrounds/skatePark.jpg",
    "revision": "711f0be1ddf7220dac4b2ec9572b2bec"
  },
  {
    "url": "assets/images/backgrounds/spaceCapsule.jpg",
    "revision": "187c78ef2d81318b1528f2941db52e38"
  },
  {
    "url": "assets/images/backgrounds/technician.jpg",
    "revision": "ea32d08c31dff6e7b63da053a90f2f07"
  },
  {
    "url": "assets/images/backgrounds/television.jpg",
    "revision": "40cf583112ef161f2cbe81bc9e0c451b"
  },
  {
    "url": "assets/images/backgrounds/theOldMan.jpg",
    "revision": "59f944b907d08950e537caf1d91e1712"
  },
  {
    "url": "assets/images/backgrounds/typing.jpg",
    "revision": "360bbb3e5817a182f87b5399cd2ebb67"
  },
  {
    "url": "assets/images/backgrounds/vanilla-js.jpg",
    "revision": "db8884b1a54667bd321338045cbc0f23"
  },
  {
    "url": "assets/images/backgrounds/weatherClouds.jpg",
    "revision": "dca3f7fc0e8d08233590dd6963e9603d"
  },
  {
    "url": "assets/images/backgrounds/weatherLightningStorm.jpg",
    "revision": "6ea84888f79529c9997e769ec6a66316"
  },
  {
    "url": "assets/images/backgrounds/weatherSkyClouds.jpg",
    "revision": "cef50b26dfb54f1bb61701cb6bada95c"
  },
  {
    "url": "assets/images/backgrounds/weatherStormPlains.jpg",
    "revision": "f84cb44bb299358789c6ebcc3092a621"
  },
  {
    "url": "assets/images/backgrounds/why-web-components.jpg",
    "revision": "ab9becdca53fce4d04ef1e49bb815736"
  },
  {
    "url": "assets/images/backgrounds/worklight.jpg",
    "revision": "200c6fafbf05da9da47ab3e812d259c0"
  },
  {
    "url": "assets/images/books/AdvancedGraphicsProgrammingInTurboPascal.jpg",
    "revision": "ccce7cc335f43169e0044e458ca0d99f"
  },
  {
    "url": "assets/images/books/BeginnersBasic.jpg",
    "revision": "739340a342060d8e743ab5d2fb146bdc"
  },
  {
    "url": "assets/images/books/C++ProgrammingProgramDesignIncludingDataStructures4thEdition.jpg",
    "revision": "c06ba396c6df680ec340833bbd8513c0"
  },
  {
    "url": "assets/images/books/ComputerOrganizationAssemblyLanguageProgramming.jpg",
    "revision": "6b97fe4c1c5045f4021fea932cd8de9e"
  },
  {
    "url": "assets/images/books/GettingGraphic.jpg",
    "revision": "ad3e609c83d5e696a399e975158ef214"
  },
  {
    "url": "assets/images/books/HighPerformanceCADGraphicsInC.jpg",
    "revision": "0d21bec40effb3fe688240853105e4c6"
  },
  {
    "url": "assets/images/books/Inside3DStudioRelease4.jpg",
    "revision": "1a2aa6e6bf26184da448fcbdec50288b"
  },
  {
    "url": "assets/images/books/magEGMMortalKombat.jpg",
    "revision": "b107a7b40caeec265979ee05804a6214"
  },
  {
    "url": "assets/images/books/magEGMMortalKombatII.jpg",
    "revision": "722da7534e52d5d928904110a526d6ad"
  },
  {
    "url": "assets/images/books/magGameProBartSimpson.jpg",
    "revision": "3a9bb2166acd554fb8eccaabcf5b3c99"
  },
  {
    "url": "assets/images/books/magGameProMarioYoshi.jpg",
    "revision": "e713fb8a26e04532325ea49e5b2e0d4a"
  },
  {
    "url": "assets/images/books/magGameProSonic2.jpg",
    "revision": "dca47bcdb6a3d64e02e1414d86e06174"
  },
  {
    "url": "assets/images/books/magGameProStarFox.jpg",
    "revision": "c2bd46525def30752a4e77a29e2966dd"
  },
  {
    "url": "assets/images/books/MasteringJavaWithVisualJ++.jpg",
    "revision": "3f14a7f99b505f0e81f122c1db8b35c1"
  },
  {
    "url": "assets/images/books/MicrosoftQBasic.jpg",
    "revision": "c2ca1fcfa66acded3df389fd3f067db7"
  },
  {
    "url": "assets/images/books/MicrosoftQuickBasic.jpg",
    "revision": "31ceabb2420190b4fc1e83add42810ba"
  },
  {
    "url": "assets/images/books/ObjectOrientedProgrammingInJava.jpg",
    "revision": "9ac827ae13273d887f2889b2b7f05234"
  },
  {
    "url": "assets/images/books/Perl5HowTo.jpg",
    "revision": "de0594696387a08a923e47135dcdc78e"
  },
  {
    "url": "assets/images/books/ProgrammingPrinciplesInComputerGraphics.jpg",
    "revision": "aed0e08469b430905c5beab7685e957c"
  },
  {
    "url": "assets/images/books/SuperchargedC++Graphics.jpg",
    "revision": "90796b9e7d5d96ce1f8285f4d8db1093"
  },
  {
    "url": "assets/images/books/TeachYourselfActiveXProgrammingIn21Days.jpg",
    "revision": "8bb01058f448f8b5ace3fbc16357c418"
  },
  {
    "url": "assets/images/books/TeachYourselfDynamicHTMLInAWeek.jpg",
    "revision": "d2cc2e6cd8de71488af17d15f19cc369"
  },
  {
    "url": "assets/images/books/TheCProgrammingLanguage.jpg",
    "revision": "95a506ac7c345ac6f23eadea0ee6817f"
  },
  {
    "url": "assets/images/books/TheIllustrated3DStudioQuickReferenceR4.jpg",
    "revision": "5bca3dfd67419dd6e1d01b0126794208"
  },
  {
    "url": "assets/images/books/TheProgrammingLanguageLandscape.jpg",
    "revision": "526776fa2e0ef16cf98964a824af9157"
  },
  {
    "url": "assets/images/books/TIBasicManual.jpg",
    "revision": "4cb9d5d40037d705f9fcb7bc3d7c2092"
  },
  {
    "url": "assets/images/books/TIMunchMan.jpg",
    "revision": "4027dd5a6e24fa58b37f9bfdab028bca"
  },
  {
    "url": "assets/images/books/TricksOfTheGameProgrammingGurus.jpg",
    "revision": "1841c82e8c2bd46d3921d72d3548e9d1"
  },
  {
    "url": "assets/images/books/UsingVRMLSpecialEdition.jpg",
    "revision": "975926f4c60b5812d9a57bd7cb2cc1a8"
  },
  {
    "url": "assets/images/books/WindowsGraphicsProgrammingWithBorlandC++.jpg",
    "revision": "8e68018223e985c56f61d769f7304b15"
  },
  {
    "url": "assets/images/carlSagan.jpg",
    "revision": "e84678074a4c5c03d978bcf7fbb72049"
  },
  {
    "url": "assets/images/game/appleIIDiedOfDysentery.jpg",
    "revision": "42545c7ed2cfb0eccb9d91eb728a634b"
  },
  {
    "url": "assets/images/game/arcadeSpyHunterScreen.jpg",
    "revision": "9a9166eb5d072af391543a6d7da0e6ac"
  },
  {
    "url": "assets/images/game/nesBoxContra.jpg",
    "revision": "4578a286f8790732942927c1ccda7597"
  },
  {
    "url": "assets/images/game/nesBoxLegendOfZelda.jpg",
    "revision": "55a32d8b7319ee1c1eed4b2d1341c63a"
  },
  {
    "url": "assets/images/game/nesBoxSuperMarioBros.jpg",
    "revision": "aa300c396adc8173e8129bf1257d409d"
  },
  {
    "url": "assets/images/game/nesScreenDoubleDragonII.jpg",
    "revision": "130ce60a66b3ec4a55cee82f17d8ab68"
  },
  {
    "url": "assets/images/game/nesScreenLegendOfZelda.jpg",
    "revision": "a8cf3fc293188c3e09d26459e3f8c501"
  },
  {
    "url": "assets/images/game/nesScreenLegendOfZeldaTitle.jpg",
    "revision": "5a9ef6be9f8781b1d2e50bed3cd79747"
  },
  {
    "url": "assets/images/game/nesScreenNinjaGaiden.jpg",
    "revision": "5ef5c47505052671a128b72f698e75f4"
  },
  {
    "url": "assets/images/game/nesZeldaGoldCartridge.jpg",
    "revision": "13c442eb650502d3d0848afea5f2624d"
  },
  {
    "url": "assets/images/game/pcBBSLegendOfTheRedDragon.jpg",
    "revision": "8b24dad1161ac61ba5b1eba19c3f1f33"
  },
  {
    "url": "assets/images/game/pcBBSLegendOfTheRedDragonScreen.jpg",
    "revision": "da7e62a8872746f842b2cc32d917c70f"
  },
  {
    "url": "assets/images/game/pcBBSTradeWars2002.jpg",
    "revision": "5bf76e55855bd4119a45231c1b16641b"
  },
  {
    "url": "assets/images/game/pcBBSUsurper.jpg",
    "revision": "ad2d6f9ce4b268f736610c16ccbb59f1"
  },
  {
    "url": "assets/images/game/pcGameDayOfTheTentacle.jpg",
    "revision": "ce6faa85e0c03538845b0aeedef671ae"
  },
  {
    "url": "assets/images/game/pcGameFullThrottle.jpg",
    "revision": "01d8cd770131e077f6efdf0fb95f44a5"
  },
  {
    "url": "assets/images/game/pcGameKingsQuestVI.jpg",
    "revision": "5b63bebeea777661c994bffdb4fe0f78"
  },
  {
    "url": "assets/images/game/pcGameLandsOfLore-TheThroneOfChaos.jpg",
    "revision": "ac512ac26b54bcc3ea01c24ac235a0b0"
  },
  {
    "url": "assets/images/game/pcGameMyst.jpg",
    "revision": "0f9123601b72d1f54fab0107a32cbba6"
  },
  {
    "url": "assets/images/game/pcGameQuestForGloryAnthology.jpg",
    "revision": "3928829556c95a737767b9c40d61b1f6"
  },
  {
    "url": "assets/images/game/pcGameRivenTheSequelToMyst.jpg",
    "revision": "926cfef5f8c35cecd066a5313cdaafd0"
  },
  {
    "url": "assets/images/game/pcGameSimCity2000.jpg",
    "revision": "3c72f29709329ac1d53c785813920b99"
  },
  {
    "url": "assets/images/game/pcGameTheLegendOfKyrandiaBookOne.jpg",
    "revision": "570136c8bb8a01a5f7a153b7c866c10f"
  },
  {
    "url": "assets/images/game/pcGameTheLegendOfKyrandiaBookThree(Malcolm'sRevenge).jpg",
    "revision": "c10431eed6825b5498c2ed96a5266dc6"
  },
  {
    "url": "assets/images/game/pcGameTheLegendOfKyrandiaBookTwo(TheHandOfFate).jpg",
    "revision": "30643233ac74af9e26559802dbc3309c"
  },
  {
    "url": "assets/images/game/pcGameTheLegendOfKyrandiaBookTwo(TheHandOfFate)2.jpg",
    "revision": "f6d4906cdaf24fd16c105f1f68bcf420"
  },
  {
    "url": "assets/images/game/pcGameTheSecretOfMonkeyIsland.jpg",
    "revision": "abe02ed177ae24853b069dd7ce9dfe63"
  },
  {
    "url": "assets/images/game/pcGameWarcraftOrcsVsHumans.jpg",
    "revision": "8ec16ed6f48b908508645fdb24a0dec1"
  },
  {
    "url": "assets/images/game/playstation.svg",
    "revision": "c72e4c119cd67bcbf2539ac753d777a9"
  },
  {
    "url": "assets/images/hardware/appleIIGS.png",
    "revision": "de81ebb0f5c57b72d1ce71322e3dae60"
  },
  {
    "url": "assets/images/hardware/arcadeAfterBurner.jpg",
    "revision": "1557576cf7d4856a4f20d2ada96b7df2"
  },
  {
    "url": "assets/images/hardware/arcadeTron.jpg",
    "revision": "57fbd2444d25a21f2a80fba2016b7804"
  },
  {
    "url": "assets/images/hardware/atariLynx.jpg",
    "revision": "f35d311ceb06d6268f2db7ea7fe4b475"
  },
  {
    "url": "assets/images/hardware/macintoshClassic.jpg",
    "revision": "7f34b11fa907080435c9541e014446f0"
  },
  {
    "url": "assets/images/hardware/nesSystem.jpg",
    "revision": "b9ec2cb303d6e85cb2e807ecf2796dd0"
  },
  {
    "url": "assets/images/hardware/nintendoGameboy.jpg",
    "revision": "0e66a45efa4e95c7a113ad7085bf45e9"
  },
  {
    "url": "assets/images/hardware/pcEpsonMX-80Printer.jpg",
    "revision": "bc87c1e4436a6b3db888797b5babcf54"
  },
  {
    "url": "assets/images/hardware/pcIntel386DX.jpg",
    "revision": "9792c4cbdf6e1ca6453c600c545db532"
  },
  {
    "url": "assets/images/hardware/pcIntel486DX.jpg",
    "revision": "7752b5862170a125c3cd269b15d3c6de"
  },
  {
    "url": "assets/images/hardware/segaGameGearSystem.jpg",
    "revision": "fc52ec29483af5f29b7aca5158751646"
  },
  {
    "url": "assets/images/hardware/segaGenesisMegadriveSystem.jpg",
    "revision": "1e4eca50c0dc8d1699ec6026bbb21c62"
  },
  {
    "url": "assets/images/hardware/snesSystem.jpg",
    "revision": "f64c4d062bad825dab2fd3e0f5d3b20e"
  },
  {
    "url": "assets/images/hardware/TI99System.jpg",
    "revision": "70335e454203cb4df7e1146df6d71028"
  },
  {
    "url": "assets/images/horror/beneath.jpg",
    "revision": "2d4ceed1639c485d9b3187012e9b765c"
  },
  {
    "url": "assets/images/horror/cabinEvilDead.gif",
    "revision": "bb7b695b674966fc536357c514b30cf5"
  },
  {
    "url": "assets/images/horror/creepshowTheCrate.gif",
    "revision": "9285b54a65947c9ef67c120835608ab7"
  },
  {
    "url": "assets/images/horror/critters.gif",
    "revision": "17e6649cf1fdbd21f81a93d4f924950a"
  },
  {
    "url": "assets/images/horror/devils.gif",
    "revision": "806c26a3b9f27a7817cd70aa3b9bacc3"
  },
  {
    "url": "assets/images/horror/dummyEvil.gif",
    "revision": "e55f88da9c56c25cc6ef0429d9ddcf7d"
  },
  {
    "url": "assets/images/horror/enterSign.gif",
    "revision": "28b7f4325c2d937dd59cabc42705f6ce"
  },
  {
    "url": "assets/images/horror/ghoulie.gif",
    "revision": "b07dacfb28f51803d4db76e43f61108e"
  },
  {
    "url": "assets/images/horror/horror1.gif",
    "revision": "abc3052cfd148ad725b2da1caf6002eb"
  },
  {
    "url": "assets/images/horror/littleMonsters.gif",
    "revision": "3c677971117d1dc22a816df1e9515bad"
  },
  {
    "url": "assets/images/horror/madnessLaughing.gif",
    "revision": "4d8cc197c2b40087d830ca1d2aceae00"
  },
  {
    "url": "assets/images/horror/mouthOfMadness.gif",
    "revision": "06d0fdb2646f0b2164eee280bda9d547"
  },
  {
    "url": "assets/images/horror/reanimator.gif",
    "revision": "6750e6b52cf0bf6f9b4f271596c1bf07"
  },
  {
    "url": "assets/images/horror/redPills.gif",
    "revision": "55ecad2f4edfa980c55cae0cfefcffa2"
  },
  {
    "url": "assets/images/horror/scream.gif",
    "revision": "8ebb17b6c622146a2bd83b380e13716b"
  },
  {
    "url": "assets/images/horror/sleepCreep.gif",
    "revision": "93eb3249ba9b849d2707878f7c004914"
  },
  {
    "url": "assets/images/horror/talesFromTheCrypt.gif",
    "revision": "2fa1cbbaa1cf56add2da688600b176ce"
  },
  {
    "url": "assets/images/horror/troll.gif",
    "revision": "6e6c06dafbc70b8775c91e1ce04bdfca"
  },
  {
    "url": "assets/images/horror/wolfMJ.gif",
    "revision": "51189db3d1288053d321c86036a12713"
  },
  {
    "url": "assets/images/logo/bemCSS.svg",
    "revision": "6156e4f475ebdbc5acc7feea55c3c202"
  },
  {
    "url": "assets/images/logo/kickAOL.png",
    "revision": "7ded6b88861992bab6a8f1cf4e45cea2"
  },
  {
    "url": "assets/images/logo/logoAMP.png",
    "revision": "9eaee5f107871e4d3de7cdcb22cbc879"
  },
  {
    "url": "assets/images/logo/logoApache.png",
    "revision": "b7ee19d4c03da24d1994072fc4856bde"
  },
  {
    "url": "assets/images/logo/logoApple.png",
    "revision": "8b15e5bc99be2557570d887813603e66"
  },
  {
    "url": "assets/images/logo/logoAtom.png",
    "revision": "7bc7859e0368108fb4f5f6b523ef0c8e"
  },
  {
    "url": "assets/images/logo/logoBackbone.png",
    "revision": "6f9a85cb89851d8cd05bde07e5774305"
  },
  {
    "url": "assets/images/logo/logoBower.png",
    "revision": "bfb308116c37ae7d76d4aaa68df695fb"
  },
  {
    "url": "assets/images/logo/logoC.png",
    "revision": "4b90ebde34c51417b8128aa099540b80"
  },
  {
    "url": "assets/images/logo/logoC++.png",
    "revision": "2053126621b6954847182afb3fed7940"
  },
  {
    "url": "assets/images/logo/logoChrome.png",
    "revision": "aaff58d971d3744c39ad2e9a31331574"
  },
  {
    "url": "assets/images/logo/logoCSS3.png",
    "revision": "2759726e2c5711ecb0595d903005911a"
  },
  {
    "url": "assets/images/logo/logoEdX.png",
    "revision": "07357c2401c3d0ace386854eaf68cc1a"
  },
  {
    "url": "assets/images/logo/logoElance.png",
    "revision": "d9ab1429ce5b7c6f1fd57f33babe3357"
  },
  {
    "url": "assets/images/logo/logoGimp.png",
    "revision": "bb50fa1e0446f2fce3be4ff57269e6a3"
  },
  {
    "url": "assets/images/logo/logoGithub.png",
    "revision": "0e49d43eb68bbc48da3a30d0e467c1fd"
  },
  {
    "url": "assets/images/logo/logoGrunt.png",
    "revision": "ec2bb3faf2d4cf7afea8b0f3ed69f042"
  },
  {
    "url": "assets/images/logo/logoGulp.png",
    "revision": "80e2a92ba412b1073e0d9bab116e5e56"
  },
  {
    "url": "assets/images/logo/logoHTML5.png",
    "revision": "6260b016bf9b42bfa2859b26e833f448"
  },
  {
    "url": "assets/images/logo/logoJava.png",
    "revision": "35dd61a550f1371031e0873c9c5aaa86"
  },
  {
    "url": "assets/images/logo/logoJavascript.png",
    "revision": "53451eca0bbfb35474277b538ec31b56"
  },
  {
    "url": "assets/images/logo/logoJekyll.png",
    "revision": "615a2f4a7b3bac1c01f2adf58c6e26b8"
  },
  {
    "url": "assets/images/logo/logoJoomla.png",
    "revision": "76e03865c43e568ef4fa41f121bcb337"
  },
  {
    "url": "assets/images/logo/logoJQuery.png",
    "revision": "88dacb49ba0f6c7d218b6e218afe4da8"
  },
  {
    "url": "assets/images/logo/logoLua.png",
    "revision": "eec7c9199a37610f7094417cd7cfefb7"
  },
  {
    "url": "assets/images/logo/logoMarionette.png",
    "revision": "f69c88b4cc1b03a3b290de9e2609101e"
  },
  {
    "url": "assets/images/logo/logoMongoDB.png",
    "revision": "a5ab4bae9d109b89a1db7a66b766590d"
  },
  {
    "url": "assets/images/logo/logoMTASA.png",
    "revision": "69845849371813523b3eaa0b6de4dcdf"
  },
  {
    "url": "assets/images/logo/logoMySQL.png",
    "revision": "2dee419c271122800eb2dc303c490329"
  },
  {
    "url": "assets/images/logo/logoNASA.png",
    "revision": "ec0424c6046cc342198d00e5f8691272"
  },
  {
    "url": "assets/images/logo/logoNodeJS.png",
    "revision": "5b56759da6e342fdcabf753bcaf146da"
  },
  {
    "url": "assets/images/logo/logoNpm.png",
    "revision": "7fe0ffc7893d90c70d9b6102164f3108"
  },
  {
    "url": "assets/images/logo/logoODesk.png",
    "revision": "591eb8ac0b58a07a4e09f5c6806b5ed5"
  },
  {
    "url": "assets/images/logo/logoPerl.png",
    "revision": "3163b0fb0f4913918d63843dcfc982b8"
  },
  {
    "url": "assets/images/logo/logoPHP.png",
    "revision": "d3135a005d6c6dc8e5326944e7beb6e3"
  },
  {
    "url": "assets/images/logo/logoPolymer.png",
    "revision": "890eaba4293e72bf1daf47cd71e60cb4"
  },
  {
    "url": "assets/images/logo/logoPython.png",
    "revision": "0a76d3f9aea4f6e46fe6a709b55bc53e"
  },
  {
    "url": "assets/images/logo/logoReaper.png",
    "revision": "0c44ded02fceaa2cc6e4c5df7deed655"
  },
  {
    "url": "assets/images/logo/logoRubyOnRails.png",
    "revision": "414a5ca74825ea6ba96f645aa947273a"
  },
  {
    "url": "assets/images/logo/logoSass.png",
    "revision": "1c144aee4c28e130281175a4c8f26d8f"
  },
  {
    "url": "assets/images/logo/logoUpWork.png",
    "revision": "bac0a862380470dab6f26621a767f100"
  },
  {
    "url": "assets/images/logo/logoWebComponents.png",
    "revision": "2918dc41c20e0980b40fec0e9107843f"
  },
  {
    "url": "assets/images/logo/logoWebGL.png",
    "revision": "449a8c4d2b49fd31b5ef349134ee6245"
  },
  {
    "url": "assets/images/logo/logoWordpress.png",
    "revision": "870ce30e9d97879cc0cb6fc95a12c3b6"
  },
  {
    "url": "assets/images/logo/logoYeoman.png",
    "revision": "a1a74ed02d2e4b9f6aef57b043866c99"
  },
  {
    "url": "assets/images/music/ampStack.jpg",
    "revision": "4e8b89ed13eb621ee888dfede0d57a87"
  },
  {
    "url": "assets/images/music/guitarFocus.jpg",
    "revision": "56f0b7c50be22750e1366499850cd604"
  },
  {
    "url": "assets/images/music/guitarNeckPick.jpg",
    "revision": "085395cdd9fbd20221a4c768391ed962"
  },
  {
    "url": "assets/images/professional/AICert.png",
    "revision": "f78bd3067fc8d8bc39cb9c9efc0639cd"
  },
  {
    "url": "assets/images/professional/casket.png",
    "revision": "be8505a5c52fd9602ec9a6283bcef524"
  },
  {
    "url": "assets/images/professional/critter.png",
    "revision": "00ac7f82c312cd28d02db3c17dff6f34"
  },
  {
    "url": "assets/images/professional/revClaims.png",
    "revision": "d1add4d01ac2b6d4cd7efbd2e62b9a76"
  },
  {
    "url": "assets/images/professional/robots.png",
    "revision": "79ca861a44bfb4ae4884150320a9cc20"
  },
  {
    "url": "assets/images/professional/saasCert.png",
    "revision": "df1fb5752f4a4fabdfc42cd2a78ae091"
  },
  {
    "url": "assets/images/professional/starmazy.png",
    "revision": "660bcac62a86ea7e50a68343cb307a0d"
  },
  {
    "url": "assets/images/professional/stinger.png",
    "revision": "f918741a7e053043edc95ade1a09b3b4"
  },
  {
    "url": "assets/images/professional/success.jpg",
    "revision": "52491f860bdbcd6cff1005071ae6613a"
  },
  {
    "url": "assets/images/professional/wizzardForm.png",
    "revision": "9b351ba6dc7a12c67f33cd9946be0222"
  },
  {
    "url": "assets/images/programming/browser.jpg",
    "revision": "eabfe4c4e6e6bd530602d7e7c2b680d7"
  },
  {
    "url": "assets/images/programming/clientSpeak.jpg",
    "revision": "4662e8a93dab31d5423a8768db29bd1d"
  },
  {
    "url": "assets/images/programming/comic.jpg",
    "revision": "41fec069c88d0c12f397a5a56cca86db"
  },
  {
    "url": "assets/images/programming/designTimline.jpg",
    "revision": "45ccbbaffaa881581085944f916f5602"
  },
  {
    "url": "assets/images/programming/failTerminal.gif",
    "revision": "37751162cba905651c93d8e9674e35a3"
  },
  {
    "url": "assets/images/programming/frontend.jpg",
    "revision": "a26c1f706de445f219d5b80e1e7470ca"
  },
  {
    "url": "assets/images/programming/gitMerge.gif",
    "revision": "273a7ba520f3cc9239b13bc6cee72841"
  },
  {
    "url": "assets/images/programming/hacker.jpg",
    "revision": "35fdc531a83db5219a80da170796d030"
  },
  {
    "url": "assets/images/programming/javascript.gif",
    "revision": "3f2f93e2ec445485e9b4b0ef069b495f"
  },
  {
    "url": "assets/images/programming/learnToUseTheInternetLevel2.gif",
    "revision": "986ab977a5980ed3d8a1407f8691578f"
  },
  {
    "url": "assets/images/programming/netscapeNavigatorIcon.gif",
    "revision": "ef35d157754d0469e549f7aa7470b6bd"
  },
  {
    "url": "assets/images/programming/oldTimerHacking.gif",
    "revision": "0727e1101408da936712c5d544564f77"
  },
  {
    "url": "assets/images/programming/phpsauce.png",
    "revision": "7a9e1c3c9e1e092e48f3e9877d2bbf3f"
  },
  {
    "url": "assets/images/programming/qASux.gif",
    "revision": "88dc6f10faff36878581024c210e3834"
  },
  {
    "url": "assets/images/programming/shipItGit.gif",
    "revision": "5e1a0e1453c26f8a1d36fc3664fa1249"
  },
  {
    "url": "assets/images/programming/sleepCodeLoop.gif",
    "revision": "c30487ca4ddfea1babb9382556097e63"
  },
  {
    "url": "assets/images/programming/sloth.gif",
    "revision": "30c5f571cf0ec99e9d75b36954cc0d4a"
  },
  {
    "url": "assets/images/programming/smashComputer.gif",
    "revision": "6ade8d61ded67f04b582fca8735e3471"
  },
  {
    "url": "assets/images/programming/test.jpg",
    "revision": "32ad1a93a1e3dcfa8ed9547868bb8bcc"
  },
  {
    "url": "assets/images/software/BorlandC++5.jpg",
    "revision": "d4323d7e7582ce5680e9ae03630f15cf"
  },
  {
    "url": "assets/images/software/BorlandTurboC++.jpg",
    "revision": "ea35eaaab29aabe1aeeee50b29cdc433"
  },
  {
    "url": "assets/images/software/linuxArch.png",
    "revision": "07e4da794816c6e9adede476085d6833"
  },
  {
    "url": "assets/images/software/linuxBSD.png",
    "revision": "b52b8ff5654967410ce9d2dbd4f9a6d4"
  },
  {
    "url": "assets/images/software/linuxDebian.png",
    "revision": "f4337a5c8f27b437d130af1428a99a0d"
  },
  {
    "url": "assets/images/software/linuxGnome.png",
    "revision": "2fd76aa214257efe51831d6d54c9640a"
  },
  {
    "url": "assets/images/software/linuxKDE.png",
    "revision": "d74b27ec8bd4b57db96f56adf21decb8"
  },
  {
    "url": "assets/images/software/linuxRedHat.png",
    "revision": "dddd127f952ee8454d945764155fa3a4"
  },
  {
    "url": "assets/images/software/linuxSlackware.png",
    "revision": "d885f20b48b5554d3e53626091aa26e8"
  },
  {
    "url": "assets/images/software/linuxTux.png",
    "revision": "8f5fbbf3009c1928d75f090fdb573052"
  },
  {
    "url": "assets/images/software/linuxUbuntu.png",
    "revision": "ab2272b773dac9df4d2c33bbf4bae612"
  },
  {
    "url": "assets/images/software/macintoshHypercard.jpg",
    "revision": "fd18f02fdd3cc020c5b430884107bc35"
  },
  {
    "url": "assets/images/software/macintoshHyperCardHome.jpg",
    "revision": "7f8dedc721c26c80d74aef26c08500b1"
  },
  {
    "url": "assets/images/software/macintoshSystem7.jpg",
    "revision": "bad2732c6c4751d922f8758845a94e7e"
  },
  {
    "url": "assets/images/software/microsoftWindows10.jpg",
    "revision": "879dc95f48b84eb3fb1a26e4c59aa6a1"
  },
  {
    "url": "assets/images/software/microsoftWindows7.jpg",
    "revision": "46b80c52cec4fb21cf8d147771965be9"
  },
  {
    "url": "assets/images/software/microsoftWindows8.jpg",
    "revision": "4738f4850de9d23700188bbc6eca8384"
  },
  {
    "url": "assets/images/software/microsoftWindows95.jpg",
    "revision": "001b5c975b0d5025dbf7763b1728472a"
  },
  {
    "url": "assets/images/software/microsoftWindowsNT.jpg",
    "revision": "62ddf406f1e68f692f461084407766c1"
  },
  {
    "url": "assets/images/software/microsoftWindowsVista.jpg",
    "revision": "48d1cbe11ef1c6e71d42bd0c89dccc9a"
  },
  {
    "url": "assets/images/software/microsoftWindowsXP.jpg",
    "revision": "c06906c51844e8f777e871dd93826207"
  },
  {
    "url": "assets/images/software/ncsaMosaic.jpg",
    "revision": "7a2c309722a3c2c11d34aeba406b4e5e"
  },
  {
    "url": "assets/images/software/pcDOS5.jpg",
    "revision": "9ef29ea2c9b6c97369c7ad0b01b51d24"
  },
  {
    "url": "assets/images/software/pcDOS6.22.jpg",
    "revision": "1074da0352583993f2617200f3ec2aad"
  },
  {
    "url": "assets/images/software/pcDOSMicrosoftWindows3.1.jpg",
    "revision": "58fddc0ae5a06c7c73d85296180863e4"
  },
  {
    "url": "assets/images/software/pcDOSQBasic.jpg",
    "revision": "43e0469841def3c5def89209977e7d5e"
  },
  {
    "url": "assets/images/software/pcDOSQBasicGorillas.jpg",
    "revision": "6c1537a56d334c42f0e5fb1909d7b193"
  },
  {
    "url": "assets/images/software/pcFastTracker2.jpg",
    "revision": "d8ee0d658b44d350db0a88a36d8c67ea"
  },
  {
    "url": "assets/images/software/pcVGAPalette.jpg",
    "revision": "6f8b9e5843c7f53fc6a4e3cdbf96d9bb"
  },
  {
    "url": "assets/images/software/TIBasic.jpg",
    "revision": "dd26ca4b709e186b205d8aefef4ff2eb"
  },
  {
    "url": "assets/images/software/TIMunchManTitle.jpg",
    "revision": "ca6caa98d0fce0187361619395ac29aa"
  },
  {
    "url": "assets/images/software/webHTAccessLogin.jpg",
    "revision": "d4b8c1593449877d1d41f65511ddfa20"
  },
  {
    "url": "assets/images/software/webWordpressLogin.jpg",
    "revision": "9259f7396d5cba9a73e8e2b2d8a2636a"
  },
  {
    "url": "assets/javascript/anchor-js/anchor.js",
    "revision": "8bb7c1f211e97a83a018f7e8315d0bd8"
  },
  {
    "url": "assets/javascript/anchor-js/anchor.min.js",
    "revision": "59ccbcf40597fdbf5a3a5f88de29c39e"
  },
  {
    "url": "assets/javascript/anchor-js/banner.js",
    "revision": "3b8d2c34e88a474253d442d26d6b48bd"
  },
  {
    "url": "assets/javascript/anchor-js/docs/anchor.js",
    "revision": "8bb7c1f211e97a83a018f7e8315d0bd8"
  },
  {
    "url": "assets/javascript/anchor-js/docs/favicon.ico",
    "revision": "eb7d6540e44979cc8db83de000b5e829"
  },
  {
    "url": "assets/javascript/anchor-js/docs/fonts/anchorjs-extras.eot",
    "revision": "776d340df77acfe0cf790c4ad5540186"
  },
  {
    "url": "assets/javascript/anchor-js/docs/fonts/anchorjs-extras.svg",
    "revision": "e80fd28adf760930cc8bf394f56c3b69"
  },
  {
    "url": "assets/javascript/anchor-js/docs/fonts/anchorjs-extras.ttf",
    "revision": "54026353a31bbc514aed6973b80f3d06"
  },
  {
    "url": "assets/javascript/anchor-js/docs/fonts/anchorjs-extras.woff",
    "revision": "c94f4e937f99760edcea7fd62dba5ce9"
  },
  {
    "url": "assets/javascript/anchor-js/docs/fonts/fonts.css",
    "revision": "6fbc46de9dbbd7a9907fb3a4d96917a6"
  },
  {
    "url": "assets/javascript/anchor-js/docs/grunticon/grunticon.loader.js",
    "revision": "d74e1458e694a9ddafdeea8cf57ae7d6"
  },
  {
    "url": "assets/javascript/anchor-js/docs/grunticon/icons.data.png.css",
    "revision": "fc4856fbb93aadae89512d6836e584b9"
  },
  {
    "url": "assets/javascript/anchor-js/docs/grunticon/icons.data.svg.css",
    "revision": "6fafa6ceca4538458f39497fe7f94cdb"
  },
  {
    "url": "assets/javascript/anchor-js/docs/grunticon/icons.fallback.css",
    "revision": "aafaf27c58364910a17189bdd3698b19"
  },
  {
    "url": "assets/javascript/anchor-js/docs/grunticon/png/grunticon-link.png",
    "revision": "4d267ae3dffb32f0a142a4b9ad83a327"
  },
  {
    "url": "assets/javascript/anchor-js/docs/img/anchoring-links.png",
    "revision": "ad2873fd7dbc23a75d3439c84e30269b"
  },
  {
    "url": "assets/javascript/anchor-js/docs/img/anchorjs_logo.png",
    "revision": "8b2c671e3b8ae4ff036dbe850aa6d4a9"
  },
  {
    "url": "assets/javascript/anchor-js/docs/img/anchorlinks2.png",
    "revision": "cc0bb054a51018e73a0bd63120f4faae"
  },
  {
    "url": "assets/javascript/anchor-js/docs/img/gh_link.svg",
    "revision": "552f57729fc60cbfc133c7948f0a1cef"
  },
  {
    "url": "assets/javascript/anchor-js/docs/img/gh-link.svg",
    "revision": "83e7e2ab30a9c57957d18d689f793ba2"
  },
  {
    "url": "assets/javascript/anchor-js/docs/img/hyperlink.svg",
    "revision": "05bf10bebb30faa6f706d90150bf7d8e"
  },
  {
    "url": "assets/javascript/anchor-js/docs/img/link.svg",
    "revision": "96a09712688742fded5321c7e080dde3"
  },
  {
    "url": "assets/javascript/anchor-js/docs/img/mini-logo.png",
    "revision": "1b2dd73baf1fe7540ed70a34043c249d"
  },
  {
    "url": "assets/javascript/anchor-js/docs/img/primer-md.png",
    "revision": "f0efdafee0d9cb5f422dfd427646665c"
  },
  {
    "url": "assets/javascript/anchor-js/docs/scripts.js",
    "revision": "235cae35d7b87cf4080119118e25374d"
  },
  {
    "url": "assets/javascript/anchor-js/docs/styles.css",
    "revision": "08baea441a911bc647cbb767ce86c8ca"
  },
  {
    "url": "assets/javascript/app.js",
    "revision": "a6330d1faeebe52700b22f13be6ba452"
  },
  {
    "url": "assets/javascript/jsAscii.js",
    "revision": "c15926847d581b2668917fda3757f8db"
  },
  {
    "url": "assets/javascript/main.js",
    "revision": "06cf76a65c014f1f27caf00543e3ac41"
  },
  {
    "url": "cloc.sh",
    "revision": "c9277fd139f0ac461cc68b535ed23950"
  },
  {
    "url": "contact.html",
    "revision": "412387fb6c672851c40f386b71b68881"
  },
  {
    "url": "developers.html",
    "revision": "f4602fb2dc1434ab71944e48d7a1ec47"
  },
  {
    "url": "developers/chpmnrssll/about.html",
    "revision": "5a74e4cffb4ea5b69adbe2d280da1886"
  },
  {
    "url": "favicon.ico",
    "revision": "9baf56111e668e8813106b8b41fad621"
  },
  {
    "url": "feed.xml",
    "revision": "639833e7694510f80b34114a0ec40c83"
  },
  {
    "url": "index.html",
    "revision": "4e89fd388b7b4b7eefdba904a7d51913"
  },
  {
    "url": "jsAsciiDemo/index.html",
    "revision": "e9c20f12cad103f5c95a3c0caecc2d68"
  },
  {
    "url": "page2/index.html",
    "revision": "f1a198d0f594f35fc606458713287e7d"
  },
  {
    "url": "page3/index.html",
    "revision": "7c2abf27b05911d1ec0bb9a82c158ded"
  },
  {
    "url": "page4/index.html",
    "revision": "fd8d79efa4956832c273e24cf8d91a84"
  },
  {
    "url": "README.md",
    "revision": "cc50ed6c19f38008aa213fc0968f2ff8"
  },
  {
    "url": "robots.txt",
    "revision": "45fa963a5e67c6a3ef67c8ffa71b2b88"
  },
  {
    "url": "service-worker.js",
    "revision": "2ee3700fac43af1aca61ae761298cd40"
  },
  {
    "url": "settings.html",
    "revision": "1c7f57f4c4c3b591d50d2e16576630df"
  },
  {
    "url": "sitemap.xml",
    "revision": "f16f60cae386fec1777310586dd362af"
  },
  {
    "url": "sw.js",
    "revision": "0737858c3ca71dbf8abbb775e79c38f5"
  },
  {
    "url": "workbox-cli-config.js",
    "revision": "6f784a75aab43431ed8ae1f67dac0dd2"
  },
  {
    "url": "workbox-sw.prod.v2.1.0.js",
    "revision": "e5f207838d7fd9c81835d5705a73cfa2"
  },
  {
    "url": "workbox-sw.prod.v2.1.0.js.map",
    "revision": "6fc68cbf40e4e2f38d2889fdaf5bc58a"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
