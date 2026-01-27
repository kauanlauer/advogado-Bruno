// ===========================================
// LÓGICA SIMPLES E EFICIENTE - BRUNO MIRANDA
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Efeito na Navbar ao Rolar a Tela
    const navbar = document.querySelector('.trans-navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Garantir que o Vídeo Rode no Mobile
    // Alguns navegadores bloqueiam, isso força o play
    const video = document.getElementById('myVideo');
    if (video) {
        video.play().catch(function(error) {
            console.log("Autoplay de vídeo requer interação do usuário.");
        });
    }

    // 3. Fechar menu ao clicar no link (Para One Page)
    // Como usamos Bootstrap, precisamos fechar o Offcanvas manualmente ao clicar
    const navLinks = document.querySelectorAll('.nav-link');
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Fecha o menu suavemente
            bsOffcanvas.hide();
        });
    });
});

// Função auxiliar global para fechar menu (caso precise chamar no HTML)
function closeMenu() {
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement); 
    if(bsOffcanvas) {
        bsOffcanvas.hide();
    }
}