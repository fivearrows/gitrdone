//---------------------------------------------------------------
// global variables and functions for units
//---------------------------------------------------------------
units = $H();
function createUnit(dbid,name,factor) {
   units.set(dbid,new Unit(dbid,name,factor));
}

//---------------------------------------------------------------
// Units - estimation units
//---------------------------------------------------------------
function Unit(dbid,name,factor) {
   this.dbid=dbid;
   this.name=name;
   this.factor=factor;
}

Unit.prototype = {
   to_hours: function(qty) {
      return this.factor * qty;
   },

   name: function() { return this.name; }
}

//---------------------------------------------------------------
//---------------------------------------------------------------
rows = $A();

function createEstimate(dbid,name,qty,unitid,parent,sequence,kids) {
  rows.push(new Estimate(dbid,name,qty,unitid,parent,sequence,kids));
}

function displayEstimateHierarchy(tb,spacer) {
   rows.filter(filter_toplevel).
   	sort(sort_by_sequence).
	each(function(row) {
	   row.addrow(tb,spacer);
	});
}

function redisplayEstimateHierarchy(tb,spacer) {
   var i=0;
   var x=tb.children.length;
   for(i=0; i<x; i++) {
      tb.deleteRow(0);
   }
   displayEstimateHierarchy(tb,spacer);
}

//---------------------------------------------------------------
// Estimate - task and the associated estimate
//---------------------------------------------------------------
function Estimate(dbid,name,qty,unitid,parent,sequence,kids) {
   this.dbid=dbid;
   this.name=name;
   this.parent=parent;
   this.qty=qty;
   this.units=units.get(unitid);
   this.kids=kids;
   this.sequence=sequence;
}

Estimate.prototype= {
   dump: function() {
      return this.dbid + ': ' + this.name + ', ' + this.qty + ' ' + this.units.name +
         ' (' + this.units.to_hours(this.qty) + ' hours)';
   },

   addrow: function(tbl,spacer,prefix,level) {
      var p = prefix ? (prefix+'.') : ''
      var l = level || 0;
      var tb=$(tbl);
      var tr=document.createElement('tr');
      var td=document.createElement('td');
      var s=document.createElement('span');
      var im=document.createElement('img');
      im.src=spacer.src;
      im.height=spacer.height;
      im.width=(l * 35);
      td.appendChild(im);
      s.innerText='('+l+'): '+ p + this.dump();
      td.appendChild(s);
      tr.appendChild(td);
      tb.appendChild(tr);
      tr.id='EstimateRow' + this.dbid;
      p=p+this.dbid;
      this.kids.each(function(kid) { 
         k=estimate_by_id(rows,kid);
	 if(k) {
            k.addrow(tbl,spacer,p,l+1);
	 }
      });
   },

   toplevel: function() {
      return(this.parent == 0);
   },

   addChild: function(dbid,name,qty,unitid,sequence) {
      createEstimate(dbid,name,qty,unitid,this.dbid,sequence,[]);
      this.kids.push(dbid);
   }
}

//---------------------------------------------------------------
// filtering / sorting functions
//---------------------------------------------------------------
function estimate_by_id(rows, a) {
   return rows.find(function(b) { return b.dbid == a; });
}

function sort_by_sequence(a,b) {
   return a.sequence - b.sequence ;
}

function filter_toplevel(a) {
   return a.toplevel();
}
