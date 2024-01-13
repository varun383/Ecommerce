import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

  userSchema.methods.matchPassword=async function(enterPassword){
    // password matches method 
    return await bcrypt.compare(enterPassword,this.password)
  }

  // / Encrypt password using bcrypt
  // This line sets up a pre-save hook in the Mongoose schema. This hook is triggered before a document is saved to the database. 
  userSchema.pre('save',async function(next){
    // Check if the 'password' field has been modified
    if(!this.isModified('password')){
      // / If not modified, move on to the next middleware or save operation
      next()
    }
   // Generate a salt using bcrypt with a cost factor of 10 
    const salt=await bcrypt.genSalt(10);
    // Hash the 'password' field with the generated salt
    this.password= await bcrypt.hash(this.password,salt)
  })

  
  const User = mongoose.model('User', userSchema);
  
  export default User;
    