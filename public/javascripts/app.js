function Estimate(id,name,hours,parent) {
   this.id=id;
   this.name=name;
   this.parent=parent;
   this.qty=hours;
   this.units='hours';
}

Estimate.prototype= {
   dump: function() {
      return this.id + ': ' + this.name + ', ' + this.qty + ' ' + this.units;
   }
}

function toggle_subs(id) {
   var st=$('kids_'+id);
   var ind=$('toggle_'+id);
   st.toggle();
   if(st.visible()) {
      ind.innerHTML="-";
   } else {
      ind.innerHTML="+";
   }
}

function roll_up(id,idkey) {
    t=(0);
    v=$(id);
    p=v.parentElement;
//    kids=$$('#' + p.id + ' div.subtask input');
    kids=$$('#' + p.id + ' div.subtask span');
    for(i=0; i < kids.size(); i++) {
       kid=kids[i];
       if(kid.id.indexOf(idkey) >= 0) {
          alert(kid.innerHTML);
          t=t+parseFloat(kid.innerHTML);
       }
    }
    v.innerHTML=t;
}

function roll_up_old(id,idkey) {
    t=0;
    v=$(id);
    p=v.parentElement;
    kids=p.childElements();
    alert(kids);
    for (kid in kids) {
       if(kid.id) {
          if(kid.id.indexOf(idkey) >= 0) {
             t=t+kid.value.to_float();
	  }
       }
    }
    v.innerHTML=t;
}

function sum_kids(id) {
}
