(function(){
  var root=document.documentElement;
  /* Draft notes toggle */
  var t=document.getElementById('toggleNotes');
  if(t)t.addEventListener('click',function(){
    var on=root.classList.toggle('hide-notes');
    t.textContent=on?'Show draft notes':'Hide draft notes';
    t.setAttribute('aria-pressed',on?'true':'false');
  });
  /* Mobile menu */
  var mb=document.getElementById('menuBtn'), nv=document.getElementById('mainnav');
  if(mb)mb.addEventListener('click',function(){var o=nv.classList.toggle('open');mb.setAttribute('aria-expanded',o?'true':'false');});
  /* Programs dropdown */
  document.querySelectorAll('.dd').forEach(function(dd){
    var b=dd.querySelector('.dd-btn');
    b.addEventListener('click',function(e){e.stopPropagation();var o=dd.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
  });
  document.addEventListener('click',function(e){
    document.querySelectorAll('.dd.open').forEach(function(dd){if(!dd.contains(e.target)){dd.classList.remove('open');dd.querySelector('.dd-btn').setAttribute('aria-expanded','false');}});
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape')document.querySelectorAll('.dd.open').forEach(function(dd){dd.classList.remove('open');dd.querySelector('.dd-btn').setAttribute('aria-expanded','false');});});

  /* Trial form (draft only) */
  var f=document.getElementById('trial');
  if(f){
    var age=document.getElementById('age-wrap'), msg=document.getElementById('form-msg');
    f.addEventListener('change',function(e){if(e.target.name==='who'){age.hidden=(e.target.value==='me');}});
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var miss=['f-name','f-phone','f-email'].filter(function(id){return !document.getElementById(id).value.trim();});
      msg.hidden=false;
      if(miss.length){msg.textContent='Please add your name, phone and email.';document.getElementById(miss[0]).focus();return;}
      msg.textContent='Draft only: on the live site this books your free class and sends you a text.';
    });
    var q=new URLSearchParams(location.search).get('program');
    if(q&&window.GF_PROGRAMS&&GF_PROGRAMS[q]){var sel=document.getElementById('f-prog');[].forEach.call(sel.options,function(o){if(o.text.indexOf(GF_PROGRAMS[q].name)===0)sel.value=o.value||o.text;});}
  }

  /* Schedule, rendered from schedule-data.js */
  var S=window.GF_SCHEDULE||[], PR=window.GF_PROGRAMS||{};
  var DAYS=[['Mon','Monday'],['Tue','Tuesday'],['Wed','Wednesday'],['Thu','Thursday'],['Fri','Friday'],['Sat','Saturday'],['Sun','Sunday']];
  function mins(t){var m=/(\d+):(\d+)\s*(AM|PM)/i.exec(t||'');if(!m)return 0;var h=+m[1]%12;if(/pm/i.test(m[3]))h+=12;return h*60+(+m[2]);}
  function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function item(c){
    var p=PR[c.program]||{name:c.program,ages:'',page:'#',group:''};
    return '<a class="cls '+p.group+'" href="'+p.page+'"><span class="cls-t">'+esc(c.start)+(c.end?' – '+esc(c.end):'')+'</span><b>'+esc(p.name)+'</b><span class="cls-a">'+esc(p.ages)+(c.note?' · '+esc(c.note):'')+'</span></a>';
  }
  var note=document.getElementById('sampleNote'); if(note&&window.GF_SCHEDULE_IS_SAMPLE)note.hidden=false;
  var wk=document.getElementById('schedule');
  function renderWeek(filter){
    if(!wk)return;
    wk.innerHTML=DAYS.map(function(d){
      var list=S.filter(function(c){return c.day===d[0]&&(filter==='all'||(PR[c.program]||{}).group===filter);}).sort(function(a,b){return mins(a.start)-mins(b.start);});
      return '<div class="day"><h3>'+d[1]+'</h3>'+(list.length?list.map(item).join(''):'<p class="none">No classes</p>')+'</div>';
    }).join('');
  }
  renderWeek('all');
  document.querySelectorAll('.fchip').forEach(function(b){
    b.addEventListener('click',function(){
      document.querySelectorAll('.fchip').forEach(function(x){x.setAttribute('aria-pressed','false');});
      b.setAttribute('aria-pressed','true');renderWeek(b.getAttribute('data-f'));
    });
  });
  document.querySelectorAll('.sched-mini').forEach(function(el){
    var id=el.getAttribute('data-program');
    var list=S.filter(function(c){return c.program===id;}).sort(function(a,b){return DAYS.findIndex(function(d){return d[0]===a.day;})-DAYS.findIndex(function(d){return d[0]===b.day;})||mins(a.start)-mins(b.start);});
    el.innerHTML=(window.GF_SCHEDULE_IS_SAMPLE?'<p class="sample-note"><b>Sample times.</b> Real schedule coming from G-Force.</p>':'')+
      (list.length?'<ul class="mini">'+list.map(function(c){var dn=DAYS.filter(function(d){return d[0]===c.day;})[0];return '<li><b>'+(dn?dn[1]:c.day)+'</b><span>'+esc(c.start)+' – '+esc(c.end)+(c.note?' · '+esc(c.note):'')+'</span></li>';}).join('')+'</ul>':'<p>Class times coming soon.</p>');
  });
})();
