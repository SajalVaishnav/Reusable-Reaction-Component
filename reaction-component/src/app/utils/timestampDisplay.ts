export const formatDate = (date: Date): string => {
    // Format date part
    const optionsDate: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    const datePart = new Date(date).toLocaleDateString('en-US', optionsDate);
  
    // Format time part
    const optionsTime: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const timePart = new Date(date).toLocaleTimeString('en-US', optionsTime);
  
    // Combine date and time
    const formattedDate = `${datePart} ${timePart}`;
  
    return formattedDate;
};