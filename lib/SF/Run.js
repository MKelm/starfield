/*
 * This file is part of Starfield.
 * Copyright 2013-2014 by Martin Kelm - All rights reserved.
 * Project page @ https://github.com/mkelm/starfield
 *
 * Starfield is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * Starfield is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Stafield. If not, see <http://www.gnu.org/licenses/>.
 */

// run class

SF.Run = function() {
  SF.Element.call(this, "run", false);

  this.display = null;

  this.stars = [];
}

SF.Run.prototype = Object.create(SF.Element.prototype);
SF.Run.prototype.constructor = SF.Run;

SF.Run.prototype.initDisplay = function() {
  this.display = new PIXI.DisplayObjectContainer();
  this.display.pivot = {x: 0.5, y: 0.5 };
  this.display.position = {x: sf.pixi.screen.width/2, y: sf.pixi.screen.height/2 };

  this.display.scale = {x: sf.pixi.screen.ratio, y: sf.pixi.screen.ratio};
  sf.pixi.stage.addChild(this.display);
}

SF.Run.prototype.start = function() {
  this.initDisplay();

  // interval to move stars
  sf.intervals.gameStep = setInterval(this.step.curry(this), 10);
}

SF.Run.prototype.step = function(scope) {
  var maxStars = 0;
  do {
    maxStars = Math.ceil(Math.random() * 30);
  } while (maxStars < 10);

  if (scope.stars.length < maxStars) {
    var gfx = new PIXI.Graphics();
    gfx.position.x = 0;
    gfx.position.y = 0;
    gfx.beginFill("0xFFFFFF");
    gfx.drawRect(-1, -1, 2, 2);
    var direction = Math.floor(Math.random() * 8);
    scope.display.addChild(gfx);
    scope.stars.push({ direction: direction, gfx: gfx });
  }
  for (var i = 0; i < scope.stars.length; i++) {
    var sx = scope.stars[i].gfx.position.x,
        sy = scope.stars[i].gfx.position.y;
    var remove = false;
    switch (scope.stars[i].direction) {
      case 0: // left,down
        if (sx > -640 && sy < 512) {
          scope.stars[i].gfx.position.x--;
          scope.stars[i].gfx.position.y++;
        } else {
          remove = true;
        }
        break;
      case 1: // middle,down
        if (sy < 512) {
          scope.stars[i].gfx.position.y++;
        } else {
          remove = true;
        }
        break;
      case 2: // right,down
        if (sx < 640 && sy < 512) {
          scope.stars[i].gfx.position.x++;
          scope.stars[i].gfx.position.y++;
        } else {
          remove = true;
        }
        break;
      case 3: // left,middle
        if (sx > -640) {
          scope.stars[i].gfx.position.x--;
        } else {
          remove = true;
        }
        break;
      case 4: // right,middle
        if (sx < 640) {
          scope.stars[i].gfx.position.x++;
        } else {
          remove = true;
        }
        break;
      case 5: // left,up
        if (sx > -640 && sy > -512) {
          scope.stars[i].gfx.position.x--;
          scope.stars[i].gfx.position.y--;
        } else {
          remove = true;
        }
        break;
      case 6: // middle,up
        if (sy > -512) {
          scope.stars[i].gfx.position.y--;
        } else {
          remove = true;
        }
        break;
      case 7: // right,up
        if (sx < 640 && sy > -512) {
          scope.stars[i].gfx.position.x++;
          scope.stars[i].gfx.position.y--;
        } else {
          remove = true;
        }
        break;
    }
    if (remove === true) {
      var gfx = scope.stars[i].gfx;
      scope.stars.splice(i, 1);
      scope.display.removeChild(gfx);
      delete gfx;
    }
  }
}