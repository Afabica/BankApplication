"use client";

import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate"; // Import the pagination component
import { getExchangeRates } from "./getExchangeRates";
import "./styles.css";

const ExchangeRatesTable = () => {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage] = useState(10); // Number of rows per page

  useEffect(() => {
    const fetchRates = async () => {
      const data = await getExchangeRates("USD");
      setExchangeRates(data);
      setLoading(false);
    };

    fetchRates();
  }, []);

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setPageNumber(selectedPage);
  };

  if (loading) return <p>Loading...</p>;
  if (!exchangeRates) return <p>Error fetching exchange rates.</p>;

  const rates = exchangeRates.conversion_rates;
  const currencies = Object.entries(rates);

  const displayedCurrencies = currencies.slice(
    pageNumber * itemsPerPage,
    (pageNumber + 1) * itemsPerPage,
  );

  return (
    <div className="exchange-rates-table">
      <h2>Exchange Rates (Base Currency: USD)</h2>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Exchange Rate</th>
          </tr>
        </thead>
        <tbody>
          {displayedCurrencies.map(([currency, rate]) => (
            <tr key={currency}>
              <td>{currency}</td>
              <td>{rate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={Math.ceil(currencies.length / itemsPerPage)}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        pageClassName={"page-item"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
      />
    </div>
  );
};

export default ExchangeRatesTable;
