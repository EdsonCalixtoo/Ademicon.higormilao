import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowRight, ArrowDown, ArrowUp, MapPin, ShieldCheck, Handshake, ChartNoAxesCombined, Building2, CarFront, BriefcaseBusiness, TrendingUp, Menu, X, Plus, Check, Copy, MessageCircle, Target, Eye, ClipboardList, Calendar, Trophy, Star, Key, Instagram, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import architecture from '@/assets/architecture.jpg';
// Foto oficial tratada por IA
import higorPhoto from '@/assets/higor_real.jpg';
import ademiconLogo from '@/assets/ademicon-logo-dark.svg';
import { Simulator } from '@/components/Simulator';
import { CustomCursor } from '@/components/CustomCursor';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ThemeToggle } from '@/components/ThemeToggle';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Higor | Corretor de carta de crédito — Ademicon Cascavel' },
    { name: 'description', content: 'Conheça Higor, corretor de carta de crédito na Ademicon em Cascavel. Planejamento para imóveis, veículos e seus próximos objetivos.' },
    { property: 'og:title', content: 'Higor | Seu próximo objetivo começa com um plano' },
    { property: 'og:description', content: 'Cartas de crédito e atendimento personalizado com Higor, na Ademicon em Cascavel, Paraná.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});
const solutions = [
  { name: 'Imóveis', icon: Building2, description: 'Sua casa, um novo apartamento ou um imóvel para investir. Um plano para construir o seu patrimônio.' },
  { name: 'Veículos', icon: CarFront, description: 'Do primeiro carro à renovação da sua frota. Planeje sua próxima conquista com uma carta de crédito.' },
  { name: 'Serviços', icon: BriefcaseBusiness, description: 'Uma reforma, uma viagem ou um projeto pessoal. Dê o próximo passo com planejamento.' },
  { name: 'Investimentos', icon: TrendingUp, badge: 'Nova oportunidade', description: 'O consórcio como estratégia patrimonial: planeje aportes, alavancagem e o crescimento do seu capital.' },
];
const faqs = [
  ['Como funciona uma carta de crédito?', 'A carta de crédito é o valor contratado em um consórcio para adquirir um bem ou serviço. Sua utilização ocorre após a contemplação e a aprovação dos requisitos previstos no contrato.'],
  ['Consórcio tem juros?', 'O consórcio não possui juros de financiamento, mas há taxa de administração e podem existir fundo de reserva, seguros e outros encargos previstos no contrato. Todos os custos devem ser considerados no planejamento.'],
  ['Como acontece a contemplação?', 'A contemplação ocorre por sorteio ou lance, conforme as regras do grupo e a disponibilidade de recursos. Não é possível garantir uma data de contemplação.'],
  ['Posso escolher o bem que quero comprar?', 'Sim, respeitando a categoria e as condições da carta de crédito, bem como as regras contratuais e a análise da administradora. Podemos conversar sobre o que faz sentido para o seu objetivo.'],
];
const steps = [
  { number: '01', icon: MessageCircle, title: 'Uma boa conversa', text: 'Entendemos seu objetivo, seu momento e o que você espera da sua próxima conquista.' },
  { number: '02', icon: ClipboardList, title: 'Um plano para você', text: 'Avaliamos as opções de crédito, os prazos e os custos para construir um planejamento consciente.' },
  { number: '03', icon: ShieldCheck, title: 'Clareza em cada etapa', text: 'Você conhece as condições e as regras do consórcio para seguir com informação e segurança.' },
];
const values = [
  { icon: Eye, title: 'Transparência', text: 'Custos e regras claros desde o início.' },
  { icon: Target, title: 'Propósito', text: 'Seu objetivo guia cada escolha.' },
  { icon: Handshake, title: 'Proximidade', text: 'Atendimento de pessoa para pessoa.' },
];
/** Move o brilho do cartão para a posição do mouse (variáveis CSS --mx / --my). */
function spotlight(event: React.MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
}
/** Revela elementos com [data-reveal] quando entram na tela. */
function useScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('reveal-ready');
    if (!('IntersectionObserver' in window)) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { 
          entry.target.classList.add('is-visible'); 
          observer.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const observeItems = () => {
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)').forEach(el => observer.observe(el));
    };
    
    observeItems();
    const mutation = new MutationObserver(observeItems);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => { observer.disconnect(); mutation.disconnect(); root.classList.remove('reveal-ready'); };
  }, []);
}
function Index() {
  useScrollReveal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [goal, setGoal] = useState('Imóveis');
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [credit, setCredit] = useState(0);
  const [installment, setInstallment] = useState(0);
  const [brief, setBrief] = useState('');
  function openContact(category?: string, creditValue?: number, installmentValue?: number) {
    if (category) setGoal(category);
    if (creditValue) setCredit(creditValue);
    if (installmentValue) setInstallment(installmentValue);
    setCopied(false); setCopyError(false); setBrief(''); setContactOpen(true);
  }
  function sendWhatsApp(event: React.FormEvent) {
    event.preventDefault();
    let text = `Olá, Higor! Meu nome é ${name.trim()}. Tenho interesse em uma carta de crédito para ${goal.toLowerCase()}`;
    if (credit > 0) {
      text += `, buscando um crédito de R$ ${credit.toLocaleString('pt-BR')} com parcelas em torno de R$ ${installment.toLocaleString('pt-BR')}`;
    }
    text += ` e gostaria de conhecer as opções da Ademicon.`;
    
    const whatsappUrl = `https://wa.me/554197958879?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    setContactOpen(false);
  }
  const navLinks: [string, string][] = [['Sobre mim', '#sobre'], ['Soluções', '#solucoes'], ['Como funciona', '#como-funciona']];
  return <>
    <header className="site-header"><div className="shell header-inner">
      <a href="#inicio" aria-label="Higor Milão, início" className="wordmark" onClick={(e) => { e.preventDefault(); document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' }); }}>higor milão<span className="wordmark-dot">.</span><span className="brand-divider"/><img className="brand-logo" src={ademiconLogo} alt="Ademicon" width={110} height={24}/></a>
      <nav className="desktop-nav" aria-label="Navegação principal">
        {navLinks.map(([label, href]) => (
          <a key={href} href={href} onClick={(e) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); }}>{label}</a>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button variant="light" size="portfolio" className="header-cta btn-pill" onClick={() => openContact()}>Vamos conversar <ArrowUpRight /></Button>
        <Button variant="light" size="icon" className="mobile-toggle btn-pill" aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X/> : <Menu/>}</Button>
      </div>
    </div></header>
    {mobileOpen && <nav className="mobile-nav" aria-label="Navegação móvel">{navLinks.map(([label, href]) => <a key={href} href={href} onClick={(e) => { e.preventDefault(); setMobileOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); }}>{label}</a>)}<Button variant="hero" className="btn-pill" onClick={() => {setMobileOpen(false); openContact();}}>Vamos conversar <ArrowUpRight/></Button></nav>}
    <CustomCursor />
    <ScrollProgress />
    <main>
      <section className="hero" id="inicio">
        <img className="hero-image" src={architecture} alt="" aria-hidden="true" width={1920} height={1024}/>
        <div className="hero-grid-bg" aria-hidden="true"/>
        <div className="shell hero-inner">
          <div className="hero-copy" data-reveal style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>
            <div className="hero-badge"><span className="hero-badge-dot"/>Corretor de carta de crédito<img className="hero-badge-logo" src={ademiconLogo} alt="Ademicon" width={74} height={16}/></div>
            <h1>Olá, sou <span className="hero-name">Higor Milão.</span></h1>
            <p className="hero-title">Seu próximo objetivo<br/>começa com <span>um plano.</span></p>
            <p className="hero-description">Conquistas não acontecem por acaso. Eu te ajudo a encontrar uma carta de crédito que faça sentido para o seu futuro.</p>
            <div className="hero-actions"><Button variant="hero" size="portfolio" className="btn-hero-glow" onClick={() => openContact()}>Planejar minha conquista <ArrowUpRight/></Button><Button variant="light" size="portfolio" asChild><a href="#sobre">Conheça meu trabalho <ArrowRight/></a></Button></div>
            <ul className="hero-chips" aria-label="Tipos de carta de crédito">{solutions.map(({name: category, icon: Icon}) => <li key={category}><Icon/>{category}</li>)}</ul>
          </div>
          <div className="hero-visual" data-reveal style={{ '--reveal-delay': '400ms' } as React.CSSProperties}>
            <div className="portrait-glow" aria-hidden="true"/>
            <div className="portrait-accent" aria-hidden="true"/>
            <figure className="portrait-frame">
              <img src={higorPhoto} alt="Higor Milão, corretor de carta de crédito da Ademicon em Cascavel" width={896} height={1200} fetchPriority="high"/>
              <figcaption className="portrait-caption"><strong>Higor<span>.</span></strong><small>Corretor de carta de crédito</small></figcaption>
            </figure>
            <div className="float-card float-card--top"><span className="float-card-icon"><ShieldCheck/></span><div><strong>Corretor Ademicon</strong><small>Consórcio e investimento</small></div></div>
            <div className="float-card float-card--bottom"><span className="float-card-icon"><MapPin/></span><div><strong>Cascavel, Paraná</strong><small>Atendimento próximo</small></div></div>
          </div>
          <a className="hero-scroll" href="#solucoes" aria-label="Ver soluções" onClick={(e) => { e.preventDefault(); document.querySelector('#solucoes')?.scrollIntoView({ behavior: 'smooth' }); }}><span>EXPLORE AS POSSIBILIDADES</span><ArrowDown size={16}/></a>
        </div>
      </section>
      <div className="trust-strip">
        <div className="shell flex justify-center items-center gap-12 flex-wrap">
          {[[Handshake, 'Atendimento próximo', 'Uma conversa, não uma fórmula pronta.'], [ChartNoAxesCombined, 'Planejamento com propósito', 'Seu objetivo no centro de cada decisão.'], [ShieldCheck, 'A força da Ademicon', 'Consórcio para construir o seu futuro.']].map(([Icon, title, text]) => {
            const TrustIcon = Icon as typeof Handshake;
            return <div className="trust-item" key={title as string}><span className="icon-bubble"><TrustIcon/></span><div><strong>{title as string}</strong><small>{text as string}</small></div></div>;
          })}
        </div>
      </div>

      <section className="section shell" id="solucoes">
        <div className="section-heading" data-reveal>
          <div><div className="section-label">Possibilidades para você</div><h2>O que você quer <span className="text-gradient">conquistar?</span></h2></div>
          <p>Cada objetivo pede uma estratégia. Conheça as possibilidades e descubra o caminho para o seu próximo passo.</p>
        </div>
        <div className="bento">
          {solutions.map(({name: category, icon: Icon, badge, description}, index) => (
            <article className={`bento-card bento-card--${index + 1}${badge ? ' bento-card--highlight' : ''}`} key={category} onMouseMove={spotlight} data-reveal style={{ '--reveal-delay': `${index * 90}ms` } as React.CSSProperties}>
              <Icon className="bento-watermark" aria-hidden="true"/>
              <div className="bento-top"><span className="icon-bubble icon-bubble--lg"><Icon/></span>{badge && <span className="bento-badge">{badge}</span>}</div>
              <div className="bento-body"><h3>{category}</h3><p>{description}</p></div>
              <button type="button" className="bento-action" onClick={() => openContact(category)}>Explorar possibilidades <span className="bento-arrow"><ArrowUpRight/></span></button>
            </article>
          ))}
        </div>
        <div className="mt-16">
          <Simulator onContact={openContact} />
        </div>
      </section>

      <section className="section about" id="sobre">
        <div className="shell about-grid">
          <div className="about-image-wrap" data-reveal>
            <img className="about-image" src={architecture} loading="lazy" width={1920} height={1024} alt="Edifício residencial contemporâneo representando planejamento patrimonial"/>
            <div className="about-caption"><span className="icon-bubble"><MapPin/></span><div><strong>Seu futuro. Nosso ponto de partida.</strong><span>Ademicon · Cascavel / PR</span></div></div>
          </div>
          <div className="about-copy" data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
            <div className="section-label">Prazer, Higor</div>
            <h2>Antes de falar de crédito,<br/>vamos falar de <span className="text-gradient">você.</span></h2>
            <p>Sou corretor de carta de crédito na Ademicon em Cascavel. Meu trabalho começa por entender o que você quer conquistar e qual é o seu momento.</p>
            <p>Acredito em conversas transparentes, escolhas conscientes e planejamento. Mais do que apresentar uma carta de crédito, quero ajudar você a encontrar um caminho alinhado aos seus objetivos.</p>
            <ul className="values">{values.map(({icon: Icon, title, text}) => <li key={title}><span className="icon-bubble"><Icon/></span><strong>{title}</strong><small>{text}</small></li>)}</ul>
            <div className="about-sign"><img src={higorPhoto} alt="" aria-hidden="true" width={48} height={48} loading="lazy"/><div><div className="about-signature">Higor<span className="text-primary">.</span></div><small>Corretor de carta de crédito · Ademicon Cascavel</small></div></div>
          </div>
        </div>
      </section>

      <section className="section shell" id="como-funciona">
        <div className="section-heading" data-reveal>
          <div><div className="section-label">Um passo de cada vez</div><h2>Do objetivo ao <span className="text-gradient">planejamento.</span></h2></div>
          <p>Sem complicar. Um processo próximo e transparente para você decidir com confiança.</p>
        </div>
        <ol className="steps">
          {steps.map(({number, icon: Icon, title, text}, index) => (
            <li className="step-card" key={number} onMouseMove={spotlight} data-reveal style={{ '--reveal-delay': `${index * 120}ms` } as React.CSSProperties}>
              <div className="step-head"><span className="icon-bubble icon-bubble--lg"><Icon/></span><span className="step-number">{number}</span></div>
              <h3>{title}</h3><p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section" id="casos-de-sucesso">
        <div className="shell section-heading section-heading--centered" data-reveal>
          <div className="section-label">Histórias Reais</div>
          <h2>Pessoas que já <span className="text-gradient">conquistaram.</span></h2>
          <p>Resultados reais de quem escolheu planejar o futuro com transparência.</p>
        </div>
        <div className="shell mt-16">
          <div className="success-grid">
          {[
            { icon: Building2, title: "Apartamento no Centro", desc: "Contemplação em 18 meses com lance embutido.", value: "R$ 450.000" },
            { icon: Trophy, title: "Construção de Casa", desc: "Capital liberado para obra em terreno próprio.", value: "R$ 600.000" },
            { icon: Key, title: "Primeiro Imóvel", desc: "Sorteio no primeiro ano de planejamento.", value: "R$ 300.000" }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div className="success-card" data-reveal style={{ '--reveal-delay': `${i * 100}ms` } as React.CSSProperties} key={item.title}>
                <div className="success-icon"><Icon/></div>
                <div className="success-body">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <span className="success-value">{item.value}</span>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </section>

      <section className="section about">
        <div className="shell faq-layout">
          <div className="faq-intro" data-reveal>
            <div className="section-label">Sem dúvidas no caminho</div>
            <h2>Informação também<br/>faz parte do <span className="text-gradient">plano.</span></h2>
            <p>Algumas respostas para começar nossa conversa.</p>
            <Button variant="light" size="portfolio" className="btn-pill mt-8" onClick={() => openContact()}>Tenho outra dúvida <ArrowUpRight/></Button>
          </div>
          <div className="faq-list">{faqs.map(([question,answer], index) => <details className="faq-item" key={question} data-reveal style={{ '--reveal-delay': `${index * 80}ms` } as React.CSSProperties}><summary>{question}<span className="faq-toggle"><Plus size={16}/></span></summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="section" id="instagram">
        <div className="shell section-heading section-heading--centered" data-reveal>
          <div className="section-label"><Instagram size={14}/> @higor.ademicon</div>
          <h2>Bastidores das <span className="text-gradient">entregas.</span></h2>
          <p>Acompanhe meu dia a dia no Instagram com dicas, planejamento estratégico e chaves na mão.</p>
        </div>
        <div className="shell mt-12">
          <div className="insta-grid">
            {['m2x9f2xNqfM', 'y-8gK0n7q_E', 'z4jZ-a_B4P8'].map((videoId, i) => (
              <div className="insta-reel" data-reveal style={{ '--reveal-delay': `${i * 100}ms` } as React.CSSProperties} key={videoId}>
                <iframe 
                  src={`https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1`} 
                  title="Vídeo Ademicon" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Button variant="light" size="portfolio" className="btn-pill" asChild>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram size={18}/> Seguir no Instagram
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="section contact-band" id="contato">
        <div className="shell">
          <div className="cta-card" data-reveal>
            <div className="cta-orb cta-orb--1" aria-hidden="true"/><div className="cta-orb cta-orb--2" aria-hidden="true"/>
            <div className="cta-copy">
              <div className="section-label">Vamos dar o primeiro passo?</div>
              <h2>Grandes conquistas começam<br/>com uma boa conversa.</h2>
              <p>Seu objetivo merece um plano. Vamos encontrar o seu?</p>
            </div>
            <div className="cta-side">
              <img className="cta-avatar" src={higorPhoto} alt="" aria-hidden="true" width={72} height={72} loading="lazy"/>
              <div className="flex flex-col gap-3">
                <Button variant="hero" size="portfolio" className="btn-pill btn-cta" onClick={() => openContact()}><MessageCircle/> Conversar com Higor <ArrowUpRight/></Button>
                <Button variant="light" size="portfolio" className="btn-pill w-full" asChild><a href="https://calendly.com/" target="_blank" rel="noopener noreferrer"><Calendar/> Agendar Reunião</a></Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer>
      <div className="shell">
        <div className="footer-inner">
          <div className="footer-brand"><a href="#inicio" className="footer-name">higor<span className="text-primary">.</span></a><span className="brand-divider"/><img className="footer-logo" src={ademiconLogo} alt="Ademicon" width={92} height={20} loading="lazy"/></div>
          <nav className="footer-nav" aria-label="Rodapé">{navLinks.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
          <a href="#inicio" className="back-top" aria-label="Voltar ao topo"><ArrowUp size={16}/></a>
        </div>
        <div className="footer-bottom">
          <div className="footer-address flex items-center gap-2"><MapPin size={12}/> R. Uruguai, 696 - Centro, Cascavel - PR</div>
          <span>© 2026 Higor Milão</span>
        </div>
        <p className="footer-legal">Este é um portfólio profissional independente. A contratação está sujeita às condições da administradora. Consórcios possuem taxa de administração e podem incluir outros encargos contratuais. A contemplação ocorre por sorteio ou lance, sem garantia de prazo. Imagens de arquitetura ilustrativas.</p>
      </div>
    </footer>
    <button className="floating-whatsapp" onClick={() => openContact()} aria-label="Conversar pelo WhatsApp" data-reveal style={{ '--reveal-delay': '1s' } as React.CSSProperties}>
      <MessageCircle size={28} />
    </button>
    <Dialog open={contactOpen} onOpenChange={setContactOpen}>
      <DialogContent className="contact-dialog max-w-md w-[calc(100%-32px)]">
        <DialogTitle>Vamos planejar sua conquista?</DialogTitle>
        <DialogDescription>Inicie seu atendimento de forma rápida.</DialogDescription>
        <form className="contact-form" onSubmit={sendWhatsApp}>
          <label>Seu nome<input className="form-field" value={name} onChange={e => setName(e.target.value)} placeholder="Como posso chamar você?" required maxLength={100}/></label>
          <label>O que você quer conquistar?<select className="form-field" value={goal} onChange={e => setGoal(e.target.value)}>{['Imóveis','Veículos','Serviços','Investimentos'].map(option => <option key={option}>{option}</option>)}</select></label>
          
          {credit > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <label>Crédito Simulado<input className="form-field" value={`R$ ${credit.toLocaleString('pt-BR')}`} disabled style={{ background: 'var(--border)' }}/></label>
              <label>Parcela Estimada<input className="form-field" value={`R$ ${installment.toLocaleString('pt-BR')}`} disabled style={{ background: 'var(--border)' }}/></label>
            </div>
          )}

          <p className="form-note">Ao clicar abaixo, você será redirecionado para o WhatsApp com uma mensagem pré-preenchida para iniciar seu atendimento.</p>
          <Button variant="hero" size="portfolio" className="btn-pill" type="submit">
            <MessageCircle/> Enviar mensagem no WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  </>;
}
