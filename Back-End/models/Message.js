import mongoose from "mongoose";
import { encryptMessage, decryptMessage } from "../utils/encryption.js";

const messageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { 
      type: String, 
      required: true,
      set: encryptMessage, // Encrypt content when saving
    },
  },
  { timestamps: true }
);

// Add a virtual property to get decrypted content
messageSchema.virtual('decryptedContent').get(function() {
  return decryptMessage(this.content);
});

// Configure toJSON to include virtuals and exclude some fields
messageSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    ret.content = decryptMessage(ret.content); // Decrypt for JSON responses
    return ret;
  }
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
