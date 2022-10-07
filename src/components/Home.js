import React, { useEffect, useState } from 'react';
import Container from './Container';
import SideNav from "./SideNav";
import Loader from './Loader';

const Home = () => {

  const [countries, setCountries] = useState([]);
  const [countryName, setcountryName] = useState('libya');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      const fetchCountries = async () => {
          setIsLoading(true);
          const response = await fetch('https://restcountries.com/v3.1/all');
          const data = await response.json();
          setCountries(data);
          setIsLoading(false);
      }
      fetchCountries()
  }, [])

  return (
    <div>
      <div className="px-4 py-5 my-5 text-center">
        <div className="col-7 mx-auto border border-1 bg-light">
          <div className="row">
            <div className="col-4">
            {isLoading ? (
              <Loader /> ) : (
              <SideNav itemsPerPage={20} countries={countries} setcountryName={setcountryName}/>
            )}
            </div>
            <div className="col-8">
              <Container selectedCountry={countryName}/>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Home;
