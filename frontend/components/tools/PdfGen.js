//"use client";
//
//import React, {useState, useEffect} from 'react';
//import jsPDF from 'jspdf';
//
//const PdfGen = ({transaction }) => {
//    const [ loading, setLoading] = useState(false);
//
//    const generatePDF = async () => {
//        const doc = new jsPDF();
//        
//        doc.text(`Transaction ID: ${transaction.id}`, 10, 10);
//        doc.text(`Amount: $${transaction.amount}`, 10, 20);
//        doc.text(`Date: ${new Date(transaction.data).toLocalString()}`, 10, 30);
//        doc.text(`Description: ${transaction.description}`, 10, 40); 
//    }
//
//    const pdBlob = doc.output('blob');
//    const formDdata = new FormData();
//    formData.append('file', pdfBlob, 'transaction.pdf');
//
//    try {
//        setLoading(true);
//        const cookies = parseCookies();
//        const token = cookies.jwt; 
//
//        const response = await axios.post('http://localhost:8080/blob/storage/upload', {
//            headers: {
//                'Authentication': `Bearer: ${token}`,
//
//            }
//        })
//    }
//
//
//    return (
//        <div classname="PDFGen">
//        <h1>Transaction Details</h1>
//        <p>Transaction ID: ${tansaction.id}</p>
//        <p>Amount: ${transaction.amount}</p>
//        <p>Date: {new Date(transaction.date).toLocaleString()}</p>
//        <p>Description: {transaction.description}</p>
//        <button onClick={generatePDF} disabled={loading}>
//            {loading ? 'Generating PDF...' : 'Generate PDF'}
//        </button>
//        </div>
//    )
//}
