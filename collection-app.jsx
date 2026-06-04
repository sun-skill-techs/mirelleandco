/* MIRELLE & CO — Collection page */

/* ---- flatten all products with collection tag ---- */
const ALL_PRODUCTS = (()=>{
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
  const COLLECTION_MAP = {
    'New Arrivals': "New Arrivals",
    'Best Sellers': "Best Sellers",
    'Coming Soon':  "Coming Soon",
  };
  const raw = window.MIRELLE.products;
  return Object.entries(raw).flatMap(([col, items])=>
    items.map(p=>({
      ...p,
      collection: COLLECTION_MAP[col],
      imgSrc: PRODUCT_IMAGES[p.id] || null,
      priceNum: parseInt((p.price||'').replace(/[^\d]/g,'')||'0'),
    }))
  );
})();

const PRICE_MAX = 1500;

/* ---- helpers ---- */
function priceNum(p){ return parseInt((p.price||'').replace(/[^\d]/g,'')||'0'); }

/* ---- FilterDropdown ---- */
function FilterDropdown({ label, children, defaultOpen=false }){
  const [open, setOpen] = useState(defaultOpen);
  const ref = useRef(null);
  useEffect(()=>{
    const handler = e=>{ if(ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return ()=>document.removeEventListener('mousedown', handler);
  },[]);
  return React.createElement('div',{ className:`flt-drop ${open?'open':''}`, ref:ref },
    React.createElement('button',{
      className:'flt-drop-toggle',
      onClick:()=>setOpen(o=>!o),
      type:'button',
    }, label, React.createElement(Icon,{ name:'caret', style:{width:14,height:14} })),
    React.createElement('div',{ className:'flt-drop-panel' }, children),
  );
}

/* ---- PriceSlider ---- */
function PriceSlider({ min, max, value, onChange }){
  const [lo, hi] = value;
  const pct = v=>((v-min)/(max-min))*100;

  const handleLo = e=>{
    const v = Math.min(Number(e.target.value), hi-50);
    onChange([v, hi]);
  };
  const handleHi = e=>{
    const v = Math.max(Number(e.target.value), lo+50);
    onChange([lo, v]);
  };

  return React.createElement('div',{ className:'price-slider' },
    React.createElement('div',{ className:'price-slider-labels' },
      React.createElement('span',null, `R ${lo}`),
      React.createElement('span',null, `R ${hi}${hi>=max?'+':''}`),
    ),
    React.createElement('div',{ className:'price-slider-track' },
      React.createElement('div',{
        className:'price-slider-fill',
        style:{ left:`${pct(lo)}%`, width:`${pct(hi)-pct(lo)}%` },
      }),
      React.createElement('input',{ type:'range', min, max, value:lo, onChange:handleLo, className:'ps-thumb ps-thumb-lo', step:10 }),
      React.createElement('input',{ type:'range', min, max, value:hi, onChange:handleHi, className:'ps-thumb ps-thumb-hi', step:10 }),
    ),
  );
}

/* ---- FilterPanel (shared between sidebar & mobile drawer) ---- */
function FilterPanel({ filters, setFilters, onReset }){
  const collections = [...new Set(ALL_PRODUCTS.map(p=>p.collection))];
  const colors = ['Silver','Gold','Rose Gold','Pearl','Mixed'];
  const availOptions = ['In Stock','Coming Soon'];

  const toggle = (key, val)=>{
    setFilters(f=>{
      const set = new Set(f[key]);
      set.has(val) ? set.delete(val) : set.add(val);
      return { ...f, [key]: set };
    });
  };

  const activeCount =
    filters.collections.size + filters.colors.size + filters.availability.size +
    (filters.price[0]>0 || filters.price[1]<PRICE_MAX ? 1 : 0);

  return React.createElement('div',{ className:'filter-panel' },
    React.createElement('div',{ className:'filter-panel-head' },
      React.createElement('span',{ className:'filter-panel-title' },'Filters', activeCount>0 && React.createElement('span',{ className:'flt-active-count' }, activeCount)),
      activeCount>0 && React.createElement('button',{ className:'flt-reset', onClick:onReset, type:'button' },'Clear all'),
    ),

    /* Price — first, open by default */
    React.createElement(FilterDropdown,{ label:'Price Range', defaultOpen:true },
      React.createElement(PriceSlider,{
        min:0, max:PRICE_MAX,
        value: filters.price,
        onChange: v=>setFilters(f=>({...f, price:v})),
      })
    ),

    /* Collections */
    React.createElement(FilterDropdown,{ label:'Collections' },
      collections.map(c=>
        React.createElement('label',{ key:c, className:'flt-check-row' },
          React.createElement('input',{
            type:'checkbox',
            checked: filters.collections.has(c),
            onChange: ()=>toggle('collections', c),
          }),
          React.createElement('span',null, c),
        )
      )
    ),

    /* Colors */
    React.createElement(FilterDropdown,{ label:'Colour' },
      colors.map(c=>
        React.createElement('label',{ key:c, className:'flt-check-row' },
          React.createElement('input',{
            type:'checkbox',
            checked: filters.colors.has(c),
            onChange: ()=>toggle('colors', c),
          }),
          React.createElement('span',null, c),
        )
      )
    ),

    /* Availability */
    React.createElement(FilterDropdown,{ label:'Availability' },
      availOptions.map(a=>
        React.createElement('label',{ key:a, className:'flt-check-row' },
          React.createElement('input',{
            type:'checkbox',
            checked: filters.availability.has(a),
            onChange: ()=>toggle('availability', a),
          }),
          React.createElement('span',null, a),
        )
      )
    ),
  );
}

/* ---- MobileFilterDrawer ---- */
function MobileFilterDrawer({ open, onClose, filters, setFilters, onReset }){
  return React.createElement(React.Fragment, null,
    React.createElement('div',{ className:`overlay ${open?'open':''}`, onClick:onClose }),
    React.createElement('div',{ className:`coll-filter-drawer ${open?'open':''}` },
      React.createElement('div',{ className:'coll-fdr-head' },
        React.createElement('span',{ className:'coll-fdr-title' },'Filters'),
        React.createElement('button',{ className:'icon-btn', onClick:onClose, 'aria-label':'Close filters' },
          React.createElement(Icon,{ name:'close' })),
      ),
      React.createElement('div',{ className:'coll-fdr-body' },
        React.createElement(FilterPanel,{ filters, setFilters, onReset }),
      ),
      React.createElement('div',{ className:'coll-fdr-foot' },
        React.createElement('button',{ className:'btn btn-solid', style:{width:'100%'}, onClick:onClose },'Apply Filters'),
      ),
    ),
  );
}

/* ---- Pagination ---- */
function Pagination({ page, total, perPage, onChange }){
  const pages = Math.ceil(total/perPage);
  if(pages<=1) return null;
  const items = [];
  for(let i=1;i<=pages;i++) items.push(i);
  return React.createElement('div',{ className:'coll-pagination' },
    React.createElement('button',{
      className:'pg-arrow',
      onClick:()=>onChange(page-1),
      disabled:page===1,
      'aria-label':'Previous page',
    }, React.createElement(Icon,{ name:'arrow', style:{transform:'rotate(180deg)',width:18,height:18} })),
    items.map(n=>
      React.createElement('button',{
        key:n,
        className:`pg-num ${n===page?'active':''}`,
        onClick:()=>onChange(n),
      }, n)
    ),
    React.createElement('button',{
      className:'pg-arrow',
      onClick:()=>onChange(page+1),
      disabled:page===pages,
      'aria-label':'Next page',
    }, React.createElement(Icon,{ name:'arrow', style:{width:18,height:18} })),
  );
}

/* ---- CollectionHero ---- */
function CollectionHero(){
  return React.createElement('section',{ className:'coll-hero' },
    React.createElement(Slot,{
      tone:'tone-taupe',
      label:'collection · all jewellery',
      src:'assets/site-images/model-double-hoop.webp',
      alt:'Mirelle & Co jewellery collection',
    }),
    React.createElement('div',{ className:'coll-hero-scrim' }),
    React.createElement('div',{ className:'wrap coll-hero-content' },
      React.createElement('div',{ className:'kicker coll-hero-kicker' },'Discover'),
      React.createElement('h1',{ className:'coll-hero-title' },'All Jewellery'),
      React.createElement('div',{ className:'heart-rule' }, React.createElement(Icon,{ name:'heart' })),
      React.createElement('p',{ className:'coll-hero-sub' },'Timeless pieces for modern romance — from just R240.'),
    ),
  );
}

/* ---- CollectionPage ---- */
function CollectionApp(){
  useReveal();
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('featured');

  const EMPTY_FILTERS = { collections: new Set(), colors: new Set(), availability: new Set(), price:[0,PRICE_MAX] };
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const PER_PAGE = 12;

  const toast = msg=>{
    const id = Date.now()+Math.random();
    setToasts(t=>[...t,{id,msg}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),2600);
  };

  const addToCart = p=>{
    setCart(c=>{
      const ex = c.find(i=>i.id===p.id);
      if(ex) return c.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i);
      return [...c,{id:p.id,name:p.name,mat:p.mat,price:p.price,tone:p.tone,qty:1}];
    });
    toast(`${p.name} added to your bag`);
    setCartOpen(true);
  };
  const changeQty = (id,d)=>setCart(c=>c.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i));
  const removeItem = id=>setCart(c=>c.filter(i=>i.id!==id));

  useEffect(()=>{
    const onKey=e=>{ if(e.key==='Escape'){ setCartOpen(false);setMenuOpen(false);setSearchOpen(false);setFilterDrawerOpen(false); } };
    window.addEventListener('keydown',onKey); return ()=>window.removeEventListener('keydown',onKey);
  },[]);

  /* ---- filtering ---- */
  const filtered = ALL_PRODUCTS.filter(p=>{
    if(filters.collections.size){
      if(!filters.collections.has(p.collection)) return false;
    }
    if(filters.colors.size){
      const mat = (p.mat||'').toLowerCase();
      const matches = [...filters.colors].some(c=>{
        if(c==='Silver') return mat.includes('silver');
        if(c==='Gold') return mat.includes('gold') && !mat.includes('rose');
        if(c==='Rose Gold') return mat.includes('rose');
        if(c==='Pearl') return mat.includes('pearl');
        if(c==='Mixed') return mat.includes('cz')||mat.includes('zirconia')||mat.includes('cubic');
        return false;
      });
      if(!matches) return false;
    }
    if(filters.availability.size){
      const inStock = !p.soon;
      const wantStock = filters.availability.has('In Stock');
      const wantSoon = filters.availability.has('Coming Soon');
      if(wantStock && !wantSoon && !inStock) return false;
      if(!wantStock && wantSoon && inStock) return false;
    }
    const pn = p.priceNum;
    if(pn < filters.price[0] || pn > filters.price[1]) return false;
    return true;
  });

  /* ---- sorting ---- */
  const sorted = [...filtered].sort((a,b)=>{
    if(sort==='price-asc') return a.priceNum - b.priceNum;
    if(sort==='price-desc') return b.priceNum - a.priceNum;
    if(sort==='name-asc') return a.name.localeCompare(b.name);
    if(sort==='newest') return (a.id.startsWith('n')?-1:1) - (b.id.startsWith('n')?-1:1);
    return 0; // featured — original order
  });

  /* reset page on filter/sort change */
  useEffect(()=>setPage(1),[filters,sort]);

  const pageItems = sorted.slice((page-1)*PER_PAGE, page*PER_PAGE);
  const cartCount = cart.reduce((s,i)=>s+i.qty,0);

  const resetFilters = ()=>setFilters({ collections:new Set(), colors:new Set(), availability:new Set(), price:[0,PRICE_MAX] });

  const activeFilterCount =
    filters.collections.size + filters.colors.size + filters.availability.size +
    (filters.price[0]>0||filters.price[1]<PRICE_MAX?1:0);

  return React.createElement(React.Fragment,null,
    React.createElement(Announce),
    React.createElement(Header,{ cartCount, onCart:()=>setCartOpen(true), onSearch:()=>setSearchOpen(true), onMenu:()=>setMenuOpen(true) }),
    React.createElement('main',null,

      /* Hero */
      React.createElement(CollectionHero),

      /* Body: sidebar + grid */
      React.createElement('div',{ className:'wrap coll-body' },

        /* Sidebar filters — desktop only */
        React.createElement('aside',{ className:'coll-sidebar' },
          React.createElement(FilterPanel,{ filters, setFilters, onReset:resetFilters }),
        ),

        /* Main content */
        React.createElement('div',{ className:'coll-main' },

          /* Toolbar */
          React.createElement('div',{ className:'coll-toolbar' },
            React.createElement('div',{ className:'coll-toolbar-left' },
              /* Mobile filter button */
              React.createElement('button',{
                className:`btn coll-filter-btn ${activeFilterCount>0?'has-active':''}`,
                onClick:()=>setFilterDrawerOpen(true),
                type:'button',
              },
                React.createElement(Icon,{ name:'menu', style:{width:16,height:16} }),
                'Filters',
                activeFilterCount>0 && React.createElement('span',{ className:'flt-btn-count' }, activeFilterCount),
              ),
              React.createElement('span',{ className:'coll-count' }, `${filtered.length} product${filtered.length!==1?'s':''}`),
            ),
            React.createElement('div',{ className:'coll-toolbar-right' },
              React.createElement('label',{ className:'sort-label', htmlFor:'coll-sort' },'Sort by'),
              React.createElement('select',{
                id:'coll-sort',
                className:'coll-sort-select',
                value:sort,
                onChange:e=>setSort(e.target.value),
              },
                React.createElement('option',{ value:'featured' },'Featured'),
                React.createElement('option',{ value:'newest' },'Newest First'),
                React.createElement('option',{ value:'price-asc' },'Price: Low to High'),
                React.createElement('option',{ value:'price-desc' },'Price: High to Low'),
                React.createElement('option',{ value:'name-asc' },'Name: A–Z'),
              ),
            ),
          ),

          /* Active filter chips */
          activeFilterCount>0 && React.createElement('div',{ className:'active-chips' },
            [...filters.collections].map(c=>
              React.createElement('button',{ key:c, className:'chip', onClick:()=>{ setFilters(f=>{ const s=new Set(f.collections); s.delete(c); return {...f,collections:s}; }); } }, c, ' ×')
            ),
            [...filters.colors].map(c=>
              React.createElement('button',{ key:c, className:'chip', onClick:()=>{ setFilters(f=>{ const s=new Set(f.colors); s.delete(c); return {...f,colors:s}; }); } }, c, ' ×')
            ),
            [...filters.availability].map(a=>
              React.createElement('button',{ key:a, className:'chip', onClick:()=>{ setFilters(f=>{ const s=new Set(f.availability); s.delete(a); return {...f,availability:s}; }); } }, a, ' ×')
            ),
            (filters.price[0]>0||filters.price[1]<PRICE_MAX) &&
              React.createElement('button',{ className:'chip', onClick:()=>setFilters(f=>({...f,price:[0,PRICE_MAX]})) },
                `R ${filters.price[0]} – R ${filters.price[1]}${filters.price[1]>=PRICE_MAX?'+':''} ×`),
          ),

          /* Grid */
          pageItems.length>0
            ? React.createElement('div',{ className:'coll-grid' },
                pageItems.map(p=>React.createElement(ProductCard,{ key:p.id, p, onAdd:addToCart }))
              )
            : React.createElement('div',{ className:'coll-empty' },
                React.createElement('div',{ className:'serif', style:{fontSize:'1.8rem',color:'var(--espresso)'} },'No pieces match your filters.'),
                React.createElement('button',{ className:'btn btn-outline', style:{marginTop:20}, onClick:resetFilters },'Clear Filters'),
              ),

          /* Pagination */
          React.createElement(Pagination,{ page, total:sorted.length, perPage:PER_PAGE, onChange:p=>{ setPage(p); window.scrollTo({top:0,behavior:'smooth'}); } }),
        ),
      ),
    ),
    React.createElement(Footer),
    React.createElement(MobileFilterDrawer,{ open:filterDrawerOpen, onClose:()=>setFilterDrawerOpen(false), filters, setFilters, onReset:resetFilters }),
    React.createElement(CartDrawer,{ open:cartOpen, items:cart, onClose:()=>setCartOpen(false), onQty:changeQty, onRemove:removeItem }),
    React.createElement(MobileMenu,{ open:menuOpen, onClose:()=>setMenuOpen(false) }),
    React.createElement(SearchOverlay,{ open:searchOpen, onClose:()=>setSearchOpen(false) }),
    React.createElement(WhatsApp),
    React.createElement(Toasts,{ toasts }),
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(CollectionApp));
