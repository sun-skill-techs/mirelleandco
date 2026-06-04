/* MIRELLE & CO — Product page app root */
function PDPApp(){
  useReveal();
  const product = window.MIRELLE_PDP.product;
  const [cart,setCart] = useState([]);
  const [wishlist,setWishlist] = useState([]);
  const [cartOpen,setCartOpen] = useState(false);
  const [menuOpen,setMenuOpen] = useState(false);
  const [searchOpen,setSearchOpen] = useState(false);
  const [toasts,setToasts] = useState([]);
  const [showSticky,setShowSticky] = useState(false);

  const toast=(msg)=>{ const id=Date.now()+Math.random(); setToasts(t=>[...t,{id,msg}]); setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),2600); };

  const addToCart=(item,buyNow)=>{
    setCart(c=>{
      const ex=c.find(i=>i.id===item.id);
      if(ex) return c.map(i=>i.id===item.id?{...i,qty:i.qty+(item.qty||1)}:i);
      return [...c,item];
    });
    toast(`${item.name} added to your bag`);
    setCartOpen(true);
  };
  const changeQty=(id,d)=>setCart(c=>c.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i));
  const removeItem=(id)=>setCart(c=>c.filter(i=>i.id!==id));
  const toggleWish=(id)=>setWishlist(w=>{ const on=w.includes(id); toast(on?'Removed from wishlist':'Saved to wishlist'); return on?w.filter(x=>x!==id):[...w,id]; });
  const mainWished = wishlist.includes(product.id);
  const toggleMainWish=()=>toggleWish(product.id);

  // escape closes overlays
  useEffect(()=>{
    const onKey=(e)=>{ if(e.key==='Escape'){ setCartOpen(false);setMenuOpen(false);setSearchOpen(false);} };
    window.addEventListener('keydown',onKey); return ()=>window.removeEventListener('keydown',onKey);
  },[]);

  // sticky bar appears once buybox scrolled past
  useEffect(()=>{
    const onScroll=()=>{
      const box=document.getElementById('buybox');
      if(!box){ return; }
      const r=box.getBoundingClientRect();
      setShowSticky(r.bottom<120);
    };
    window.addEventListener('scroll',onScroll); onScroll();
    return ()=>window.removeEventListener('scroll',onScroll);
  },[]);

  const cartCount=cart.reduce((s,i)=>s+i.qty,0);

  return React.createElement(React.Fragment,null,
    React.createElement(Announce),
    React.createElement(Header,{ cartCount, onCart:()=>setCartOpen(true), onSearch:()=>setSearchOpen(true), onMenu:()=>setMenuOpen(true) }),
    React.createElement('main',null,
      React.createElement(Breadcrumb,{ name:product.name }),
      React.createElement('section',{ className:'pdp' },
        React.createElement('div',{ className:'wrap pdp-grid' },
          React.createElement(Gallery,{ product }),
          React.createElement(InfoPanel,{ product, onAdd:addToCart, wished:mainWished, onWish:toggleMainWish }),
        )
      ),
      React.createElement(CraftBand),
      React.createElement(BrandStory),
      React.createElement(Reviews),
      React.createElement(Related,{ items:window.MIRELLE_PDP.related, onAdd:addToCart, wishlist, onWish:toggleWish }),
    ),
    React.createElement(Footer),
    React.createElement(StickyBar,{ product, onAdd:addToCart, visible:showSticky && !cartOpen }),
    React.createElement(CartDrawer,{ open:cartOpen, items:cart, onClose:()=>setCartOpen(false), onQty:changeQty, onRemove:removeItem }),
    React.createElement(MobileMenu,{ open:menuOpen, onClose:()=>setMenuOpen(false) }),
    React.createElement(SearchOverlay,{ open:searchOpen, onClose:()=>setSearchOpen(false) }),
    React.createElement(WhatsApp),
    React.createElement(Toasts,{ toasts }),
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(PDPApp));
