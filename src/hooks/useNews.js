import { useState, useEffect } from 'react';

export default function useNews(darkMode, showLowerThird) {
  const [newsItems, setNewsItems] = useState([]);
  const [horoscope, setHoroscope] = useState('');
  const [loadingNews, setLoadingNews] = useState(false);
  const [apiError, setApiError] = useState('');
  
  // CHANGED: categories is now an object instead of array
  const [categories, setCategories] = useState({
    entertainment: true,
    music: true,
    technology: false,
    business: false
  });

  const gradients = [
    'bg-gradient-to-br from-blue-100 to-teal-100',
    'bg-gradient-to-br from-pink-100 to-yellow-100',
    'bg-gradient-to-br from-green-100 to-purple-100'
  ];

  const [bgClass, setBgClass] = useState('bg-gray-50');

  // UPDATED: toggleCategory now works with object format
  const toggleCategory = cat =>
    setCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));

  const fetchNews = async () => {
    setLoadingNews(true);
    try {
      let items = [];
      
      // UPDATED: Check categories as object properties
      if (categories.entertainment) {
        const res = await fetch(`https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?category=entertainment&apiKey=${process.env.REACT_APP_NEWSAPI_KEY}&pageSize=3`);
        if (!res.ok) throw new Error(`Entertainment fetch failed: ${res.status}`);
        const data = await res.json();
        items = items.concat(data.articles.map(a => ({ title: a.title, url: a.url })));
      }

      if (categories.music) {
        const res = await fetch(`https://newsapi.org/v2/everything?q=music&apiKey=${process.env.REACT_APP_NEWSAPI_KEY}&sortBy=publishedAt&pageSize=3`);
        if (!res.ok) throw new Error(`Music fetch failed: ${res.status}`);
        const data = await res.json();
        items = items.concat(data.articles.map(a => ({ title: a.title, url: a.url })));
      }

      if (categories.technology) {
        const res = await fetch(`https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?category=technology&apiKey=${process.env.REACT_APP_NEWSAPI_KEY}&pageSize=3`);
        if (!res.ok) throw new Error(`Technology fetch failed: ${res.status}`);
        const data = await res.json();
        items = items.concat(data.articles.map(a => ({ title: a.title, url: a.url })));
      }

      if (categories.business) {
        const res = await fetch(`https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?category=business&apiKey=${process.env.REACT_APP_NEWSAPI_KEY}&pageSize=3`);
        if (!res.ok) throw new Error(`Business fetch failed: ${res.status}`);
        const data = await res.json();
        items = items.concat(data.articles.map(a => ({ title: a.title, url: a.url })));
      }

      setNewsItems(items);

      const horoscopeRes = await fetch('https://cors-anywhere.herokuapp.com/https://ohmanda.com/api/horoscope/libra');
      if (!horoscopeRes.ok) throw new Error(`Horoscope fetch failed: ${horoscopeRes.status}`);
      const horoscopeData = await horoscopeRes.json();
      setHoroscope(horoscopeData.horoscope);
    } catch (err) {
      console.error("🛑 News Fetch Error:", err);
      setNewsItems([{ title: 'Error fetching news.', url: '#' }]);
      setHoroscope('Error fetching horoscope.');
      setApiError(err.message || 'Unknown error');
    } finally {
      setLoadingNews(false);
    }
  };

  useEffect(() => {
    if (!darkMode) {
      const idx = Math.floor(Math.random() * gradients.length);
      setBgClass(gradients[idx]);
    }
  }, [darkMode]);

  useEffect(() => {
    if (showLowerThird) {
      const lastFetched = localStorage.getItem('lastNewsFetch');
      const now = Date.now();
      if (!lastFetched || now - parseInt(lastFetched, 10) > 60 * 60 * 1000) {
        fetchNews();
        localStorage.setItem('lastNewsFetch', now.toString());
      }
    }
  }, [showLowerThird, categories]);

  return {
    newsItems,
    horoscope,
    loadingNews,
    apiError,
    categories,
    setCategories,
    bgClass,
    toggleCategory
  };
}