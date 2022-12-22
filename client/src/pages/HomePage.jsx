import React, { useEffect, useState } from 'react';
import { BikeCard } from '../components/Bike/BikeCard.component';
import { useSelector, useDispatch } from 'react-redux';
import { setBikeDataThunk } from './../store/bike-data-slice';
import { GridFilter } from '../components/GridFilter/GridFilter.component';
import { useCallback } from 'react';
import Spinner from '../components/UI/Spinner';
import './HomePage.scss';
import '../App.css';

const PRECOPE_MAPPED_OBJECTS = [
  { key: 'color', value: 'Color' },
  { key: 'model', value: 'Model' },
  { key: 'location', value: 'Location' },
  { key: 'reservations', value: 'Availability' },
];

function HomePage({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredBikes, setFilteredBikes] = useState([]);

  const bikesData = useSelector((state) => state.bikesData);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(false);
    dispatch(setBikeDataThunk());
    setIsLoading(false);
  }, [dispatch]);

  const handleDataChange = useCallback((changedData) => {
    setFilteredBikes(changedData);
  }, []);

  return (
    <div>
      <div className='main-grid-container'>
        {isLoading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <GridFilter
              setParentData={handleDataChange}
              prescopeObjects={PRECOPE_MAPPED_OBJECTS}
              data={bikesData.bikes}
            />
            <div id='bikes'>
              {filteredBikes.map((bike, idx) => {
                return (
                  <div key={idx + bike._id} className='bike-container'>
                    <BikeCard
                      bike={bike}
                      userId={user?._id}
                      isManager={user?.isManager}
                    />
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default HomePage;
