/* MIRELLE & CO — app root */
function App(){
  useReveal();
  const [cart,setCart] = useState([]);
  const [cartOpen,setCartOpen] = useState(false);
  const [menuOpen,setMenuOpen] = useState(false);
  const [searchOpen,setSearchOpen] = useState(false);
  const [toasts,setToasts] = useState([]);

  const toast = (msg)=>{
    const id = Date.now()+Math.random();
    setToasts(t=>[...t,{id,msg}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),2600);
  };

  const addToCart = (p)=>{
    setCart(c=>{
      const ex = c.find(i=>i.id===p.id);
      if(ex) return c.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i);
      return [...c,{ id:p.id, name:p.name, mat:p.mat, price:p.price, tone:p.tone, qty:1 }];
    });
    toast(`${p.name} added to your bag`);
    setCartOpen(true);
  };
  const changeQty = (id,d)=>setCart(c=>c.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i));
  const removeItem = (id)=>setCart(c=>c.filter(i=>i.id!==id));
  const goShop = ()=>{ window.location.href='collection.html'; };

  // close overlays on Escape
  useEffect(()=>{
    const onKey=(e)=>{ if(e.key==='Escape'){ setCartOpen(false);setMenuOpen(false);setSearchOpen(false);} };
    window.addEventListener('keydown',onKey); return ()=>window.removeEventListener('keydown',onKey);
  },[]);

  const cartCount = cart.reduce((s,i)=>s+i.qty,0);

  return React.createElement(React.Fragment,null,
    React.createElement(Announce),
    React.createElement(Header,{ cartCount, onCart:()=>setCartOpen(true), onSearch:()=>setSearchOpen(true), onMenu:()=>setMenuOpen(true) }),
    React.createElement('main',null,
      React.createElement(Hero,{ onShop:goShop }),
      React.createElement(Explore,{ onShop:goShop }),
      React.createElement(Featured,{ onAdd:addToCart, onShop:goShop }),
      React.createElement(Experience),
      React.createElement(Assurances),
      React.createElement(Testimonials),
      React.createElement(Story),
      React.createElement(Newsletter),
    ),
    React.createElement(Footer),
    React.createElement(CartDrawer,{ open:cartOpen, items:cart, onClose:()=>setCartOpen(false), onQty:changeQty, onRemove:removeItem }),
    React.createElement(MobileMenu,{ open:menuOpen, onClose:()=>setMenuOpen(false) }),
    React.createElement(SearchOverlay,{ open:searchOpen, onClose:()=>setSearchOpen(false) }),
    React.createElement(WhatsApp),
    React.createElement(Toasts,{ toasts }),
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
