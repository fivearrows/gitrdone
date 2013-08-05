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
