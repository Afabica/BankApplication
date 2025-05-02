// utils/passwordUtils.js

export async function evaluatePassword(password) {
  let score = 0;
  let feedback = '';

  // Check password length
  if (password.length >= 8) {
    score++;
  } else {
    feedback = 'Password must be at least 8 characters';
  }

  // Check for uppercase letter
  if (/[A-Z]/.test(password)) {
    score++;
  } else if (password.length >= 8 && !feedback) {
    feedback = 'Add an uppercase letter';
  }

  // Check for lowercase letter
  if (/[a-z]/.test(password)) {
    score++;
  } else if (password.length >= 8 && !feedback) {
    feedback = 'Add a lowercase letter';
  }

  // Check for a number
  if (/\d/.test(password)) {
    score++;
  } else if (password.length >= 8 && !feedback) {
    feedback = 'Add a number to your password';
  }

  // Check for special character
  if (/[@$!%*?&#]/.test(password)) {
    score++;
  } else if (password.length >= 8 && !feedback) {
    feedback = 'Add a special character';
  }

  // Return feedback based on strength score
  const strength = score;
  const strengthLabel = getStrengthLabel(strength);
  const strengthColor = getStrengthColor(strength);

  return { strength, feedback: feedback || strengthLabel, color: strengthColor };
}

// Function to get strength label based on score
export function getStrengthLabel(strength) {
  switch (strength) {
    case 0:
    case 1:
      return 'Very Weak';
    case 2:
      return 'Weak';
    case 3:
      return 'Moderate';
    case 4:
      return 'Strong';
    case 5:
      return 'Very Strong';
    default:
      return '';
  }
}

// Function to get strength color based on score
export function getStrengthColor(strength) {
  switch (strength) {
    case 1:
      return 'red';
    case 2:
      return 'orange';
    case 3:
      return 'yellow';
    case 4:
      return 'lightgreen';
    case 5:
      return 'green';
    default:
      return 'gray';
  }
}
