import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import AppLayout from './pages/AppLayout';
import '/index.css'
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';

const BASE_URL = 'http://localhost:9000'

export default function App() {
  const [cities,setCities] = useState([]);
  const [isLoading , setLoading] = useState(false);

  useEffect(function(){
      setLoading(true);
        async function fetchCities(){
            try{
            const res = await fetch(`${BASE_URL}/cities`);
            const data = await res.json();
            setCities(data);
          }
          catch{
          alert ('There is an error while fetching the data...')
        }
        finally{
          setLoading(false);
        }
      }
      fetchCities();
    },[]
  );

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='login' element={<Login />} />
        <Route path='app' element={<AppLayout />} >
        <Route index element ={<CityList cities={cities} isLoading = {isLoading}/>} />
          <Route path='cities' element={<CityList cities={cities} isLoading = {isLoading}/>}></Route>
          <Route path = 'cities/:id' element={<City/>}/>
          <Route path='countries' element={<CountryList cities={cities} isLoading = {isLoading}/>}></Route>
          <Route path='form' element={<Form/>}></Route>
        </Route>
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}
