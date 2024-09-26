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
    reCaptchaElement.classList.remove("hide");
    reCaptchaElement.classList.add("show");
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
    const consentCheckbox = document.getElementById("consent");
    if (!consentCheckbox.checked) {
        M.toast({html: 'You must agree to the Privacy Policy and Terms of Use.', classes: 'warning-toast'});
        return;
    }

    if (form.checkValidity() && recaptchaResult) {
      submitBtn.disabled = true;
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
          consent: document.getElementById("consent").value,
          "g-recaptcha-response": reCaptchaKey ? grecaptcha.getResponse() : "",
        }),
      })
      .then(response => {
        submitBtn.disabled = false;
        if (!response.ok) throw new Error("Network response was not ok");
        M.toast({html: 'Message Successfully Sent', classes: 'success-toast'});
        form.reset();
        if (reCaptchaKey) grecaptcha.reset();
        recaptchaResult = reCaptchaKey ? false : true;
        validateForm();
      })
      .catch(error => {
        M.toast({html: 'Message Can Not Be Sent', classes: 'error-toast'});
        submitBtn.disabled = false;
        if (reCaptchaKey) grecaptcha.reset();
        console.error("There was a problem with the fetch operation:", error);
      });
    } else {
      if (reCaptchaKey) grecaptcha.reset();
      submitBtn.disabled = false;
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
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      const modalId = modal.getAttribute('id');
      const modalTriggers = document.querySelectorAll(`[href="#${modalId}"]`);
      modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(event) {
          event.preventDefault();
          if (!document.getElementById(modal.dataset.contentId)) {
            fetch(`../pages/${modalId}.html`)
              .then(response => response.text())
              .then(data => {
                modal.querySelector('.content-container').innerHTML = data;
                const elems = document.querySelectorAll('.modal');
                M.Modal.init(elems);
                const modalInstance = M.Modal.getInstance(document.getElementById(modalId));
                modalInstance.open();
              })
              .catch(error => console.error('Error loading modal content:', error));
          } else {
            const modalInstance = M.Modal.getInstance(document.getElementById(modalId));
            modalInstance.open();
          }
        });
      });
    });
});

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}