'use client'

import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import '../styles/home.css';

interface University {
  _id: string;
  id: number;
  name: string;
  address: string;
  vision: string;
  mission: string[];
  faculties: string[];
}

const Home: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/university');
        const data = await response.json();
        setUniversities(data);
      } catch (error) {
        console.error('Error fetching universities:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className='text-center py-5'>
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1 className='text-center pt-4 mb-4'>Daftar Universitas di Indonesia</h1>
      <div className='row'>
        {universities.map((university) => (
          <div key={university.id} className='col-md-6 col-lg-4 mb-4'>
            <div className='card h-100 shadow-sm'>
              <div className='card-body'>
                <h5 className='card-title text-primary'>{university.name}</h5>
                <p className='card-text'><strong>Address:</strong> {university.address}</p>
                <p className='card-text'><strong>Vision:</strong> {university.vision}</p>
                <p className='card-text'><strong>Mission:</strong> {university.mission.join(', ')}</p>
                <p className='card-text'><strong>Faculties:</strong> {university.faculties.join(', ')}</p>
              </div>
              <div className='card-footer'>
                <button className='btn btn-primary' onClick={() => alert(`More details about ${university.name}`)}>
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
