import { useEffect, useState } from 'react';

import { scrollHandler } from '../utility/utility';
import { useHistory } from 'react-router-dom';

const useFetch = (countryParam, cityParam, initialUrl) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [url, setUrl] = useState(initialUrl);

  let history = useHistory();

  useEffect(() => {
    if (url) {
      setIsLoading(true);

      const fetchData = async () => {
        try {
          const response = await fetch(url);

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message);
          }

          setIsLoading(false);

          if (data.cod >= 400) {
            setError(data.message);
            return;
          }

          setData(data);

          const { hash } = window.location;
          const regEx = /#[a-zA-Z0-9][\w-]*\b/g;
          const isMatched = hash.match(regEx);
          if (hash !== '#/' && isMatched) {
            const element = document.getElementById(
              isMatched[0].replace('#', '')
            );
            setTimeout(scrollHandler(element));
          }

          if (countryParam && cityParam)
            history.push(
              `/${countryParam.toLowerCase()}/${cityParam.toLowerCase()}${
                isMatched ? isMatched[0] : ''
              }`
            );
        } catch (error) {
          setIsLoading(false);
          setError(error.message);
        }
      };

      fetchData();
    }
  }, [url, history, countryParam, cityParam]);

  return { data, error, isLoading, setUrl, setData, setError };
};

export default useFetch;
