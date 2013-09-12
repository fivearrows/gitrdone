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
function Estimate(dbid,name,qty,units,parent,sequence,kids) {
   this.dbid=dbid;
   this.name=name;
   this.parent=parent;
   this.qty=qty;
   this.units=units;
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
   }
}

function estimate_by_id(rows, a) {
   return rows.find(function(b) { return b.dbid == a; });
}

function sort_by_sequence(a,b) {
   return a.sequence - b.sequence ;
}

function filter_toplevel(a) {
   return a.toplevel();
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
