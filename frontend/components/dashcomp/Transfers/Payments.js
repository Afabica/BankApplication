"use client";


import React, { useState } from 'react';
import { parseCookies } from 'nookies'

import PaymentForm from './PaymentForm.js';
import TransferList from './TransferList.js';
import ConfirmationModal from '../components/ConfirmationModal';
import PanelElements from '../../hedfot/PanelElements.js';
import SidePanel from '../../dashcomp/MainPage/SidePanel.js';
import Header from '../../hedfot/HeaderHome.js';
import Footer from '../../hedfot/FooterHome.js';



export default function PaymentsAndTransfers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [paymentDetails, setPaymentDetails] = useState(null);

  const handlePaymentSubmit = (details) => {
    setPaymentDetails(details);
    setIsModalOpen(true);
  };

  const  togglePanel = () => {
        setIsPanelOpen((prev) => !prev);
    }

  const confirmPayment = () => {
    setIsModalOpen(false);
    // Simulate API call
    console.log('Payment confirmed:', paymentDetails);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header/>
      <SidePanel>
        <PanelElements/>
      </SidePanel>


      <h1 className="text-3xl font-bold text-center mb-8">Payments and Transfers</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <PaymentForm onSubmit={handlePaymentSubmit} />
        </div>
        
        {/* Transfer List */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <TransferList />
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <ConfirmationModal
          details={paymentDetails}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmPayment}
        />
      )}
     <Footer/>
    </div>
  );
}

