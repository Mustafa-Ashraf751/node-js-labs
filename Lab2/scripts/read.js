async function readAll() {
  try {
    const response = await fetch('/data.json');
    const data = await response.json();

    const mainContainer = document.querySelector('.main-container');

    data.forEach((element) => {
      const employeeDiv = document.createElement('div');
      employeeDiv.classList.add('employee');
      employeeDiv.innerHTML = `Name: ${element.name}<br>Email: ${element.email}<br>Salary: ${element.salary}<br>Level: ${element.level}<br>Years: ${element.years}`;
      mainContainer.appendChild(employeeDiv);
    });
  } catch (error) {
    console.error(error.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  readAll();
});
