// Funcionalidad de navegación (sin lógica de semanas)
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing navigation...")

  // Navegación entre secciones
  const navButtons = document.querySelectorAll(".nav-btn")
  const contentSections = document.querySelectorAll(".content-section")

  console.log("Found nav buttons:", navButtons.length)
  console.log("Found content sections:", contentSections.length)

  // Asegurar que "Sobre Mí" esté activo por defecto
  const defaultSection = document.getElementById("sobremi")
  const defaultButton = document.querySelector('[data-section="sobremi"]')

  if (defaultSection && defaultButton) {
    // Quitar todas las clases activas primero
    navButtons.forEach((btn) => btn.classList.remove("active"))
    contentSections.forEach((section) => section.classList.remove("active"))

    // Activar la sección por defecto
    defaultButton.classList.add("active")
    defaultSection.classList.add("active")
    console.log("Default section activated: sobremi")
  }

  navButtons.forEach((button, index) => {
    console.log(`Button ${index}:`, button.getAttribute("data-section"))

    button.addEventListener("click", () => {
      const targetSection = button.getAttribute("data-section")
      console.log("Clicked button for section:", targetSection)

      // Quitar clase activa de todos los botones y secciones
      navButtons.forEach((btn) => btn.classList.remove("active"))
      contentSections.forEach((section) => section.classList.remove("active"))

      // Agregar clase activa al botón clickeado
      button.classList.add("active")

      // Agregar clase activa a la sección correspondiente
      const targetElement = document.getElementById(targetSection)
      if (targetElement) {
        targetElement.classList.add("active")
        console.log("Activated section:", targetSection)
      } else {
        console.error("Target element not found:", targetSection)
      }
    })
  })

  // Toggle del menú móvil
  const mobileMenu = document.getElementById("mobile-menu")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }

  // Scroll suave para los enlaces de navegación
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Animar las barras de habilidades cuando aparecen en pantalla
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillBars = entry.target.querySelectorAll(".skill-progress")
        skillBars.forEach((bar) => {
          const width = bar.style.width
          bar.style.width = "0%"
          setTimeout(() => {
            bar.style.width = width
          }, 100)
        })
      }
    })
  }, observerOptions)

  const skillsSection = document.querySelector("#sobremi")
  if (skillsSection) {
    observer.observe(skillsSection)
  }

  // Añadir efecto al hacer scroll en la barra de navegación
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (navbar) {
      if (window.scrollY > 100) {
        navbar.style.background = "rgba(0, 0, 0, 0.95)"
      } else {
        navbar.style.background = "rgba(0, 0, 0, 0.8)"
      }
    }
  })

  // Añadir animación de carga a las tarjetas de proyectos
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"

    setTimeout(() => {
      card.style.transition = "all 0.6s ease"
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }, index * 200)
  })

  // Funcionalidad para el formulario de contacto
  const contactBtn = document.querySelector(".contact-btn")
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      alert("¡Gracias por tu interés! Pronto implementaremos el formulario de contacto.")
    })
  }

  // Añadir efecto de escritura en el título principal
  const heroTitle = document.querySelector(".hero-title .gradient-text")
  if (heroTitle) {
    const text = heroTitle.textContent
    heroTitle.textContent = ""

    let i = 0
    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }

    // Iniciar efecto de escritura después de un retraso
    setTimeout(typeWriter, 1000)
  }
})

// Función para hacer scroll suave al contenido
function scrollToContent() {
  const contentElement = document.getElementById("contenido")
  if (contentElement) {
    contentElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Añadir animación de aparición para las secciones
const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
)

// Aplicar animación fade-in a todas las secciones de contenido
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".content-section")
  sections.forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(30px)"
    section.style.transition = "all 0.8s ease"
    fadeInObserver.observe(section)
  })
})
