"use client";

import React, {useState, useEffect} from "react";
import SidePanel from '../../components/dashcomp/MainPage/SidePanel.js';
import Header from '../../components/hedfot/DashHeader.js';
import PanelElements from '../hedfot/PanelElements.js';
import axios from 'axios';
import nookies, {parseCookies} from 'nookies';

const ProfilePage = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [profileData, setProfData] = useState(['']);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
        email: "",
        bio: "",
        location: "",
        phone: "",
    });

    useEffect(() => {
        const fetchProfileData = async() => {
        const cookies = parseCookies();
        const token = cookies.jwt;
        const response = await axios.post('http://localhost:8080/dashboard/changeprofile', {
            headers: {
                'Authentication': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if(response.status == 200) {
            setProfData(response.json());
            console.log("Fecthing data was successful");
        } else {
            
        }
        }
        fetchProfileData();

    }, [])

    const SendChanges = async () => {
            const cookies = parseCookies();
            const token = cookies.jwt;
            const response = await axios.post('http://localhost:8080/', {
                headers: {
                    'Authentication': `Bearer ${token}`,
                    'Content-Type': 'json/application',
                }
            })
        } 

    const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis arcu vitae eros efficitur, ac scelerisque felis iaculis.",
    location: "New York, USA",
    phone: "(123) 456-7890",
  };

  const toggleEditing = () => {
        setIsEditing((prev) => !prev);
  }


  const togglePanel = () => {
        setIsPanelOpen((prev) => !prev);
  }

  const handleInputChange = (e) => {
        const {email, value } = e.target;
        setFormData({
            ...formData,
            [email]: value,
        });
    };

  return (
    <div className="profile-page">
      {/* Sidebar */}
      
      <SidePanel>
        <PanelElements/>
      </SidePanel>
      {/* Main Profile Section */}
      <div className="profile-main">
        <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen}/>
        <header className="profile-header">
          <h1>Profile</h1>
        </header>
        <div className="profile-content">
          <div className="profile-avatar">
            <img src={user.avatar} alt="Profile" className="avatar-img" />
          </div>

          {isEditing ? ( 
            <div> 
                <label htmlFor="Email">Email:</label> 
                <input 
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <label htmlFor="Location">Location:</label>
                <input 
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                />
                <label htmlFor="Phonr">Phone:</label>
                <input 
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                />
                <label htmlFor="Bio">Bio:</label>
                <input 
                    type="text"
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                />
            </div>
        ) : (
            <div className="profile-details">
                <h2>{user.name}</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Location:</strong> {user.location}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Bio:</strong> {user.bio}</p>
            </div>
        )}
          

          <div className="profile-actions">
            <button className="edit-button" onClick={toggleEditing}>Edit Profile</button>
            <button className="save-button" onClick={SendChanges}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
