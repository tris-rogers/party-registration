export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
};

export const isValidPostcode = (postcode: string): boolean => {
    const postcodeRegex = /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2}$/;
    return postcodeRegex.test(postcode.trim());
};

export const isValidDateOfBirth = (date: string): boolean => {
    // Check YYYY-MM-DD format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return false;
    }

    const [year, month, day] = date.split("-").map(Number);

    // Check that it's a real calendar date
    const parsedDate = new Date(Date.UTC(year, month - 1, day));

    const isRealDate =
        parsedDate.getUTCFullYear() === year &&
        parsedDate.getUTCMonth() === month - 1 &&
        parsedDate.getUTCDate() === day;

    if (!isRealDate) {
        return false;
    }

    // Check that the date isn't in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dob = new Date(year, month - 1, day);
    dob.setHours(0, 0, 0, 0);

    return dob <= today;
};