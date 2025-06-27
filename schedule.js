async function fetchSchedule() {
  const proxyUrl = 'https://api.allorigins.win/get?url=';
  const targetUrl = encodeURIComponent('https://www.rollcall.com/schedule/white-house/');
  const url = `${proxyUrl}${targetUrl}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, 'text/html');
    const scheduleItems = doc.querySelectorAll('.entry-content > *');

    let html = '';
    scheduleItems.forEach(item => {
      html += `<p>${item.textContent}</p>`;
    });

    document.getElementById('schedule').innerHTML = html || 'No schedule found.';
  } catch (error) {
    document.getElementById('schedule').innerHTML = 'Failed to load schedule.';
    console.error(error);
  }
}

fetchSchedule();
