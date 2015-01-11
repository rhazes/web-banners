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
   rect(left,top,wt,ht); 
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

var building;

function setup() {
  createCanvas(900,300);
  building = new Building(50,90,50,200, [50,50,50] );
  noStroke();
}


function draw() {
  background(0,0,50);
  building.draw(); 
}

function drawBuilding(left, top, wt, ht, color) {
}

