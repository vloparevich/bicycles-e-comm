import React, { useRef, useEffect, useState } from 'react';
import './GridFilter.styles.scss';

export const GridFilter = ({ setParentData, prescopeObjects, data }) => {
  const [filterInput, setFilterInput] = useState('');
  const [prescopeEntitySelector, setPrescopeEntitySelector] = useState({
    key: '',
    value: '',
  });
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    //debouncing
    const timeoutId = setTimeout(() => {
      const filteredData = data.filter((row) => {
        if (prescopeEntitySelector.key === 'reservations') {
          const reservedDates = row['reservations'];
          return reservedDates.reduce((acc, reservation) => {
            if (reservation.reservedDates.includes(filterInput)) {
              acc = false;
            }
            return acc;
          }, true);
        } else {
          return row[prescopeEntitySelector?.key]
            ?.toLowerCase()
            .includes(filterInput.toLowerCase())
            ? true
            : false;
        }
      });
      setParentData(filteredData, filterInput);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [filterInput, prescopeEntitySelector, setParentData, data]);

  useEffect(() => {
    setPrescopeEntitySelector({
      key: prescopeObjects[1].key,
      value: prescopeObjects[1].value,
    });
  }, [prescopeObjects]);

  const onChangeHandler = (e) => {
    setFilterInput(e.target.value);
  };

  const prescopeSelectEntitySelectorHandler = (e) => {
    const selectValue = e.target.value;
    setFilterInput('');
    setParentData(data);
    const filteredPrescope = prescopeObjects.reduce((acc, prescope) => {
      if (prescope.value === selectValue) {
        acc = prescope;
      }
      return acc;
    }, {});
    setPrescopeEntitySelector(filteredPrescope);
  };

  return (
    <div className='filter-input-wrapper'>
      <select
        value={prescopeEntitySelector.value}
        onChange={prescopeSelectEntitySelectorHandler}
      >
        {prescopeObjects.map((selector, idx) => (
          <option key={idx}>{selector.value}</option>
        ))}
      </select>
      <input
        type='search'
        ref={inputRef}
        value={filterInput}
        onChange={onChangeHandler}
        placeholder={`Filter by '${prescopeEntitySelector.value}'`}
      />
    </div>
  );
};

// function GridFilter({ selectOptions, onChange }) {
//   const [selectVal, onSetSelect] = useState('');

//   return (
//       <div>
//           <select onChange={(e) => onSetSelect(e.target.value)}>
//               {/*...*/}
//           </select>
//       </div>
//   )
// }

// function MainPage() {
//   const [fullDataFromServer, setFullDataFromServer] = useState([]);

//   useEffect(() => {
//       fetch(...).then(res => res.json()).then((data) => setFullDataFromServer(data));
//   }, []);

//   const filteredData = fullDataFromServer.filter(...);

//   return (
//       <GridFilter selectOptions={['Color', 'Model']} />
//       {filteredData.map(...)}
//   )
// }
