import { useState, useEffect } from 'react';

const useLongPolling = (endpoint) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true; // Flag to check if the component is still mounted
    let timeoutId; // Variable to store the timer identifier

    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        const newData = await response.json();
        if (isMounted) {
          setData(newData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Set a new timeout for the next poll only if the component is still mounted
        if (isMounted) {
          timeoutId = setTimeout(poll, 2000);
        }
      }
    };

    const poll = async () => {
      await fetchData();
    };

    poll(); // Start the initial poll when the component mounts

    // Clean-up function
    return () => {
      isMounted = false; // Set the flag to false when the component is unmounted
      clearTimeout(timeoutId); // Clear the timeout using the identifier
    };
  }, [endpoint]);

  return data;
};

export default useLongPolling;
