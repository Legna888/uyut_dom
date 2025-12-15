// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".mobile-menu-toggle")
  const nav = document.querySelector(".nav")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 767) {
        nav.classList.remove("active")
      }
    })
  })

  // Slider functionality
  const slides = document.querySelectorAll(".slide")
  const prevBtn = document.querySelector(".slider-btn.prev")
  const nextBtn = document.querySelector(".slider-btn.next")
  const dotsContainer = document.querySelector(".slider-dots")

  if (slides.length > 0) {
    let currentSlide = 0

    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement("div")
      dot.classList.add("slider-dot")
      if (index === 0) dot.classList.add("active")
      dot.addEventListener("click", () => goToSlide(index))
      dotsContainer.appendChild(dot)
    })

    const dots = document.querySelectorAll(".slider-dot")

    function showSlide(n) {
      slides.forEach((slide) => slide.classList.remove("active"))
      dots.forEach((dot) => dot.classList.remove("active"))

      if (n >= slides.length) currentSlide = 0
      if (n < 0) currentSlide = slides.length - 1

      slides[currentSlide].classList.add("active")
      dots[currentSlide].classList.add("active")
    }

    function nextSlide() {
      currentSlide++
      showSlide(currentSlide)
    }

    function prevSlide() {
      currentSlide--
      showSlide(currentSlide)
    }

    function goToSlide(n) {
      currentSlide = n
      showSlide(currentSlide)
    }

    if (prevBtn) prevBtn.addEventListener("click", prevSlide)
    if (nextBtn) nextBtn.addEventListener("click", nextSlide)

    // Auto-play slider
    setInterval(nextSlide, 5000)
  }

  // Newsletter form
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value
      alert("Спасибо за подписку! Мы будем присылать вам новости на " + email)
      this.reset()
    })
  }

  // Contact form
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()
      alert("Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.")
      this.reset()
    })
  }

  // Catalog page functionality
  const searchInput = document.getElementById("searchInput")
  const categoryCheckboxes = document.querySelectorAll("[data-category]")
  const productsGrid = document.getElementById("productsGrid")
  const resultsCount = document.getElementById("resultsCount")
  const resetFiltersBtn = document.getElementById("resetFilters")

  if (productsGrid) {
    function filterProducts() {
      const searchTerm = searchInput ? searchInput.value.toLowerCase() : ""
      const selectedCategories = Array.from(categoryCheckboxes)
        .filter((cb) => cb.checked)
        .map((cb) => cb.dataset.category)

      const products = productsGrid.querySelectorAll(".product-card")
      let visibleCount = 0

      products.forEach((product) => {
        const category = product.dataset.category
        const title = product.querySelector("h3").textContent.toLowerCase()
        const description = product.querySelector(".product-description").textContent.toLowerCase()

        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category)
        const matchesSearch = searchTerm === "" || title.includes(searchTerm) || description.includes(searchTerm)

        if (matchesCategory && matchesSearch) {
          product.style.display = "block"
          visibleCount++
        } else {
          product.style.display = "none"
        }
      })

      if (resultsCount) {
        resultsCount.textContent = visibleCount
      }
    }

    if (searchInput) {
      searchInput.addEventListener("input", filterProducts)
    }

    categoryCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", filterProducts)
    })

    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener("click", () => {
        if (searchInput) searchInput.value = ""
        categoryCheckboxes.forEach((cb) => (cb.checked = true))
        filterProducts()
      })
    }
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href === "#") return

      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})
