// const isLocal = process.env.NODE_ENV === 'development';
// Define your production configuration
const config = {
  API_BASE: "https://demo.alignmycareer.com/api/v1",
  NEXT_PUBLIC_API_BASE: "demo.alignmycareer.com",
  ROUTE_BASE: "https://demo.alignmycareer.com",
};

// Define your localhost configuration
// const localhostConfig = {
//   API_BASE: "https://localhost:443/api/v1",
//   NEXT_PUBLIC_API_BASE: "localhost:443",
//   ROUTE_BASE: "https://localhost:443",
// };

// Export the appropriate configuration based on the environment.
// const config = isLocal ? localhostConfig : productionConfig;
export default config;
