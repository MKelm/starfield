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
  if (scope.stars.length < 10) {
    var gfx = new PIXI.Graphics();
    gfx.position.x = 0;
    gfx.position.y = 0;
    gfx.beginFill("0xFFFFFF");
    gfx.drawRect(-1, -1, 2, 2);
    var direction = Math.floor(Math.random() * 8);
    scope.stars.push({ direction: direction, gfx: gfx });
    scope.display.addChild(gfx);
  }
  for (var i = 0; i < scope.stars.length; i++) {
    switch (scope.stars[i].direction) {
      case 0: // left,bottom
        scope.stars[i].gfx.position.x--;
        scope.stars[i].gfx.position.y++;
        break;
      case 1: // middle,bottom
        scope.stars[i].gfx.position.y++;
        break;
      case 2: // right,bottom
        scope.stars[i].gfx.position.x++;
        scope.stars[i].gfx.position.y++;
        break;
      case 3: // left,middle
        scope.stars[i].gfx.position.x--;
        break;
      case 4: // right,middle
        scope.stars[i].gfx.position.x++;
        break;
      case 5: // left,top
        scope.stars[i].gfx.position.x--;
        scope.stars[i].gfx.position.y--;
        break;
      case 6: // middle,top
        scope.stars[i].gfx.position.y--;
        break;
      case 7: // right,top
        scope.stars[i].gfx.position.x++;
        scope.stars[i].gfx.position.y--;
        break;
    }
  }
}