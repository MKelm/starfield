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

SF.Star = function(x, y, z, size) {
  SF.Element.call(this, "star", false);

  this.x = x;
  this.y = y;
  this.z = this.maxDepth = z;

  var xcoeff = this.x > 0 ? 1 : -1;
  var ycoeff = this.y > 0 ? 1 : -1;

  if (Math.abs(this.x) > Math.abs(this.y)) {
    this.dx = 1.0;
    this.dy = Math.abs(this.y / this.x);
  } else {
    this.dx = Math.abs(this.x / this.y);
    this.dy = 1.0;
  }

  this.dx *= xcoeff;
  this.dy *= ycoeff;
  this.dz = -1;

  this.ddx = .1 * this.dx;
  this.ddy = .1 * this.dy;

  this.size = this.originalSize = size;

  this.gfx = null;
}

SF.Star.prototype = Object.create(SF.Element.prototype);
SF.Star.prototype.constructor = SF.Star;

SF.Star.prototype.setGfx = function() {
  var result = 0;
  if (this.gfx === null) {
    this.gfx = new PIXI.Graphics();
    this.gfx.beginFill("0xFFFFFF");
    this.gfx.drawRect(this.x, this.y, this.size, this.size);
  } else {
    this.gfx.position = { x: this.x, y: this.y };
    result = 1;
  }
  return result;
}

SF.Star.prototype.move = function() {
  this.x += this.dx;
  this.y += this.dy;
  this.z += this.dz;

  this.dx += this.ddx;
  this.dy += this.ddy;

  this.size = this.originalSize + ((this.maxDepth - this.z) * .1);
}
