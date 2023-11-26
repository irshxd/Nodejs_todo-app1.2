import { status } from "init";
import { User } from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(404).json({
        success: false,
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ _id: user._id }, process.env.JWTPASS);

    res.status(201).cookie('token', token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite:process.env.NODE_ENV==='development'?'lax':'none',
      secure:process.env.NODE_ENV==='development'?flase:true,
    }).json({
      success: true,
      message: 'Registered',
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
// login route
export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const user = await User.findOne({ email }).select('+password');
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Invalid credentials',
        });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(404).json({
          success: false,
          message: 'Invalid credentials',
        });
      }
  
      const token = jwt.sign({ _id: user._id }, process.env.JWTPASS);

      res.status(200).cookie('token', token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      }).json({
        success: true,
        message: `Welcome back ${user.name}`,
      });

    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };
  
// my profile
export const myProfile =(req,res)=>{
res.status(200).json({
    success:true,
    user:req.user,
})
}

export const logout = (req, res) => {
    res.status(200)
      .cookie('token', null, {
        httpOnly: true,
        expires: new Date(0), // Setting the expiration date to a past date
        sameSite:process.env.NODE_ENV==='development'?'lax':'none',
      secure:process.env.NODE_ENV==='development'?flase:true,
      })
      .json({
        success: true,
        user: req.user, // Assuming you have set req.user somewhere in your authentication middleware
      });
  };
  