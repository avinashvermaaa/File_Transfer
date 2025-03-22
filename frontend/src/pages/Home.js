import React, { useState, useRef } from "react";
import { Upload, Lock, Send, Link, Eye, X, Paperclip, Plus, } from "lucide-react";
import axios from "axios"; // Import axios for API requests
import "./Home.css";

const Home = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [files, setFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const fileInputRef = useRef(null);
  const [previewType, setPreviewType] = useState("");
  const [uploading, setUploading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const getTotalSize = () => {
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    return totalSize > 1024 * 1024
      ? (totalSize / 1048576).toFixed(2) + " MB"
      : (totalSize / 1024).toFixed(2) + " KB";
  };

  const handlePreview = (file) => {
    const fileURL = URL.createObjectURL(file);
    if (file.type.startsWith("image/")) {
      setPreviewType("image");
    } else if (file.type === "application/pdf") {
      setPreviewType("pdf");
    } else if (file.type.startsWith("video/")) {
      setPreviewType("video");
    } else {
      alert("Preview not available for this file type.");
      return;
    }
    setPreviewFile(fileURL);
  };

  // Function to handle file upload and get link
  const handleLinkTransfer = async () => {
    if (files.length === 0) {
      alert("Please upload files first!");
      return;
    }

    setUploading(true);
    setGeneratedLink("");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post(
        "https://share247.onrender.com/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.shortLinks && response.data.shortLinks.length > 0) {
        setGeneratedLink(response.data.shortLinks[0]); // Get first file's link
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to generate link. Please try again.");
    } finally {
      setUploading(false);
    }
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

        {/* File Upload Section - Hide when files exist */}
        {files.length === 0 && (
          <div
            className="file-upload"
            onClick={() => fileInputRef.current.click()}
          >
            <Upload size={24} />
            <p>Add files</p>
            <span>Or select a folder</span>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          multiple
          hidden
          onChange={handleFileUpload}
        />

        {/* File List */}
        {files.length > 0 && (
          <div className="file-list">
            <div className="file-header">
              <span>
                {files.length} files • {getTotalSize()}
              </span>
              <button
                className="add-more-btn"
                onClick={() => fileInputRef.current.click()}
              >
                <Plus size={14} /> Add more
              </button>
            </div>
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
                    <Eye
                      size={16}
                      className="view-icon"
                      onClick={() => handlePreview(file)}
                    />
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

        {/* Footer Options */}
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
            <button
              className="transfer-btn"
              onClick={handleLinkTransfer}
              disabled={uploading}
            >
              {uploading ? "Generating..." : "Get a link"} <Link size={16} />
            </button>
          )}
        </div>

        {/* Display generated link */}
        {generatedLink && (
          <div className="generated-link">
            <p>Share this link:</p>
            <input type="text" value={generatedLink} readOnly />
            <button
              onClick={() => navigator.clipboard.writeText(generatedLink)}
            >
              Copy
            </button>
          </div>
        )}
      </div>
      {/* File Preview Modal */}
      {previewFile && (
        <div className="preview-modal" onClick={() => setPreviewFile(null)}>
          <div className="preview-content">
            <X
              size={24}
              className="close-preview"
              onClick={() => setPreviewFile(null)}
            />
            {previewType === "image" && <img src={previewFile} alt="Preview" />}
            {previewType === "pdf" && (
              <iframe src={previewFile} title="PDF Preview"></iframe>
            )}
            {previewType === "video" && (
              <video controls>
                <source src={previewFile} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}

      <div className="home-container">
        <footer className="footer-container">
          <h3>Visitor's Count :-</h3>
          <a
            href="https://www.freecounterstat.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://counter4.optistats.ovh/private/freecounterstat.php?c=l7cg612fn2b4ar2nyd5ba4zxrk79kxjl"
              title="Counter Widget"
              alt="Visit counter For Websites"
            />
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Home;
