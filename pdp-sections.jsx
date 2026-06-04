/* MIRELLE & CO — Product Detail sections */
const PDP = window.MIRELLE_PDP;

function zar(n){ return 'R ' + Number(n).toLocaleString('en-ZA').replace(/,/g,' '); }

/* ============== BREADCRUMB ============== */
function Breadcrumb({ name }){
  return React.createElement('div',{ className:'crumb' },
    React.createElement('div',{ className:'wrap crumb-row' },
      React.createElement('a',{ href:'index.html' },'Home'),
      React.createElement('span',{ className:'sep' },'/'),
      React.createElement('span',{ className:'here' }, name),
    )
  );
}

/* ============== GALLERY ============== */
function Gallery({ product }){
  const imgs = product.gallery;
  const [hero, ...rest] = imgs;
  // Mobile: touch slider showing 1 + peek of next
  const mobileTrack = useRef(null);
  return React.createElement('div',{ className:'gallery-grid' },
    // Desktop: big hero + 2-col sub grid
    React.createElement('div',{ className:'gallery-desktop' },
      React.createElement('div',{ className:'gallery-hero' },
        React.createElement(Slot,{ tone:hero.tone, label:hero.label, src:hero.src, alt:hero.alt })
      ),
      React.createElement('div',{ className:'gallery-sub' },
        rest.map((g,i)=>
          React.createElement('div',{ key:i, className:'gallery-sub-item' },
            React.createElement(Slot,{ tone:g.tone, label:g.label, src:g.src, alt:g.alt })))
      ),
    ),
    // Mobile: horizontal touch slider, 1 card + peek
    React.createElement('div',{ className:'gallery-mobile' },
      React.createElement('div',{ ref:mobileTrack, className:'gallery-mobile-track' },
        imgs.map((g,i)=>
          React.createElement('div',{ key:i, className:'gallery-mobile-item' },
            React.createElement(Slot,{ tone:g.tone, label:g.label, src:g.src, alt:g.alt })))
      ),
    ),
  );
}

/* ============== INFO PANEL ============== */
function InfoPanel({ product, onAdd, wished, onWish }){
  const [mat,setMat] = useState(product.materials[0]);
  const [qty,setQty] = useState(1);
  const [gift,setGift] = useState(false);
  const [giftMsg,setGiftMsg] = useState('');

  const off = Math.round((1 - mat.price/mat.compare)*100);
  const deliver = (()=>{
    const d=new Date(); d.setDate(d.getDate()+4);
    const e=new Date(); e.setDate(e.getDate()+6);
    const opt={day:'numeric',month:'short'};
    return `${d.toLocaleDateString('en-ZA',opt)} – ${e.toLocaleDateString('en-ZA',opt)}`;
  })();

  const buildItem = ()=>({
    id:`${product.id}-${mat.id}${gift?'-gift':''}`,
    name:product.name,
    mat:`${mat.name}${gift?' · Gift wrap':''}`,
    price:zar(mat.price + (gift?60:0)),
    tone:product.gallery[0].tone, qty,
  });

  const trust=[
    {ico:'truck', t:'Free shipping over R1500', s:'2–4 working days nationwide'},
    {ico:'return',t:'30-day easy returns', s:'On all unworn pieces'},
    {ico:'lock',  t:'Secure PayFast checkout', s:'Encrypted & protected'},
    {ico:'award', t:'12-month guarantee', s:'Against craft defects'},
  ];

  return React.createElement('div',{ className:'pdp-info', id:'buybox' },
    React.createElement('div',{ className:'pi-coll' }, product.collection),
    React.createElement('h1',{ className:'pi-title' }, product.name),
    // rating row
    React.createElement('div',{ className:'pi-rate' },
      React.createElement('div',{ className:'pi-stars' },
        Array.from({length:5}).map((_,i)=>React.createElement(Icon,{ key:i, name:'star' }))),
      React.createElement('a',{ className:'rev-link', href:'#reviews' },
        React.createElement('span',{ className:'score' }, product.rating.toFixed(1)),
        ' (',product.reviewCount,' reviews)'),
    ),
    // price
    React.createElement('div',{ className:'pi-price' },
      React.createElement('span',{ className:'now' }, zar(mat.price)),
      React.createElement('span',{ className:'was' }, zar(mat.compare)),
      React.createElement('span',{ className:'off' },`Save ${off}%`),
    ),
    // tagline
    React.createElement('p',{ className:'pi-tagline' }, product.tagline),
    // color selector
    React.createElement('div',{ className:'pi-opt' },
      React.createElement('div',{ className:'pi-opt-head' },
        React.createElement('span',{ className:'lbl' },'Colour',React.createElement('b',null,mat.name))),
      React.createElement('div',{ className:'swatches' },
        product.materials.map(m=>
          React.createElement('button',{ key:m.id, className:`swatch ${m.id===mat.id?'active':''}`, onClick:()=>setMat(m) },
            React.createElement('span',{ className:'dot', style:{background:m.swatch} }),
            React.createElement('span',{ className:'nm' }, m.name)))),
    ),
    // stock urgency
    React.createElement('div',{ className:'pi-stock' },
      React.createElement('span',{ className:'pulse' }),
      'Selling fast — ',React.createElement('b',null,`only ${product.stock} left`),' in this finish'),
    // qty + add
    React.createElement('div',{ className:'pi-buy' },
      React.createElement('div',{ className:'qty-lg' },
        React.createElement('button',{ onClick:()=>setQty(q=>Math.max(1,q-1)) }, React.createElement(Icon,{ name:'minus', style:{width:15,height:15} })),
        React.createElement('span',null,qty),
        React.createElement('button',{ onClick:()=>setQty(q=>q+1) }, React.createElement(Icon,{ name:'plus', style:{width:15,height:15} }))),
      React.createElement('button',{ className:'btn btn-solid atc', onClick:()=>onAdd(buildItem()) },'Add to Bag'),
    ),
    React.createElement('div',{ className:'pi-buy-row2' },
      React.createElement('button',{ className:'btn buynow', onClick:()=>onAdd(buildItem(),true) },'Buy It Now'),
    ),
    // gift toggle
    React.createElement('div',{ className:'pi-gift-wrap' },
      React.createElement('label',{ className:`gift ${gift?'on':''}` },
        React.createElement('input',{ type:'checkbox', className:'gift-cb', checked:gift, onChange:e=>setGift(e.target.checked) }),
        React.createElement('span',{ className:'gift-check' }, React.createElement(Icon,{ name:'check' })),
        React.createElement('span',{ className:'gt' },
          React.createElement('b',null,'Add signature gift wrap'),
          React.createElement('span',null,' — ribbon-tied box & handwritten note'),
          React.createElement('span',{ className:'gift-tip-wrap' },
            React.createElement('span',{ className:'gift-tip-icon' },'ⓘ'),
            React.createElement('span',{ className:'gift-tip' },'This feature may require a separate app integration — we\'ll confirm availability before launch.'))),
        React.createElement('span',{ className:'free' },'+ R60'),
      ),
      gift && React.createElement('textarea',{
        className:'gift-msg',
        placeholder:'Write your personalised message here…',
        value:giftMsg,
        onChange:e=>setGiftMsg(e.target.value),
        rows:3,
      }),
    ),
    // delivery estimate
    React.createElement('div',{ className:'pi-deliver' },
      React.createElement(Icon,{ name:'truck' }),
      React.createElement('p',null,'Order today, get it ',React.createElement('b',null,deliver)),
    ),
    // trust
    React.createElement('div',{ className:'pi-trust' },
      trust.map(t=>React.createElement('div',{ key:t.t, className:'ti' },
        React.createElement('span',{ className:'ti-ico' }, React.createElement(Icon,{ name:t.ico })),
        React.createElement('span',{ className:'ti-tx' }, t.t, React.createElement('span',null,t.s)),
      ))),
    // accordions
    React.createElement(Accordions,{ items:product.accordions }),
  );
}

/* ============== ACCORDIONS ============== */
function Accordions({ items }){
  const [open,setOpen] = useState(0);
  return React.createElement('div',{ className:'acc' },
    items.map((it,i)=>{
      const isOpen = open===i;
      return React.createElement('div',{ key:i, className:`acc-item ${isOpen?'open':''}` },
        React.createElement('button',{ className:'acc-head', onClick:()=>setOpen(isOpen?-1:i) },
          it.title, React.createElement('span',{ className:'pm' })),
        React.createElement('div',{ className:'acc-body', style:{maxHeight:isOpen?'260px':'0'} },
          React.createElement('div',{ className:'acc-body-in' }, it.body)),
      );
    })
  );
}

Object.assign(window,{ Breadcrumb, Gallery, InfoPanel, Accordions, zar });
