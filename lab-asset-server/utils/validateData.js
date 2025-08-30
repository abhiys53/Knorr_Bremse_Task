// utils/validateData.js

/**
 * Validate IP address format
 * @param {string} ip 
 * @returns {boolean}
 */
exports.isValidIP = (ip) => {
  const regex = /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
  return regex.test(ip);
};

/**
 * Validate date range: start should be before end
 * @param {string|Date} start 
 * @param {string|Date} end 
 * @returns {boolean}
 */
exports.isValidDateRange = (start, end) => {
  return new Date(start) < new Date(end);
};
