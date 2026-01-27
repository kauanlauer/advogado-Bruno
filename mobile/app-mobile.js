// ============================================
// JS MOBILE FINAL - BRUNO MIRANDA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. PRELOADER
    // Remove a tela de carregamento suavemente
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    });

    // 2. FORÇAR AUTOPLAY DO VÍDEO
    // Tenta forçar o play caso o navegador bloqueie
    const video = document.getElementById('bgVideo');
    if(video) {
        video.play().then(() => {
            console.log("Vídeo reproduzindo.");
        }).catch(error => {
            console.log("Autoplay bloqueado. Adicionando controles ou aguardando toque.");
            // Fallback: se não tocar, a imagem poster (Bruno.jpeg) já está lá
        });
    }

    // 3. NAVBAR SCROLL EFFECT
    // Adiciona fundo escuro ao rolar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. ANIMAÇÕES AO ROLAR (Intersection Observer)
    // Faz os elementos aparecerem quando entram na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // 5. FECHAR MENU AO CLICAR
    // Garante que o menu feche ao clicar em um link (Single Page App)
    const navLinks = document.querySelectorAll('.nav-link');
    const offcanvasEl = document.getElementById('offcanvasNavbar');
    const bsOffcanvas = new bootstrap.Offcanvas(offcanvasEl);

    // Função global acessível pelo HTML
    window.closeMenuMobile = function() {
        // Pega a instância existente e esconde
        const openedCanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (openedCanvas) {
            openedCanvas.hide();
        }
    }
});