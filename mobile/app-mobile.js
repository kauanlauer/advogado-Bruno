// ============================================
// JS MOBILE DEDICADO - BRUNO MIRANDA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // === MENU LATERAL ===
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMenu = document.getElementById('closeMenu');
    const menuLinks = document.querySelectorAll('.menu-link');
    
    // Abrir menu
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        sideMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Fechar menu (botão X)
    closeMenu.addEventListener('click', function() {
        closeMenuAction();
    });
    
    // Fechar menu (overlay)
    menuOverlay.addEventListener('click', function() {
        closeMenuAction();
    });
    
    // Fechar menu ao clicar em link
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenuAction();
        });
    });
    
    function closeMenuAction() {
        menuToggle.classList.remove('active');
        sideMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // === FAQ ACCORDION ===
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Fecha todos os itens
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Abre o item clicado (se não estava ativo)
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // === BOTÃO VOLTAR AO TOPO ===
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // === ANIMAÇÃO SUAVE AO ROLAR ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignora se for apenas "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 60; // Compensa altura do navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // === NAVBAR BACKGROUND AO ROLAR ===
    const navbar = document.querySelector('.navbar-mobile');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // === PREVENÇÃO DE ZOOM ACIDENTAL ===
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });
    
    document.addEventListener('gesturechange', function(e) {
        e.preventDefault();
    });
    
    document.addEventListener('gestureend', function(e) {
        e.preventDefault();
    });
    
    // === ANIMAÇÃO DO BADGE DO WHATSAPP ===
    const whatsappBadge = document.querySelector('.whatsapp-badge');
    
    // Mostra o badge após 3 segundos
    setTimeout(function() {
        if (whatsappBadge) {
            whatsappBadge.style.opacity = '1';
        }
    }, 3000);
    
    // === LOG DE INICIALIZAÇÃO ===
    console.log('✅ Site Mobile Bruno Miranda - Carregado com sucesso!');
    console.log('📱 Versão: 14.47.27.01.26');
});

// ============================================
// LÓGICA MOBILE - BRUNO MIRANDA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. MENU LATERAL (Lógica simples e robusta)
    const menuBtn = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('menuOverlay');
    const closeBtn = document.getElementById('closeMenu');
    const menuLinks = document.querySelectorAll('.menu-link');

    function toggleMenu() {
        sideMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : '';
    }

    menuBtn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    // Fecha o menu ao clicar em um link
    menuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // 2. NAVBAR EFEITO SCROLL
    // Muda a cor da barra ao rolar para baixo
    const navbar = document.querySelector('.navbar-mobile');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. FAQ ACCORDION
    // Abre e fecha as perguntas
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        
        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-content').style.maxHeight = null;
            });

            // Se não estava ativo, abre
            if (!isActive) {
                item.classList.add('active');
                const content = item.querySelector('.faq-content');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // 4. ANIMAÇÕES AO ROLAR (INTERSECTION OBSERVER)
    // Faz os elementos aparecerem suavemente
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

    // 5. INICIALIZAÇÃO DO VÍDEO (Garante que toque no mobile)
    const video = document.getElementById('bgVideo');
    if(video) {
        video.play().catch(function(error) {
            console.log("Autoplay bloqueado pelo navegador, aguardando interação.");
        });
    }
    
    console.log("Sistema Mobile Carregado com Sucesso.");
});