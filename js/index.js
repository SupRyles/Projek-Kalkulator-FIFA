function hitungWe(Ra, Rb) {
  return 1 / (Math.pow(10, -(Ra - Rb) / 600) + 1);
}

function hitungPoinBaru(Pbefore, I, W, We) {
  return Pbefore + I * (W - We);
}

function hitungPoin() {
  const homeCountry =
    document.getElementById("homeCountry").value || "Tim Home";

  const awayCountry =
    document.getElementById("awayCountry").value || "Tim Away";

  const homePoints = parseFloat(document.getElementById("homePoints").value);

  const awayPoints = parseFloat(document.getElementById("awayPoints").value);

  const matchWeight = parseFloat(document.getElementById("tipeMatch").value);

  if (isNaN(homePoints) || isNaN(awayPoints)) {
    alert("Masukkan poin FIFA kedua tim terlebih dahulu.");
    return;
  }

  const hasil = document.querySelector('input[name="hasil"]:checked').value;

  let W_home;
  let W_away;

  if (hasil === "home") {
    W_home = 1;
    W_away = 0;
  } else if (hasil === "away") {
    W_home = 0;
    W_away = 1;
  } else {
    W_home = 0.5;
    W_away = 0.5;
  }

  const We_home = hitungWe(homePoints, awayPoints);
  const We_away = hitungWe(awayPoints, homePoints);

  const poinBaruHome = hitungPoinBaru(homePoints, matchWeight, W_home, We_home);

  const poinBaruAway = hitungPoinBaru(awayPoints, matchWeight, W_away, We_away);

  const perubahanHome = poinBaruHome - homePoints;
  const perubahanAway = poinBaruAway - awayPoints;

  document.getElementById("hasilmatch").innerHTML = `
    <div class="result-box">

      <h2>Hasil Perhitungan</h2>

      <hr>

      <h3>${homeCountry}</h3>

      <p><strong>Poin Sebelumnya:</strong> ${homePoints.toFixed(3)}</p>
      <p><strong>Expected Result (We):</strong> ${We_home.toFixed(3)}</p>
      <p><strong>Poin Baru:</strong> ${poinBaruHome.toFixed(3)}</p>

      <p class="${perubahanHome >= 0 ? "plus" : "minus"}">
        <strong>Perubahan:</strong>
        ${perubahanHome >= 0 ? "+" : ""}
        ${perubahanHome.toFixed(3)}
      </p>

      <br>

      <h3>${awayCountry}</h3>

      <p><strong>Poin Sebelumnya:</strong> ${awayPoints.toFixed(3)}</p>
      <p><strong>Expected Result (We):</strong> ${We_away.toFixed(3)}</p>
      <p><strong>Poin Baru:</strong> ${poinBaruAway.toFixed(3)}</p>

      <p class="${perubahanAway >= 0 ? "plus" : "minus"}">
        <strong>Perubahan:</strong>
        ${perubahanAway >= 0 ? "+" : ""}
        ${perubahanAway.toFixed(3)}
      </p>

    </div>
  `;
}
