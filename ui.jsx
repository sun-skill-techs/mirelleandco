/* MIRELLE & CO — shared UI primitives */
const { useState, useEffect, useRef } = React;

/* ---- line icons (simple, stroked) ---- */
const ICONS = {
  search:'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm6 13 4 4',
  user:'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0',
  bag:'M6 8h12l1 12H5L6 8Zm3 0a3 3 0 0 1 6 0',
  heart:'M12 20s-7-4.6-7-9.3A3.7 3.7 0 0 1 12 8a3.7 3.7 0 0 1 7-.7C19 11.4 12 20 12 20Z',
  caret:'m6 9 6 6 6-6',
  close:'M6 6l12 12M18 6 6 18',
  minus:'M5 12h14',
  plus:'M12 5v14M5 12h14',
  arrow:'M4 12h15m-6-6 6 6-6 6',
  star:'M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9L12 3.5Z',
  shield:'M12 3 5 6v5c0 4.5 3 7.6 7 9 4-1.4 7-4.5 7-9V6l-7-3Zm-2.5 8.5 1.8 1.8 3.4-3.6',
  card:'M3 7h18v10H3V7Zm0 4h18M7 15h3',
  return:'M9 7 5 11l4 4M5 11h9a4 4 0 0 1 0 8h-2',
  truck:'M3 7h11v8H3V7Zm11 3h4l3 3v2h-7m-7 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  whatsapp:'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 7.021 2.91 9.83 9.83 0 0 1 2.9 7.026c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.061-1.59A11.9 11.9 0 0 0 12.05 24h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.484-8.414Z',
  insta:'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5-1.5a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z',
  facebook:'M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1Z',
  tiktok:'M14 3c.3 2.2 1.6 3.8 3.8 4v2.5c-1.3.1-2.6-.3-3.8-1v5.8a5.3 5.3 0 1 1-5.3-5.3c.3 0 .5 0 .8.1v2.7a2.6 2.6 0 1 0 1.8 2.5V3H14Z',
  pin:'M12 3a6 6 0 0 0-2 11.7V21l2-2 2 2v-6.3A6 6 0 0 0 12 3Z',
  image:'M4 5h16v14H4V5Zm0 10 5-5 4 4 3-3 4 4M9 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
  check:'M5 12l4 4 10-10',
  menu:'M4 7h16M4 12h16M4 17h16',
  ring:'M12 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2-4 2-2 2 2-2 2-2-2Z',
};
const FILLED = { heart:true, star:true, whatsapp:true };

function Icon({ name, className, style, filled }){
  const d = ICONS[name];
  const fill = filled ?? FILLED[name];
  return (
    React.createElement('svg',{
      className, style, viewBox:'0 0 24 24',
      fill: fill ? 'currentColor' : 'none',
      stroke: fill ? 'none' : 'currentColor',
      strokeWidth:1.5, strokeLinecap:'round', strokeLinejoin:'round',
      'aria-hidden':true,
    }, React.createElement('path',{ d }))
  );
}

/* ---- photo placeholder slot ---- */
function Slot({ tone='tone-cream', label, className='', children, src, alt='', loading='lazy' }){
  return (
    React.createElement('div',{ className:`slot ${tone} ${src?'has-image':''} ${className}` },
      src && React.createElement('img',{ src, alt, loading, decoding:'async' }),
      !src && label && React.createElement('div',{ className:'slot-label' },
        React.createElement(Icon,{ name:'image', className:'ico' }),
        React.createElement('span',null,label)
      ),
      children
    )
  );
}

/* ---- heart divider rule ---- */
function HeartRule(){
  return React.createElement('div',{ className:'heart-rule' },
    React.createElement(Icon,{ name:'heart' }));
}

/* ---- scroll reveal hook ---- */
function useReveal(){
  useEffect(()=>{
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
    },{ threshold:.12 });
    els.forEach(el=>io.observe(el));
    return ()=>io.disconnect();
  });
}

Object.assign(window,{ Icon, Slot, HeartRule, useReveal });
