/* MIRELLE & CO — overlays: cart, whatsapp, mobile menu, search */

const FREE_SHIP = 1500; // ZAR threshold
function priceNum(str){ return parseInt(String(str).replace(/[^\d]/g,''),10)||0; }
function fmt(n){ return 'R ' + n.toLocaleString('en-ZA').replace(/,/g,' '); }

/* ============== CART DRAWER ============== */
function CartDrawer({ open, items, onClose, onQty, onRemove }){
  const subtotal = items.reduce((s,it)=>s + priceNum(it.price)*it.qty, 0);
  const remain = Math.max(0, FREE_SHIP - subtotal);
  const pct = Math.min(100, (subtotal/FREE_SHIP)*100);
  return React.createElement(React.Fragment,null,
    React.createElement('div',{ className:`overlay ${open?'open':''}`, onClick:onClose }),
    React.createElement('aside',{ className:`drawer ${open?'open':''}`, 'aria-hidden':!open },
      React.createElement('div',{ className:'drawer-head' },
        React.createElement('h3',null,'Your Bag',items.length>0 && React.createElement('span',{ style:{fontFamily:'var(--sans)',fontSize:'.8rem',color:'var(--ink-soft)',marginLeft:8} },`(${items.reduce((s,i)=>s+i.qty,0)})`)),
        React.createElement('button',{ className:'drawer-close', onClick:onClose, 'aria-label':'Close' }, React.createElement(Icon,{ name:'close' })),
      ),
      items.length>0 && React.createElement('div',{ className:'ship-bar' },
        remain>0
          ? React.createElement('span',null,'You\'re ',React.createElement('b',null,fmt(remain)),' away from ',React.createElement('b',null,'free shipping'))
          : React.createElement('span',null,'🎉 You\'ve unlocked ',React.createElement('b',null,'free shipping!')),
        React.createElement('div',{ className:'track' }, React.createElement('div',{ className:'fill', style:{width:pct+'%'} })),
      ),
      React.createElement('div',{ className:'drawer-body' },
        items.length===0
          ? React.createElement('div',{ className:'cart-empty' },
              React.createElement(Icon,{ name:'bag', style:{width:42,height:42,color:'var(--taupe)'} }),
              React.createElement('div',{ className:'serif' },'Your bag is empty'),
              React.createElement('p',{ className:'muted', style:{maxWidth:240,fontSize:'.86rem'} },'Discover timeless pieces, designed for modern romance.'),
              React.createElement('button',{ className:'btn btn-solid', onClick:onClose },'Start Shopping'),
            )
          : items.map(it=>
              React.createElement('div',{ key:it.id, className:'cart-line' },
                React.createElement('div',{ className:'thumb' }, React.createElement(Slot,{ tone:it.tone })),
                React.createElement('div',null,
                  React.createElement('div',{ className:'cl-name' }, it.name),
                  React.createElement('div',{ className:'cl-mat' }, it.mat),
                  React.createElement('div',{ className:'qty' },
                    React.createElement('button',{ onClick:()=>onQty(it.id,-1) }, React.createElement(Icon,{ name:'minus', style:{width:14,height:14} })),
                    React.createElement('span',null,it.qty),
                    React.createElement('button',{ onClick:()=>onQty(it.id,1) }, React.createElement(Icon,{ name:'plus', style:{width:14,height:14} })),
                  ),
                ),
                React.createElement('div',{ className:'cl-right' },
                  React.createElement('div',{ className:'cl-price' }, fmt(priceNum(it.price)*it.qty)),
                  React.createElement('button',{ className:'cl-remove', onClick:()=>onRemove(it.id) },'Remove'),
                ),
              )
            ),
      ),
      items.length>0 && React.createElement('div',{ className:'drawer-foot' },
        React.createElement('div',{ className:'subtotal' },
          React.createElement('span',{ className:'lbl' },'Subtotal'),
          React.createElement('span',{ className:'val' }, fmt(subtotal)),
        ),
        React.createElement('div',{ className:'note' },'Shipping & taxes calculated at checkout · Secured by PayFast'),
        React.createElement('button',{ className:'btn btn-solid checkout-btn' },'Checkout with PayFast'),
      ),
    ),
  );
}

/* ============== WHATSAPP WIDGET ============== */
function WhatsApp(){
  const [open,setOpen] = useState(false);
  return React.createElement('div',{ className:'wa-fab' },
    React.createElement('div',{ className:`wa-panel ${open?'open':''}` },
      React.createElement('div',{ className:'wa-head' },
        React.createElement('div',{ className:'ring' }, React.createElement(Icon,{ name:'whatsapp' })),
        React.createElement('div',null,
          React.createElement('h5',null,'Mirelle & Co'),
          React.createElement('p',null,'Typically replies within minutes'),
        ),
        React.createElement('button',{ className:'icon-btn', style:{marginLeft:'auto',color:'rgba(247,243,238,.7)'}, onClick:()=>setOpen(false), 'aria-label':'Close' },
          React.createElement(Icon,{ name:'close' })),
      ),
      React.createElement('div',{ className:'wa-body' },
        React.createElement('div',{ className:'wa-bubble' },
          React.createElement('div',{ className:'nm' },'Mirelle Concierge'),
          'Bonjour! ♥ Looking for the perfect piece or need styling advice? We\'d love to help you find it.'),
        React.createElement('a',{ href:'https://wa.me/?text=Bonjour%20Mirelle%20%26%20Co%2C%20I%20would%20love%20some%20help%20choosing%20a%20piece.', className:'wa-go', target:'_blank', rel:'noreferrer' },
          React.createElement(Icon,{ name:'whatsapp', style:{width:18,height:18} }),'Start Chat'),
      ),
    ),
    React.createElement('button',{ className:'wa-btn', onClick:()=>setOpen(o=>!o) },
      React.createElement('span',{ className:'ring' }, React.createElement(Icon,{ name:'whatsapp' })),
      React.createElement('span',null,'Chat with us'),
    ),
  );
}

/* ============== MOBILE MENU ============== */
function MobileMenu({ open, onClose, onCart }){
  const links = ['Shop','Collections','About','Gifts','Earrings','Necklaces','Rings','Pendants'];
  return React.createElement(React.Fragment,null,
    React.createElement('div',{ className:`overlay ${open?'open':''}`, onClick:onClose }),
    React.createElement('aside',{ className:`mmenu ${open?'open':''}` },
      React.createElement('div',{ className:'mmenu-head' },
        React.createElement('img',{ src:'assets/logo-vertical.webp', alt:'Mirelle & Co' }),
        React.createElement('button',{ className:'drawer-close', onClick:onClose, 'aria-label':'Close' }, React.createElement(Icon,{ name:'close' })),
      ),
      React.createElement('nav',null,
        links.map(l=>React.createElement('a',{ key:l, href:'#', onClick:e=>{e.preventDefault();onClose();} }, l))),
      React.createElement('div',{ className:'mmenu-foot' },
        React.createElement('span',{ className:'kicker' },'Need help?'),
        React.createElement('a',{ href:'#', className:'link-underline', onClick:e=>e.preventDefault() },'Chat on WhatsApp'),
      ),
    ),
  );
}

/* ============== SEARCH OVERLAY ============== */
function SearchOverlay({ open, onClose }){
  const ref = useRef(null);
  useEffect(()=>{ if(open && ref.current) setTimeout(()=>ref.current.focus(),300); },[open]);
  const sugg = ['Silver hoops','Pearl studs','Pendants','Gold vermeil','Gifts under R500','The Earring Edit'];
  return React.createElement(React.Fragment,null,
    React.createElement('div',{ className:`overlay ${open?'open':''}`, onClick:onClose, style:{zIndex:94} }),
    React.createElement('div',{ className:`search-wrap ${open?'open':''}` },
      React.createElement('div',{ className:'search-inner' },
        React.createElement('div',{ style:{display:'flex',alignItems:'center',gap:14} },
          React.createElement(Icon,{ name:'search', style:{width:26,height:26,color:'var(--gold-deep)',flex:'none'} }),
          React.createElement('input',{ ref, placeholder:'Search for earrings, necklaces, gifts…' }),
          React.createElement('button',{ className:'drawer-close', onClick:onClose, 'aria-label':'Close' }, React.createElement(Icon,{ name:'close' })),
        ),
        React.createElement('div',{ className:'search-sugg' },
          React.createElement('span',{ className:'lbl' },'Popular'),
          sugg.map(s=>React.createElement('a',{ key:s, href:'#', onClick:e=>e.preventDefault() }, s)),
        ),
      ),
    ),
  );
}

/* ============== TOASTS ============== */
function Toasts({ toasts }){
  return React.createElement('div',{ className:'toast-wrap' },
    toasts.map(t=>React.createElement('div',{ key:t.id, className:'toast' },
      React.createElement(Icon,{ name:'check' }), t.msg)));
}

Object.assign(window,{ CartDrawer, WhatsApp, MobileMenu, SearchOverlay, Toasts, priceNum, fmt });
