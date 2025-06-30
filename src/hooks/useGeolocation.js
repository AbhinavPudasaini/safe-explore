// // src/hooks/useGeolocation.js
// import { useState, useEffect } from 'react';

// const useGeolocation = () => {
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setError("Geolocation not supported.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       },
//       (err) => {
//         setError(err.message);
//       }
//     );
//   }, []);

//   return { location, error };
// };

// export default useGeolocation;
