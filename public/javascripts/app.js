//---------------------------------------------------------------
// global variables and functions for units
//---------------------------------------------------------------
units = $H();
function createUnit(dbid,name,factor) {
   units.set(dbid,new Unit(dbid,name,factor));
}

//---------------------------------------------------------------
// callbacks
//---------------------------------------------------------------
function rowChanged(est) {
   est.row.addClassName("changed");
   if(est.units.dbid != est.unitSelect.options[est.unitSelect.selectedIndex].value) {
      est.unitid=est.unitSelect.options[est.unitSelect.selectedIndex].value;
      est.units=units.get(est.unitid);
   }
   if(est.qtyfield) {
      est.qty=$F(est.qtyfield);
   }
   est.updateHours();
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

   name: function() { return this.name; },
   dbid: function() { return this.dbid; },
   factor: function() { return this.factor; }
}

//---------------------------------------------------------------
//---------------------------------------------------------------
rows = $H();

function createEstimate(dbid,name,qty,unitid,parent,sequence,kids) {
  rows.set(dbid,new Estimate(dbid,name,qty,unitid,parent,sequence,kids));
}

function displayEstimateHierarchy(tb,spacer) {
   rows.toArray().map(function(a) { return a[1] }).filter(filter_toplevel).
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
   this.unitid=unitid;
   this.units=units.get(unitid);
   this.kids=kids;
   this.sequence=sequence;
}

Estimate.prototype= {
   dump: function() {
      return this.dbid + ': ' + this.name + ', ' + this.qty + ' ' + this.units.name +
         ' (' + this.units.to_hours(this.qty) + ' hours)';
   },

   display: function() {
      return this.name + ', ' + this.qty + ' ' + this.units.name +
         ' (' + this.units.to_hours(this.qty) + ' hours)';
   },

   addrow: function(tbl,spacer,prefix,level) {
      var p = prefix ? (prefix+'.') : ''
      var l = level || 0;
      var tb=$(tbl);
      var tr=document.createElement('tr');
      var td=document.createElement('td');
      var im=document.createElement('img');
      var n;

      im.src=spacer.src;
      im.height=spacer.height;
      im.width=(l * 35)+5;
      td.appendChild(im);

      n=document.createElement("span");
      n.innerText=this.name+", ";
      td.appendChild(n);

      if(this.kids.size() == 0) {
         n=document.createElement("input");
         n.size=8;
         n.value=this.qty;
         n.onchange=rowChanged.bind(n,this);
         this.qtyfield=n;
         td.appendChild(n);
         n=document.createElement("select");
         units.keys().each(function(u) {
            uu=units.get(u);
            n.add(new Option(uu.name, uu.dbid));
         });
         n.selectedIndex=this.unitid;
         n.onchange=rowChanged.bind(n,this);
         this.unitSelect=n;
         td.appendChild(n);
         n=document.createElement("span");
         n.innerText=" (";
         td.appendChild(n);
         n=document.createElement("span");
         this.hoursOut=n;
         td.appendChild(n);
         n=document.createElement("span");
         n.innerText=" hours)";
         td.appendChild(n);
      } else {
         n=document.createElement("span")
	 this.hoursOut=n;
	 td.appendChild(n);
	 n=document.createElement("span");
	 n.innerText=" Hours";
	 td.appendChild(n);
      }
      this.updateHours();

      this.row=tr;
      tr.appendChild(td);
      tb.appendChild(tr);
      tr.id='EstimateRow' + this.dbid;
      this.kids.each(function(kid) { 
         k=rows.get(kid);
	 if(k) {
            k.addrow(tbl,spacer,p,l+1);
	 }
      });
   },

   calculateHours: function() {
      var thrs;

      if(this.kids.size() == 0) {
	 thrs=this.units.to_hours(this.qty);
      } else {
         thrs=0;
	 this.kids.each(function(kid) {
	    k=rows.get(kid);
	    if(k) {
	       thrs += k.calculateHours();
	    }
	 });
      }
      return thrs;
   },
   
   updateHours: function() {
      this.hoursOut.innerText=this.calculateHours();

      if(this.parent != 0) {
         p=rows.get(this.parent);
	 if(p) {
	    p.updateHours();
	 }
      }
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
function sort_by_sequence(a,b) {
   return a.sequence - b.sequence ;
}

function filter_toplevel(a) {
   return a.toplevel();
}
