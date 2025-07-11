// Manual de Identidad Corporativa AMEA - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navContainer = document.querySelector('.nav-container');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const backToTopBtn = document.querySelector('.back-to-top');
    const dosDontsItems = document.querySelectorAll('.dos-donts-item');
    
    // Cambiar estilo de navegación al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navContainer.classList.add('nav-scrolled');
            if (backToTopBtn) backToTopBtn.classList.add('visible');
        } else {
            navContainer.classList.remove('nav-scrolled');
            if (backToTopBtn) backToTopBtn.classList.remove('visible');
        }
    });
    
    // Menú móvil
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Botón volver arriba
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animación de elementos al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar para elementos visibles inicialmente
    
    // Efecto parallax para secciones con clase .parallax-section
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    if (parallaxSections.length > 0) {
        window.addEventListener('scroll', function() {
            parallaxSections.forEach(section => {
                const distance = window.scrollY;
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (distance > sectionTop - window.innerHeight && distance < sectionTop + sectionHeight) {
                    const yValue = (distance - sectionTop) * 0.5;
                    section.style.backgroundPositionY = `calc(50% + ${yValue}px)`;
                }
            });
        });
    }
    
    // Interactividad para los elementos Do's and Don'ts
    if (dosDontsItems.length > 0) {
        dosDontsItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Visor interactivo de colores
    const colorSwatches = document.querySelectorAll('.color-swatch');
    
    if (colorSwatches.length > 0) {
        colorSwatches.forEach(swatch => {
            swatch.addEventListener('click', function() {
                // Obtener el código HEX directamente del span con la clase .hex-code
                const hexValue = this.querySelector('.hex-code').textContent;

                // Crear un elemento temporal para copiar el valor hexadecimal
                const tempInput = document.createElement('input');
                tempInput.value = hexValue;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                
                // Mostrar mensaje de confirmación
                const tooltip = document.createElement('div');
                tooltip.className = 'color-tooltip';
                tooltip.textContent = '¡Color copiado!';
                tooltip.style.position = 'absolute';
                tooltip.style.top = '0';
                tooltip.style.left = '50%';
                tooltip.style.transform = 'translateX(-50%)';
                tooltip.style.backgroundColor = '#333';
                tooltip.style.color = '#fff';
                tooltip.style.padding = '5px 10px';
                tooltip.style.borderRadius = '3px';
                tooltip.style.fontSize = '12px';
                tooltip.style.zIndex = '1000';
                
                this.style.position = 'relative';
                this.appendChild(tooltip);
                
                setTimeout(() => {
                    this.removeChild(tooltip);
                }, 2000);
            });
        });
    }
    
    // Función para convertir RGB a Hexadecimal
    function rgbToHex(rgb) {
        // Extraer los valores R, G y B
        const rgbArray = rgb.match(/\d+/g);
        if (!rgbArray || rgbArray.length < 3) return '#000000';
        
        const r = parseInt(rgbArray[0]);
        const g = parseInt(rgbArray[1]);
        const b = parseInt(rgbArray[2]);
        
        // Convertir a hexadecimal
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }
    
    // Inicializar visualizador de tipografía
    const fontSizeSlider = document.getElementById('font-size-slider');
    const fontSampleText = document.querySelectorAll('.font-sample-text');
    
    if (fontSizeSlider && fontSampleText.length > 0) {
        fontSizeSlider.addEventListener('input', function() {
            const fontSize = this.value;
            document.getElementById('font-size-value').textContent = fontSize + 'px';
            
            fontSampleText.forEach(text => {
                text.style.fontSize = fontSize + 'px';
            });
        });
    }
    
    // Inicializar visualizador de logotipo
    const logoVersions = document.querySelectorAll('.logo-version');
    const logoPreview = document.getElementById('logo-preview');
    const logoPreviewImg = document.getElementById('logo-preview-img');
    const logoPreviewClose = document.getElementById('logo-preview-close');
    
    if (logoVersions.length > 0 && logoPreview && logoPreviewImg) {
        logoVersions.forEach(version => {
            const img = version.querySelector('img');
            
            if (img) {
                img.addEventListener('click', function() {
                    logoPreviewImg.src = this.src;
                    logoPreview.classList.add('active');
                });
            }
        });
        
        if (logoPreviewClose) {
            logoPreviewClose.addEventListener('click', function() {
                logoPreview.classList.remove('active');
            });
        }
    }
    
    // Inicializar ejemplos interactivos de Do's and Don'ts
    const dosExamples = document.querySelectorAll('.dos-example');
    const dontsExamples = document.querySelectorAll('.donts-example');
    
    if (dosExamples.length > 0) {
        dosExamples.forEach(example => {
            const beforeImg = example.querySelector('.before-img');
            const afterImg = example.querySelector('.after-img');
            const slider = example.querySelector('.comparison-slider');
            
            if (beforeImg && afterImg && slider) {
                slider.addEventListener('input', function() {
                    const value = this.value + '%';
                    afterImg.style.width = value;
                });
            }
        });
    }
    
    // Inicializar filtro para recursos descargables
    const resourceFilters = document.querySelectorAll('.resource-filter');
    const resourceItems = document.querySelectorAll('.resource-item');
    
    if (resourceFilters.length > 0 && resourceItems.length > 0) {
        resourceFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Actualizar filtros activos
                resourceFilters.forEach(f => f.classList.remove('active'));
                this.classList.add('active');
                
                // Filtrar recursos
                if (category === 'all') {
                    resourceItems.forEach(item => {
                        item.style.display = 'block';
                    });
                } else {
                    resourceItems.forEach(item => {
                        if (item.getAttribute('data-category') === category) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    }

    // --- INICIO: Código para el visor de imágenes (Lightbox) ---
    const logoLinks = document.querySelectorAll('.logo-version a');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    if (logoLinks.length > 0 && lightbox && lightboxImg && closeBtn) {
        logoLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Prevenir la navegación
                
                // Obtener la URL de la imagen del enlace
                const imgSrc = this.getAttribute('href');
                lightboxImg.setAttribute('src', imgSrc);
                
                // Mostrar el visor
                lightbox.style.display = 'flex';
            });
        });

        // Función para cerrar el visor
        const closeLightbox = function() {
            lightbox.style.display = 'none';
            lightboxImg.setAttribute('src', ''); // Limpiar la imagen
        }

        // Cerrar al hacer clic en el botón de cerrar
        closeBtn.addEventListener('click', closeLightbox);

        // Cerrar al hacer clic fuera de la imagen (en el fondo)
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    // --- FIN: Código para el visor de imágenes (Lightbox) ---

});
