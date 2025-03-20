import React, { useState } from "react";
import { Upload, Lock, Send, Link } from "lucide-react";
import "./Home.css";

const Home = () => {
  const [activeTab, setActiveTab] = useState("email");

  return (
    <div className="home-container">
      <div className="transfer-box">
        {/* Toggle buttons */}
        <div className="tab-buttons">
          <button
            className={activeTab === "email" ? "active" : ""}
            onClick={() => setActiveTab("email")}
          >
            Email transfer
          </button>
          <button
            className={activeTab === "link" ? "active" : ""}
            onClick={() => setActiveTab("link")}
          >
            Link transfer
          </button>
        </div>

        {/* File Upload Section */}
        <div className="file-upload">
          <Upload size={28} />
          <p>Add files</p>
          <span>Or select a folder</span>
        </div>

        {/* Show Email Inputs only when "Email transfer" is selected */}
        {activeTab === "email" && (
          <>
            <label>Email to</label>
            <input type="email" placeholder="Recipient's email address" />
            <label>Your email</label>
            <input type="email" placeholder="Your email address" />
          </>
        )}

        {/* Common Inputs for both modes */}
        <label>Title</label>
        <input type="text" placeholder="Title for your transfer" />
        <label>Message</label>
        <textarea placeholder="Add a message (optional)"></textarea>

        {/* Footer Options (Dynamic) */}
        <div className="footer">
          <span>📅 7 days</span>
          <span className="password-option">
            <Lock size={16} /> Add password
          </span>
          {activeTab === "email" ? (
            <button className="transfer-btn">
              Transfer <Send size={16} />
            </button>
          ) : (
            <button className="transfer-btn">
              Get a link <Link size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
