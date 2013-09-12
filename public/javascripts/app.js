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
   est.dirty=1;
   if(est.units.dbid != est.unitSelect.options[est.unitSelect.selectedIndex].value) {
      est.unitid=est.unitSelect.options[est.unitSelect.selectedIndex].value;
      est.units=units.get(est.unitid);
   }
   if(est.qtyfield) {
      est.qty=$F(est.qtyfield);
   }
   est.updateHours();
}

function saveChanges(status) {
   // save
   clearChanges(status, "Saved");
}

function revertChanges(status) {
   // revert
   clearChanges(status, "Reverted");
}

function clearChanges(status, message) {
   s=$(status);
   rows.keys().each(function(k) {
      est=rows.get(k);
      if(est && est.dirty) {
         est.row.removeClassName("changed");
      }
   });
   s.innerText=message;
   s.addClassName("notice");
   s.show();
   s.fade.bind(s).delay(3);
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
   rows.toArray().map( function(a) { return a[1] }).filter(filter_toplevel).
   	sort(sort_by_sequence).
	each(function(row) {
	   row && row.addrow(tb,spacer);
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
   editFormat: new Template(
      "<img>" +
      "#{name}, " +
      "<input size='8' value='#{qty}'> " +
      "<select></select>" +
      " (<span></span> Hours)"
   ),

   displayFormat: new Template(
      "<img>" +
      "#{name}, " +
      "<span></span> Hours"
   ),

   dump: function() {
      return this.dbid + ': ' + this.name + ', ' + this.qty + ' ' + this.units.name +
         ' (' + this.units.to_hours(this.qty) + ' hours)';
   },

   display: function() {
      return this.name + ', ' + this.qty + ' ' + this.units.name +
         ' (' + this.units.to_hours(this.qty) + ' hours)';
   },

   addrow: function(tbl,spacer,prefix,level) {
      var l = level || 0;
      var tb=$(tbl);
      var tr=document.createElement('tr');
      var td=document.createElement('td');
      var im;
      var n;

      if(this.kids.size() == 0) {
         n=this.editFormat.evaluate(this);
	 td.update(n);

	 // qty input
	 this.qtyfield=td.down("input");
         this.qtyfield.onchange=rowChanged.bind(this.qtyfield,this);

	 // qty units
	 this.unitSelect=td.down("select");
         units.keys().each(function(u) {
            uu=units.get(u);
            this.unitSelect.add(new Option(uu.name, uu.dbid));
         }.bind(this));
         this.unitSelect.selectedIndex=this.unitid;
         this.unitSelect.onchange=rowChanged.bind(n,this);

	 // calculated hours
         this.hoursOut=td.down("span");
      } else {
         n=this.displayFormat.evaluate(this);
	 Element.update(td,n);
	 this.hoursOut=td.down("span");
      }

      // format image
      im=td.down("img");
      im.src=spacer.src;
      im.height=spacer.height;
      im.width=(l * 35)+5;
      this.updateHours();

      this.row=tr;
      tr.appendChild(td);
      tb.appendChild(tr);
      tr.id='EstimateRow' + this.dbid;
      this.kids.each(function(kid) { 
         k=rows.get(kid);
	 if(k) {
            k.addrow(tbl,spacer,"",l+1);
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
      this.hoursOut.update(this.calculateHours());

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
