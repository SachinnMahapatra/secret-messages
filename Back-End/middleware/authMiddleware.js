import User from '../models/User.js';

// Middleware to verify if the user exists and is authorized
export const verifyUser = async (req, res, next) => {
  try {
    // Extract userId from params or body
    const userId = req.params.userId || req.body.userId;
    
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        error: "Authentication failed: User ID is required" 
      });
    }

    // Find user by uniqueLink
    const user = await User.findOne({ uniqueLink: userId });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: "Authentication failed: User not found" 
      });
    }

    // Add user to request object for use in controller
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Authentication failed: Server error" 
    });
  }
}; 