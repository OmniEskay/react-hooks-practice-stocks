import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState(""); 
  const [filterBy, setFilterBy] = useState(""); 

  useEffect(() => {
    fetch("http://localhost:3001/stocks") 
      .then((res) => res.json())
      .then((data) => setStocks(data));
  }, []);

  function handleBuyStock(stock) {
    if (!portfolio.includes(stock)) {
      setPortfolio([...portfolio, stock]);
    }
  }

  function handleSellStock(stock) {
    setPortfolio(portfolio.filter((s) => s.id !== stock.id));
  }

  const sortedStocks = [...stocks].sort((a, b) => {
    if (sortBy === "Alphabetically") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "Price") {
      return a.price - b.price;
    } else {
      return 0; 
    }
  });

  const visibleStocks = filterBy
    ? sortedStocks.filter((stock) => stock.type === filterBy)
    : sortedStocks;

  return (
    <div>
      <SearchBar 
        sortBy={sortBy}
        onSortChange={setSortBy}
        filterBy={filterBy}
        onFilterChange={setFilterBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer 
            stocks={visibleStocks} 
            onStockClick={handleBuyStock} 
          />
        </div>
        <div className="col-4">
          <PortfolioContainer 
            portfolio={portfolio} 
            onStockClick={handleSellStock} 
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
