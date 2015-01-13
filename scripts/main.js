"use strict";
var minWinCount = 5;
var maxWinCount = 8;

var Building =  {
		  lt : 0,
		  tp : 0,
		  wd : 20,
		  ht : 70, 
		  color : [100,100,100],

		  draw : function() {
			   fill(this.color);
			   rect(this.lt,this.tp,this.wd,this.ht); }};


function buildWindows( bldg ) {
	 bldg.windows = [];
	 var nAcross = int(random(10, 20)); 
	 var nHigh = int(random(10, 20)); 

	 //total window width is half the width of the building
	 var winWd =  bldg.wd / (2.0 * nAcross ) ;
	 //total window height is half the height of the building
	 var winHt = bldg.ht / (2.0 * nHigh );

	 //a little spacing from the edge of the building
	 var x = bldg.lt + (1.0 / (2.0 * nAcross) );
	 var y = bldg.tp + winHt;
 
	 for(var i=0; i < nAcross; i++) {
	    for(var j=0; j < nHigh; j++) {
		bldg.windows.push( {
			x: x + (i * winWd * 2.0),
			y: y + (j * winHt * 2.0),
			w: winWd,
			h: winHt,
		 	col: 255} );
	    }
	  }
};

function buildBuilding(left, top, aWidth, aHeight, aColor) {
  var b = Object.create(Building);
  b.lt = left;
  b.tp = top;
  b.wd = aWidth;
  b.ht = aHeight;
  b.color = aColor;
  buildWindows(b);
//  b.draw();
  return b;
}


/*
Building.prototype.buildWindows = function() {
 this.windows = new Array();
 nAcross = int(random(minWinCount, maxWinCount)); 
 nHigh = int(random(minWinCount, maxWinCount)); 

//console.log(nAcross, nHigh);
 //total window width is half the width of the building
 wWt = this.wt / (2.0 * nAcross ) ;
 //total window height is half the height of the building
 wHt = this.ht / (2.0 * nHigh );
 
 //a little spacing from the edge of the building
 var x = this.left + (1.0 / (2.0 * nAcross) );
 var y = this.top + wHt;
 
 for(i=0; i < nAcross; i++) {
    for( j=0; j < nHigh; j++) {
	this.windows.push( {
			winX: x + (i * wWt * 2.0),
			winY: y + (j * wHt * 2.0),
			w: wWt,
			h: wHt,
		 	winCol: 255} );
    }
  }
};
*/

function drawRhazsign() {

  var cosinterp = cos(millis() * rate);
  var sininterp = abs(sin(millis() * rate));
  var imgx = map(cosinterp,-1.0,1.0,minSignX,maxSignX);
  var imgy = map(sininterp,0,1.0,50,0);

  fill(200,200,0,100);
  beginShape();
  vertex(imgx,imgy + 67.5);
  vertex(imgx + 158, imgy + 67.5);
  vertex(imgx + 79, imgy + 200);
  endShape(CLOSE);

  image(shadow,imgx,imgy);
}

var rate = .0002;
var building;
var shadow;
var signRate = 400;
var minSignX = 0;
var maxSignX = 800;

var layers = 6;
var buildingCountRange = [50,20];
var buildingHeightRange = [50,150];
var buildingDensities = [.1,1.0];
var meanWidths = [], meanHeights = [], meanDensity = [];
var meanWidth = 50.0;
var sdWidth = 10.0;

var buildings = [];

function preload() {
// shadow = loadImage("assets/bat-rhazes-02.png");
// shadow = loadImage("assets/bat-rhazes-alpha-02.png");
}


function setup() {
  createCanvas(900,300);
  building = buildBuilding(50,90,50,200,[50,50,50]); //new Building(50,90,50,200, [50,50,50] );
  noStroke();

  //initialize building dimensions by layers
  for(var i=0; i<layers; i++) {
    var t = i/(layers-1.0);
    meanWidths.push(  lerp(width/buildingCountRange[0], width/buildingCountRange[1],t) );
    meanHeights.push( lerp(buildingHeightRange[0],buildingHeightRange[1],t) );
    meanDensity.push( lerp(buildingDensities[0],buildingDensities[1],t) );
  }
  var baseline = height-80;
///* 
  for(var i=0; i<1; i++) {
    var pos = 0;
    var ind = 0;
    while(pos < width) {
//      var bw = randomGaussian(meanWidths[i], .20*meanWidths[i]);
      var bw =  random(.7*meanWidths[i],1.3*meanWidths[i]);
      var bh =  random(.7*meanHeights[i],1.3*meanHeights[i]);
//     var bh = randomGaussian(meanHeights[i], .20*meanHeights[i]);
      buildings[ind] = buildBuilding(pos, baseline-bh,bw,bh, [100,100,100]);

      pos += buildings[ind].wd; 
      ind++;
    }
  }
 //*/
}

function draw() {
  background(255);
  for(var i=0; i < buildings.length; ++i) {
    buildings[i].draw();
    for(var j=0; j < buildings[i].windows.length; ++j) {
        fill([255,0,0]);
	rect(buildings[i].windows[j].x,
	     buildings[i].windows[j].y,
	     buildings[i].windows[j].w,
	     buildings[i].windows[j].h);
    }
  } 
// building.draw(); 

 // drawRhazsign();
}

function mouseClicked() {
  bWidth = randomGaussian(meanWidth,sdWidth);
  console.log("building width = " , bWidth);
  building.wt = max(20.0, bWidth);
  building.buildWindows();
  return false;
}

