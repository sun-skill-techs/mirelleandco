/* MIRELLE & CO — content & product data */
window.MIRELLE = {
  announcements:[
    "Free shipping on orders over R1500",
    "The Courier Guy · 2–4 day delivery across South Africa",
    "New: The Earring Edit — silver, just arrived",
  ],
  categories:[
    {name:"Earrings", tone:"tone-cream", label:"earrings / silver hoops", src:"assets/site-images/product-vclip-hoops.webp"},
    {name:"Necklaces",tone:"tone-blush", label:"necklace / pendant", src:"assets/site-images/Double Heart Front View.png"},
    {name:"Rings",    tone:"tone-taupe", label:"stacked rings", src:"assets/site-images/Circukar CZ Cluster Stud Close uP.png"},
    {name:"Pendants", tone:"tone-nude",  label:"silver pendant", src:"assets/site-images/Cross CZ Cluster Close Up - Camille.png"},
  ],
  // price in ZAR (Rand) — affordable luxury range
  products:{
    "New Arrivals":[
      {id:"n1", name:"Solène Hoops",      mat:"Sterling Silver",     price:"R 420", tone:"tone-cream", alt:"tone-taupe", badge:"New"},
      {id:"n2", name:"Amélie Pendant",    mat:"Silver · Cubic Zirconia", price:"R 540", tone:"tone-blush", alt:"tone-nude", badge:"New"},
      {id:"n3", name:"Colette Drops",     mat:"Sterling Silver",     price:"R 380", tone:"tone-nude",  alt:"tone-cream", badge:"New"},
      {id:"n4", name:"Margaux Studs",     mat:"Silver · Pearl",      price:"R 295", tone:"tone-taupe", alt:"tone-blush", badge:"New"},
      {id:"n5", name:"Céleste Chain",     mat:"Sterling Silver",     price:"R 590", tone:"tone-cream", alt:"tone-nude", badge:"New"},
      {id:"n6", name:"Anaïs Huggies",     mat:"Silver · Cubic Zirconia", price:"R 340", tone:"tone-blush", alt:"tone-taupe", badge:"New"},
    ],
    "Best Sellers":[
      {id:"b1", name:"Joséphine Hoops",   mat:"Sterling Silver",     price:"R 460", was:"R 540", tone:"tone-taupe", alt:"tone-cream", badge:"Sale", badgeClass:"sale"},
      {id:"b2", name:"Vivienne Necklace", mat:"Silver · CZ Solitaire", price:"R 620", tone:"tone-cream", alt:"tone-blush", badge:"Best Seller", badgeClass:"best"},
      {id:"b3", name:"Éloïse Studs",      mat:"Sterling Silver",     price:"R 240", tone:"tone-blush", alt:"tone-nude", badge:"Best Seller", badgeClass:"best"},
      {id:"b4", name:"Camille Drop",      mat:"Silver · Freshwater Pearl", price:"R 510", tone:"tone-nude", alt:"tone-taupe", badge:"Best Seller", badgeClass:"best"},
      {id:"b5", name:"Adeline Pendant",   mat:"Sterling Silver",     price:"R 480", tone:"tone-taupe", alt:"tone-blush", badge:"Best Seller", badgeClass:"best"},
      {id:"b6", name:"Fleur Ring",        mat:"Silver · Cubic Zirconia", price:"R 390", tone:"tone-cream", alt:"tone-nude", badge:"Best Seller", badgeClass:"best"},
    ],
    "Coming Soon":[
      {id:"c1", name:"Aurélie Ring",      mat:"14k Gold Vermeil",    price:"From R 890", tone:"tone-cream", alt:"tone-taupe", soon:true},
      {id:"c2", name:"Delphine Pendant",  mat:"14k Gold Vermeil · Emerald", price:"R 1 480", tone:"tone-nude", alt:"tone-blush", soon:true},
      {id:"c3", name:"Noémie Band",       mat:"14k Gold Vermeil",    price:"From R 760", tone:"tone-taupe", alt:"tone-cream", soon:true},
      {id:"c4", name:"Sylvie Chain",      mat:"14k Gold Vermeil",    price:"R 1 120", tone:"tone-blush", alt:"tone-nude", soon:true},
      {id:"c5", name:"Manon Drops",       mat:"14k Gold Vermeil",    price:"From R 980", tone:"tone-cream", alt:"tone-blush", soon:true},
      {id:"c6", name:"Rosalie Bracelet",  mat:"14k Gold Vermeil · Pearl", price:"R 1 350", tone:"tone-nude", alt:"tone-taupe", soon:true},
    ],
  },
  testimonials:[
    {quote:"The most beautiful packaging I've ever received. It felt so personal and luxurious.", by:"Sarah M.", loc:"Cape Town"},
    {quote:"Even more stunning in person — you can feel the quality in every single detail.", by:"Chloé R.", loc:"Johannesburg"},
    {quote:"Mirelle & Co has become my go-to for gifting. It never, ever disappoints.", by:"Jessica T.", loc:"Durban"},
    {quote:"Elegant, delicate, and beautifully made. My necklace has quickly become an everyday favourite.", by:"Lerato K.", loc:"Pretoria"},
    {quote:"The earrings arrived so quickly and looked exactly as beautiful as they did online.", by:"Nadia P.", loc:"Stellenbosch"},
    {quote:"A genuinely special shopping experience from the first click to opening the ribbon-tied box.", by:"Amelia V.", loc:"Gqeberha"},
  ],
  assurances:[
    {icon:"shield", title:"Quality Assured", body:"Every piece hand-inspected before it's carefully dispatched."},
    {icon:"card",   title:"Secure Payment",  body:"PayFast encrypted checkout, built for South African shoppers."},
    {icon:"return", title:"Easy Returns",    body:"30-day hassle-free returns on all unworn jewellery."},
    {icon:"truck",  title:"Fast Delivery",   body:"The Courier Guy · 2–4 working days, nationwide."},
  ],
  story:[
    {tone:"tone-blush", likes:"1.2k", label:"silver drops", src:"assets/site-images/product-triangle-drops.webp"},
    {tone:"tone-nude",  likes:"842", label:"bangle on hand", src:"assets/site-images/lifestyle-bangle.webp"},
    {tone:"tone-taupe", likes:"611", label:"silver hoops", src:"assets/site-images/product-vclip-hoops.webp"},
    {tone:"tone-cream", likes:"930", label:"silver bangle on silk", src:"assets/site-images/product-silver-bangle.webp"},
    {tone:"tone-nude",  likes:"1.4k", label:"model wearing double hoops", src:"assets/site-images/model-double-hoop.webp"},
  ],
};
