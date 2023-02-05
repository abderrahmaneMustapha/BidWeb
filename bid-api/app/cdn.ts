import { v2 as cloudinary} from  "cloudinary";
import { CDN as cdn } from "./config"
// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  cloud_name: cdn.name,
  api_key: cdn.apiKey,
  api_secret: cdn.apiSecretKey
});

// Log the configuration
export default cloudinary