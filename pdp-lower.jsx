/* MIRELLE & CO — Product Detail lower sections */

/* ============== CRAFT BAND ============== */
function CraftBand(){
  const items=[
    {ico:'sparkle', h:'Brilliant-Cut Stones', p:'Hand-set cubic zirconia chosen for maximum sparkle.'},
    {ico:'leaf',    h:'Skin-Kind & Lasting', p:'Hypoallergenic, nickel-free and tarnish-resistant.'},
    {ico:'box',     h:'Wrapped With Love',   p:'Every order arrives ribbon-tied, ready to gift.'},
    {ico:'award',   h:'Hand-Inspected',      p:'Quality-checked in studio before it ships to you.'},
  ];
  return React.createElement('section',{ className:'craft section-pad reveal' },
    React.createElement('div',{ className:'wrap craft-grid' },
      items.map(it=>React.createElement('div',{ key:it.h, className:'craft-item' },
        React.createElement('span',{ className:'craft-ico' }, React.createElement(Icon,{ name:it.ico })),
        React.createElement('h4',null,it.h),
        React.createElement('p',null,it.p),
      ))
    )
  );
}

/* ============== BRAND STORY ============== */
function BrandStory(){
  return React.createElement('section',{ className:'brand-story section-pad reveal' },
    React.createElement('div',{ className:'wrap brand-story-grid' },
      React.createElement('div',{ className:'bs-media' },
        React.createElement(Slot,{ tone:'tone-taupe', label:'brand · artisan detail shot', src:'assets/site-images/lifestyle-bangle.webp', alt:'Mirelle artisan craftsmanship detail' }),
      ),
      React.createElement('div',{ className:'bs-text' },
        React.createElement('div',{ className:'kicker' },'Made with intention'),
        React.createElement('h2',{ className:'section-title' },'Crafted to Last a Lifetime'),
        React.createElement('p',null,
          'Every Mirelle & Co piece begins as a sketch and ends as an heirloom. We work with ',
          React.createElement('em',null,'certified hypoallergenic metals'),
          ' and hand-set stones chosen for their brilliance — not their price tag. The result is jewellery that looks and feels far beyond what you paid for it.'),
        React.createElement('p',null,
          'We believe luxury shouldn\'t be locked away. Our pieces are designed in the spirit of Paris and priced for the everyday woman who refuses to settle — whether she\'s dressing for the boardroom, a birthday dinner, or just herself.'),
        React.createElement('ul',{ className:'bs-list' },
          React.createElement('li',null,'Nickel-free · tarnish-resistant · skin-kind'),
          React.createElement('li',null,'Hand-inspected before every dispatch'),
          React.createElement('li',null,'Backed by a 12-month craftsmanship guarantee'),
          React.createElement('li',null,'Beautifully packaged — every single time'),
        ),
      ),
    )
  );
}

/* ============== REVIEWS ============== */
// Placeholder layout — final design depends on the review app (e.g. Okendo, Judge.me, Loox).
// Reviews must be dynamic/injected by that app. This section is a UI placeholder only.
function Reviews(){
  const { product } = window.MIRELLE_PDP;
  return React.createElement('section',{ className:'reviews section-pad reveal', id:'reviews' },
    React.createElement('div',{ className:'wrap' },
      React.createElement('div',{ className:'center-head' },
        React.createElement('div',{ className:'kicker' },'Worn & adored'),
        React.createElement('h2',{ className:'section-title' },'What Our Clients Say'),
      ),
      React.createElement('div',{ className:'rev-summary' },
        React.createElement('div',{ className:'rev-score-big' },
          React.createElement('div',{ className:'num' }, product.rating.toFixed(1)),
          React.createElement('div',{ className:'pi-stars stars' },
            Array.from({length:5}).map((_,i)=>React.createElement(Icon,{ key:i, name:'star' }))),
          React.createElement('div',{ className:'cnt' },`${product.reviewCount} reviews`),
        ),
        React.createElement('button',{ className:'btn btn-outline' },'Write a Review'),
      ),
      React.createElement('div',{ className:'rev-placeholder' },
        React.createElement('p',null,'⚑ This section is a placeholder. The review layout and content will be rendered dynamically by the review app selected during development (e.g. Okendo, Judge.me, Loox).'),
      ),
    )
  );
}

/* ============== RELATED CARD (uses p.img not PRODUCT_IMAGES lookup) ============== */
function RelatedCard({ p, onAdd }){
  return React.createElement('div',{ className:'card' },
    React.createElement('div',{ className:'card-media' },
      React.createElement(Slot,{ tone:p.tone, label:p.name.toLowerCase(), className:'main', src:p.img, alt:p.name }),
      p.badge && React.createElement('span',{ className:`card-badge ${p.badgeClass||''}` }, p.badge),
      React.createElement('button',{ className:'quick-add', onClick:onAdd },'Add to Cart'),
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

/* ============== RELATED ============== */
function Related({ items, onAdd, wishlist, onWish }){
  const track = useRef(null);
  return React.createElement('section',{ className:'related section-pad reveal' },
    React.createElement('div',{ className:'wrap' },
      React.createElement('div',{ className:'center-head' },
        React.createElement('div',{ className:'kicker' },'You may also love'),
        React.createElement('h2',{ className:'section-title' },'More Parisian Treasures'),
      ),
      React.createElement('div',{ className:'slider-shell product-slider-shell' },
        React.createElement('div',{ ref:track, className:'prod-grid product-slider' },
          items.map(p=>React.createElement(RelatedCard,{ key:p.id, p,
            onAdd:()=>onAdd({ id:p.id, name:p.name, mat:p.mat, price:p.price, tone:p.tone, qty:1 }) }))),
        React.createElement(SliderControls,{ target:track, className:'mobile-only-controls', alignToMedia:true }),
      ),
    )
  );
}

/* ============== STICKY ADD BAR ============== */
function StickyBar({ product, onAdd, visible }){
  const mat = product.materials[0];
  const img = product.gallery[0];
  return React.createElement('div',{ className:`sticky-bar ${visible?'show':''}` },
    React.createElement('div',{ className:'wrap sticky-inner' },
      React.createElement('div',{ className:'sb-thumb' },
        React.createElement(Slot,{ tone:img.tone, src:img.src, alt:img.alt })),
      React.createElement('div',{ className:'sb-info' },
        React.createElement('div',{ className:'sb-name' }, product.name),
        React.createElement('div',{ className:'sb-meta' }, mat.name)),
      React.createElement('div',{ className:'sb-price' },
        React.createElement('span',{ className:'was' }, zar(mat.compare)), zar(mat.price)),
      React.createElement('button',{ className:'btn btn-solid sb-btn atc-sb', onClick:()=>onAdd({ id:`${product.id}-${mat.id}-45`, name:product.name, mat:`${mat.name} · 45 cm`, price:zar(mat.price), tone:img.tone, qty:1 }) },'Add to Bag'),
    )
  );
}

Object.assign(window,{ CraftBand, BrandStory, Reviews, Related, StickyBar });
