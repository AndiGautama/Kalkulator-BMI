let selectedGender = '';

function selectGender(gender) {
    document.querySelectorAll('.gender-card').forEach(card => {
        card.classList.remove('active');
    });
    
    document.getElementById(gender + '-card').classList.add('active');
    selectedGender = gender;
    hideResult();
}

function calculateBMI() {
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    
    if (!weight || !height || weight <= 0 || height <= 0) {
        showResult('Error', 'Harap masukkan nilai yang valid!', '', 'error');
        return;
    }
    
    if (!selectedGender) {
        showResult('Error', 'Harap pilih jenis kelamin!', '', 'error');
        return;
    }
    
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    let category, description, cssClass;
    
    if (bmi < 18.5) {
        category = 'Kurus';
        description = selectedGender === 'male'
            ? 'Berat badan Anda di bawah normal untuk pria. Disarankan untuk menambah berat badan dengan pola makan bergizi tinggi protein dan latihan kekuatan.'
            : 'Berat badan Anda di bawah normal untuk wanita. Disarankan untuk menambah berat badan dengan pola makan sehat dan olahraga yang tepat.';
        cssClass = 'underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal';
        description = selectedGender === 'male'
            ? 'Selamat! Berat badan Anda ideal untuk pria. Pertahankan dengan olahraga rutin dan pola makan seimbang.'
            : 'Selamat! Berat badan Anda ideal untuk wanita. Pertahankan pola hidup sehat dengan makan bergizi dan olahraga teratur.';
        cssClass = 'normal';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Kelebihan Berat';
        description = selectedGender === 'male'
            ? 'Anda memiliki kelebihan berat badan. Disarankan untuk mengurangi berat badan melalui kombinasi diet dan latihan kardio serta kekuatan.'
            : 'Anda memiliki kelebihan berat badan. Disarankan untuk mengurangi berat badan melalui diet sehat dan olahraga rutin.';
        cssClass = 'overweight';
    } else {
        category = 'Obesitas';
        description = selectedGender === 'male'
            ? 'Anda mengalami obesitas. Sangat disarankan untuk berkonsultasi dengan dokter dan ahli gizi untuk program penurunan berat badan yang aman.'
            : 'Anda mengalami obesitas. Sangat disarankan untuk berkonsultasi dengan dokter untuk program penurunan berat badan yang aman dan efektif.';
        cssClass = 'obese';
    }
    
    showResult(bmi.toFixed(1), category, description, cssClass);
}

function showResult(bmiValue, category, description, cssClass) {
    const result = document.getElementById('result');
    document.getElementById('bmiValue').textContent = bmiValue;
    document.getElementById('bmiCategory').textContent = category;
    document.getElementById('bmiDescription').textContent = description;
    
    result.className = 'result-box';
    result.classList.add(cssClass);
    result.style.display = 'block';
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideResult() {
    document.getElementById('result').style.display = 'none';
}

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateBMI();
    }
});

document.getElementById('weight').addEventListener('input', hideResult);
document.getElementById('height').addEventListener('input', hideResult);
