window.addEventListener('scroll', debounce(toggleStickyNavbar, 50));

const navbar = document.getElementById("navbar");
const sticky = navbar.offsetTop;

function toggleStickyNavbar() {
  if (window.scrollY >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const sidenavElems = document.querySelectorAll('.sidenav');
  if (sidenavElems.length > 0) {
    M.Sidenav.init(sidenavElems, {
      menuWidth: 250,
      edge: 'left',
      closeOnClick: true,
      draggable: false
    });
  }

  const scrollspyElems = document.querySelectorAll('.scrollspy');
  if (scrollspyElems.length > 0) {
    M.ScrollSpy.init(scrollspyElems, {
      threshold: 0.6,
      activeClass: 'current'
    });
  }

  new WOW().init();

  const form = document.getElementById("contact_form");
  const submitBtn = document.getElementById("contact-form-submit-btn");
  const reCaptchaElement = document.querySelector(".g-recaptcha");
  const reCaptchaKey = form.getAttribute("data-recaptcha");
  let recaptchaResult = !reCaptchaKey;
  let formDirty = false;

  if (reCaptchaKey) {
    reCaptchaElement.style.display = "block";
  }

  function validateForm() {
    const isValid = form.checkValidity();
    submitBtn.disabled = !isValid || !recaptchaResult || !formDirty;
  }

  form.addEventListener("input", function() {
    formDirty = true;
    validateForm();
  });

  window.recaptchaSuccess = function() {
    recaptchaResult = true;
    validateForm();
  };

  window.recaptchaFail = function() {
    recaptchaResult = false;
    validateForm();
  };

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    if (form.checkValidity() && recaptchaResult) {
      fetch("https://submit-form.com/pu0QSXiBg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          phone: document.getElementById("phone").value,
          message: document.getElementById("message").value,
          "g-recaptcha-response": reCaptchaKey ? grecaptcha.getResponse() : "",
        }),
      })
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        M.toast({html: 'Message Successfully Sent', classes: 'success-toast'});
        form.reset();
        if (reCaptchaKey) grecaptcha.reset();
        recaptchaResult = reCaptchaKey ? false : true;
        validateForm();
      })
      .catch(error => {
        M.toast({html: 'Message Can Not Be Sent', classes: 'error-toast'});
        if (reCaptchaKey) grecaptcha.reset();
        console.error("There was a problem with the fetch operation:", error);
      });
    } else {
      if (reCaptchaKey) grecaptcha.reset();
      console.error("Form validation failed or reCAPTCHA not completed.");
    }
  });

    //copyright override
    const copyrightElement = document.querySelector(".footer-copyright-text");
    const copyrightText = copyrightElement.textContent;
    const startYear = parseInt(copyrightElement.dataset.startYear, 10);
    const currentYear = new Date().getFullYear();
    const updatedCopyright = copyrightText.replace(
        /©\s(\d{4})/,
        (match, year) => {
          if (currentYear > startYear) {
            return `© ${startYear}-${currentYear}`;
          }
          return `© ${startYear}`;
        }
      );
    copyrightElement.textContent = updatedCopyright;
});

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}