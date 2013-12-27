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

SF.Starfield = function() {
  SF.Element.call(this, "run", false);

  this.display = null;

  this.stars = [];
  this.numStars = 200;

  this.intervalId = 0;

  this.width = 1280;
  this.height = 1024;

  this.originX = this.width / 2;
  this.originY = this.height / 2;
}

SF.Starfield.prototype = Object.create(SF.Element.prototype);
SF.Starfield.prototype.constructor = SF.Starfield;

SF.Starfield.prototype.initDisplay = function() {
  this.display = new PIXI.DisplayObjectContainer();
  this.display.position = {x: sf.pixi.screen.width/2, y: sf.pixi.screen.height/2 };
  this.display.scale = {x: sf.pixi.screen.ratio, y: sf.pixi.screen.ratio};
  sf.pixi.stage.addChild(this.display);
}

SF.Starfield.prototype.start = function() {
  this.initDisplay();

  for (var i = 0; i < this.numStars; i++) {
    this.createStar(i);
  }

  var scope = this;
  this.intervalId = setInterval(function() {
    scope.update();
    scope.draw();
  }, 1000 / (sf.userConfig.fps || 30));
}

SF.Starfield.prototype.createStar = function(i) {
  this.stars[i] = new SF.Star(
    Math.random() * this.width - this.originX,
    Math.random() * this.height - this.originY,
    Math.max(this.width, this.height),
    Math.random()*6+3
  );
}

SF.Starfield.prototype.update = function() {
  for (var i = 0; i < this.stars.length; i++) {
    this.stars[i].move();
    if (this.stars[i].x > Math.abs(this.originX) ||
        this.stars[i].y > Math.abs(this.originY)) {
      if (this.stars[i].gfx !== null) {
        this.display.removeChild(this.stars[i].gfx);
      }
      this.createStar(i);
    }
  }
}

SF.Starfield.prototype.draw = function() {
  for (var i = 0; i < this.stars.length; i++) {
    var result = this.stars[i].setGfx();
    if (result === 0) {
      this.display.addChild(this.stars[i].gfx);
    }
  }
}