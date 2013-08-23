// Generated by CoffeeScript 1.6.2
(function() {
  var PaintGameCommands, deepcopy,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  if (typeof deepcopy === "undefined" || deepcopy === null) {
    deepcopy = function(src) {
      return $.extend(true, {}, src);
    };
  }

  window.PaintGameState = (function() {
    var clockHandle;

    clockHandle = null;

    function PaintGameState(gameManager, waitForCode) {
      var character, i, name, temp, _i, _j, _ref, _ref1, _ref2;

      this.gameManager = gameManager;
      this.stopGame = __bind(this.stopGame, this);
      this.gameLost = __bind(this.gameLost, this);
      this.gameWon = __bind(this.gameWon, this);
      this.clock = __bind(this.clock, this);
      this.gameConfig = deepcopy(this.gameManager.config.game);
      this.gameCommands = new PaintGameCommands(this);
      this.visual = this.gameManager.visual;
      this.score = 0;
      this.stars = 0;
      this.tick = 0;
      this.finishedExecuting = false;
      this.startedExecuting = false;
      this.commands = [];
      this.picture = [];
      for (i = _i = 0, _ref = this.gameManager.config.visual.grid.gridY; _i <= _ref; i = _i += 1) {
        temp = [];
        for (i = _j = 0, _ref1 = this.gameManager.config.visual.grid.gridX; _j <= _ref1; i = _j += 1) {
          temp.push(null);
        }
        this.picture.push(temp);
      }
      _ref2 = this.gameConfig.characters;
      for (name in _ref2) {
        character = _ref2[name];
        if (name.indexOf('Border') === -1) {
          character.color = character.sprite;
          this.picture[character.x][character.y] = character;
        }
      }
      if (clockHandle != null) {
        clearInterval(clockHandle);
      }
      clockHandle = setInterval(this.clock, 17);
      this.startedGame = waitForCode ? false : true;
      return;
    }

    PaintGameState.prototype.getGameCommands = function() {
      return this.gameCommands;
    };

    PaintGameState.prototype.clock = function() {
      var command;

      if (this.startedGame === true) {
        if (this.tick % 30 === 0) {
          this.checkEvents();
          if (this.commands.length > 0) {
            command = this.commands.splice(0, 1)[0];
            command.exec();
          } else {
            this.finishedExecuting = this.startedExecuting;
          }
        }
      }
      this.visual.getFrame(this.gameManager.config.visual, this.tick);
      this.tick++;
    };

    PaintGameState.prototype.checkPainting = function() {
      var expected, name, pixel, x, y, _i, _j, _ref, _ref1, _ref2, _ref3;

      _ref = this.gameConfig.characters;
      for (name in _ref) {
        pixel = _ref[name];
        expected = pixel.match;
        if (expected == null) {
          expected = name;
        }
        if (expected === ((_ref1 = this.picture[pixel.x][pixel.y]) != null ? _ref1.color : void 0)) {
          this.picture[pixel.x][pixel.y].matched = true;
        } else {
          return false;
        }
      }
      for (x = _i = 0, _ref2 = this.gameManager.config.visual.grid.gridX; 0 <= _ref2 ? _i <= _ref2 : _i >= _ref2; x = 0 <= _ref2 ? ++_i : --_i) {
        for (y = _j = 0, _ref3 = this.gameManager.config.visual.grid.gridY; 0 <= _ref3 ? _j <= _ref3 : _j >= _ref3; y = 0 <= _ref3 ? ++_j : --_j) {
          pixel = this.picture[x][y];
          if (!pixel || pixel.matched) {
            continue;
          }
          return false;
        }
      }
      return true;
    };

    PaintGameState.prototype.checkEvents = function() {
      if (this.finishedExecuting) {
        if (this.checkPainting()) {
          this.gameWon();
        } else {
          this.gameLost();
        }
      }
    };

    PaintGameState.prototype.start = function() {
      this.startedExecuting = true;
      this.startedGame = true;
    };

    PaintGameState.prototype.drawPixel = function(x, y, color) {
      var char;

      if (!this.gameManager.config.game.characterBase.hasOwnProperty(color)) {
        return;
      }
      char = this.gameManager.generateCharacter(color, x, y, false);
      char.color = color;
      this.picture[x][y] = char;
      this.commands.push({
        key: 'drawPixel',
        exec: this._drawPixel.bind(this, x, y, color, char)
      });
    };

    PaintGameState.prototype._drawPixel = function(x, y, color, char) {
      if (this.picture[x][y] != null) {
        this.visual.removeCharacter(this.gameManager.config.visual, this.picture[x][y].visual);
      }
      this.visual.pushCharacter(this.gameManager.config.visual, char.visual);
      this.picture[x][y] = char;
    };

    PaintGameState.prototype.getPixel = function(x, y) {
      if (this.picture[x][y]) {
        return this.picture[x][y].color;
      } else {
        return "white";
      }
    };

    PaintGameState.prototype.gameWon = function() {
      if (!this.startedGame) {
        return;
      }
      this.stopGame();
      this.gameManager.gameWon();
    };

    PaintGameState.prototype.gameLost = function() {
      if (!this.startedGame) {
        return;
      }
      this.stopGame();
      this.gameManager.gameLost();
    };

    PaintGameState.prototype.stopGame = function() {
      if (clockHandle != null) {
        clearInterval(clockHandle);
      }
      clockHandle = null;
      this.startedGame = false;
    };

    return PaintGameState;

  })();

  PaintGameCommands = (function() {
    function PaintGameCommands(gameState) {
      this.gameState = gameState;
      return;
    }

    PaintGameCommands.prototype.finishedParsingStartGame = function() {
      this.gameState.start();
    };

    PaintGameCommands.prototype.drawPixel = function(x, y, color) {
      this.gameState.drawPixel(x, y, color);
    };

    PaintGameCommands.prototype.getPixel = function(x, y) {
      return this.gameState.getPixel(x, y);
    };

    return PaintGameCommands;

  })();

}).call(this);
