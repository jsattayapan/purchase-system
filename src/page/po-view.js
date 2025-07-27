import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const dump = [0,0,0,0,0]
  const data = [
   { id: 1, name: 'Apple', unit: 'bottle', quantity: 35, total: 120, current_price: 25 },
   { id: 2, name: 'Banana', unit: 'bottle', quantity: 35, total: 120, current_price: 25 },
   { id: 3, name: 'Orange', unit: 'bottle', quantity: 35, total: 120, current_price: 25 },
   { id: 2, name: 'Banana', unit: 'bottle', quantity: 35, total: 120, current_price: 25 },
   { id: 3, name: 'Orange', unit: 'bottle', quantity: 35, total: 120, current_price: 25 },
   { id: 2, name: 'Banana', unit: 'bottle', quantity: 35, total: 120, current_price: 25 },
   { id: 3, name: 'Orange', unit: 'bottle', quantity: 35, total: 120, current_price: 25 },
   { id: 2, name: 'Banana', unit: 'bottle', quantity: 35, total: 120, current_price: 25 },
   { id: 3, name: 'Orange', unit: 'bottle', quantity: 35, total: 120, current_price: 25 },
   { id: 2, name: 'Banana', unit: 'bottle', quantity: 35, total: 120, current_price: 25 },
   { id: 3, name: 'Orange', unit: 'bottle', quantity: 35, total: 120, current_price: 25 },
   { id: 2, name: 'Banana', unit: 'bottle', quantity: 35, total: 120, current_price: 25 },
   { id: 3, name: 'Orange', unit: 'bottle', quantity: 35, total: 120, current_price: 25 },
   { id: 2, name: 'Banana', unit: 'bottle', quantity: 35, total: 120, current_price: 25 },
   { id: 3, name: 'Orange', unit: 'bottle', quantity: 35, total: 120, current_price: 25 },
 ];
  return (
    <div className="">
      <div className='row'>
        <div className="col-3 border-end">
           <div className=""
             style={{maxHeight: '100vh', overflowY: 'auto'}}>
             {
               dump.map(pr => <PrListBox />)
             }
           </div>

        </div>
        <div className="col-9 ">
          <div className="mt-2" style={{display:'flex'}}>
            <div style={{display:'flex', flexDirection: 'column', flexGrow: 1}}>
              <span>Requester</span>
            <b>78,780.00.-</b>
            </div>
            <div style={{display:'flex', flexDirection: 'column', flexGrow: 1}}>
              <span>วันที่</span>
            <b>Oct 31, 2025</b>
            </div>
            <div className='text-end' style={{display:'flex', flexDirection: 'column', flexGrow: 2 , justifyContent: 'flex-end'}}>
            <p>
              <span class="badge text-bg-warning">Await</span>
            </p>
          </div>
          </div>
          <div style={{maxHeight: '80vh', overflowY: 'auto'}}>
            <table className="table table-striped">
        <thead className="table-light">
          <tr>
            <th>#</th>
          <th>รายการ</th>
        <th>จำนวน</th>
      <th>ราคา/หน่วย</th>
    <th>Vat</th>
  <th className="text-end">รวม</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
            <td>{item.name} [{item.unit}]</td>
          <td>{item.quantity}</td>
        <td>{item.current_price}</td>
        <td></td>
      <td className="text-end">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
          </div>
        </div>
      </div>

    </div>
  )
}

const PrListBox = props => {
  const lightTextColor = '#6e6a6a'
  return (
    <div className="pr-list-container" style={{display:'flex', flexDirection: 'column', borderBottom: '1px solid #cfcfcf', padding:'10px 0' }}>
      <div style={{display:'flex', justifyContent: 'space-between'}}>
        <span><b>Requester</b></span>
      <span style={{color: lightTextColor}}>Oct 13, 2025</span>
      </div>
      <div style={{display:'flex', justifyContent: 'space-between'}}>
        <span style={{color: lightTextColor}}>olotem321</span>
      <span><b>78,250.00.-</b></span>
      </div>
      <div style={{display:'flex', justifyContent: 'space-between', color: lightTextColor}}>
        <span>ID: 123-456-789</span>
      <span class="badge text-bg-warning">Await</span>
      </div>
    </div>
  )
}
export default MyComponent;
