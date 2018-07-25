export default function ToCustomDateFilter($filter) {
  const formatDate = (date) => $filter('date')(date, 'dd.MM.yyyy');

	return (timestamp) => {
    const now = new Date();
    const tomorrow = new Date().setDate(now.getDate() + 1);
		const yesterday = new Date().setDate(now.getDate() - 1);
    
		const viewDate = formatDate(timestamp);
   
		switch(viewDate) {
      case formatDate(now):
    		return 'Today';
      case formatDate(tomorrow):
    		return 'Tomorrow';
      case formatDate(yesterday):
    	  return 'Yesterday';
      default:
    		return viewDate;
      }
    };
}

ToCustomDateFilter.$inject = ['$filter'];