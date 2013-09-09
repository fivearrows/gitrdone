//
// Units - estimation units
//
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

//
// Estimate - task and the associated estimate
//
function Estimate(dbid,name,qty,units,parent) {
   this.dbid=dbid;
   this.name=name;
   this.parent=parent;
   this.qty=qty;
   this.units=units;
}

Estimate.prototype= {
   dump: function() {
      return this.dbid + ': ' + this.name + ', ' + this.qty + ' ' + this.units.name +
         ' (' + this.units.to_hours(this.qty) + ' hours)';
   },

   addrow: function(tbl) {
      tb=$(tbl);
      tr=document.createElement('tr');
      td=document.createElement('td');
      td.innerText=this.dump();
      tr.appendChild(td);
      tb.appendChild(tr);
      tr.id='EstimateRow' + this.dbid;
   }
}

function toggle_subs(dbid) {
   var st=$('kids_'+dbid);
   var ind=$('toggle_'+dbid);
   st.toggle();
   if(st.visible()) {
      ind.innerHTML="-";
   } else {
      ind.innerHTML="+";
   }
}

function roll_up(dbid,idkey) {
    t=(0);
    v=$(dbid);
    p=v.parentElement;
//    kids=$$('#' + p.id + ' div.subtask input');
    kids=$$('#' + p.dbid + ' div.subtask span');
    for(i=0; i < kids.size(); i++) {
       kid=kids[i];
       if(kid.dbid.indexOf(idkey) >= 0) {
          alert(kid.innerHTML);
          t=t+parseFloat(kid.innerHTML);
       }
    }
    v.innerHTML=t;
}

function roll_up_old(dbid,idkey) {
    t=0;
    v=$(dbid);
    p=v.parentElement;
    kids=p.childElements();
    alert(kids);
    for (kid in kids) {
       if(kid.dbid) {
          if(kid.dbid.indexOf(idkey) >= 0) {
             t=t+kid.value.to_float();
	  }
       }
    }
    v.innerHTML=t;
}

function sum_kids(dbid) {
}
