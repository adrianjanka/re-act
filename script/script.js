document.addEventListener('DOMContentLoaded', () => {
    const idleScreen   = document.getElementById('idle-screen');
    const accBtns      = document.querySelectorAll('.accordion-btn');
    const panels       = document.querySelectorAll('.panel');
    const cameraStatus = document.getElementById('camera-status');
    const tubePickers  = document.querySelectorAll('.tube-picker');
    const resetBtn     = document.getElementById('reset-btn');

    const tubeColors = {};
  
    // 1) Idle-Screen ausblenden
    const hideIdle = () => {
        idleScreen.classList.add('hidden');
        
        idleScreen.addEventListener('transitionend', () => {
          idleScreen.style.display = 'none';
        }, { once: true });
      
        window.removeEventListener('mousemove', hideIdle);
        window.removeEventListener('keydown', hideIdle);
      };
    window.addEventListener('mousemove', hideIdle);
    window.addEventListener('keydown', hideIdle);
  
    // 2) Accordion-Logik
    accBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const panel    = document.getElementById(targetId);
        const isOpen   = panel.style.display === 'block';
  
        panels.forEach(p => p.style.display = 'none');
        accBtns.forEach(b => b.classList.remove('active'));
  
        if (!isOpen) {
          panel.style.display = 'block';
          btn.classList.add('active');
          if (targetId === 'auto-mode') initAutoMode();
        }
      });
    });
  
    // 3) Auto-Mode: WebSocket
    window._autoSocket = null;
    function initAutoMode() {
      if (window._autoSocket) return;
      const socket = new WebSocket('ws://localhost:12345');
      window._autoSocket = socket;
  
      socket.onopen = () => cameraStatus.textContent = 'Connecting to camera…';
      socket.onmessage = evt => {
        try {
          const data = JSON.parse(evt.data);
          cameraStatus.textContent = data.status === 'ok'
            ? 'Person erkannt – Aufnahme startet…'
            : 'Bitte vor die Kamera stellen :)';
        } catch(e) { console.error(e); }
      };
      socket.onerror = () => cameraStatus.textContent = 'Verbindungsfehler.';
      socket.onclose = () => cameraStatus.textContent = 'Verbindung geschlossen.';
    }
  
    // 4) Manual Mode: Picker
    tubePickers.forEach(picker => {
        picker.addEventListener('input', e => {
          const idx   = e.target.dataset.index;
          const color = e.target.value;
          const tube  = document.querySelector(`.tube[data-index="${idx}"]`);
          if (tube) tube.style.background = color;
      
          // State updaten
          tubeColors[idx] = color;
          console.log(tubeColors);

          // test with first tube
          console.log(tubeColors[0]);
          sendColorToTD(tubeColors[0]);


        });
      });


      // 5) Reset-Button
      resetBtn.addEventListener('click', () => {
      // State zurücksetzen
      for (let idx in tubeColors) {
        delete tubeColors[idx];
      }
      
      // Picker und Röhren auf Default zurücksetzen
      tubePickers.forEach(picker => {
        picker.value = "#000000";
        const i = picker.dataset.index;
        const tube = document.querySelector(`.tube[data-index="${i}"]`);
        if (tube) tube.style.background = "#BBBBBB";
      });

      console.log('Colors reset:', tubeColors);
    });


    // 6) Manual-Mode: Status-Buttons (RAINBOW, noiseCHOP, …)
      const manualBtns = document.querySelectorAll('#manual-buttons .manual-btn');
      manualBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Nur diese Taste toggeln, keine anderen de-/aktivieren
          btn.classList.toggle('active');
          const status = btn.classList.contains('active') ? 'active' : 'inactive';
          console.log(`${btn.id} ${status}`);
        });
      });


  });



// Helper-Funktion: Hex zu RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}


function sendColorToTD(hexcolor) {
  const url = 'http://127.0.0.1:9047';
  const rgb = hexToRgb(hexcolor);
  const payload = {
    color: rgb
  };
  myBody = JSON.stringify(payload);
  console.log("mybody: ",myBody);

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: myBody
  })
  .then(response => {
    console.log('Sent:', payload, 'response:', response)
    console.log('HTTP-Status:', response.status);
})
  .catch(error => console.error('Fehler beim Senden:', error));
}