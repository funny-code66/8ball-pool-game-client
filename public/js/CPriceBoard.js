function CPriceBoard(iX, iY, szName, oParentContainer) {
    var _pStartPos;

    var _szName;
    // var _oHighlight;
    var _oContainer;
    var _oParentContainer = oParentContainer;

    this._init = function (iX, iY, szName) {

        _szName = szName;
        _pStartPos = { x: iX, y: iY };
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oParentContainer.addChild(_oContainer);

        var oSpriteBG = s_oSpriteLibrary.getSprite("priceboard");
        var oBg = createBitmap(oSpriteBG);
        _oContainer.addChild(oBg);

        var oSpriteSol = s_oSpriteLibrary.getSprite("solsymbol");
        var oSolsymbol = createBitmap(oSpriteSol);
        oSolsymbol.x = oBg.x + 10;
        oSolsymbol.y = oBg.y + oSpriteBG.height / 2 - 5;
        _oContainer.addChild(oSolsymbol);

        // var oSpriteHighlight = s_oSpriteLibrary.getSprite("highlight_player");
        // _oHighlight = createBitmap(oSpriteHighlight);
        // _oHighlight.alpha = 0;
        // _oHighlight.regX = oSpriteHighlight.width / 2;
        // _oHighlight.regY = oSpriteHighlight.height / 2;
        // _oHighlight.x = oSpriteBG.width / 2;
        // _oHighlight.y = oSpriteBG.height / 2;
        // _oContainer.addChild(_oHighlight);

        _oTextName = new CTLText(_oContainer,
            40, 5, oSpriteBG.width, oSpriteBG.height - 10,
            30, "left", "#fff", FONT_GAME, 1,
            0, 0,
            _szName,
            true, true, false,
            false);
    };

    this._init(iX, iY, szName);
}