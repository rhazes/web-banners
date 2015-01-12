var minWinCount = 10;
var maxWinCount = 20;

function Building(left, top, wt, ht, color) {
  this.left = left;
  this.top = top;
  this.wt = wt;
  this.ht = ht; 
  this.color = color;
  this.buildWindows();
console.log(typeof (this.windows));

  this.draw = function () {
   fill(color);
   rect(this.left,this.top,this.wt,this.ht); 
//  console.log(this.windows.length()); 
   this.windows.forEach(function(el,ind,arr) {
	fill(el.winCol);
	rect(el.winX, el.winY,el.w, el.h);
	});
  };

}

Building.prototype.buildWindows = function() {
 this.windows = new Array();
 nAcross = int(random(minWinCount, maxWinCount)); 
 nHigh = int(random(minWinCount, maxWinCount)); 

console.log(nAcross, nHigh);
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


function drawRhazsign() {

  var cosinterp = cos(millis() * rate);
  var sininterp = abs(sin(millis() * rate));
  var imgx = map(cosinterp,-1.0,1.0,minSignX,maxSignX);
  var imgy = map(sininterp,0,1.0,50,0);

  fill(200,200,0,100);
  beginShape();
  vertex(imgx,imgy + 67.5);
  vertex(imgx + 158, imgy + 67.5);
  vertex(imgx + 79, imgy + 350);
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
var buildingHeightRange = [20,150];
var buildingDensities = [.1,1.0];
var meanWidths = [], meanHeights = [], meanDensity = [];
var meanWidth = 50.0;
var sdWidth = 10.0;


function preload() {
 shadow = loadImage("assets/bat-rhazes-02.png");
// shadow = loadImage("assets/bat-rhazes-alpha-02.png");
}


function setup() {
  createCanvas(900,300);
  building = new Building(50,90,50,200, [50,50,50] );
  noStroke();

  //initialize building dimensions by layers
  for(i=0; i<layers; i++) {
    var t = i/(layers-1.0);
    meanWidths.push(  lerp(buildingCountRange[0], buildingCountRange[1],t) );
    meanHeights.push( lerp(buildingHeightRange[0],buildingHeightRange[1],t) );
    meanDensity.push( lerp(buildingDensities[0],buildingDensities[1],t) );
  }
 
}


function draw() {
  background(0,0,50);
  building.draw(); 

  drawRhazsign();
}

function mouseClicked() {
  bWidth = randomGaussian(meanWidth,sdWidth);
  console.log("building width = " , bWidth);
  building.wt = max(20.0, bWidth);
  building.buildWindows();
  return false;
}

