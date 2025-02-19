export function validateOptions(result) {
  if (!result.email || result.email.trim() === '') {
    throw new Error('The Email is required please try again!');
  }
  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/;
  if (!emailRegex.test(result.email)) {
    throw new Error('Invalid email format please try again!');
  }
  if (!result.salary) {
    throw new Error('Salary is required please try again!');
  }
  if (Number.isNaN(result.salary) || Number.isNaN(result.years)) {
    throw new TypeError('Invalid number format please try again!');
  }
  if (result.salary < 0 || result.years < 0) {
    throw new Error('The number must be positive value!');
  }
  const levels = Object.freeze({
    JR: 'Jr',
    MID: 'Mid-Level',
    SR: 'Sr',
    LEAD: 'Lead'
  });

  if (!Object.values(levels).includes(result.level)) {
    throw new Error(
      'Please choose one of the following choices (Jr,Mid-Level,Sr,Lead)'
    );
  }
}
