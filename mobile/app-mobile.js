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
    console.log('📱 Versão: 14.00.27.01.26');
});