import React from "react";
import "./Testimonials.css";
import { assets } from "../../assets/assets";

const Testimonials = () => {
  return (
    <div id="testimonials" className="testimonials">
      <p className="testimonials-header">
        See what others are achieving through learning
      </p>
      <div className="reviews">
        <div className="card">
          <i className="fa-solid fa-quote-left"></i>
          <p>
            UnlockEdu was rated the most popular online course or certification
            program for learning how to code according to StackOverflow’s 2025
            Developer survey.
          </p>
          <div className="profile">
            <img src={assets.man} alt="" />
            <p className="text">Mahendra Pabbathi</p>
          </div>
        </div>
        <div className="card">
          <i className="fa-solid fa-quote-left"></i>
          <p>
            UnlockEdu was rated the most popular online course or certification
            program for learning how to code according to StackOverflow’s 2025
            Developer survey.
          </p>
          <div className="profile">
            <img src={assets.man} alt="" />
            <p className="text">Mahendra Pabbathi</p>
          </div>
        </div>
        <div className="card">
          <i className="fa-solid fa-quote-left"></i>
          <p>
            UnlockEdu was rated the most popular online course or certification
            program for learning how to code according to StackOverflow’s 2025
            Developer survey.
          </p>
          <div className="profile">
            <img src={assets.man} alt="" />
            <p className="text">Mahendra Pabbathi</p>
          </div>
        </div>
        <div className="card">
          <i className="fa-solid fa-quote-left"></i>
          <p>
            UnlockEdu was rated the most popular online course or certification
            program for learning how to code according to StackOverflow’s 2025
            Developer survey.
          </p>
          <div className="profile">
            <img src={assets.man} alt="" />
            <p className="text">Mahendra Pabbathi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
