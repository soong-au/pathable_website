document.addEventListener('DOMContentLoaded', () => {
  // ✅ 모바일 메뉴 토글
  const toggleButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggleButton && navLinks) {
    toggleButton.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // ✅ 문의 폼 제출
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('form-message');
  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      formMessage.textContent = 'Sending...';
      formMessage.style.color = '#000';

      try {
        const response = await fetch('https://send-contact-email-729272915521.australia-southeast1.run.app', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();

        if (response.ok) {
          formMessage.textContent = 'Your message has been sent successfully!';
          formMessage.style.color = 'green';
          contactForm.reset();
        } else {
          throw new Error(result.message || 'Something went wrong on the server.');
        }
      } catch (error) {
        console.error('Error:', error);
        formMessage.textContent = 'Failed to send message. Please try again later.';
        formMessage.style.color = 'red';
      }
    });
  }

  // ✅ 아코디언 기능 (하나만 열리는 형태)
  document.querySelectorAll(".accordion-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const isActive = button.classList.contains("active");

      // 모든 버튼 닫기
      document.querySelectorAll(".accordion-btn").forEach((btn) => {
        btn.classList.remove("active");
        btn.nextElementSibling.style.maxHeight = null;
        btn.nextElementSibling.style.padding = "0 20px";
      });

      // 현재 클릭한 버튼만 열기
      if (!isActive) {
        button.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.padding = "10px 20px";
      }
    });
  });
});
