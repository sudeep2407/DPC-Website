// Darjeeling Prime Cab Services - Main JS

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
      menuBtn.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
  }

  // Instant fare estimator (demo)
  const fareForm = document.getElementById('fare-form');
  const fareResult = document.getElementById('fare-result');
  const farePrice = document.getElementById('fare-price');
  const fareNote = document.getElementById('fare-note');

  if (fareForm) {
    fareForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pickup = document.getElementById('pickup').value.trim();
      const drop = document.getElementById('drop').value.trim();
      const vehicle = document.getElementById('vehicle').value;
      const tripType = document.getElementById('trip-type').value;

      if (!pickup || !drop) {
        alert('Please enter both pickup and drop locations.');
        return;
      }

      // Simple demo fare calculation
      const baseFares = {
        economy: 1499,
        sedan: 1999,
        suv: 2799,
        tempo: 4999
      };
      let base = baseFares[vehicle] || 1999;

      // Add multipliers for demo
      if (tripType === 'round') base = Math.round(base * 1.8);
      if (tripType === 'hourly') base = Math.round(base * 0.6) + ' /hr (min 4 hrs)';

      // Random small variation for realism
      const variation = Math.floor(Math.random() * 300) - 100;
      const finalFare = typeof base === 'number' ? base + variation : base;

      farePrice.textContent = typeof finalFare === 'number' ? `₹${finalFare.toLocaleString('en-IN')}` : finalFare;
      fareNote.textContent = `Approx. fare for ${vehicle.toUpperCase()} | ${tripType} trip. Final fare confirmed on booking. No hidden charges.`;
      fareResult.classList.add('show');
      fareResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // Book Now buttons - open WhatsApp with prefilled message
  document.querySelectorAll('[data-book]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const vehicle = btn.dataset.book || 'Cab';
      const msg = encodeURIComponent(`Hi Darjeeling Prime Cab Services! I want to book a ${vehicle}. Please share availability and fare.`);
      // Replace with real number later
      window.open(`https://wa.me/919733012345?text=${msg}`, '_blank');
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if (nav) nav.classList.remove('open');
      }
    });
  });
});
