const charToDigit = {
  L: '1',
  U: '2',
  W: '3',
  A: '4',
  K: '5',
  T: '6',
  I: '7',
  G: '8',
  E: '9',
  R: '0'
};

let currentPrice = 0;

function appendCode(char) {
  document.getElementById('display').value += char;
  clearMessages();
}

function clearDisplay() {
  document.getElementById('display').value = '';
  clearMessages();
  currentPrice = 0;
}

function backspace() {
  const display = document.getElementById('display');
  display.value = display.value.slice(0, -1);
  clearMessages();
}

function clearMessages() {
  document.getElementById('result').textContent = '';
  document.getElementById('error').textContent = '';
}

function calculatePrice() {
  const input = document.getElementById('display').value.toUpperCase();
  const parts = input.split('+').map(part => part.trim());

  let total = 0;

  for (let part of parts) {
    let translated = '';
    for (let char of part) {
      if (charToDigit[char] !== undefined) {
        translated += charToDigit[char];
      } else {
        document.getElementById('error').textContent = `Karakter "${char}" tidak dikenali.`;
        document.getElementById('result').textContent = '';
        return;
      }
    }

    if (translated !== '') {
      total += parseInt(translated, 10) * 1000;
    }
  }

  currentPrice = total;
  document.getElementById('result').textContent = `Total: Rp${total.toLocaleString('id-ID')}`;
}

function applyDiscount(percent) {
  if (currentPrice === 0) {
    document.getElementById('error').textContent = 'Hitung total dulu sebelum memberi diskon.';
    return;
  }

  const discounted = currentPrice - (currentPrice * percent / 100);
  document.getElementById('result').textContent = 
    `Total: Rp${currentPrice.toLocaleString('id-ID')}\nDiskon ${percent}% → Rp${discounted.toLocaleString('id-ID')}`;
}