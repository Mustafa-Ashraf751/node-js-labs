import {validateOptions} from './validateOptions.js';

function addEmployee() {
  document.querySelector('.my-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userInputs = {
      name: data.get('name'),
      email: data.get('email'),
      salary: data.get('salary'),
      level: data.get('level') || 'Jr',
      years: data.get('years') || 0
    };
    try {
      validateOptions(userInputs);
      const response = await fetch('/employee', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify(userInputs)
      });
      if (response.ok) {
        alert('Employee added successfully!');
        e.target.reset();
      }
    } catch (error) {
      console.error('Some thing wrong with message: ', error.message);
      alert(`Error submitting form error: ${error.message}`);
    }
  });
}

addEmployee();
