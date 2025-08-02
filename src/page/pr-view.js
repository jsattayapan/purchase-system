import React, { useState, useEffect } from 'react';
import validator from 'validator';
import Swal from 'sweetalert2';

import ft from './../tunnel'

const MyComponent = props => {
  const [prList, setPrList] = useState(props.prItemList);
  const [itemsList, setItemsList] = useState([]);
  const [prFilter, setPrFilter] = useState('');
  const [value, setValue] = useState('')
  const [prUnit, setPrUnit] = useState('');
  const [requester, setRequester] = useState(props.pr ? props.pr.requester || '' : '')

  useEffect(() => {
    ft.getItems((data) => {
        if(data.status){
          setItemsList(data.itemsList)
        }else{
          alert(data.msg);
        }
      })

}, []);

const handleBackButton = () => {
  const msg = props.pr ? 'ข้อมูลจะไม่ถูกแก้ไข หากคุณออกโดยไม่บันทึก' : "ข้อมูลที่คุณกรอกจะหายทั้งหมด หากคุณออกโดยไม่บันทึก"
  Swal.fire({
    title: 'คุณแน่ใจหรือไม่ว่าจะออกจากหน้านี้?',
    text: msg,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'ออกจากหน้านี้',
    cancelButtonText: 'อยู่ในหน้านี้ต่อ',
  }).then((result) => {
    if (result.isConfirmed) {
      // perform delete action here
      backToPo()
    }
  });
};

  const unitOnChange = (e) => {
    const unit = e.target.value;
    setPrUnit(unit);
  };

  const requesterOnChange = (e) => {
    const name = e.target.value;
    setRequester(name);
  };

  const remove = (index) => {
    setPrList(prList.filter((x, xIndex) => xIndex !== index));
  };

  const backToPo = () => {
    props.setPage('po')
  }


  const addNewItem = () => {
    if (prFilter.trim() === '' || prUnit.trim() === '') {
      alert('กรุณาใส่ชื่อรายการ และ หน่วยวัด');
    } else {
      const exsited = itemsList.filter((x) => x.name === prFilter && x.unit === prUnit);
      if (exsited.length !== 0) {
        alert('มีรายการนี้อยู่แล้ว');
      } else {
        const newItem = { id: null, name: prFilter.trim(), unit: prUnit.trim(), current_price: 0 }
        setItemsList([
          ...itemsList, newItem,
        ]);
        addItemTolist(newItem)
        setPrFilter('');
        setPrUnit('');
      }
    }
  };

  const filterSearch = (e) => {
    const text = e.target.value;
    setPrFilter(text);
  };

  const addItemTolist = (prSelectedItem) => {
    setPrList([
      ...prList,
      {
        id: prSelectedItem.id || null,
        name: prSelectedItem.name,
        unit: prSelectedItem.unit,
        quantity: 0,
        current_price: prSelectedItem.current_price,
        total: 0,
        isEdit: true
      },
    ]);
  };

  const submitPr = () => ft.submitPr({user: {username: 'olotem321'}, prList, requester}, res => {
    if(res.status){
        alert('บันทึกสำเร็จ')
        backToPo()
      }else{
        alert(res.msg)
      }
  })


  const editPrItemList = () => ft.editPrItemList({user: {username: 'olotem321'}, prList, requester, purchaseId: props.pr.id}, res => {
    if(res.status){
      props.setPrItemList(prList)
      let newPr = props.pr
      newPr['requester'] = requester
      props.setPr(newPr)
        backToPo()
      }else{
        alert(res.msg)
      }
  })

  const updatePrice = (e, index) => {
    const newPrice = e.target.value;
    const updatedList = [...prList];
    updatedList[index].current_price = newPrice;
    updatedList[index].total = newPrice * updatedList[index].quantity;
    setPrList(updatedList);
  };

  const updateQuantity = (e, index) => {
    const newPrice = e.target.value;
    const updatedList = [...prList];
    updatedList[index].quantity = newPrice;
    updatedList[index].total = newPrice * updatedList[index].current_price;
    setPrList(updatedList);
  };

  const updateTotal = (e, index) => {
    const newPrice = e.target.value;
    const updatedList = [...prList];
    updatedList[index].total = newPrice;
    updatedList[index].quantity = (newPrice / updatedList[index].current_price).toFixed(3);
    setPrList(updatedList);
  };

  const setEdit = (status, index) => {
    const updatedList = [...prList];
    updatedList[index].isEdit = status;
    setPrList(updatedList);
  };

  const subTotal = prList.reduce((total, item) => total += item.total,0)


  return (
    <div className="">
      <div className="mt-4" style={{display:'flex'}}>
        <button className="btn btn-outline-secondary " onClick={handleBackButton}>
        <i className="bi bi-arrow-left"></i> Back
      </button>
      { props.pr && <h4 className="mx-2 mt-2">ID: {props.pr.id}</h4> }
      </div>
      <br />
      <div className="row">
        <div className="col-8">
          <div className="pr-current-list container-box">
            <table className="table">
              <thead >


               <tr>


                 <th>ลำดับที่</th>


                 <th>รายการสินค้า</th>


               <th className="text-end">ราคา</th>


                 <th className="text-end">จำนวน</th>


               <th className="text-end">ราคารวม</th>
             <th></th>

               </tr>

             </thead>
              <tbody>
                {prList.map((item, index) => (
                  <ItemLine item={item} index={index}
                    updatePrice={updatePrice}
                    updateTotal={updateTotal}
                    updateQuantity={updateQuantity}
                    setEdit={setEdit}
                    remove={remove}/>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row px-2">
            <div className="col-6 bg-light">
              <br/>
              <div className="mb-3">
            <label htmlFor="exampleInput" className="form-label"><b>ผู้สั่ง</b></label>
            <input
              type="text"
              className="form-control"
              id="exampleInput"
              placeholder="ลงชื่อผู้สั่ง"
              value={requester}
              onChange={requesterOnChange}
            />
          </div>
            </div>
            <div className="col-6 bg-light text-end p-2">
            <br />
          <h4>รวม: {new Intl.NumberFormat('en-US').format(subTotal)} บาท</h4>
          <div className="col-12 text-end">
              <button onClick={props.pr ? editPrItemList : submitPr} className="btn btn-success"
                disabled={!(prList.length !== 0 && !prList.some(item => item.isEdit) && requester.trim() !== '')}>
                บันทึก
              </button>
          </div>
            </div>
          </div>
          <br />

        </div>
        <div className="col-4 background-1">
          <h4>รายการ</h4>
          <div className="row">
            <div className="p-2">
            <div className="pr-search-list ">
              {itemsList
                .filter((x) => x.name.includes(prFilter))
                .map((item) => (
                  <div style={{display:'flex'}} className="col-12 hover-line" key={item.id}>
                    <div style={{flexGrow:4}} className="pr-selected-list">
                      {item.name} [{item.unit}]
                    </div>
                    <div className="p-2">
                      <button className='btn btn-light btn-sm' onClick={() => addItemTolist(item)}>+ เพิ่ม</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          </div>
          <div className="row">
            <div className="mb-3">
          <label htmlFor="exampleInput" className="form-label"><b>รายการ</b></label>
          <input
            type="text"
            className="form-control"
            id="exampleInput"
            placeholder="Type here..."
            value={prFilter}
            onChange={filterSearch}
          />
        </div>
        <div className="mb-3">
      <label htmlFor="exampleInput" className="form-label"><b>หน่วย</b></label>
      <input
        type="text"
        className="form-control"
        id="exampleInput"
        placeholder="Type here..."
        value={prUnit}
        onChange={unitOnChange}
      />
    </div>
          </div>
          <div className="text-end">
          <button className="btn btn-success" onClick={addNewItem}>เพิ่มรายการใหม่</button>
      </div>
        </div>
      </div>
    </div>
  );
};

const ItemLine = props => {

  const saveBtnClick = (index) => {
    if(isValidFloat(props.item.current_price) &&
    isValidFloat(props.item.quantity) &&
    isValidFloat(props.item.total)){
      if(Number(props.item.quantity) > 0){
        props.setEdit(false, index)
      }else {
        alert('จำนวนต้องมากกว่า 0')
      }

    }else{
      alert('กรุณาบันทึกข้อมูลให้ครบถ้วน')
    }
  }

  return (
    <tr key={props.index}>
      <td style={{ width: '10%' }}>{props.index + 1}</td>
    <td className="" style={{ width: '40%' }}>{props.item.name} [{props.item.unit}]</td>
  <td style={{ width: '15%' }} className="text-end">
    {props.item.isEdit ? <input
      type="text"
      className="form-control text-end"
      id="exampleInput"
      placeholder="ราคา"
      value={props.item.current_price}
      onChange={(e) => props.updatePrice(e, props.index)}
    /> : new Intl.NumberFormat('en-US').format(props.item.current_price)}
    </td>
    <td style={{ width: '15%' }} className="text-end">
      {props.item.isEdit ? <input
        type="text"
        className="form-control text-end"
        id="exampleInput"
        placeholder="จำนวน"
        value={props.item.quantity}
        onChange={(e) => props.updateQuantity(e, props.index)}
      /> : props.item.quantity}

  </td>
      <td style={{ width: '15%' }} className="text-end">
        {props.item.isEdit ? <input
          type="text"
          className="form-control text-end"
          id="exampleInput"
          placeholder="ราคารวม"
          value={props.item.total}
          onChange={(e) => props.updateTotal(e, props.index)}
        /> : new Intl.NumberFormat('en-US').format(props.item.total)}

      </td>
      <td>
      {!props.item.isEdit ? <button
        onClick={() => props.setEdit(true, props.index)}
         className="btn btn-warning btn-sm"><i className="bi bi-pencil-fill"></i></button>: <div className='text-end mt-2'>
      <button onClick={() => saveBtnClick(props.index)} className="btn btn-success btn-sm" >
          <i className="bi bi-check-lg"></i>
        </button>
        <button onClick={() => props.remove(props.index)} className="btn btn-danger btn-sm mt-1">
          <i className="bi bi-x-lg"></i>
        </button>
      </div>}
      </td>

    </tr>
  )
}

const isValidFloat = (value) => {
  const num = Number(value);
  return value.toString().trim() !== '' && !isNaN(num);
};

export default MyComponent;
