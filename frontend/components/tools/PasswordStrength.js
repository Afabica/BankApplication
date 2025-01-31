//"use server";

//export async function eveluatePassword(password) => {
//    let score = 0;
//    let geedback = '';

//    if(password.length >= 8) score++;
//    else feedback = 'Password must be at least 8 characters';

//    if(/[A-Z]/.test(password)) score++;
//    else if (password.length >= 8) feedback = 'Add an uppercase letters';

//    if(/[a-z]/.test(password)) score++;
//    else if (password.length >= 8) feedback = 'Add l lowercase letters'
    
//    if(/\d/.test(password)) score++;
//    else if(password.length >= 8) feedback = 'Add a number to you password';

//    if(/[!@#$%^&*(),.|<>}{]/.test(password)) score++;
//   else if(password.length >= 8) feedback = 'Add a special character to your password.';

//    setStrength(score);
//    setFeedback(score == 5 ? 'Strong password' : feedback);
//}

//export default const = (strength) => {
//    switch(strength) {
//        case 0:
//        case 1: 
//            return 'Very Weak';
//        case 2: 
 //           return 'Weak';
  //      case 3:
  //          return 'Moderate';
  //      case 4: 
  //          return 'Strong';
  //      case 5:
   //         return 'Very Strong';
   //     default: 
   //         return '';
   // }
//}

//export default const = (strength) => {
//    switch(strength) {
//        case 1: 
//            return 'red';
//case 2: 
//            return 'orange';
//        case 3: 
//            return 'yellow';
//        case 4:
//            return 'lightgreen';
//       case 5:
//            return 'green';
//        case 6:
//            return 'green';
//        default:
//            return 'gray';
//    }
//}
