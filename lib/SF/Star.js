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

SF.Star = function(x, y, size, velocity) {
  SF.Element.call(this, "star", false);

  this.x = x;
  this.y = y;
  this.size = size;
  this.velocity = velocity;

  this.gfx = null;
}

SF.Star.prototype = Object.create(SF.Element.prototype);
SF.Star.prototype.constructor = SF.Star;