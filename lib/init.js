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

// global sbx object initialization
var sf = sf || {};

$(document).ready(function() {
  global.setTimeout(function() {
    //try {
      sf.util = new SF.Util();

      sf.version = new SF.Version();
      sf.version.updateHashesFile(); // for maintainer

      sf.userConfig = sf.util.loadJSON('./user/data/config.json');
      sf.intervals = {};
      sf.pixi = new SF.Pixi();

      sf.starfield = new SF.Starfield();

      // add/start the pixi renderer
      document.body.appendChild(sf.pixi.renderer.view);
      requestAnimFrame(sf.pixi.animate.curry(sf.pixi));

      sf.pixi.loadAssets(function() { sf.starfield.start(); });

    //} catch (err) {
      //console.log(err);
    //}
  }, 0.00000001); // use timeout to detect fullscreen size correctly
});
