// ============================================
// JS MOBILE PROFISSIONAL - BRUNO MIRANDA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. PRELOADER - Remove a tela de carregamento
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    });

    // 2. AUTOPLAY DO VÍDEO - Forçar reprodução
    const video = document.getElementById('bgVideo');
    if(video) {
        // Tenta reproduzir automaticamente
        video.play().then(() => {
            console.log("Vídeo reproduzindo automaticamente.");
        }).catch(error => {
            console.log("Autoplay bloqueado pelo navegador. Poster será exibido.");
            // O poster (Bruno.jpeg) já está definido no HTML
        });
        
        // Tenta novamente ao tocar na tela (fallback para iOS)
        document.addEventListener('touchstart', function() {
            if(video.paused) {
                video.play();
            }
        }, { once: true });
    }

    // 3. NAVBAR - Efeito de scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. ANIMAÇÕES AO ROLAR - Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Ativa um pouco antes
    });

    // Aplica o observer a todos os elementos com a classe
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // 5. FECHAR MENU AO CLICAR EM LINK
    const navLinks = document.querySelectorAll('.nav-link');
    const offcanvasEl = document.getElementById('offcanvasNavbar');

    // Função global para fechar o menu (chamada pelo onclick no HTML)
    window.closeMenuMobile = function() {
        const openedCanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (openedCanvas) {
            openedCanvas.hide();
        }
    }

    // 6. SMOOTH SCROLL - Rolagem suave ao clicar nos links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Verifica se é uma âncora interna
            if(targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if(targetSection) {
                    // Calcula a posição considerando a navbar fixa
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 7. CAROUSEL DE DEPOIMENTOS - Configuração
    const carousel = document.getElementById('carouselTestimonials');
    if(carousel) {
        // Pausa automática ao tocar/arrastar (melhor UX mobile)
        carousel.addEventListener('touchstart', function() {
            const bsCarousel = bootstrap.Carousel.getInstance(carousel);
            if(bsCarousel) {
                bsCarousel.pause();
            }
        });
    }

    // 8. CONTROLE DE COOKIES
    const cookieBanner = document.querySelector('.cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies-btn');

    // Verifica se o usuário já aceitou os cookies
    if (localStorage.getItem('cookiesAccepted') === 'true') {
        if (cookieBanner) {
            cookieBanner.style.display = 'none';
        }
    } else {
        // Mostra o banner após 1 segundo (melhor UX)
        setTimeout(function() {
            if (cookieBanner) {
                cookieBanner.style.display = 'block';
            }
        }, 1000);
    }

    // Ao clicar em aceitar
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            if (cookieBanner) {
                // Animação de saída
                cookieBanner.style.opacity = '0';
                cookieBanner.style.transform = 'translateY(100%)';
                
                setTimeout(() => {
                    cookieBanner.style.display = 'none';
                }, 300);
            }
            
            // Salva a preferência
            localStorage.setItem('cookiesAccepted', 'true');
        });
    }

    // 9. CHAT BUBBLE - Anima após alguns segundos
    const chatBubble = document.querySelector('.chat-bubble');
    if(chatBubble) {
        // Remove após 10 segundos (não irrita o usuário)
        setTimeout(function() {
            chatBubble.style.opacity = '0';
            setTimeout(() => {
                chatBubble.style.display = 'none';
            }, 300);
        }, 10000);
    }

    // 10. PERFORMANCE - Lazy loading de imagens (se necessário)
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // 11. PREVENÇÃO DE ZOOM ACIDENTAL (iOS)
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });

    // 12. LOG DE INICIALIZAÇÃO
    console.log('✅ Site Bruno Miranda carregado com sucesso!');
    console.log('📱 Mobile: Otimizado');
    console.log('🎨 Tema: Premium Dark');
});

// 13. ANALYTICS/TRACKING (Opcional - adicione seu código)
// Exemplo: Google Analytics, Facebook Pixel, etc.
// window.dataLayer = window.dataLayer || [];