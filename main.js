var __reflect = this && this.__reflect || function(e, t, a) {
		e.__class__ = t,
			a ? a.push(t) : a = [t],
			e.__types__ = e.__types__ ? a.concat(e.__types__) : a
	},
	__extends = this && this.__extends || function(e, t) {
		function a() {
			this.constructor = e
		}
		for (var i in t)
			t.hasOwnProperty(i) && (e[i] = t[i]);
		e.prototype = null === t ? Object.create(t) : (a.prototype = t.prototype,
			new a)
	}

//TileBase
var TileBase = function(e) {
	function t() {
		var t = e.call(this) || this;
		return t.isDestroy = !1,
			t.isTouch = !1,
			t.tileHeight = 0,
			t._bottomBmp = new egret.Bitmap,
			t.addChild(t._bottomBmp),
			t
	}
	return __extends(t, e),
		t.prototype.initTile = function (e) {
			this.tileHeight = e,
				this.isTouch = !1,
				this.isDestroy = !1,
				this._bottomBmp.alpha = 1,
				this.alpha = 1
		},
		t.prototype.changeTexure = function (e) {
			e && (this._bottomBmp.texture = e)
		},
		t.prototype.onTouchDown = function () {
			this.isTouch = !0,
				this._bottomBmp.texture = RES.getRes("132_png"),
				this._bottomBmp.alpha = .2
		},
		t.prototype.onTouchUp = function () {
		},
		t.prototype.setScale = function (e, t) {
		},
		t.prototype.destroy = function () {
			this.isDestroy || (this.isDestroy = !0,
				this._bottomBmp.texture = null,
				ObjectPool.push(this),
			this.parent && this.parent.removeChild(this))
		},
		t
}(egret.DisplayObjectContainer);
__reflect(TileBase.prototype, "TileBase");

//Background
var Background = function(e) {
	function t() {
		var t = e.call(this) || this;
		return t._bmp = new egret.Bitmap,
			t.addChild(t._bmp),
			t.touchChildren = !1,
			t.touchEnabled = !0,
			t
	}
	return __extends(t, e),
		t.prototype.changeTexture = function(e) {
			this._bmp.texture = e
		},
		t.prototype.onResizeHandler = function() {
			var e = XFlash.stage.stageWidth / 270
				, t = XFlash.stage.stageHeight / 480;
			this._bmp.scaleX = e,
				this._bmp.scaleY = t
		},
		t
}(egret.DisplayObjectContainer);
__reflect(Background.prototype, "Background");

//GameIndex
var GameIndex = function(e) {
	function t() {
		var t = e.call(this) || this;
		return t.setMiniLogo("tl"),
			t._game = XFlash.assetsManager.createDisplay("game_json", "index", null, !1, null),
			t.addChild(t._game),
			t._rotationIcon(),
			t.bindMoreButton(t._game.m_btn),
			t.bindCreditsButton(t._game.i_btn),
			t.bindFullScreenButton(t._game.f_btn),
			t.bindSoundButton(t._game.s_btn),
			t._game.play_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, t._onClick, t),
			t._game.play_btn.setPixelHitTest(!1),
			t.onResizeHandler(null),
			t
	}
	return __extends(t, e),
		t.prototype._rotationIcon = function() {
			var e = this._game.icon.rotation - 5
				, t = this;
			egret.Tween.get(this._game.icon, null, null, !0).to({
				rotation: e
			}, 100).call(function() {
				t._rotationIcon()
			}, this)
		},
		t.prototype._onClick = function(e) {
			this._game.play_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onClick, this),
				egret.Tween.removeTweens(this._game.icon),
				App.ChangeScene(function() {
					XFlash.replaceScene(GameSelectScene, 1e3)
				}, this)
		},
		t.prototype.onResizeHandler = function(t) {
			if (e.prototype.onResizeHandler.call(this, t),
				90 == window.orientation || -90 == window.orientation)
				return void (this.visible = !1);
			if (this.visible = !0,
					this._game) {
				this._game.x = (XFlash.stage.stageWidth - 480) / 2;
				var a = XFlash.stage.stageWidth / 480;
				this._game.bk.scaleX = a;
				var i = this._game.globalToLocal(0, 0);
				this._game.bk.x = i.x
			}
			this.setMiniLogo("tl")
		},
		t
}(BaseScene);
__reflect(GameIndex.prototype, "GameIndex");

//GameScene1
var GameScene1 = function(e) {
	function t() {
		var t = e.call(this) || this;
		return t._shou = null,
			GameData.tileWidth = XFlash.stage.stageWidth / GameData.hcount,
			GameData.tileHeight = XFlash.stage.stageHeight / GameData.vcount,
			t._background = new Background,
			t.addChild(t._background),
			t._background.changeTexture(RES.getRes("0_png")),
			t._gameTile = new GameTiles,
			t.addChild(t._gameTile),
			t._line = new egret.Shape,
			t.addChild(t._line),
			t._scoreTxt = new egret.TextField,
			t._scoreTxt.size = 80,
			t._scoreTxt.y = 15,
			t._scoreTxt.textColor = 16471127,
			t._scoreTxt.textAlign = egret.HorizontalAlign.CENTER,
			t._scoreTxt.text = "0",
			t._scoreTxt.width = 480,
			t._scoreTxt.height = t._scoreTxt.textHeight,
			t.addChild(t._scoreTxt),
			t._startView = XFlash.assetsManager.createDisplay("game_json", "startview", null, !1, null),
			t.addChild(t._startView),
			t.bindMoreButton(t._startView.m_btn),
			t.bindFullScreenButton(t._startView.f_btn),
			t.bindSoundButton(t._startView.s_btn),
			t._gameOverPanel = new GameOverPanel("game_json","overback"),
			t._gameOverPanel.visible = !1,
			t.addChild(t._gameOverPanel),
			t._gameOverPanel.replay_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, t._overClick, t),
			t._gameOverPanel.home_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, t._overClick, t),
			t._gameOverPanel.select_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, t._overClick, t),
			t._gameOverPanel.replay_btn.touchChildren = !1,
			t._gameOverPanel.replay_btn.touchEnabled = !0,
			t._gameOverPanel.home_btn.setPixelHitTest(!1),
			t._gameOverPanel.home_btn.touchChildren = !1,
			t._gameOverPanel.home_btn.touchEnabled = !0,
			t._gameOverPanel.select_btn.setPixelHitTest(!1),
			t._gameOverPanel.select_btn.touchChildren = !1,
			t._gameOverPanel.select_btn.touchEnabled = !0,
			t.bindMoreButton(t._gameOverPanel.m_btn),
			t._gameWinPanel = new GameWinPanel("game_json","winback"),
			t._gameWinPanel.visible = !1,
			t.addChild(t._gameWinPanel),
			t._gameWinPanel.replay_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, t._overClick, t),
			t._gameWinPanel.home_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, t._overClick, t),
			t._gameWinPanel.select_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, t._overClick, t),
			t._gameWinPanel.replay_btn.touchChildren = !1,
			t._gameWinPanel.replay_btn.touchEnabled = !0,
			t._gameWinPanel.home_btn.setPixelHitTest(!1),
			t._gameWinPanel.home_btn.touchChildren = !1,
			t._gameWinPanel.home_btn.touchEnabled = !0,
			t._gameWinPanel.select_btn.setPixelHitTest(!1),
			t._gameWinPanel.select_btn.touchChildren = !1,
			t._gameWinPanel.select_btn.touchEnabled = !0,
			t.bindMoreButton(t._gameWinPanel.m_btn),
			t._loadingView = new LoadingView,
			t._loadingView.setStr("Loading......"),
			t.addChild(t._loadingView),
			t.setMiniLogo("tl"),
			t.onResizeHandler(null),
			t.replayGame(),
			RES.getResByUrl(GameData.currentMusicData.url, t._onLoadMusicComplete, t, RES.ResourceItem.TYPE_JSON),
			console.log('GameData.currentMusicData.url', GameData.currentMusicData.url),
			t
	}
	return __extends(t, e),
		t.prototype._onLoadMusicComplete = function(e) {
			e ? (XFlash.stopBgSound(),
				this._gameTile.initSong(e),
			this._loadingView && (this._loadingView.destroy(),
				this._loadingView = null)) : (this._loadingView.setStr("Loading Erro!"),
				egret.Tween.get(this).wait(3e3).call(function() {
					App.ChangeScene(function() {
						XFlash.replaceScene(GameSelectScene, 1e3)
					}, this)
				}, this))
		},
		t.prototype._overClick = function(e) {
			"replay_btn" == e.currentTarget.name ? this.replayGame() : "home_btn" == e.currentTarget.name ? App.ChangeScene(function() {
				XFlash.replaceScene(GameIndex, 1e3),
					XFlash.playSound("Movie_cycle_mp3")
			}, this) : "select_btn" == e.currentTarget.name && App.ChangeScene(function() {
				XFlash.replaceScene(GameSelectScene, 1e3),
					XFlash.playSound("Movie_cycle_mp3")
			}, this)
		},
		t.prototype.createShou = function(e) {
			this._shou = XFlash.assetsManager.createDisplay("game_json", "shou", null, !1, null),
				this._shou.touchChildren = !1,
				this._shou.touchEnabled = !1,
				this._shou.scaleX = this._shou.scaleY = .8,
				this._shou.x = e.x + GameData.tileWidth / 2,
				this._shou.y = e.y + e.tileHeight / 4,
				this.addChild(this._shou);
			var t = this._shou.y
				, a = t + 10;
			egret.Tween.get(this._shou, {
				loop: !0
			}, null, !0).to({
				y: a
			}, 300).to({
				y: t
			}, 300)
		},
		t.prototype.destroyShou = function() {
			this._shou && this._shou.parent && this._shou.parent.removeChild(this._shou),
				this._shou = null
		},
		t.prototype.addHuangguan = function() {
			var e = XFlash.assetsManager.createDisplay("game_json", "a9", null, !1, null);
			e.scaleX = e.scaleY = .1,
				e.x = XFlash.stage.stageWidth / 2,
				e.y = this._scoreTxt.y + 150,
				e.alpha = 0,
				this.addChild(e),
				egret.Tween.get(e).to({
					alpha: 1,
					scaleX: .6,
					scaleY: .6
				}, 200).to({
					y: this._scoreTxt.y,
					alpha: 0
				}, 500).call(function() {
					this.parent && this.parent.removeChild(this)
				}, e)
		},
		t.prototype.addEndlessMode = function() {
			var e = new egret.TextField;
			e.size = 50,
				e.y = XFlash.stage.stageHeight / 2,
				e.textColor = 16777215,
				e.textAlign = egret.HorizontalAlign.CENTER,
				e.text = "Endless Mode",
				e.width = 480,
				e.height = this._scoreTxt.textHeight,
				this.addChild(e),
				e.alpha = 0,
				e.touchEnabled = !1;
			var t = e.y - 50
				, a = -e.height - 10;
			egret.Tween.get(e).to({
				alpha: .8,
				y: t
			}, 200).to({
				y: a
			}, 1500).call(function() {
				this.parent && this.parent.removeChild(this)
			}, e)
		},
		t.prototype.updateScore = function() {
			this._scoreTxt.text = GameData.currentScore.toString()
		},
		t.prototype._onUpdate = function() {
			GameData.gameStart && (GameData.gamePause || this._gameTile.onUpdate())
		},
		t.prototype.gameWin = function() {
			GameData.gameStart = !1,
				this.removeEventListener(egret.Event.ENTER_FRAME, this._onUpdate, this),
				this._gameWinPanel.show(),
				this._gameWinPanel.visible = !0
		},
		t.prototype.gameStart = function() {
			this._startView.visible = !1,
				this.addEventListener(egret.Event.ENTER_FRAME, this._onUpdate, this)
		},
		t.prototype.gameOver = function() {
			App.ShowLose(),
				GameData.gameStart = !1,
				this.removeEventListener(egret.Event.ENTER_FRAME, this._onUpdate, this),
				this._gameOverPanel.show(),
				this._gameOverPanel.visible = !0
		},
		t.prototype.replayGame = function() {
			this._gameWinPanel.visible = !1,
				this._gameOverPanel.visible = !1,
				this._startView.nm_txt.text = GameData.currentMusicData.name,
				this._startView.best_txt.text = GameData.currentMusicData.best.toString(),
				this._startView.visible = !0,
				GameData.speed = GameData.currentMusicData.speed,
				this._gameTile.initGame(),
				this._scoreTxt.text = GameData.currentScore.toString()
		},
		t.prototype.goHome = function() {},
		t.prototype.onResizeHandler = function(t) {
			if (e.prototype.onResizeHandler.call(this, t),
				90 == window.orientation || -90 == window.orientation)
				return this.visible = !1,
					void (GameData.gamePause = !0);
			GameData.tileWidth = XFlash.stage.stageWidth / GameData.hcount,
				GameData.tileHeight = XFlash.stage.stageHeight / GameData.vcount,
				this.visible = !0,
				GameData.gamePause = !1;
			var a;
			if (this._background.onResizeHandler(),
				this._startView.visible && (this._startView.y = XFlash.stage.stageHeight - GameData.tileHeight,
					this._startView.bk.scaleX = XFlash.stage.stageWidth / 720,
					this._startView.bk.scaleY = XFlash.stage.stageHeight / 300),
					this._gameOverPanel) {
				this._gameOverPanel.x = (XFlash.stage.stageWidth - 480) / 2,
					a = XFlash.stage.stageWidth / 480,
					this._gameOverPanel.bk.scaleX = a;
				var i = this._gameOverPanel.globalToLocal(0, 0);
				this._gameOverPanel.bk.x = i.x
			}
			if (this._gameWinPanel) {
				this._gameWinPanel.x = (XFlash.stage.stageWidth - 480) / 2,
					a = XFlash.stage.stageWidth / 480,
					this._gameWinPanel.bk.scaleX = a;
				var i = this._gameWinPanel.globalToLocal(0, 0);
				this._gameWinPanel.bk.x = i.x
			}
			this._loadingView && this._loadingView.onResizeHandler(),
				this._line.graphics.clear(),
				this._line.graphics.lineStyle(1, 16777215);
			for (var n = 1; 4 > n; n++)
				this._line.graphics.moveTo(GameData.tileWidth * n, 0),
					this._line.graphics.lineTo(GameData.tileWidth * n, XFlash.stage.stageHeight);
			this.setMiniLogo("tl")
		},
		t
}(BaseScene);
__reflect(GameScene1.prototype, "GameScene1");

//GameSelectScene
var GameSelectScene = function(e) {
	function t() {
		var t = e.call(this) || this;
		return t._game = XFlash.assetsManager.createDisplay("game_json", "selectview", null, !1, null),
			t.addChild(t._game),
			t._game.back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, t._onClickBack, t),
			t.bindFullScreenButton(t._game.f_btn),
			t.bindSoundButton(t._game.s_btn),
			t._list = new ItemList,
			t._game.addChild(t._list),
			t.onResizeHandler(null),
			t
	}
	return __extends(t, e),
		t.prototype._onClickBack = function(e) {
			App.ChangeScene(function() {
				XFlash.replaceScene(GameIndex, 1e3)
			}, this)
		},
		t.prototype.onResizeHandler = function(t) {
			if (e.prototype.onResizeHandler.call(this, t),
				90 == window.orientation || -90 == window.orientation)
				return void (this.visible = !1);
			if (this.visible = !0,
					this._game) {
				this._game.x = (XFlash.stage.stageWidth - 480) / 2;
				var a = XFlash.stage.stageWidth / 480;
				this._game.bk.scaleX = a;
				var i = this._game.globalToLocal(0, 0);
				this._game.bk.x = i.x
			}
			this.setMiniLogo("tl")
		},
		t
}(BaseScene);
__reflect(GameSelectScene.prototype, "GameSelectScene");

//GameTiles
var GameTiles = function(e) {
	function t() {
		var t = e.call(this) || this;
		return t._soundArr = [],
			t._idx = 0,
			t._tapArr = [],
			t._emptyArr = [],
			t._preTx = -1,
			t._tx = -1,
			t._arr = [0, 1, 2, 3],
			t._tilesArr = [],
			t
	}
	return __extends(t, e),
		t.prototype.initSong = function(e) {
			this._soundData = e.musics[0];
			var t, a = this._soundData.scores, i = a[0];
			i = this._replaceAll(i),
				t = i.split(","),
				this._soundArr = t
		},
		t.prototype.initGame = function() {
			var e;
			for (GameData.tapTimes = 0,
				     GameData.currentScore = 0,
				     this._preTx = -1,
				     this._idx = 0,
				     this._arr = [0, 1, 2, 3],
				     this._tilesArr = []; this.numChildren > 0; )
				e = this.getChildAt(0),
					e.destroy();
			for (var t = 0; t < GameData.vcount + 3; t++)
				this._addTile(GameData.tileHeight)
		},
		t.prototype._addTile = function(e) {
			var t, a;
			a = 0 == this._tilesArr.length ? XFlash.stage.stageHeight - e : this._tilesArr[this._tilesArr.length - 1].y;
			var i = XFlash.randInt(0, this._arr.length - 1)
				, n = this._arr[i];
			if (this._arr.splice(i, 1),
				-1 != this._preTx && this._arr.push(this._preTx),
				0 == this.numChildren)
				t = ObjectPool.pop("TileButton"),
					t.changeTexure(RES.getRes("132_png")),
					t.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onClickStart, this);
			else {
				t = ObjectPool.pop("TileBase");
				var s = XFlash.randInt(0, 100);
				30 >= s ? t.changeTexure(RES.getRes("9x_png")) : t.changeTexure(RES.getRes("92_png"))
			}
			t && (this._tilesArr.push(t),
				t.touchEnabled = !0,
				t.scaleX = GameData.tileWidth / 132,
				t.scaleY = e / 238,
				this.addChild(t),
				t.initTile(e),
				t.x = n * GameData.tileWidth,
				t.y = a - e),
				this._preTx = n
		},
		t.prototype._onClickStart = function(e) {
			var t = e.currentTarget;
			t.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onClickStart, this),
				t.onTouchDown(),
				this._tilesArr.splice(this._tilesArr.indexOf(t), 1),
				1 == GameData.localGameData.isFirst ? XFlash.currentScene.createShou(this._tilesArr[0]) : this._startGame(),
				XFlash.currentScene.gameStart(),
				console.log('_onClickStart XFlash.stage', XFlash.stage)
				XFlash.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTileDown, this),
				XFlash.stage.addEventListener(egret.TouchEvent.TOUCH_END, this._onTileUp, this)
		},
		t.prototype._startGame = function() {
			GameData.gameStart = !0
		},
		t.prototype.gameOver = function() {
			GameData.gameStart = !1,
				XFlash.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTileDown, this),
				XFlash.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this._onTileUp, this),
				XFlash.playEffect("FailPage_mp3", 1)
		},
		t.prototype.gameWin = function() {
			GameData.gameStart = !1,
				XFlash.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTileDown, this),
				XFlash.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this._onTileUp, this),
				XFlash.playEffect("NewBest_mp3", 1)
		},
		t.prototype._onTileDown = function(e) {
			if (!GameData.gamePause) {
				var t, a = e.target;
				if (a instanceof TileBase) {
					if (t = a,
						!t.isTouch && a == this.getCurrentTile())
						return t.onTouchDown(),
							this._onTap(e),
							void this._tilesArr.splice(this._tilesArr.indexOf(t), 1)
				} else if (t = this.getCurrentTile(),
					e.stageY <= t.y + t.tileHeight) {
					XFlash.currentScene.destroyShou(),
						this.gameOver();
					var i = Math.floor(e.stageX / GameData.tileWidth)
						, n = this._getNeibourTileY(e.stageY);
					t = ObjectPool.pop("TileBase"),
						t.changeTexure(RES.getRes("152_png")),
						t.scaleX = GameData.tileWidth / 132,
						t.scaleY = n.tileHeight / 238,
						t.initTile(n.tileHeight),
						t.x = i * GameData.tileWidth,
						t.y = n.y,
						this.addChild(t),
						this.showWrongTile2(t)
				} else
					console.log("meishi")
			}
		},
		t.prototype._onTileUp = function(e) {},
		t.prototype._replaceAll = function(e) {
			return e = e.replace(/;/gm, ","),
				e = e.replace(/\[L\]/gm, ""),
				e = e.replace(/\[M\]/gm, ""),
				e = e.replace(/\[N\]/gm, ""),
				e = e.replace(/\[I\]/gm, ""),
				e = e.replace(/\[J\]/gm, ""),
				e = e.replace(/\[K\]/gm, ""),
				e = e.replace(/\[KL\]/gm, ""),
				e = e.replace(/\[JK\]/gm, ""),
				e = e.replace(/\[JL\]/gm, ""),
				e = e.replace(/\[LM\]/gm, ""),
				e = e.replace(/\[LL\]/gm, ""),
				e = e.replace(/\[KM\]/gm, ""),
				e = e.replace(/\[KKK\]/gm, ""),
				e = e.replace(/\[IJ]/gm, ""),
				e = e.replace(/\[KLM]/gm, ""),
				e = e.replace(/#/gm, "_"),
				e = e.replace(/U,/gm, ""),
				e = e.replace(/T,/gm, ""),
				e = e.replace(/T/gm, ""),
				e = e.replace(/V,/gm, ""),
				e = e.replace(/V>/gm, "d"),
				e = e.replace(/5</gm, ""),
				e = e.replace(/6</gm, ""),
				e = e.replace(/>/gm, ""),
				e = e.replace(/@/gm, "."),
				e = e.replace(/~/gm, "."),
				e = e.replace(/S/gm, "d"),
				e = e.replace(/%/gm, "."),
				e = e.replace(/\^/gm, "."),
				e = e.replace(/\&/gm, "."),
				e = e.substring(0, e.lastIndexOf(","))
		},
		t.prototype.checkWin = function() {
			this._idx++,
			1 == GameData.localGameData.isFirst && (GameData.localGameData.isFirst = 0,
				this._startGame(),
				XFlash.currentScene.destroyShou()),
				GameData.currentScore += 1,
				XFlash.currentScene.updateScore(),
			this._idx >= this._soundArr.length && (GameData.tapTimes += 1,
			GameData.currentMusicData.isWin || (GameData.currentMusicData.isWin = 1,
				GameData.localGameData.openID += 1),
				this._idx = 0,
				GameData.tapTimes > 3 ? GameData.speed += 2 : GameData.speed += 5,
			GameData.tapTimes <= 3 && (XFlash.currentScene.addHuangguan(),
			3 == GameData.tapTimes && XFlash.currentScene.addEndlessMode()))
		},
		t.prototype._onTap = function(e) {
			var t, a = null, i = this._soundArr[this._idx];
			return i.indexOf("(") > -1 ? (i = i.replace(/\(/gm, ""),
				i = i.replace(/\)/gm, ""),
				a = i.split("."),
				t = a[a.length - 1] + "_mp3",
			RES.getRes(t) || console.log(t),
				XFlash.playEffect(t, 1),
				void this.checkWin()) : (t = i + "_mp3",
			RES.getRes(t) || console.log(t),
				XFlash.playEffect(t, 1),
				void this.checkWin())
		},
		t.prototype.onUpdate = function() {
			for (var e, t = this.numChildren - 1; t >= 0; t--)
				e = this.getChildAt(t),
					e.y += GameData.speed,
				e == this.getCurrentTile() && e.y > XFlash.stage.stageHeight && (this.gameOver(),
					this._scrollBack()),
				0 == e.isDestroy && e.y >= XFlash.stage.stageHeight + e.height && (e.destroy(),
					this._addTile(GameData.tileHeight))
		},
		t.prototype._removeAllTiles = function() {
			for (var e; this.numChildren > 0; )
				e = this.getChildAt(0),
					e.destroy()
		},
		t.prototype.showWrongTile2 = function(e) {
			var t = 200;
			e.alpha = 0;
			egret.Tween.get(e).to({
				alpha: 1
			}, t).to({
				alpha: 0
			}, t).to({
				alpha: 1
			}, t).to({
				alpha: 0
			}, t).to({
				alpha: 1
			}, t).to({
				alpha: 0
			}, t).call(function() {
				XFlash.currentScene.gameOver()
			}, this)
		},
		t.prototype.showWrongTile = function(e) {
			var t = 200;
			egret.Tween.get(e).to({
				alpha: 0
			}, t).to({
				alpha: 1
			}, t).to({
				alpha: 0
			}, t).to({
				alpha: 1
			}, t).to({
				alpha: 0
			}, t).to({
				alpha: 1
			}, t).call(function() {
				XFlash.currentScene.gameOver()
			}, this)
		},
		t.prototype._scrollBack = function() {
			var e = this.getCurrentTile()
				, t = e.y - (XFlash.stage.stageHeight - e.tileHeight)
				, a = Math.floor(t / 800 * 1e3);
			console.log('_scrollBack t', t)
			console.log('_scrollBack a', a)
			this.showWrongTile(e);
			for (var i, n = this.numChildren - 1; n >= 0; n--)
				e = this.getChildAt(n),
					i = e.y - t,
					egret.Tween.get(e).to({
						y: i
					}, a)
		},
		t.prototype._getNeibourTileY = function(e) {
			for (var t, a = this.numChildren - 1; a >= 0; a--)
				if (t = this.getChildAt(a),
					e >= t.y && e <= t.y + t.tileHeight)
					return t;
			return null
		},
		t.prototype.getCurrentTile = function() {
			return this._tilesArr[0]
		},
		t
}(egret.DisplayObjectContainer);
__reflect(GameTiles.prototype, "GameTiles");

//Main
var Main = function(e) {
	function t() {
		var t = null !== e && e.apply(this, arguments) || this;
		return t.isThemeLoadEnd = !1,
			t.isResourceLoadEnd = !1,
			t
	}
	return __extends(t, e),
		t.getI = function() {
			return this._instance
		},
		t.prototype.createChildren = function() {
			e.prototype.createChildren.call(this),
				egret.Capabilities.isMobile ? (this.stage.orientation = egret.OrientationMode.PORTRAIT,
					this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT) : (this.stage.orientation = egret.OrientationMode.AUTO,
					this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL),
				t._instance = this;
			var a = new AssetAdapter;
			egret.registerImplementation("eui.IAssetAdapter", a),
				egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter),
				App.init(),
				RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this),
				RES.loadConfig("resource/default.res.json", "resource/")
		},
		t.prototype.onConfigComplete = function(e) {
			RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
			var t = new eui.Theme("resource/default.thm.json",this.stage);
			t.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this),
				RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this),
				RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this),
				RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this),
				RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this),
				RES.loadGroup("preload")
		},
		t.prototype.onThemeLoadComplete = function() {
			this.isThemeLoadEnd = !0,
				this.createScene()
		},
		t.prototype.onResourceLoadComplete = function(e) {
			"preload" == e.groupName && (RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this),
				RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this),
				RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this),
				RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this),
				this.isResourceLoadEnd = !0,
				this.createScene())
		},
		t.prototype.onItemLoadError = function(e) {
			console.warn("Url:" + e.resItem.url + " has failed to load")
		},
		t.prototype.onResourceLoadError = function(e) {
			console.warn("Group:" + e.groupName + " has failed to load"),
				this.onResourceLoadComplete(e)
		},
		t.prototype.onResourceProgress = function(e) {
			if ("preload" == e.groupName) {
				var t = e.itemsLoaded / e.itemsTotal * 100 | 0;
				if (t = Math.min(t, 100),
					e.itemsLoaded / e.itemsTotal == 1)
					MGDelegate.dispatcherEvent(new MGEvent(MGEvent.LOAD_COMPLETE));
				else {
					var a = new MGEvent(MGEvent.LOAD_PROGRESS);
					a.data = {
						itemsLoaded: e.itemsLoaded,
						itemsTotal: e.itemsTotal,
						percent: t
					},
						MGDelegate.dispatcherEvent(a)
				}
			}
		},
		t.prototype.createScene = function() {
			if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
				XFlash.init(this.stage, "resource/swfs/", RES.getGroupByName("preload"));
				var e = this;
				MGDelegate.addEventListener(MGEvent.ENTER_GAME || "ENTER_GAME", function() {
					MGDelegate.removeEventListener(MGEvent.ENTER_GAME || "ENTER_GAME", arguments.callee, this),
						e._backgound = new egret.Shape,
						e.addChild(e._backgound),
						e.stage.addEventListener(egret.Event.RESIZE, e._onResize, e),
						App.ChangeScene(function() {
							XFlash.replaceScene(GameIndex, 0),
								e._onResize(null),
								XFlash.playSound("Movie_cycle_mp3")
						}, this)
				}, this)
			}
		},
		t.prototype.drawRect = function(e) {
			var t = new egret.Shape;
			this.stage.addChild(t),
				t.graphics.lineStyle(1, 0),
				t.graphics.beginFill(16711680),
				t.graphics.drawRect(e.x, e.y, e.width, e.height),
				t.graphics.endFill()
		},
		t.prototype.openMask = function(e, t) {
			var a = new egret.Bitmap
				, i = RES.getRes("2_png");
			a.anchorOffsetX = i.textureWidth / 2,
				a.anchorOffsetY = i.textureHeight / 2,
				a.texture = i,
				this.addChild(a),
				a.x = XFlash.stage.stageWidth / 2,
				a.y = XFlash.stage.stageHeight / 2,
				a.scaleX = a.scaleY = 0,
				XFlash.currentScene.mask = a,
				egret.Tween.get(a).to({
					scaleX: 18,
					scaleY: 18
				}, 500).call(function() {
					XFlash.currentScene.mask = null,
					a.parent && a.parent.removeChild(a),
						e.call(t)
				}, t)
		},
		t.prototype.closeMask = function(e, t) {
			var a = new egret.Bitmap
				, i = RES.getRes("2_png");
			a.anchorOffsetX = i.textureWidth / 2,
				a.anchorOffsetY = i.textureHeight / 2,
				a.texture = i,
				this.addChild(a),
				a.x = XFlash.stage.stageWidth / 2,
				a.y = XFlash.stage.stageHeight / 2,
				a.scaleX = a.scaleY = 18,
				XFlash.currentScene.mask = a,
				egret.Tween.get(a).to({
					scaleX: 0,
					scaleY: 0
				}, 500).call(function() {
					XFlash.currentScene.mask = null,
					a.parent && a.parent.removeChild(a),
						e.call(t)
				}, t)
		},
		t.prototype._showRotate = function(e) {
			if (e && !this._rotateIcon) {
				var t = RES.getRes("rotate_png");
				return this._rotateIcon = new egret.Bitmap(t),
					this._rotateIcon.anchorOffsetX = t.textureWidth / 2,
					this._rotateIcon.anchorOffsetY = t.textureHeight / 2,
					this.stage.addChild(this._rotateIcon),
					this._rotateIcon.x = XFlash.stage.stageWidth / 2,
					void (this._rotateIcon.y = XFlash.stage.stageHeight / 2)
			}
			!e && this._rotateIcon && (this.stage.removeChild(this._rotateIcon),
				this._rotateIcon = null)
		},
		t.prototype._onResize = function(e) {
			this._backgound.graphics.clear(),
				90 == window.orientation || -90 == window.orientation ? (this._showRotate(!0),
					this._backgound.graphics.beginFill(16777215)) : (this._backgound.graphics.beginFill(0),
					this._showRotate(!1)),
				XFlash.currentScene.onResizeHandler(null),
				this._backgound.graphics.drawRect(0, 0, XFlash.stage.stageWidth, XFlash.stage.stageHeight),
				this._backgound.graphics.endFill()
		},
		t
}(eui.UILayer);
Main._instance = null,
	__reflect(Main.prototype, "Main");

//ThemeAdapter
var ThemeAdapter = function() {
	function e() {}
	return e.prototype.getTheme = function(e, t, a, i) {
		function n(e) {
			t.call(i, e)
		}
		function s(t) {
			t.resItem.url == e && (RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, s, null),
				a.call(i))
		}
		RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, s, null),
			RES.getResByUrl(e, n, this, RES.ResourceItem.TYPE_TEXT)
	}, e
}();
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);

//GameData
var GameData = function() {
	function e() {
	}

	return e.loadStorage = function () {
		var t = egret.localStorage.getItem(App.nameid);
		t ? e.localGameData = JSON.parse(t) : e.localGameData = {
			openID: 1,
			isFirst: 1
		}
	},
		e.saveStorage = function () {
			var t = e.currentMusicData.url;
			e.localGameData[t].best = e.currentMusicData.best,
				e.localGameData[t].isOpen = e.currentMusicData.isOpen,
				e.localGameData[t].isWin = e.currentMusicData.isWin,
				e.localGameData[t].tapTimes = e.currentMusicData.tapTimes;
			var a = JSON.stringify(e.localGameData);
			egret.localStorage.setItem(App.nameid, a)
		},
		e
}();
GameData.hcount = 4,
	GameData.vcount = 4,
	GameData.tileWidth = 0,
	GameData.tileHeight = 0,
	GameData.gamePause = !1,
	GameData.gameStart = !1,
	GameData.localGameData = {
		openID: 1,
		isFirst: 1
	},
	GameData.currentMusicData = null,
	GameData.speed = 20,
	GameData.tapTimes = 0,
	GameData.currentScore = 0,
	__reflect(GameData.prototype, "GameData");

//GameOverPanel
var GameOverPanel = function(e) {
	function t(t, a) {
		return e.call(this, t, a) || this
	}
	return __extends(t, e),
		t.prototype.show = function() {
			this.nm_txt.text = GameData.currentMusicData.name,
			GameData.tapTimes > GameData.currentMusicData.tapTimes && (GameData.currentMusicData.tapTimes = GameData.tapTimes),
			GameData.currentScore > GameData.currentMusicData.best && (GameData.currentMusicData.best = GameData.currentScore);
			for (var e, t = 1; 4 > t; t++)
				e = this["h" + t],
					GameData.currentMusicData.tapTimes >= t ? e.gotoAndStop(1) : e.gotoAndStop(0);
			this.count_txt.text = GameData.currentScore.toString(),
				this.best_txt.text = "Best:" + GameData.currentMusicData.best.toString(),
				GameData.saveStorage()
		},
		t.prototype.onResizeHandler = function() {},
		t
}(XMovieClip);
__reflect(GameOverPanel.prototype, "GameOverPanel");

//GameWinPanel
var GameWinPanel = function(e) {
	function t(t, a) {
		return e.call(this, t, a) || this
	}
	return __extends(t, e),
		t.prototype.show = function() {
			this.nm_txt.text = GameData.currentMusicData.name,
				GameData.localGameData.openID += 1,
			GameData.tapTimes > GameData.currentMusicData.tapTimes && (GameData.currentMusicData.tapTimes = GameData.tapTimes),
			GameData.currentScore > GameData.currentMusicData.best && (GameData.currentMusicData.best = GameData.currentScore);
			for (var e, t = 1; 4 > t; t++)
				e = this["h" + t],
					GameData.currentMusicData.tapTimes >= t ? e.gotoAndStop(1) : e.gotoAndStop(0);
			this.count_txt.text = GameData.currentScore.toString(),
				this.best_txt.text = "Best:" + GameData.currentMusicData.best.toString(),
				GameData.saveStorage()
		},
		t.prototype.onResizeHandler = function() {},
		t
}(XMovieClip);
__reflect(GameWinPanel.prototype, "GameWinPanel");

//ItemList
var ItemList = function(e) {
	function t() {
		var t = e.call(this) || this;
		t._preY = 0,
			t._contentHeight = 0,
			t._prePos = null,
			t._maskHeight = 880,
			t._container = new egret.DisplayObjectContainer,
			t._container.y = 150,
			t.addChild(t._container),
			t._maskHeight = XFlash.stage.stageHeight - 150;
		var a = new egret.Shape;
		a.graphics.beginFill(0),
			a.graphics.drawRect(0, 0, XFlash.stage.stageWidth, t._maskHeight),
			a.graphics.endFill(),
			t.addChild(a),
			a.y = t._container.y,
			t._container.mask = a;
		var i = RES.getRes("song_json")
			, n = i.data;
		GameData.loadStorage();
		var s = n[0]
			, o = s.url
			, r = GameData.localGameData[o];
		r || (egret.localStorage.clear(),
			GameData.localGameData = {
				openID: 1,
				isFirst: 1
			});
		for (var l, h = 0; h < n.length; h++)
			l = ObjectPool.popByClassName("game_json", "itemview", "ItemRender"),
				l.y = 145 * h,
				l.setData(n[h], h + 1),
				t._container.addChild(l);
		return t._contentHeight = l.y + l.height,
			XFlash.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, t._onDown, t),
			t.addEventListener(egret.Event.REMOVED_FROM_STAGE, t._onRemoveFromeStage, t),
			t
	}
	return __extends(t, e),
		t.prototype._onRemoveFromeStage = function(e) {
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this._onRemoveFromeStage, this),
				this.destroyAll()
		},
		t.prototype._onDown = function(e) {
			e.stageY >= this._container.y && this._contentHeight > this._maskHeight && XFlash.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this),
				XFlash.stage.addEventListener(egret.TouchEvent.TOUCH_END, this._onUp, this),
				this._preY = e.stageY,
				this._prePos = new egret.Point(e.stageX,e.stageY)
		},
		t.prototype._onMove = function(e) {
			var t = e.stageY - this._preY
				, a = this._container.y + t;
			a > 150 ? a = 150 : a < -(this._contentHeight - this._maskHeight - 150) && (a = -(this._contentHeight - this._maskHeight - 150)),
				this._container.y = a,
				this._preY = e.stageY
		},
		t.prototype._onUp = function(e) {
			if (XFlash.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this),
					XFlash.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this._onUp, this),
				egret.Point.distance(this._prePos, new egret.Point(e.stageX,e.stageY)) < 5) {
				var t = e.target;
				t && t instanceof ItemRender && (GameData.currentMusicData = t.itemData,
					App.ChangeScene(function() {
						XFlash.replaceScene(GameScene1, 1e3)
					}, this))
			}
		},
		t.prototype.destroyAll = function() {
			XFlash.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onDown, this),
				XFlash.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onMove, this),
				XFlash.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this._onUp, this);
			for (var e; this._container.numChildren > 0; )
				e = this._container.getChildAt(0),
					e.destroy()
		},
		t
}(egret.DisplayObjectContainer);
__reflect(ItemList.prototype, "ItemList");

//ItemRender
var ItemRender = function(e) {
	function t(t, a) {
		var i = e.call(this, t, a) || this;
		return i._itemData = null,
			i.touchChildren = !1,
			i
	}
	return __extends(t, e),
		Object.defineProperty(t.prototype, "itemData", {
			get: function() {
				return this._itemData
			},
			enumerable: !0,
			configurable: !0
		}),
		t.prototype.setData = function(e, t) {
			this.id_txt.text = t.toString(),
				this.nm_txt.text = e.name;
			var a = GameData.localGameData[e.url];
			a ? this._itemData = a : (GameData.localGameData[e.url] = e,
				this._itemData = e),
				this._itemData.speed = e.speed;
			for (var i, n = this._itemData.tapTimes, s = 1; 4 > s; s++)
				i = this["h" + s],
					n >= s ? i.gotoAndStop(1) : i.gotoAndStop(0);
			GameData.localGameData.openID >= t ? (this.bk.gotoAndStop(1),
				this.touchEnabled = !0,
				this.best_mc.visible = !0,
				this.best_txt.visible = !0,
				this.best_txt.text = this._itemData.best) : (this.bk.gotoAndStop(0),
				this.touchEnabled = !1,
				this.best_mc.visible = !1,
				this.best_txt.visible = !1)
		},
		t.prototype.destroy = function() {
			ObjectPool.pushMC(this),
			this.parent && this.parent.removeChild(this)
		},
		t
}(XMovieClip);
__reflect(ItemRender.prototype, "ItemRender");

//LoadingView
var LoadingView = function(e) {
	function t() {
		var t = e.call(this) || this;
		return t._back = new egret.Shape,
			t.addChild(t._back),
			t._icon = XFlash.assetsManager.createDisplay("game_json", "a13", null, !1, null),
			t.addChild(t._icon),
			t._icon.y = 280,
			t._icon.scaleX = t._icon.scaleY = .5,
			t._txt = XFlash.assetsManager.createDisplay("game_json", "a22", null, !1, null),
			t.addChild(t._txt),
			t._txt.y = 466,
			t._rotationIcon(),
			t
	}
	return __extends(t, e),
		t.prototype.setStr = function(e) {
			this._txt.txt.text = e
		},
		t.prototype.destroy = function() {
			egret.Tween.removeTweens(this._icon),
			this.parent && this.parent.removeChild(this)
		},
		t.prototype._rotationIcon = function() {
			var e = this._icon.rotation - 5
				, t = this;
			egret.Tween.get(this._icon, null, null, !0).to({
				rotation: e
			}, 100).call(function() {
				t._rotationIcon()
			}, this)
		},
		t.prototype.onResizeHandler = function() {
			this._back.graphics.clear(),
				this._back.graphics.beginFill(0),
				this._back.graphics.drawRect(0, 0, XFlash.stage.stageWidth, XFlash.stage.stageHeight),
				this._back.graphics.endFill(),
				this._icon.x = XFlash.stage.stageWidth / 2,
				this._txt.x = XFlash.stage.stageWidth / 2
		},
		t
}(egret.DisplayObjectContainer);
__reflect(LoadingView.prototype, "LoadingView");

//AssetAdapter
var AssetAdapter = function() {
	function e() {}
	return e.prototype.getAsset = function(e, t, a) {
		function i(i) {
			t.call(a, i, e)
		}
		if (RES.hasRes(e)) {
			var n = RES.getRes(e);
			n ? i(n) : RES.getResAsync(e, i, this)
		} else
			RES.getResByUrl(e, i, this, RES.ResourceItem.TYPE_IMAGE)
	},
		e
}();
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);

//TileButton
var TileButton = function(e) {
	function t() {
		var t = e.call(this) || this;
		return t._txt = new egret.TextField,
			t.addChild(t._txt),
			t._txt.size = 35,
			t._txt.textColor = 16777215,
			t._txt.textAlign = egret.HorizontalAlign.CENTER,
			t._txt.text = "START",
			t._txt.height = 35,
			t
	}
	return __extends(t, e),
		t.prototype.changeTexure = function(t) {
			e.prototype.changeTexure.call(this, t),
				this._txt.width = this.width,
				this._txt.y = (this._bottomBmp.texture.textureHeight - this._txt.height) / 2
		},
		t.prototype.initTile = function(t) {
			e.prototype.initTile.call(this, t),
				this._txt.visible = !0
		},
		t.prototype.onTouchDown = function() {
			this.isTouch = !0,
				this._txt.visible = !1,
				this._bottomBmp.alpha = .2
		},
		t.prototype.onTouchUp = function() {},
		t
}(TileBase);
__reflect(TileButton.prototype, "TileButton");
