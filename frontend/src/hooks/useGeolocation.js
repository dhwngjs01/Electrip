import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { la: 0, ma: 0 },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        la: location.coords.latitude,
        ma: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};

export default useGeolocation;
