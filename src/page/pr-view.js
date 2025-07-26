import React, { useState } from 'react';
import validator from 'validator';

const MyComponent = () => {
  const [prList, setPrList] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [prFilter, setPrFilter] = useState('');
  const [prUnit, setPrUnit] = useState('');
  const [prSelectedItem, setPrSelectedItem] = useState({ name: '', unit: '' });

  const unitOnChange = (e) => {
    const unit = e.target.value;
    setPrUnit(unit);
  };

  const remove = (index) => {
    setPrList(prList.filter((x, xIndex) => xIndex !== index));
  };

  const quantityOnChange = (e) => {
    let number = e.target.value;
    if (validator.isFloat(number) || number === '') {
      setQuantity(number);
    }
  };

  const addNewItem = () => {
    if (prFilter.trim() === '' || prUnit.trim() === '') {
      alert('กรุณาใส่ชื่อรายการ และ หน่วยวัด');
    } else {
      const exsited = itemsList.filter((x) => x.name === prFilter && x.unit === prUnit);
      if (exsited.length !== 0) {
        alert('มีรายการนี้อยู่แล้ว');
      } else {
        setItemsList([
          ...itemsList,
          { id: null, name: prFilter.trim(), unit: prUnit.trim(), current_price: 0 },
        ]);
        setPrFilter('');
        setPrUnit('');
      }
    }
  };

  const filterSearch = (e) => {
    const text = e.target.value;
    setPrFilter(text);
  };

  const addItemTolist = () => {
    if (quantity < 0.1 || quantity === '') {
      alert('กรุณาใส่จำนวนไม่ต่ำกว่า 0');
    } else {
      if (prSelectedItem.name === '') {
        alert('กรุณาเลือกสินค้า');
        return;
      }
      setPrList([
        ...prList,
        {
          id: prSelectedItem.id || null,
          name: prSelectedItem.name,
          unit: prSelectedItem.unit,
          quantity: quantity,
          current_price: prSelectedItem.current_price,
        },
      ]);
      setPrSelectedItem({ name: '', unit: '' });
      setQuantity(0);
    }
  };

  const updatePrice = (e, index) => {
    const newPrice = e.target.value;
    const updatedList = [...prList];
    updatedList[index].current_price = newPrice;
    setPrList(updatedList);
  };

  const setItem = (name, unit) => {
    setPrSelectedItem({ name, unit });
  };

  return (
    <div className="">
      <br />
      <div className="row">
        <div className="col-8">
          <div className="pr-current-list container-box">
            <table className="table">
              <thead>
                <tr>
                  <th>ลำดับที่</th>
                  <th>รายการสินค้า</th>
                  <th>จำนวน</th>
                  <th>หน่วย</th>
                  <th>ราคา</th>
                </tr>
              </thead>
              <tbody>
                {prList.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td>
                      <input
                        value={item.current_price}
                        onChange={(e) => updatePrice(e, index)}
                        name={index}
                        type="text"
                      />
                    </td>
                    <td>
                      <button onClick={() => remove(index)} className="btn btn-danger">
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />
          <div className="row">
            <div className="col-2">
              {prList.length !== 0 && (
                <button onClick={() => alert('Save functionality coming soon')} className="btn btn-success">
                  บันทึก
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="col-4 background-1">
          <div className="row">
            <div className="col-12">
              <h6>รายการ:</h6>{' '}
              <h3>{prSelectedItem.name ? `${prSelectedItem.name} (${prSelectedItem.unit})` : 'เลือกสินค้า'}</h3>
            </div>
            <div className="col-12">
              <h6>จำนวน:</h6>{' '}
              <input value={quantity} onChange={quantityOnChange} type="text" />
            </div>
            <div className="col-12">
              <br />
              <button className="btn btn-success" onClick={addItemTolist}>
                เพิ่มไปในใบสั่งซื้อ
              </button>
            </div>
          </div>
          <div className="row">
            <div className="pr-search-list">
              {itemsList
                .filter((x) => x.name.includes(prFilter))
                .map((item) => (
                  <div className="col-12" key={item.id}>
                    <div className="pr-selected-list" onClick={() => setItem(item.name, item.unit)}>
                      {item.name}/{item.unit}{' '}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <textarea onChange={filterSearch} value={prFilter}></textarea>
            </div>
            <div className="col-12">
              <input onChange={unitOnChange} value={prUnit} type="text" placeholder="หน่วย" />
            </div>
          </div>
          <button onClick={addNewItem}>เพิ่มรายการใหม่</button>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
