const GA_MEASUREMENT_ID='G-4GXT0F4NBY';
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config',GA_MEASUREMENT_ID);
const gaScript=document.createElement('script');
gaScript.async=true;
gaScript.src='https://www.googletagmanager.com/gtag/js?id='+GA_MEASUREMENT_ID;
document.head.appendChild(gaScript);

const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav');
if(menuBtn&&nav){menuBtn.addEventListener('click',()=>{nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',nav.classList.contains('open'))});}

const observer=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')})},{threshold:.12});
document.querySelectorAll('.fade').forEach(el=>observer.observe(el));

const form=document.querySelector('[data-contact-form]');
if(form){
 const success=document.querySelector('[data-success]');
 const error=document.querySelector('[data-error]');
 const btn=form.querySelector('button[type="submit"]');
 form.addEventListener('submit',async(e)=>{
  e.preventDefault();
  success.style.display='none';
  error.style.display='none';
  if(form.website.value){return}
  const endpoint=form.dataset.endpoint;
  if(!endpoint||endpoint.includes('PASTE_GOOGLE_APPS_SCRIPT_URL_HERE')){
   error.textContent='Something went wrong. Please try again.';
   error.style.display='block';
   return;
  }
  btn.disabled=true;
  const old=btn.textContent;
  btn.textContent='Sending...';
  try{
   const res=await fetch(endpoint,{method:'POST',body:new FormData(form)});
   if(!res.ok)throw new Error('Bad response');
   form.reset();
   success.style.display='block';
  }catch(err){
   error.textContent='Something went wrong. Please try again.';
   error.style.display='block';
  }finally{
   btn.disabled=false;
   btn.textContent=old;
  }
 })
}
