export const getPlatformFee = transactionAmount => {
    let fee = 0;
  
    if (transactionAmount <= 100) {
      fee = transactionAmount * 0.1;
      return Math.max(fee, 5); // Apply minimum fee of $5
    } else if (transactionAmount <= 499) {
      fee = transactionAmount * 0.09;
    } else if (transactionAmount <= 999) {
      fee = transactionAmount * 0.08;
    } else if (transactionAmount <= 4999) {
      fee = transactionAmount * 0.07;
    } else if (transactionAmount <= 9999) {
      fee = transactionAmount * 0.06;
    } else if (transactionAmount <= 19999) {
      fee = transactionAmount * 0.05;
    } else if (transactionAmount <= 49999) {
      fee = transactionAmount * 0.04;
    } else {
      fee = transactionAmount * 0.03;
      return Math.min(fee, 2000); // Apply maximum fee of $2000
    }
    // round off to 2 decimal places
    return Math.round(fee * 100) / 100;
  };
  
  export default getPlatformFee;
  