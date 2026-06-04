/* MIRELLE & CO — page sections */

const PRODUCT_IMAGES = {
  n1:'assets/site-images/Circular CZ Cluster Stud.png',
  n2:'assets/site-images/Bird Cluster Close Up - Camille.png',
  n3:'assets/site-images/Bulldog Studs Front Vie.png',
  n4:'assets/site-images/Circukar CZ Cluster Stud Close uP.png',
  n5:'assets/site-images/Geometric Butterfly Front View.png',
  n6:'assets/site-images/Folded decorative stud  Close Up.png',
  b1:'assets/site-images/Cat Decorative Stud Front View - Lea.png',
  b2:'assets/site-images/Double Heartt Close Up.png',
  b3:'assets/site-images/Bulldog Studs.png',
  b4:'assets/site-images/Bull Dog Close Up.png',
  b5:'assets/site-images/Double Heart Front View.png',
  b6:'assets/site-images/Fish grade Studs Close uP.png',
  c1:'assets/site-images/Cat Decorative Stud Close Up- Lea.png',
  c2:'assets/site-images/Cross CZ Cluster Close Up - Camille.png',
  c3:'assets/site-images/Cross CZ Cluster Stud Front View - Camille.png',
  c4:'assets/site-images/Geometric Butterfly Studs Close Up.png',
  c5:'assets/site-images/Folded decorative stud Side View..png',
  c6:'assets/site-images/Fish Grade Side View Studs.png',
};

/* ============== ANNOUNCEMENT BAR ============== */
function Announce(){
  const items = window.MIRELLE.announcements;
  const [i,setI] = useState(0);
  useEffect(()=>{ const t=setInterval(()=>setI(p=>(p+1)%items.length),3800); return ()=>clearInterval(t); },[]);
  return React.createElement('div',{ className:'announce' },
    React.createElement('div',{ className:'announce-track', key:i },
      React.createElement('span',{ className:'dot' },'✦'),
      React.createElement('span',{ className:'announce-item' }, items[i]),
      React.createElement('span',{ className:'dot' },'✦'),
    )
  );
}

/* ============== HEADER ============== */
function Header({ cartCount, onCart, onSearch, onMenu }){
  const [scrolled,setScrolled] = useState(false);
  const [mega,setMega] = useState(false);
  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>30);
    window.addEventListener('scroll',onScroll); return ()=>window.removeEventListener('scroll',onScroll);
  },[]);
  const shop = window.MIRELLE.categories.map(c=>c.name);
  return React.createElement('header',{ className:`header ${scrolled?'scrolled':''}`, onMouseLeave:()=>setMega(false) },
    React.createElement('div',{ className:'wrap header-inner' },
      // left nav
      React.createElement('nav',{ className:'nav' },
        React.createElement('a',{ href:'#', className:'has-caret', onMouseEnter:()=>setMega(true), onClick:e=>e.preventDefault() },
          'Shop', React.createElement(Icon,{ name:'caret', style:{width:14,height:14} })),
        React.createElement('a',{ href:'#collections', onClick:e=>e.preventDefault() },'Collections'),
        React.createElement('a',{ href:'#about', onClick:e=>e.preventDefault() },'About'),
        React.createElement('a',{ href:'#gifts', onClick:e=>e.preventDefault() },'Gifts'),
      ),
      // burger (mobile)
      React.createElement('button',{ className:'icon-btn burger', onClick:onMenu, 'aria-label':'Menu' },
        React.createElement(Icon,{ name:'menu' })),
      // brand
      React.createElement('div',{ className:'brand' },
        React.createElement('a',{ href:'index.html' },
          React.createElement('img',{ src:'assets/logo-vertical.webp', alt:'Mirelle & Co' }))),
      // actions
      React.createElement('div',{ className:'header-actions' },
        React.createElement('button',{ className:'icon-btn', onClick:onSearch, 'aria-label':'Search' },
          React.createElement(Icon,{ name:'search' })),
        React.createElement('button',{ className:'icon-btn desk-only', 'aria-label':'Account' },
          React.createElement(Icon,{ name:'user' })),
        React.createElement('button',{ className:'icon-btn', onClick:onCart, 'aria-label':'Cart' },
          React.createElement(Icon,{ name:'bag' }),
          cartCount>0 && React.createElement('span',{ className:'cart-count' }, cartCount)),
      ),
    ),
    // megamenu
    React.createElement('div',{ className:`megamenu ${mega?'open':''}`, onMouseEnter:()=>setMega(true) },
      React.createElement('div',{ className:'mega-col' },
        React.createElement('h4',null,'By Category'),
        shop.map(s=>React.createElement('a',{ key:s, href:'#', onClick:e=>e.preventDefault() }, s)),
      ),
      React.createElement('div',{ className:'mega-col' },
        React.createElement('h4',null,'By Material'),
        ['Sterling Silver','Gold Vermeil','Pearl','Cubic Zirconia'].map(s=>React.createElement('a',{ key:s, href:'#', onClick:e=>e.preventDefault() }, s)),
      ),
      React.createElement('div',{ className:'mega-col' },
        React.createElement('h4',null,'Collections'),
        ["Editor's Picks","Parisian Romance","Everyday Essentials","The Earring Edit"].map(s=>React.createElement('a',{ key:s, href:'#', onClick:e=>e.preventDefault() }, s)),
      ),
      React.createElement('div',{ className:'mega-col' },
        React.createElement('h4',null,'By Price'),
        ['Under R300','R300 – R600','R600 – R1000','Gifts over R1000'].map(s=>React.createElement('a',{ key:s, href:'#', onClick:e=>e.preventDefault() }, s)),
      ),
      React.createElement('div',{ className:'mega-feature' },
        React.createElement(Slot,{ tone:'tone-nude', label:'campaign / the earring edit', src:'assets/site-images/model-double-hoop.webp', alt:'Model wearing double hoop earrings' }),
        React.createElement('span',{ className:'cap' },'The Earring Edit'),
      ),
    ),
  );
}

/* ============== HERO ============== */
function Hero({ onShop }){
  return React.createElement('section',{ className:'hero' },
    React.createElement(Slot,{ tone:'tone-taupe', label:'hero · parisian balcony · model wearing earrings + layered necklaces', src:'assets/site-images/hero-imge.png', alt:'Mirelle jewellery campaign', loading:'eager' }),
    React.createElement('div',{ className:'hero-scrim' }),
    React.createElement('div',{ className:'wrap' },
      React.createElement('div',{ className:'hero-content' },
        React.createElement('div',{ className:'kicker hero-kicker' },'A little piece of'),
        React.createElement('h1',null,'Paris'),
        React.createElement('div',{ className:'heart-rule' }, React.createElement(Icon,{ name:'heart' })),
        React.createElement('p',{ className:'hero-sub' },'Timeless jewellery, designed for modern romance.'),
        React.createElement('p',{ className:'hero-lux' },
          'Affordable luxury you can treasure — exquisitely crafted pieces ',
          React.createElement('b',null,'from just R240.')),
        React.createElement('div',{ className:'hero-cta-row' },
          React.createElement('button',{ className:'btn btn-ghost-light', onClick:onShop },'Shop the Collection'),
          React.createElement('button',{ className:'btn', style:{color:'var(--porcelain)'}, onClick:onShop },
            React.createElement('span',{ style:{borderBottom:'1px solid rgba(247,243,238,.6)',paddingBottom:3} },'The Earring Edit →')),
        ),
      ),
    ),
  );
}

/* ============== EXPLORE BY STYLE ============== */
function Explore({ onShop }){
  return React.createElement('section',{ className:'section-pad wrap reveal', id:'collections' },
    React.createElement('div',{ className:'center-head' },
      React.createElement('h2',{ className:'section-title' },'Explore by Style'),
      React.createElement(HeartRule),
    ),
    React.createElement('div',{ className:'explore-grid' },
      window.MIRELLE.categories.map(c=>
        React.createElement('div',{ key:c.name, className:'explore-item', onClick:onShop },
          React.createElement('div',{ className:'explore-circle' },
            React.createElement(Slot,{ tone:c.tone, label:c.label, src:c.src, alt:`Mirelle ${c.name.toLowerCase()}` })),
          React.createElement('div',{ className:'explore-name' }, c.name),
          React.createElement('div',{ className:'explore-shop' },'Shop now →'),
        )
      )
    )
  );
}

/* ============== PRODUCT CARD ============== */
function ProductCard({ p, onAdd }){
  return React.createElement('a',{ className:'card', href:'product.html' },
    React.createElement('div',{ className:'card-media' },
      React.createElement(Slot,{ tone:p.tone, label:`${p.name.toLowerCase()}`, className:'main', src:PRODUCT_IMAGES[p.id], alt:p.name }),
      p.badge && React.createElement('span',{ className:`card-badge ${p.badgeClass||''}` }, p.badge),
      p.soon
        ? React.createElement('button',{ className:'quick-add soon', disabled:true },'Coming Soon')
        : React.createElement('button',{ className:'quick-add', onClick:e=>{e.preventDefault();onAdd(p);} },'Add to Cart'),
    ),
    React.createElement('div',{ className:'card-info' },
      React.createElement('div',{ className:'card-name' }, p.name),
      React.createElement('div',{ className:'card-mat' }, p.mat),
      React.createElement('div',{ className:'card-price' },
        p.was && React.createElement('span',{ className:'was' }, p.was),
        p.price),
    ),
  );
}

function SliderControls({ target, className='', alignToMedia=false, refreshKey='' }){
  const [mediaHeight,setMediaHeight] = useState(null);
  useEffect(()=>{
    if(!alignToMedia) return;
    const sync = ()=>{
      const media = target.current?.querySelector('.card-media');
      setMediaHeight(media ? media.getBoundingClientRect().height : null);
    };
    const frame = requestAnimationFrame(sync);
    window.addEventListener('resize',sync);
    return ()=>{ cancelAnimationFrame(frame);window.removeEventListener('resize',sync); };
  },[alignToMedia,refreshKey,target]);
  const move = direction=>{
    const el = target.current;
    if(!el) return;
    const items = Array.from(el.children);
    if(!items.length) return;
    const firstOffset = items[0].offsetLeft;
    const maxScroll = Math.max(0,el.scrollWidth-el.clientWidth);
    if(maxScroll<2) return;
    const positions = [...new Set(items.map(item=>
      Math.round(Math.min(maxScroll,item.offsetLeft-firstOffset))
    ))].sort((a,b)=>a-b);
    const current = el.scrollLeft;
    const next = direction>0
      ? positions.find(position=>position>current+2) ?? 0
      : positions.slice().reverse().find(position=>position<current-2) ?? maxScroll;
    el.scrollTo({ left:next, behavior:'smooth' });
  };
  return React.createElement('div',{ className:`slider-controls ${className}`, style:mediaHeight?{height:mediaHeight}:undefined },
    React.createElement('button',{ type:'button', className:'slider-arrow prev', onClick:()=>move(-1), 'aria-label':'Previous items' },
      React.createElement(Icon,{ name:'arrow' })),
    React.createElement('button',{ type:'button', className:'slider-arrow next', onClick:()=>move(1), 'aria-label':'Next items' },
      React.createElement(Icon,{ name:'arrow' })),
  );
}

/* ============== FEATURED ============== */
function Featured({ onAdd, onShop }){
  const data = window.MIRELLE.products;
  const tabs = Object.keys(data);
  const [tab,setTab] = useState(tabs[0]);
  const track = useRef(null);
  const hasDesktopSlider = data[tab].length>4;
  useEffect(()=>{ if(track.current) track.current.scrollLeft=0; },[tab]);
  return React.createElement('section',{ className:'feat section-pad reveal', id:'shop' },
    React.createElement('div',{ className:'wrap' },
      React.createElement('div',{ className:'center-head' },
        React.createElement('div',{ className:'kicker' },'Just for you'),
        React.createElement('h2',{ className:'section-title' },'Newest Treasures'),
      ),
      React.createElement('div',{ className:'feat-tabs' },
        tabs.map(t=>React.createElement('button',{ key:t, className:`feat-tab ${tab===t?'active':''}`, onClick:()=>setTab(t) }, t))),
      React.createElement('div',{ className:'slider-shell product-slider-shell' },
        React.createElement('div',{ ref:track, className:`prod-grid product-slider ${hasDesktopSlider?'desktop-slider':''}` },
          data[tab].map(p=>React.createElement(ProductCard,{ key:p.id, p, onAdd }))),
        React.createElement(SliderControls,{ target:track, className:hasDesktopSlider?'':'mobile-only-controls', alignToMedia:true, refreshKey:tab }),
      ),
      React.createElement('div',{ className:'feat-foot' },
        React.createElement('button',{ className:'btn btn-outline', onClick:onShop },'Shop All Jewellery')),
    )
  );
}

/* ============== EXPERIENCE BAND ============== */
function Experience(){
  return React.createElement('section',{ className:'exp reveal', id:'about' },
    React.createElement('div',{ className:'exp-grid' },
      React.createElement(Slot,{ tone:'tone-cream', label:'product / necklace on silk', src:'assets/site-images/product-silver-bangle.webp', alt:'Mirelle silver bangle on silk' }),
      React.createElement('div',{ className:'exp-mid' },
        React.createElement('div',{ className:'kicker' },'Made to be loved'),
        React.createElement('h2',null,'An Experience Designed to Feel Special'),
        React.createElement(HeartRule),
        React.createElement('p',null,'From our delicate jewellery to our thoughtful, ribbon-tied packaging, every detail is crafted to make you feel something beautiful — Parisian romance, made attainable.'),
        React.createElement('a',{ href:'#', className:'link-underline', onClick:e=>e.preventDefault() },'See the Details ',React.createElement(Icon,{ name:'arrow', style:{width:16,height:16} })),
      ),
      React.createElement(Slot,{ tone:'tone-nude', label:'packaging / mirelle gift box', src:'assets/site-images/lifestyle-bangle.webp', alt:'Mirelle bangle styled on hand' }),
    )
  );
}

/* ============== QUALITY ASSURED ============== */
function Assurances(){
  return React.createElement('section',{ className:'assure reveal' },
    React.createElement('div',{ className:'wrap assure-grid' },
      window.MIRELLE.assurances.map(a=>
        React.createElement('div',{ key:a.title, className:'assure-item' },
          React.createElement('div',{ className:'assure-ico' }, React.createElement(Icon,{ name:a.icon })),
          React.createElement('div',null,
            React.createElement('h4',null,a.title),
            React.createElement('p',null,a.body),
          )
        )
      )
    )
  );
}

/* ============== TESTIMONIALS ============== */
function Testimonials(){
  const track = useRef(null);
  return React.createElement('section',{ className:'testi section-pad reveal' },
    React.createElement('div',{ className:'wrap' },
      React.createElement('div',{ className:'center-head' },
        React.createElement('div',{ className:'kicker' },'Loved by our clients'),
        React.createElement('h2',{ className:'section-title' },'Worn & Adored'),
      ),
      React.createElement('div',{ className:'slider-shell testimonial-slider-shell' },
        React.createElement('div',{ ref:track, className:'testi-grid slider-track' },
          window.MIRELLE.testimonials.map((t,i)=>
            React.createElement('div',{ key:i, className:'testi-card' },
              React.createElement('div',{ className:'quote-mark', 'aria-hidden':true },'“'),
              React.createElement('div',{ className:'testi-content' },
                React.createElement('p',{ className:'testi-quote' },t.quote),
                React.createElement('div',{ className:'testi-by' },'– ',t.by, t.loc && React.createElement('span',null,' · ',t.loc)),
                React.createElement('div',{ className:'stars' },
                  Array.from({length:5}).map((_,s)=>React.createElement(Icon,{ key:s, name:'star' }))),
              ),
            )
          )
        ),
        React.createElement(SliderControls,{ target:track }),
      ),
    )
  );
}

/* ============== FOLLOW OUR STORY ============== */
function Story(){
  const story = window.MIRELLE.story.slice(0,5);
  const items = [...story,...story];
  return React.createElement('section',{ className:'story section-pad reveal' },
    React.createElement('div',{ className:'wrap story-heading' },
      React.createElement('div',{ className:'center-head' },
        React.createElement('h2',{ className:'section-title' },'Follow Our Story'),
        React.createElement(HeartRule),
      ),
    ),
    React.createElement('div',{ className:'story-viewport' },
      React.createElement('div',{ className:'story-track' },
      items.map((s,i)=>
        React.createElement('div',{ key:i, className:'story-cell' },
          React.createElement(Slot,{ tone:s.tone, label:s.label, src:s.src, alt:s.label }),
          React.createElement('div',{ className:'story-ov' },
            React.createElement(Icon,{ name:'insta' }),
            React.createElement('span',{ className:'likes' },'♥ ',s.likes),
          )
        )
      )
      )
    ),
    React.createElement('div',{ className:'wrap' },
      React.createElement('div',{ className:'story-handle' },
        React.createElement('a',{ href:'#', onClick:e=>e.preventDefault() },
          React.createElement(Icon,{ name:'insta', style:{width:18,height:18} }),'@mirelleandco'),
        React.createElement('div',{ className:'client-note' },
          React.createElement('button',{
            type:'button',
            className:'client-note-trigger',
            'aria-describedby':'instagram-layout-note'
          },'Note for Jaime'),
          React.createElement('span',{
            className:'client-note-tooltip',
            id:'instagram-layout-note',
            role:'tooltip'
          },'Layout may change if you want to use an app to fetch the latest posts from Instagram. For custom images, this layout can stay as is.')
        )
      ),
    )
  );
}

/* ============== NEWSLETTER ============== */
function Newsletter(){
  const [done,setDone] = useState(false);
  return React.createElement('section',{ className:'news reveal' },
    React.createElement('div',{ className:'wrap news-inner' },
      React.createElement('div',{ className:'kicker', style:{color:'var(--espresso)',opacity:.7} },'Join the maison'),
      React.createElement('h2',{ className:'section-title' },'A Little Romance, In Your Inbox'),
      React.createElement('p',null,'Early access to new collections, private sales, and a little Parisian inspiration. Plus 10% off your first order.'),
      done
        ? React.createElement('div',{ className:'news-done' },'Merci! Check your inbox ♥')
        : React.createElement('form',{ className:'news-form', onSubmit:e=>{e.preventDefault();setDone(true);} },
            React.createElement('input',{ type:'email', required:true, placeholder:'Your email address' }),
            React.createElement('button',{ className:'btn btn-solid', type:'submit' },'Subscribe'),
          ),
      React.createElement('div',{ className:'news-note' },'No spam, only beautiful things. Unsubscribe anytime.'),
    )
  );
}

/* ============== FOOTER ============== */
function Footer(){
  const [open,setOpen] = useState(null);
  const cols = [
    { h:'Shop', links:['All Jewellery','Rings','Earrings','Necklaces','Pendants'] },
    { h:'Collections', links:["Editor's Picks","Parisian Romance","Everyday Essentials","The Earring Edit","Gift Collection"] },
    { h:'About', links:['Our Story','Craftsmanship','Packaging','Care Guide'] },
    { h:'Customer Care', links:['FAQs','Shipping','Returns','Contact Us'] },
  ];
  return React.createElement('footer',{ className:'footer' },
    React.createElement('div',{ className:'wrap' },
      React.createElement('div',{ className:'footer-top' },
        React.createElement('div',{ className:'footer-brand' },
          React.createElement('img',{ src:'assets/logo-gold.png', className:'footer-logo-white', alt:'Mirelle & Co' }),
          React.createElement('p',null,'Modern romance in every detail. Affordable luxury you can treasure, designed in the spirit of Paris.'),
          React.createElement('div',{ className:'footer-soc' },
            ['insta','facebook','tiktok'].map(n=>
              React.createElement('a',{ key:n, href:'#', onClick:e=>e.preventDefault() }, React.createElement(Icon,{ name:n }))),
          ),
        ),
        cols.map(c=>
          React.createElement('div',{ key:c.h, className:`footer-col ${open===c.h?'open':''}` },
            React.createElement('button',{ className:'footer-col-toggle', onClick:()=>setOpen(open===c.h?null:c.h), 'aria-expanded':open===c.h },
              React.createElement('h4',null,c.h),React.createElement(Icon,{ name:'caret' })),
            React.createElement('div',{ className:'footer-links' },
              c.links.map(l=>React.createElement('a',{ key:l, href:'#', onClick:e=>e.preventDefault() }, l))),
          )
        ),
      ),
      React.createElement('div',{ className:'footer-bottom' },
        React.createElement('div',{ className:'footer-copy' },'© 2026 Mirelle & Co · All rights reserved · Developed by Sun Skill Tech'),
        React.createElement('div',{ className:'pay-row' },
          React.createElement('span',{ className:'payment-mark visa', 'aria-label':'Visa' },'VISA'),
          React.createElement('span',{ className:'payment-mark mastercard', 'aria-label':'Mastercard' },
            React.createElement('i'),React.createElement('i')),
          React.createElement('span',{ className:'payment-mark amex', 'aria-label':'American Express' },'AMEX'),
          React.createElement('span',{ className:'payment-mark apple', 'aria-label':'Apple Pay' },'●Pay'),
          React.createElement('span',{ className:'payment-mark payfast', 'aria-label':'PayFast' },'PayFast'),
        ),
      ),
    )
  );
}

Object.assign(window,{ Announce, Header, Hero, Explore, Featured, Experience, Assurances, Testimonials, Story, Newsletter, Footer, ProductCard, SliderControls });
