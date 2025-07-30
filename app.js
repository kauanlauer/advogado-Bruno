/**
 * Classe para gerenciar as funcionalidades interativas do site.
 * Versão aprimorada com chat interativo.
 */
class SiteManager {
    /**
     * O construtor é executado quando criamos uma nova instância da classe.
     */
    constructor() {
        // Seleção de todos os elementos que terão interatividade
        this.navbar = document.getElementById('mainNavbar');
        this.backToTopButton = document.getElementById('back-to-top-btn');
        this.statCounters = document.querySelectorAll('.stat-counter');
        this.lazyImages = document.querySelectorAll('img.lazy-load');
        this.newsletterForm = document.getElementById('newsletter-form');
        this.newsletterSuccessMessage = document.getElementById('newsletter-success-message');
        this.cookieBanner = document.getElementById('cookie-banner');
        this.acceptCookiesBtn = document.getElementById('accept-cookies-btn');

        // ===== INÍCIO DA ALTERAÇÃO - ELEMENTOS DO NOVO CHAT =====
        // Seleciona os elementos do novo widget de chat
        this.chatContainer = document.getElementById('chat-widget-container');
        this.chatLauncher = document.getElementById('chat-launcher');
        this.closeChatBtn = document.getElementById('close-chat-btn');
        // ===== FIM DA ALTERAÇÃO =====

        // Adiciona os ouvintes de eventos
        this.addEventListeners();
    }

    /**
     * Centraliza a adição de todos os ouvintes de eventos.
     */
    addEventListeners() {
        // Ouve o evento de rolagem da página
        window.addEventListener('scroll', () => {
            this.handleNavbarScroll();
            this.handleBackToTopButton();
        });

        // Ouve o clique no botão de voltar ao topo
        if (this.backToTopButton) {
            this.backToTopButton.addEventListener('click', this.scrollToTop);
        }

        // Ouve o envio do formulário de newsletter
        if (this.newsletterForm) {
            this.newsletterForm.addEventListener('submit', this.handleNewsletterSubmit.bind(this));
        }

        // Ouve o clique no botão de aceitar cookies
        if (this.acceptCookiesBtn) {
            this.acceptCookiesBtn.addEventListener('click', this.handleCookieAccept.bind(this));
        }

        // ===== INÍCIO DA ALTERAÇÃO - EVENTOS DO NOVO CHAT =====
        // Adiciona o evento de clique para abrir/fechar o chat
        if (this.chatLauncher) {
            this.chatLauncher.addEventListener('click', () => {
                this.chatContainer.classList.toggle('open');
            });
        }
        
        // Adiciona o evento de clique para o botão 'X' dentro do chat
        if (this.closeChatBtn) {
            this.closeChatBtn.addEventListener('click', () => {
                this.chatContainer.classList.remove('open');
            });
        }
        // ===== FIM DA ALTERAÇÃO =====
    }
    
    // ===== INÍCIO DA ALTERAÇÃO - REMOÇÃO DA FUNÇÃO ANTIGA =====
    /**
     * A função initWhatsappWidget() foi removida pois não é mais necessária.
     * O controle do novo chat é feito pelos eventos e CSS.
     */
    // ===== FIM DA ALTERAÇÃO =====

    /**
     * Inicializa a biblioteca de animações (AOS).
     */
    initAOS() {
        AOS.init({
            duration: 800, // Duração da animação em milissegundos
            once: true,    // A animação acontece apenas uma vez
            offset: 100,   // Distância em pixels para disparar a animação
        });
    }

    /**
     * Lida com o efeito de scroll da barra de navegação.
     * Adiciona/remove a classe 'scrolled' para mudar o estilo.
     */
    handleNavbarScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    /**
     * Lida com o envio do formulário de newsletter.
     */
    handleNewsletterSubmit(event) {
        event.preventDefault(); // Impede o recarregamento da página
        this.newsletterSuccessMessage.textContent = 'Obrigado por se inscrever!';
        this.newsletterSuccessMessage.style.display = 'block';
        this.newsletterForm.reset();
        // Esconde a mensagem após 3 segundos
        setTimeout(() => { this.newsletterSuccessMessage.style.display = 'none'; }, 3000);
    }

    /**
     * Mostra ou esconde o botão "Voltar ao Topo" com base na rolagem.
     */
    handleBackToTopButton() {
        if (window.scrollY > 300) {
            this.backToTopButton.classList.add('visible');
        } else {
            this.backToTopButton.classList.remove('visible');
        }
    }

    /**
     * Executa a rolagem suave para o topo da página.
     */
    scrollToTop(event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Efeito de rolagem suave
        });
    }

    /**
     * Animação de contagem para as estatísticas quando elas se tornam visíveis.
     */
    initStatCounters() {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // Duração da animação em ms
                    let current = 0;
                    const increment = target / (duration / 16); // Calcula o incremento por frame

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter); // Continua a animação no próximo frame
                        } else {
                            counter.textContent = target; // Garante que o valor final seja exato
                        }
                    };
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(counter); // Para de observar após a animação
                }
            });
        }, { threshold: 0.7 });

        this.statCounters.forEach(counter => {
            observer.observe(counter);
        });
    }

    /**
     * Carregamento inteligente de imagens (Lazy Loading).
     * As imagens só são carregadas quando estão próximas de entrar na tela.
     */
    initLazyLoading() {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src; // Troca o placeholder pela imagem real
                    img.onload = () => img.classList.add('loaded'); // Adiciona classe para efeito de fade-in
                    observer.unobserve(img);
                }
            });
        });

        this.lazyImages.forEach(img => {
            observer.observe(img);
        });
    }

    /**
     * Gerencia o banner de cookies.
     * Verifica se o usuário já aceitou os cookies no passado.
     */
    initCookieBanner() {
        // Verifica se o cookie de consentimento já foi aceito
        if (!localStorage.getItem('cookieConsent')) {
            // Se não foi, mostra o banner após 2 segundos
            setTimeout(() => {
                this.cookieBanner.classList.add('visible');
            }, 2000);
        }
    }

    /**
     * Lida com o clique no botão de aceitar cookies.
     */
    handleCookieAccept() {
        // Salva a preferência do usuário no localStorage para não mostrar novamente
        localStorage.setItem('cookieConsent', 'true');
        // Esconde o banner
        this.cookieBanner.classList.remove('visible');
    }

    /**
     * DICAS DE OTIMIZAÇÃO DE PERFORMANCE
     */
    logPerformanceTips() {
        console.log("Lembrete de Performance: Comprima todas as imagens antes de colocar o site em produção!");
    }

    /**
     * Método para inicializar todas as funcionalidades do site.
     */
    init() {
        this.initAOS();
        this.initStatCounters();
        this.initLazyLoading();
        this.initCookieBanner();
        this.logPerformanceTips();
    }
}

/**
 * Espera o DOM (a estrutura da página) ser completamente construído para iniciar o script.
 */
document.addEventListener('DOMContentLoaded', () => {
    const site = new SiteManager();
    site.init();
});