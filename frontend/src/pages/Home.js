import React, { useState } from "react";
import { Upload, Lock, Send, Link, Eye, X, Paperclip, Plus, } from "lucide-react";
import "./Home.css";

const Home = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [files, setFiles] = useState([]);

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const getTotalSize = () => {
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    return (totalSize / 1024).toFixed(2) + " KB"; // Convert bytes to KB
  };

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
        <div
          className="file-upload"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <Upload size={24} />
          <p>Add files</p>
          <span>Or select a folder</span>
          <input
            type="file"
            id="fileInput"
            multiple
            hidden
            onChange={handleFileUpload}
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="file-list">
            <span>
              {files.length} files • {getTotalSize()}
            </span>
            <button
              className="add-more-btn"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <Plus size={14} /> Add more
            </button>
            <div className="file-items">
              {files.map((file, index) => (
                <div key={index} className="file-item">
                  <Paperclip size={14} className="file-icon" />
                  <span className="file-name">
                    {file.name.length > 15
                      ? file.name.substring(0, 15) + "..."
                      : file.name}
                  </span>
                  <div className="file-actions">
                    <Eye size={16} className="view-icon" />
                    <X
                      size={16}
                      className="remove-icon"
                      onClick={() => removeFile(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
