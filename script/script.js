
let myChart = null;
let allData = [];
let showAll = false;

document.addEventListener('DOMContentLoaded', () => {
    const idleScreen   = document.getElementById('idle-screen');
    const accBtns      = document.querySelectorAll('.accordion-btn');
    const panels       = document.querySelectorAll('.panel');
    const cameraStatus = document.getElementById('camera-status');
    const tubePickers  = document.querySelectorAll('.tube-picker');
    const resetBtn     = document.getElementById('reset-btn');
    const verlaufBtn     = document.getElementById('verlauf-btn');
    const chartContainer = document.getElementById('chart-container');

    

    const tubeColors = {};
  
    idleScreen.style.display = 'none';

    // Idle-Reappearance nach 30 s Inaktivität
    let idleTimer;
    const IDLE_TIMEOUT = 30000; // 30 Sekunden

    function showIdle() {
      idleScreen.style.display = 'flex';
      idleScreen.classList.remove('hidden');
      // send sgkmode to TD
      sendModustoTD('sgkm');
    }

    function resetIdleTimer() {
      clearTimeout(idleTimer);
      // Falls Idle gerade sichtbar ist, smooth ausblenden
      if (idleScreen.style.display !== 'none') {
        idleScreen.classList.add('hidden');
        idleScreen.addEventListener('transitionend', () => {
          idleScreen.style.display = 'none';
        }, { once: true });
      }
      idleTimer = setTimeout(showIdle, IDLE_TIMEOUT);
    }

    // Auf Activity-Events hören
    ['mousemove','keydown','click'].forEach(evt =>
      window.addEventListener(evt, resetIdleTimer)
    );

    // Timer initial starten
    resetIdleTimer();


  
    // 2) Accordion-Logik
    accBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const panel    = document.getElementById(targetId);
        console.log('targetId:', panel, 'panel:', panel);
        const isOpen   = panel.style.display === 'block';
  
        panels.forEach(p => p.style.display = 'none');
        accBtns.forEach(b => b.classList.remove('active'));
  
        if (!isOpen) {
          const id = btn.id;
          console.log('asd: ',id);
          // send mode to TD
          sendModustoTD(id);
          panel.style.display = 'block';
          btn.classList.add('active');
          if (targetId === 'auto-mode') initAutoMode();
        }
      });
    });
  
    // 4) Manual Mode: Picker
    tubePickers.forEach(picker => {
        picker.addEventListener('input', e => {
          const idx   = e.target.dataset.index;
          const color = e.target.value;
          const tube  = document.querySelector(`.tube[data-index="${idx}"]`);
          if (tube) tube.style.background = color;
      
          // State updaten
          tubeColors[idx] = hexToRgb(color);
          console.log(tubeColors);


          // test with first tube
          // sendColorToTD(tubeColors[0]); // tube nummer 0
          sendColorToTD(tubeColors);

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


    // Save-Button
    const saveBtn   = document.getElementById('save-btn');
    // const nameInput = document.getElementById('name-input');

    saveBtn.addEventListener('click', () => {
      console.log("tubeColors: ", tubeColors);
      // Name und Farben sammeln
      // const name   = nameInput.value.trim() || null;
      const payload = {
        name,
        farbe: { color: tubeColors }
      };

      fetch('script/save_colors.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (response.ok) {
          console.log('Farben gespeichert (HTTP ' + response.status + ')');
          fetchAndRenderChart();
        } else {
          console.error('Speichern fehlgeschlagen (HTTP ' + response.status + ')');
        }
      })
      .catch(err => console.error('Fehler beim Speichern:', err));
    });




    // Verlauf button
    verlaufBtn.addEventListener('click', () => {
      const isOpen = chartContainer.style.display !== 'none';
      chartContainer.style.display = isOpen ? 'none' : 'block';
      console.log(`Verlauf ${isOpen ? 'hidden' : 'shown'}`);
      if (!isOpen) fetchAndRenderChart();
    });


    // 6) Manual-Mode: Status-Buttons (RAINBOW, noiseCHOP, …)
      const manualBtns = document.querySelectorAll('#manual-buttons .manual-btn');
      manualBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Nur diese Taste toggeln, keine anderen de-/aktivieren
          btn.classList.toggle('active');
          const status = btn.classList.contains('active') ? 'active' : 'inactive';
          console.log(`${btn.id} ${status}`);
          if (status === 'active') {
            sendModustoTD(btn.id);
          }
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


// manueller Modus: Farbe an TD senden
function sendColorToTD(rgb) {
  const url = 'http://127.0.0.1:9047';
  const payload = {
    modus: 'manual',
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


// Manual-Mode: Status-Buttons (RAINBOW, noiseCHOP, …)
function sendModustoTD(modus) {
  const url = 'http://127.0.0.1:9047';
  const payload = {
    modus
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




// Chart-Daten holen und rendern
function fetchAndRenderChart() {
  fetch('script/get_colors.php')
    .then(r => r.json())
    .then(data => {
      // time + colors extrahieren
      allData = data.map(p => ({
        time:   p.time,
        colors: Object.values(p.colors)
      }));
      showAll = false;
      renderChart();
    });
}

function renderChart() {
  // nur die letzten 10 oder alle
  const rawData = showAll || allData.length <= 10
    ? allData
    : allData.slice(-10);
  const displayData = rawData;

  // Mehr anzeigen-Button steuern

  const labels    = displayData.map(p => p.time);
  const maxColors = Math.max(...displayData.map(p => p.colors.length));
  const datasets  = Array.from({ length: maxColors }, (_, i) => ({
    // label: `Tube ${i+1}`,
    data:  displayData.map(p => p.colors[i] ? 1 : 0),
    backgroundColor: displayData.map(p =>
      p.colors[i]
        ? `rgb(${p.colors[i].join(',')})`
        : 'rgba(0,0,0,0)'
    ),
    barThickness:      20,
    categoryPercentage: 0.8,
    barPercentage:      1.0,
  }));

  // Chart neu erzeugen oder updaten
  if (myChart) myChart.destroy();
  myChart = new Chart(
    document.getElementById('myChart').getContext('2d'),
    {
      type: 'bar',
      data: { labels, datasets },
      options: {
        indexAxis: 'y',
        plugins: {
          legend:  { display: false },
          tooltip: { enabled: false }
        },
        scales: {
         x: {
           stacked: true,
           ticks: { display: false }      // blendet X-Achsen-Beschriftung aus
         },
         y: {
           stacked: true
         }
       },
        animation: { duration: 800, easing: 'easeOutQuad' }
      }
    }
  );
}