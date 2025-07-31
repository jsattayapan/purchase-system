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
 const [itemList, setItemList] = useState(data)
 const [checked, setChecked] = useState(false);

  const handleItemToggle = (index, status) => {
    const updatedList = [...itemList];
    updatedList[index].hasVat = status;
    setItemList(updatedList);
  };

  const handleAllVatToggle = () => {
    const status = itemList[0].hasVat || false
    const updatedList = itemList.map(item => ({ ...item, hasVat: !status }));
    setItemList(updatedList);
  }

  let incVat = !itemList.some(item => item.hasVat)

  useEffect(() => {
    if (incVat && checked) {
      setChecked(false);
    }
  }, [incVat, checked]);

  const subTotal = itemList.reduce((total, { total: t, hasVat }) => {
    if (hasVat) {
      return checked
        ? {
            sub: total.sub + t * 100 / 107,
            vat: total.vat + t * 7 / 107
          }
        : {
            sub: total.sub + t,
            vat: total.vat + t * 7 / 100
          };
    }
    return { sub: total.sub + t, vat: total.vat };
  }, { sub: 0, vat: 0 });

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
          <div className="mt-3 pb-3" style={{display:'flex', justifyContent: 'flex-end', borderBottom: '1px solid #cfcfcf' }}>
            <button className="btn btn-success btn-sm mx-3">จ่าย PO</button>
            <button className="btn btn-warning btn-sm mx-3">ใบเสนอราคา</button>
            <button className="btn btn-danger btn-sm">ยกเลิก</button>
          </div>
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
          <div className="mt-2" style={{display: 'flex', justifyContent: 'flex-end'}}>
            <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              checked={checked}
              disabled={incVat}
              onChange={() => setChecked(!checked)}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              ราคาสินค้ารวม Vat
            </label>
          </div>
          <button className="btn btn-info btn-sm mx-3">แก้ไขรายการ</button>
          </div>
          <div style={{maxHeight: '60vh', overflowY: 'auto'}}>
            <table className="table table-striped">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>จำนวน</th>
          <th>รายการ</th>

      <th>ราคา/หน่วย</th>
    <th className="text-end"><button
className={`btn btn-outline-secondary`}
onClick={handleAllVatToggle}
>เปิด/ปิด Vat ทั้งหมด
</button></th>
  <th className="text-end">รวม</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item, index) => (
            <PrListItem index={index} item={item} handleItemToggle={(status) => handleItemToggle(index, status)} />
          ))}
        </tbody>
      </table>
          </div>
          <div className="mt-3 pb-3" style={{display:'flex', justifyContent: 'flex-end', borderBottom: '1px solid #cfcfcf' }}>
            <div className="border w-50 rounded-3">
              <table className='w-100 text-end' style={{ tableLayout: 'fixed' }}>
                <tr>
                  <th>Subtotal</th>
                  <td>฿{subTotal.sub.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Vat</th>
                  <td>฿{subTotal.vat.toFixed(2)}</td>
                </tr>
                <tr className="bg-dark" style={{color: 'white'}}>
                  <th>Total</th>
                  <th>฿{(subTotal.vat + subTotal.sub).toFixed(2)}</th>
                </tr>
              </table>
              </div>
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

const PrListItem = props => {
  const {item, handleItemToggle, index} = props
  const [isOn, setIsOn] = useState(false);

   const handleToggle = () => {
     const status = item.hasVat || false
     handleItemToggle(!status);
   };
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{item.quantity}</td>
      <td>{item.name} [{item.unit}]</td>

      <td>{item.current_price}</td>
      <td className="text-end">
      <button
    className={`btn ${item.hasVat ? 'btn-primary' : 'btn-outline-secondary'}`}
    onClick={handleToggle}
    >
    {item.hasVat ? 'มี Vat' : 'ไม่มี Vat'}
    </button>
  </td>
  <td className="text-end">{item.total}</td>
    </tr>
  )
}
export default MyComponent;
