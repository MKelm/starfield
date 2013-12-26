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

  this.minVelocity = 15;
  this.maxVelocity = 30;

  this.stars = 100;
  this.intervalId = 0;

  this.width = 1280;
  this.height = 1024;
}

SF.Starfield.prototype = Object.create(SF.Element.prototype);
SF.Starfield.prototype.constructor = SF.Starfield;

SF.Starfield.prototype.initDisplay = function() {
  this.display = new PIXI.DisplayObjectContainer();
  this.display.pivot = {x: 0.5, y: 0.5 };
  this.display.position = {x: sf.pixi.screen.width/2, y: sf.pixi.screen.height/2 };

  this.display.scale = {x: sf.pixi.screen.ratio, y: sf.pixi.screen.ratio};
  sf.pixi.stage.addChild(this.display);
}

SF.Starfield.prototype.start = function() {
  this.initDisplay();

  var stars = [];
  for(var i=0; i<this.stars; i++) {
    stars[i] = new SF.Star(
      this.width/2 - Math.random()*this.width,
      this.height/2 - Math.random()*this.height,
      Math.random()*3+1,
      (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity
    );
  }
  this.stars = stars;

  var scope = this;
  this.intervalId = setInterval(function() {
    scope.update();
    scope.draw();
  }, 1000 / (sf.userConfig.fps || 30));
}

SF.Starfield.prototype.update = function() {
  var dt = 1 / (sf.userConfig.fps || 30);
  for (var i = 0; i < this.stars.length; i++) {
    var star = this.stars[i];
    star.y += dt * star.velocity;
    if (star.y > this.height/2) {
      this.stars[i] = new SF.Star(
        this.width/2 - Math.random()*this.width,
        -1 * this.height / 2,
        Math.random()*3+1,
        (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity
      );
    }
  }
}

SF.Starfield.prototype.draw = function() {
  var gfx = null, star = null;
  for (var i = 0; i < this.stars.length; i++) {
    star = this.stars[i];
    if (star.gfx === null) {
      gfx = new PIXI.Graphics();
      gfx.beginFill("0xFFFFFF");
      gfx.drawRect(star.x, star.y, star.size, star.size);
      this.display.addChild(gfx);
      this.stars[i].gfx = gfx;
    } else {
      this.stars[i].gfx.position.x = star.x;
      this.stars[i].gfx.position.y = star.y;
    }
  }
}