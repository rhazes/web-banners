"use strict";
var minWinCount = 10;
var maxWinCount = 20;
var bLayer;

var Building =  {
		  l : 0,
		  t : 0,
		  w : 20,
		  h : 70, 
		  color : [100,100,100],

		  draw : function() {
			   fill(this.color);
			   rect(this.l,this.t,this.w,this.h); }};

var windowProb  = 0.6;

function buildWindows( bldg ) {
	 bldg.windows = [];
	 var nAcross = int(random(10, 20)); 
	 var nHigh = int(random(10, 20)); 

	 //total window width is half the width of the building
	 var winWd =  bldg.w / (2.0 * nAcross ) ;
	 //total window height is half the height of the building
	 var winHt = bldg.h / (2.0 * nHigh );

	 //a little spacing from the edge of the building
	 var x = bldg.l + (1.0 / (2.0 * nAcross) );
	 var y = bldg.t + winHt;
 
	 for(var i=0; i < nAcross; i++) {
	    for(var j=0; j < nHigh; j++) {
   		if(random() < windowProb ) {
		bldg.windows.push( {
			x: x + (i * winWd * 2.0),
			y: y + (j * winHt * 2.0),
			w: winWd,
			h: winHt,
		 	col: 255} );
		}
	    }
	  }
};

function buildBuilding(left, top, aWidth, aHeight, aColor) {
  var b = Object.create(Building);
  b.l = left;
  b.t = top;
  b.w = aWidth;
  b.h = aHeight;
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
var imgx = 400;
var imgy = 100; 
function drawRhazsign() {

  var cosinterp = cos(millis() * rate);
  var sininterp = abs(sin(millis() * rate));
//  var imgx = map(cosinterp,-1.0,1.0,minSignX,maxSignX);
//  var imgy = map(sininterp,0,1.0,50,0);
//  imgx = 400; imgy = 200;
  fill(200,200,0,100);
  beginShape();
  vertex(imgx,imgy + 67.5);
  vertex(imgx + 158, imgy + 67.5);
  vertex(-30, height - 30);
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
var buildingCountRange = [40,20];
var buildingHeightRange = [30,100];
var buildingDensities = [.1,.9];
var meanWidths = [], meanHeights = [], meanDensity = [];
var meanWidth = 50.0;
var sdWidth = 10.0;

var buildings = [];

function preload() {
// shadow = loadImage("assets/bat-rhazes-02.png");
 shadow = loadImage("assets/bat-rhazes-alpha-02.png");
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
  var baseline = height;
  for(var i=0; i<7; i++) {
    var pos = 0;
    while(pos < width) {
      var bw =  random(.9*meanWidths[i],1.1*meanWidths[i]);
      var bh =  random(.7*meanHeights[i],1.3*meanHeights[i]);
	var bldg = buildBuilding(pos, baseline-bh,bw,bh, random(0,90)); 
	pos += bldg.w; 
 	var shouldAdd = random();
	if(shouldAdd > meanDensity[i]) {
	      buildings.push(bldg);
	}
    }

    
  }
  bLayer = createGraphics(width,height);
    bLayer.background(255);
    bLayer.noStroke();
    for(var i=buildings.length-1; i >= 0; i--) {
		var b = buildings[i];
		bLayer.fill(b.color);
	 	bLayer.rect(b.l,b.t,b.w,b.h);
	        bLayer.fill(255);
		for(var j=0; j < b.windows.length; ++j) {
		   bLayer.rect(b.windows[j].x, b.windows[j].y, b.windows[j].w, b.windows[j].h);
		}
    }
 }

function draw() {
  background(255);
  image(bLayer,0,0);
  drawRhazsign(); 
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

