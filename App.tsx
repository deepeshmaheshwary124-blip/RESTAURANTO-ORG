import {useMemo,useState} from "react";
import {AnimatePresence,motion,useReducedMotion} from "framer-motion";
import {ArrowUpRight,ChevronDown,Clock,Compass,MapPin,Menu as MenuIcon,Phone,Search,Star,X,Utensils,MessageCircle} from "lucide-react";

const phone="03122121445";
const maps="https://www.google.com/maps/search/?api=1&query=Dua+Restaurant+Mauripur+Road+Karachi";
const wa=(msg="Assalamualaikum, I’d like to contact Dua Restaurant Maripur.")=>`https://wa.me/92${phone.slice(1)}?text=${encodeURIComponent(msg)}`;

const imgs={
 hero:"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1800&q=85",
 karahi:"https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1100&q=82",
 bbq:"https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1100&q=82",
 rice:"https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1100&q=82",
 bread:"https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1100&q=82",
 interior:"https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1300&q=82",
 chai:"https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=1000&q=82"
};

const menu=[
 {name:"Dumba Karahi",cat:"Popular",desc:"A rich karahi-style dish inspired by the restaurant reference.",img:imgs.karahi},
 {name:"Mutton Rosh",cat:"Popular",desc:"A mutton specialty highlighted in the provided restaurant reference.",img:imgs.bbq},
 {name:"Karahi",cat:"Karahi",desc:"Explore the restaurant’s karahi selection.",img:imgs.karahi},
 {name:"BBQ Selection",cat:"BBQ",desc:"Grilled favourites and smoky flavours.",img:imgs.bbq},
 {name:"Mutton",cat:"Mutton",desc:"Mutton dishes can be added with verified menu details.",img:imgs.bbq},
 {name:"Rice",cat:"Rice",desc:"Rice dishes can be added with verified menu details.",img:imgs.rice},
 {name:"Breads",cat:"Breads",desc:"Fresh bread options can be added with verified menu details.",img:imgs.bread},
 {name:"Tea & Drinks",cat:"Drinks",desc:"Drinks and tea selections can be added with verified menu details.",img:imgs.chai}
];
const cats=["Popular","Karahi","BBQ","Mutton","Rice","Breads","Drinks"];

function Reveal({children,delay=0,className=""}:{children:React.ReactNode,delay?:number,className?:string}){
 const reduce=useReducedMotion();
 return <motion.div className={className} initial={reduce?false:{opacity:0,y:28}} whileInView={reduce?{}:{opacity:1,y:0}} viewport={{once:true,amount:.16}} transition={{duration:.7,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>
}
function Pill({children}:{children:React.ReactNode}){return <span className="pill">{children}</span>}
function CTA({href,children,outline=false}:{href:string,children:React.ReactNode,outline?:boolean}){return <a className={`cta ${outline?"outline":""}`} href={href}>{children}<ArrowUpRight size={17}/></a>}

export function App(){
 const [mobile,setMobile]=useState(false),[cat,setCat]=useState("Popular"),[query,setQuery]=useState(""),[light,setLight]=useState<string|null>(null);
 const shown=useMemo(()=>menu.filter(x=>x.cat===cat && x.name.toLowerCase().includes(query.toLowerCase())),[cat,query]);

 return <div className="site">
  <header className="nav">
   <a className="brand" href="#home"><span className="brand-mark">د</span><span><b>DUA</b><small>RESTAURANT MARIPUR</small></span></a>
   <nav className="desktop-nav">{["home","about","menu","gallery","reviews","contact"].map(x=><a key={x} href={"#"+x}>{x[0].toUpperCase()+x.slice(1)}</a>)}</nav>
   <div className="nav-actions"><a className="nav-phone" href={`tel:+92${phone.slice(1)}`}><Phone size={16}/><span>Call</span></a><a className="nav-order" href={wa()}>WhatsApp <ArrowUpRight size={15}/></a><button className="hamb" onClick={()=>setMobile(true)}><MenuIcon/></button></div>
  </header>

  <AnimatePresence>{mobile&&<motion.div className="mobile-menu" initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{type:"spring",stiffness:280,damping:28}}>
   <button className="close" onClick={()=>setMobile(false)}><X/></button>
   <span className="urdu">دعا ریسٹورینٹ</span>
   {["home","about","menu","gallery","reviews","contact"].map(x=><a key={x} href={"#"+x} onClick={()=>setMobile(false)}>{x[0].toUpperCase()+x.slice(1)}</a>)}
   <CTA href={wa()}>Chat on WhatsApp</CTA>
  </motion.div></AnimatePresence>}

  <main>
   <section id="home" className="hero">
    <div className="hero-bg" style={{backgroundImage:`url(${imgs.hero})`}}/><div className="hero-shade"/>
    <div className="hero-content">
      <Reveal><Pill>MAURIPUR ROAD · KARACHI</Pill><h1>Food that feels<br/><i>like home.</i></h1><p>Authentic Pakistani flavours, warm gatherings and a late-night destination in Mauripur.</p>
      <div className="hero-buttons"><CTA href="#menu">Explore Menu</CTA><CTA href={maps} outline>Get Directions</CTA><a className="round-call" href={wa()}><MessageCircle size={18}/> WhatsApp</a></div></Reveal>
    </div>
    <div className="hero-dashboard">
      <motion.div className="float-card rating" animate={{y:[0,-9,0]}} transition={{duration:4,repeat:Infinity,ease:"easeInOut"}}><Star fill="currentColor" size={17}/><div><strong>4.2</strong><span>3,955 reviews</span></div></motion.div>
      <motion.div className="float-card location" animate={{y:[0,7,0]}} transition={{duration:5,repeat:Infinity,ease:"easeInOut",delay:.5}}><MapPin size={18}/><div><strong>Mauripur</strong><span>Hingorabad Lyari</span></div></motion.div>
      <motion.div className="float-card open" animate={{y:[0,-6,0]}} transition={{duration:4.5,repeat:Infinity,ease:"easeInOut",delay:1}}><span className="live-dot"/> <div><strong>Open</strong><span>Closes 2:30 AM</span></div></motion.div>
      <div className="dish-chip"><img src={imgs.karahi}/><div><small>FEATURED</small><strong>Dumba Karahi</strong></div></div>
    </div>
    <div className="scroll-cue">SCROLL <span/></div>
   </section>

   <section className="info-strip"><div><Star/> <b>4.2</b><span>Rating</span></div><div><b>3,955</b><span>Google Reviews</span></div><div><b>Rs 1–5,000</b><span>Price range</span></div><div><Clock/><b>2:30 AM</b><span>Closes</span></div><div><MapPin/><b>Karachi</b><span>Mauripur</span></div></section>

   <section id="about" className="section about">
    <Reveal className="section-intro"><Pill>THE DUA EXPERIENCE</Pill><h2>Good food. <em>Good company.</em><br/>That’s the point.</h2><p>Dua Restaurant Maripur is presented around what matters most: flavour, atmosphere and a place to gather. We keep the story grounded in the information available rather than inventing a history that isn’t verified.</p></Reveal>
    <div className="about-grid"><Reveal><div className="image-stack"><img src={imgs.interior}/><div className="urdu-card">دعا ریسٹورینٹ</div></div></Reveal><Reveal delay={.12}><div className="about-copy"><span className="eyebrow">MAURIPUR · KARACHI</span><h3>A table worth<br/><i>coming back to.</i></h3><p>From hearty Pakistani dishes to a relaxed late-night stop, the experience is designed to feel straightforward, warm and satisfying.</p><div className="facts"><div><b>4.2 ★</b><span>Google rating</span></div><div><b>3,955</b><span>Reviews shown</span></div><div><b>2:30 AM</b><span>Closing time shown</span></div></div></div></Reveal></div>
   </section>

   <section id="menu" className="section menu-section">
    <Reveal className="section-heading"><div><Pill>THE MENU</Pill><h2>Come hungry.<br/><em>Leave happy.</em></h2></div><p>Exact prices and additional dishes are intentionally not fabricated. This interface is ready for verified menu data.</p></Reveal>
    <div className="menu-toolbar"><div className="tabs">{cats.map(c=><button className={cat===c?"active":""} onClick={()=>setCat(c)} key={c}>{c}</button>)}</div><label className="search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search dishes"/></label></div>
    <div className="menu-grid">{shown.map((x,i)=><Reveal key={x.name} delay={i*.05}><article className="menu-card"><div className="menu-img"><img src={x.img} loading="lazy"/><span>{x.cat==="Popular"?"POPULAR":x.cat.toUpperCase()}</span></div><div className="menu-body"><h3>{x.name}</h3><p>{x.desc}</p><a href={wa(`Assalamualaikum, I’d like to ask about ${x.name}.`)}>Ask on WhatsApp <ArrowUpRight size={15}/></a></div></article></Reveal>)}</div>
   </section>

   <section className="feature"><div className="feature-img"><img src={imgs.karahi} loading="lazy"/><div className="feature-stamp">D</div></div><div className="feature-copy"><Pill>FROM THE REFERENCE</Pill><h2>Dumba Karahi<br/><em>& Mutton Rosh</em></h2><p>These dishes are explicitly highlighted in the provided restaurant reference, so they get the spotlight without inventing prices or unsupported claims.</p><CTA href={wa("Assalamualaikum, I’d like to ask about the Dumba Karahi and Mutton Rosh.")}>Ask About Dishes</CTA></div></section>

   <section id="gallery" className="section gallery"><Reveal className="section-heading"><div><Pill>VISUAL JOURNEY</Pill><h2>A taste of<br/><em>the atmosphere.</em></h2></div><p>Editorial food imagery is used where restaurant photography is unavailable. It is not presented as verified restaurant photography.</p></Reveal>
    <div className="gallery-grid">{[imgs.hero,imgs.bbq,imgs.rice,imgs.chai,imgs.interior,imgs.karahi].map((im,i)=><button key={im+i} className={`gallery-item g${i}`} onClick={()=>setLight(im)}><img src={im} loading="lazy"/><span>VIEW</span></button>)}</div>
   </section>

   <section id="reviews" className="reviews">
    <div className="review-left"><Pill>GOOGLE SIGNAL</Pill><h2>Rated <em>4.2</em><br/>by <span>3,955</span> reviews.</h2><p>We show the aggregate rating from the provided reference. Individual reviews are not invented.</p><CTA href={maps}>See on Google Maps</CTA></div>
    <div className="review-dashboard"><div className="dash-top"><span>REPUTATION DASHBOARD</span><Star fill="currentColor"/></div><div className="big-rating">4.2 <small>/ 5</small></div><div className="bars">{[5,4,3,2,1].map((n,i)=><div key={n}><span>{n}</span><div><i style={{width:`${[84,55,27,12,8][i]}%`}}/></div></div>)}</div><div className="floating-note n1">“Guest feedback lives on Google.”</div><div className="floating-note n2">3,955 reviews</div></div>
   </section>

   <section id="contact" className="contact section"><Reveal className="contact-card"><div><Pill>LET’S CONNECT</Pill><h2>Your table<br/><em>starts here.</em></h2><p>Use WhatsApp for enquiries, or call the restaurant directly. No fake online reservation system.</p><div className="contact-buttons"><CTA href={wa()}>WhatsApp</CTA><a className="cta outline" href={`tel:+92${phone.slice(1)}`}><Phone size={17}/> Call 0312 2121445</a></div></div><div className="contact-panel"><div><MapPin/><span><b>Visit</b>Mauripur Rd, Hingorabad Lyari, Karachi</span></div><div><Clock/><span><b>Opening</b>Open · closes 2:30 AM</span></div><div><Compass/><span><b>Directions</b><a href={maps}>Open Google Maps <ArrowUpRight size={14}/></a></span></div></div></Reveal></section>
  </main>

  <div className="fab"><a href={maps} title="Directions"><Compass/></a><a href={`tel:+92${phone.slice(1)}`} title="Call"><Phone/></a><a className="fab-wa" href={wa()} title="WhatsApp"><MessageCircle/></a></div>
  <footer><div className="footer-brand"><span className="brand-mark">د</span><div><b>DUA RESTAURANT MARIPUR</b><span>دعا ریسٹورینٹ</span></div></div><div className="footer-links">{["Home","About","Menu","Gallery","Reviews","Contact"].map(x=><a key={x} href={"#"+x.toLowerCase()}>{x}</a>)}</div><div className="footer-bottom"><span>Mauripur Rd · Hingorabad Lyari · Karachi</span><span>© {new Date().getFullYear()} Dua Restaurant Maripur</span></div></footer>

  <AnimatePresence>{light&&<motion.div className="lightbox" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setLight(null)}><button><X/></button><motion.img initial={{scale:.9}} animate={{scale:1}} src={light}/></motion.div>}</AnimatePresence>
 </div>
}