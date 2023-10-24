import React, { useState, useEffect } from 'react';
import PaymentComponent from './Payment';
import resumePDF from './Aresume.pdf'; // Import the resume.pdf file

const PDFs = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [paidPDFs, setPaidPDFs] = useState([false, false, false , false , false , false , false]); // State to track which PDFs are paid

  const pdfs = [
    { number: 1, description: 'Resume of Dev_Abhi' },
    { number: 2, description: 'Mystery' },
    { number: 4, description: 'Secret Files of Vasoya Brothers' },
    { number: 5, description: 'Secret Files of Vasoya Brothers' },
    { number: 6, description: 'Secret Files of Vasoya Brothers' },
    { number: 7, description: 'Secret Files of Vasoya Brothers' },
    { number: 8, description: 'Secret Files of Vasoya Brothers' },
    { number: 9, description: 'Secret Files of Vasoya Brothers' },
    { number: 10, description: 'Secret Files of Vasoya Brothers' }
    // Add more PDFs with their descriptions here
  ];

  useEffect(() => {
    // Logic to update paidPDFs state after successful payment

    const checkPaymentStatus = async () => {
      try {
        const response = await fetch('/api/check-payment-status');
        const data = await response.json();
        if (data.success) {
          // Assume PDF 3 becomes free after a successful payment
          setPaidPDFs([true, true, true]);
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    };

    checkPaymentStatus(); // Call the function to check payment status
  }, []); 

  const handleDownloadClick = (index) => {
    if (index === 0 || index === 1 || paidPDFs[index]) {
      // Trigger download for free PDFs and paid PDFs
      const link = document.createElement('a');
      link.href = resumePDF;
      link.download = `Aresume${pdfs[index].number}.pdf`;
      link.click();
    } else {
      // Redirect to the PaymentComponent to initiate payment
      setShowPayment(true);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pdfs.map((pdf, index) => (
          <div
            key={index}
            className="bg-white p-4 shadow-md hover:shadow-lg rounded-lg h-48 flex flex-col justify-between"
          >
            <div className="">
              <h2 className="text-lg font-semibold mb-2">PDF {pdf.number}</h2>
            </div>
            <p className="mb-4 font-bold">{pdf.description}</p>
            <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ${index === 2 && paidPDFs[index] ? 'bg-green-500 cursor-pointer' : ''}`} onClick={() => handleDownloadClick(index)}>
              Download{index === 0 || index === 1 || (index === 2 && paidPDFs[index]) ? ' (FREE)' : ' (PAID)'}
            </button>
          </div>
        ))}
      </div>
      {showPayment && <PaymentComponent onSuccess={() => setPaidPDFs([true, true, true])} />} 
    </div>
  );
};

export default PDFs;
