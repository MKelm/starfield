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

// game element class
// not much content yet, just good to detect elements in display scenes to get layouts
// whith display objects

SF.Element = function(name, randomNamePrefix) {
  this.name = name || ((randomNamePrefix || "random") + Math.floor(Math.random() * 1000));
  // use pixi event target to handle display object interaction events
  // see -> https://github.com/MKelm/pixi.js/blob/dev/src/pixi/utils/EventTarget.js
  PIXI.EventTarget.call(this);
}

SF.Element.prototype.constructor = SF.Element;

// generic element function to handle events as event listener, expand in derevations
// use SF.Util.getEventListener to create callback functions with correct scope transfer
SF.Element.prototype.handleEvent = function(scope, event) {
}
