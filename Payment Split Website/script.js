function updateForm() {
    const splitType = document.getElementById('splitType').value;
    const numPeople = parseInt(document.getElementById('numPeople').value);
    const percentageInputs = document.getElementById('percentageInputs');
  
    percentageInputs.innerHTML = '';
    if (splitType === 'unequal') {
      percentageInputs.style.display = 'block';
      for (let i = 1; i <= numPeople; i++) {
        const inputId = `percentage${i}`;
        const inputLabel = document.createElement('label');
        inputLabel.htmlFor = inputId;
        inputLabel.textContent = `Person ${i}:`;
  
        const input = document.createElement('input');
        input.type = 'number';
        input.id = inputId;
        input.step = '0.01';
        input.min = 0;
        input.max = 100;
        input.placeholder = 'Percentage';
        input.addEventListener('input', updateRemainingPercentage);
  
        const inputContainer = document.createElement('div');
        inputContainer.classList.add('input-container');
        inputContainer.appendChild(inputLabel);
        inputContainer.appendChild(input);
        percentageInputs.appendChild(inputContainer);
      }
    } else {
      percentageInputs.style.display = 'none';
    }
  }
  
  function updateRemainingPercentage() {
    let totalPercentage = 100;
    const numPeople = parseInt(document.getElementById('numPeople').value);
  
    for (let i = 1; i <= numPeople; i++) {
      const inputId = `percentage${i}`;
      const input = document.getElementById(inputId);
      const percentage = parseFloat(input.value);
      totalPercentage -= percentage;
    }
  
    document.getElementById('remainingPercentage').textContent = `Remaining: ${totalPercentage}%`;
  }
  
function calculateShares() {
    const amount = parseFloat(document.getElementById('amount').value);
    const numPeople = parseInt(document.getElementById('numPeople').value);
    const splitType = document.getElementById('splitType').value;
  
    let data = [];
    let labels = [];
  
    if (splitType === 'equal') {
      const share = amount / numPeople;
      for (let i = 0; i < numPeople; i++) {
        data.push(share);
        labels.push(`Person ${i + 1}`);
      }
    } else {
      const inputs = document.querySelectorAll('#percentageInputs input');
      let totalPercentage = 0;
      inputs.forEach(input => {
        const percentage = parseFloat(input.value);
        totalPercentage += percentage;
        if (percentage < 0 || percentage > 100) {
          alert('Please enter valid percentage shares (0-100) for all friends.');
          return;
        }
      });
  
      if (totalPercentage !== 100) {
        alert('Please ensure the total percentage shares equal 100%.');
        return;
      }
  
      for (let i = 1; i <= numPeople; i++) {
        const inputId = `percentage${i}`;
        const percentage = parseFloat(document.getElementById(inputId).value);
        const share = (percentage / 100) * amount;
        data.push(share);
        labels.push(`Person ${i}`);
      }
    }
  
    renderChart(data, labels);
  }
  
  function renderChart(data, labels) {
    const ctx = document.getElementById('sharesChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Share',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  
  document.getElementById('splitType').addEventListener('change', function() {
    updateForm();
  });
  
  updateForm();  