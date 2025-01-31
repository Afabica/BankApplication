import React, { useState } from "react";

const FaceVerificationForm = () => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Uploading and verifying...");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("/api/verify-face", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Face verification successful.");
      } else {
        setMessage("No face detected or verification failed.");
      }
    } catch (error) {
      setMessage("An error occurred while verifying the image.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Upload your ID and Selfie for Verification</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Verify Face</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default FaceVerificationForm;

