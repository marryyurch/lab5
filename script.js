function validateForm() {
  const namePattern = /^[А-ЯІЇЄҐ][а-яіїєґ]{1,20} [А-ЯІЇЄҐ]\.[А-ЯІЇЄҐ]\.$/;
  const variantPattern = /^\d{1,2}$/; 
  const groupPattern = /^[А-ЯІЇЄҐA-Z]{2}-\d{2}$/;
  const facultyPattern = /.+/;

  const name = document.getElementById('name').value.trim();
  const variant = document.getElementById('variant').value.trim();
  const group = document.getElementById('group').value.trim();
  const faculty = document.getElementById('faculty').value.trim();
  const birthDate = document.getElementById('birthDate').value.trim();

  document.querySelectorAll('.input-field').forEach(input => input.classList.remove('error'));
  document.querySelectorAll('.error-message').forEach(span => span.style.display = 'none');

  let valid = true;

  if (!namePattern.test(name)) {
      document.getElementById('name').classList.add('error');
      document.getElementById('nameError').style.display = 'block';
      valid = false;
  }
  if (!variantPattern.test(variant)) {
      document.getElementById('variant').classList.add('error');
      document.getElementById('variantError').style.display = 'block';
      valid = false;
  }
  if (!groupPattern.test(group)) {
      document.getElementById('group').classList.add('error');
      document.getElementById('groupError').style.display = 'block';
      valid = false;
  }
  if (!facultyPattern.test(faculty)) {
    document.getElementById('faculty').classList.add('error');
    document.getElementById('facultyError').style.display = 'block';
    valid = false;
}
  if (!birthDate) {
    document.getElementById('birthDate').classList.add('error');
    document.getElementById('birthDateError').style.display = 'block';
    valid = false;
}
  

  if (valid) {
      document.getElementById('outputName').innerText = `ПІБ: ${name}`;
      document.getElementById('outputVariant').innerText = `Варіант: ${variant}`;
      document.getElementById('outputGroup').innerText = `Група: ${group}`;
      document.getElementById('outputFaculty').innerText = `Факультет: ${faculty}`;
      document.getElementById('outputBirthDate').innerText = `Дата народження: ${birthDate}`;
  } else {
      alert('Будь ласка, виправте помилки у вашій формі');
  }
}

let lastSelectedColor = '#000000';

function createTable() {
  const table = document.getElementById('colorTable');
  let counter = 1;

  for (let i = 0; i < 6; i++) {
      const row = table.insertRow();

      for (let j = 0; j < 6; j++) {
          const cell = row.insertCell();
          cell.innerText = counter;
          cell.dataset.number = counter;
          counter++;
          
          cell.addEventListener('mouseover', function () {
              const variantNumber = 9;
              if (parseInt(cell.dataset.number) === variantNumber) {
                  const randomColor = getRandomColor();
                  cell.style.backgroundColor = randomColor;
                  cell.style.color = getRandomColor();
              }
          });

          cell.addEventListener('click', function () {
              const variantNumber = 9;
              if (parseInt(cell.dataset.number) === variantNumber) {
                  const colorPicker = document.getElementById('colorPicker');
                  colorPicker.click();
                  colorPicker.onchange = function() {
                      lastSelectedColor = colorPicker.value;
                      cell.style.backgroundColor = lastSelectedColor;
                      cell.style.color = '#FFFFFF';
                  };
              }
          });

          cell.addEventListener('dblclick', function () {
              const variantNumber = 9;
              if (parseInt(cell.dataset.number) === variantNumber) {
                  changeDiagonalColors(lastSelectedColor);
              }
          });
      }
  }
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function changeDiagonalColors(color) {
  const table = document.getElementById('colorTable');
  const rows = table.rows;

  for (let i = 0; i < rows.length; i++) {
      const cell = rows[i].cells[4];
      if (cell) {
        cell.style.backgroundColor = color;
        cell.style.color = '#FFFFFF';
      }
  }
}

window.onload = function() {
  createTable();
};