"use client";

import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { getExchangeRates } from "./getExchangeRates";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ExchangeRatesTable = () => {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await getExchangeRates("USD");
        setExchangeRates(data);
      } catch (error) {
        console.error("Failed to fetch exchange rates", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  const handlePageClick = (event) => {
    setPageNumber(event.selected);
  };

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10 text-lg font-medium">
        Loading...
      </p>
    );

  if (!exchangeRates)
    return (
      <p className="text-center text-red-500 mt-10 text-lg font-semibold">
        Error fetching exchange rates.
      </p>
    );

  const rates = exchangeRates.conversion_rates;
  const currencies = Object.entries(rates);

  const pageCount = Math.ceil(currencies.length / itemsPerPage);
  const displayedCurrencies = currencies.slice(
    pageNumber * itemsPerPage,
    (pageNumber + 1) * itemsPerPage,
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Exchange Rates (Base Currency: USD)
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3 border-b border-gray-200 font-semibold text-gray-700">
                Currency
              </th>
              <th className="text-right p-3 border-b border-gray-200 font-semibold text-gray-700">
                Exchange Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedCurrencies.map(([currency, rate]) => (
              <tr
                key={currency}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="p-3 border-b border-gray-200 font-mono text-gray-900">
                  {currency}
                </td>
                <td className="p-3 border-b border-gray-200 text-right font-semibold text-indigo-600">
                  {rate.toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        previousLabel={<ChevronLeft />}
        nextLabel={<ChevronRight />}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        pageRangeDisplayed={0}
        marginPagesDisplayed={0}
        containerClassName="flex justify-center mt-6 space-x-2 select-none"
        pageClassName="px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-indigo-600 hover:text-white"
        previousClassName="px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-indigo-600 hover:text-white"
        nextClassName="px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-indigo-600 hover:text-white"
        breakLabel="..."
        activeClassName="bg-indigo-600 text-white border-indigo-600"
        disabledClassName="opacity-50 cursor-not-allowed"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default ExchangeRatesTable;
