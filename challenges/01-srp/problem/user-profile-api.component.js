import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserProfileApi({ userId, authToken, children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const fetch = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://api.example.com/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const update = async (formData) => {
    try {
      setLoading(true);

      const response = await axios.put(
        `https://api.example.com/users/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [userId, authToken]);

  return children({
    loading,
    error,
    data,
    update,
  });
}