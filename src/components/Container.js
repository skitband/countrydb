import { useState, useEffect, useRef } from "react"

import Loader from './Loader';

const Container = ({selectedCountry}) => {

    const [countryDetails, setCountryDetails] = useState([]);
    const [countryDesc, setcountryDesc] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCountryDetails = async () => {
            setIsLoading(true);
            const response = await fetch(`https://restcountries.com/v3.1/name/${selectedCountry}`);
            const data = await response.json();
            setCountryDetails(data);
            setIsLoading(false);
        }

        const fetchCountryDesc = async () => {
            const response = await fetch(`https://en.wikipedia.org/w/rest.php/v1/search/page?q=${selectedCountry}&limit=1`);
            const data = await response.json();
            return data.pages.map((val, i) => {
                setcountryDesc(val.excerpt);
            })
        }
        fetchCountryDetails()
        fetchCountryDesc()
    }, [selectedCountry])

    const currencies = (lists) => {
        return countryDetails.length > 0 && Object.values(lists).map((obj, i) => (
            <ul key={i} className="d-flex gap-1 unordered-list list-style-none p-0">
                <li>{obj['name']}</li>
            </ul>
        ));
    }

    return (
        <div className="mx-3">
            { countryDetails.length > 0 && !isLoading ? countryDetails.map((c, i) => {
                return <div key={i}>
                <div  className="row m-3 p-3 bg-container">
                    <div className="p-3">
                        <h4>Country</h4>
                        <div>
                            <img src={c.flags.png} className="responsive rounded mx-auto d-block w-25" alt="country flag"/>
                            
                        </div>
                        <h4>{c.name.common}</h4>
                        <p className="text-center text-sm" dangerouslySetInnerHTML={{__html: countryDesc}}></p>
                    </div>
                </div>

                <div className="row m-3 p-3 bg-container">
                    <h4>Country Details</h4>
                    <div className="col-3">
                    <div>
                        <img src={c.coatOfArms.hasOwnProperty('png') ? c.coatOfArms.png : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Blank_shield_with_border.svg/1200px-Blank_shield_with_border.svg.png' } className="responsive rounded mx-auto d-block w-50" alt="country coat of arms"/>
                    </div>
                    </div>
                    <div className="col-9">
                        <div className="d-flex flex-wrap gap-5">
                            <div className="p2 text-secondary">Official Name <br/> <span className="text-dark">{c.name.official}</span></div>
                            <div className="p2 text-secondary">Population <br /> <span className="text-dark">{c.population}</span></div>
                            <div className="p2 text-secondary">Continent <br /> <span className="text-dark">{c.continents[0]}</span></div>
                            <div className="p2 text-secondary">Currency <br /> 
                                <div className="text-dark">
                                    {currencies(c.currencies)}
                                </div>
                            </div>
                            <div className="p2 text-secondary">Capital <br /> <span className="text-dark">{c.capital[0]}</span></div>
                        </div>
                    </div>
                </div>
                </div>
            }) : <Loader /> }
        </div>
    )
}

export default Container