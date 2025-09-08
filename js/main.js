// main.js
document.addEventListener('DOMContentLoaded', () => {
  // 모바일 메뉴 토글 기능
  const toggleButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleButton && navLinks) {
    toggleButton.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // 문의 폼 제출 기능
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('form-message');

  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      formMessage.textContent = 'Sending...';
      formMessage.style.color = '#000'; // 기본 텍스트 색상으로 설정

      try {
        const response = await fetch('https://send-contact-email-729272915521.australia-southeast1.run.app', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          formMessage.textContent = 'Your message has been sent successfully!';
          formMessage.style.color = 'green';
          contactForm.reset();
        } else {
          // 서버 응답에서 오류 메시지를 가져오거나 기본 메시지 사용
          throw new Error(result.message || 'Something went wrong on the server.');
        }

      } catch (error) {
        console.error('Error:', error);
        formMessage.textContent = 'Failed to send message. Please try again later.';
        formMessage.style.color = 'red';
      }
    });
  }
});