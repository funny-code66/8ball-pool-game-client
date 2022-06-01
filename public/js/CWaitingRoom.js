function CWaitingRoom() {
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosFullscreen;
    var _pStartPosLang;

    var _oBg;

    var _oAudioToggle;
    var _oButExit;
    var _oFade;
    var _oButFullscreen;
    var _oButLang;

    var _oButEasy;
    var _oButMedium;
    var _oButHard;

    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    this._init = function () {
        //super();
        // var app = require('../Application');
        // var colyseus = require('colyseus');
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);

        var oSpriteLang = s_oSpriteLibrary.getSprite("but_lang");

        var oSpriteExit = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = { x: CANVAS_WIDTH - (oSpriteExit.width / 2) - 10, y: oSpriteLang.height / 2 + 50 };
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSpriteExit, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_DOWN, this._onMouseDownButExit, this);

        var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _pStartPosAudio = { x: _pStartPosExit.x - (oSprite.width / 2) - 10, y: _pStartPosExit.y };
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            _pStartPosLang = { x: _pStartPosAudio.x - (oSpriteLang.width / NUM_LANGUAGES) - 10, y: _pStartPosAudio.y };
        } else {
            _pStartPosLang = { x: _pStartPosExit.x - (oSpriteExit.width / 2) - 10, y: _pStartPosExit.y };
        }

        // _oButLang = new CButLang(_pStartPosLang.x, _pStartPosLang.y, NUM_LANGUAGES, s_iCurLang, oSpriteLang, s_oStage);
        // _oButLang.addEventListener(ON_SELECT_LANG, this._onChangeLang, this);

        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if (ENABLE_FULLSCREEN === false) {
            _fRequestFullScreen = false;
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = { x: (oSprite.width / 4) + 10, y: (oSprite.height / 2) + 50 };;

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x, _pStartPosFullscreen.y, oSprite, s_bFullscreen, s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }

        _oTextName = new CTLText(s_oStage,
            CANVAS_WIDTH / 2 - 100, CANVAS_HEIGHT / 2 - 100, 200, 100,
            60, "left", "#000", FONT_GAME, 1,
            0, 0,
            "Waiting",
            true, true, false,
            false);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade)
            .to({ alpha: 0 }, 1000, createjs.Ease.cubicOut);

        sizeHandler();
        // _oButEasy.changeText(TEXT_EASY);
        // _oButMedium.changeText(TEXT_MEDIUM);
        // _oButHard.changeText(TEXT_HARD);
        this.connect();
    };

    this.connect = async function () {
        var client = new Colyseus.Client('ws://localhost:3555');
        this.room = await client.joinOrCreate('ballpool');
        console.log("async connect" + " waiting");
        let numPlayers = 0;
        this.room.state.players.onAdd = () => {
            numPlayers++;

            if (numPlayers === 2) {
                this.onJoin();
            }
        }


        this.room.state.listen("currentTurn", (sessionId) => {
            // go to next turn after a little delay, to ensure "onJoin" gets called before this.
            setTimeout(() => this.nextTurn(sessionId), 10);
        });

        this.room.state.listen("draw", () => this.drawGame());
        this.room.state.listen("winner", (sessionId) => this.showWinner(sessionId));

        this.room.state.onChange = (changes) => {
            console.log("state.onChange =>", changes);
        }

        this.room.onError.once(() => this._onStartMulti());


    }
    this._onStartMulti = function () {
        this._onExit(function () {
            s_WaitingRoom.unload();
            s_oMain.gotoGame();
            $(s_oMain).trigger("start_session");
        });
    };

    this.onJoin = function () {
        this._onStartMulti();
        this.countdownInterval = clock.setInterval(this.turnCountdown.bind(this), 1000);
        this.onResize();
    }

    this._onMouseDownButExit = function () {
        this._onExit(function () {
            s_WaitingRoom.unload();
            s_oMain.gotoMenu();
        });
    };

    this._onExit = function (oCbCompleted) {
        _oFade.on("click", function () { });
        _oFade.visible = true;
        createjs.Tween.get(_oFade)
            .to({ alpha: 1 }, 1000, createjs.Ease.cubicOut)
            .call(oCbCompleted);
    };

    this.unload = function () {

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.unload();
        }
        _oFade.removeAllEventListeners();
        s_oStage.removeAllChildren();
        s_WaitingRoom = null;
    };

    this.refreshButtonPos = function () {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - s_iOffsetX, s_iOffsetY + _pStartPosAudio.y);
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + s_iOffsetX, _pStartPosFullscreen.y + s_iOffsetY);
        }

        _oButExit.setPosition(_pStartPosExit.x - s_iOffsetX, _pStartPosExit.y + s_iOffsetY);
    };
    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this.resetFullscreenBut = function () {
        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.setActive(s_bFullscreen);
        }
    };

    this._onFullscreenRelease = function () {
        if (s_bFullscreen) {
            _fCancelFullScreen.call(window.document);
        } else {
            _fRequestFullScreen.call(window.document.documentElement);
        }

        sizeHandler();
    };

    s_WaitingRoom = this;

    this._init();
}
var s_WaitingRoom = null;