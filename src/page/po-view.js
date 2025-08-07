import React, { useState, useEffect } from 'react';
import ft from './../tunnel'
import helper from './helper'
import moment from 'moment'
import Swal from 'sweetalert2';

const MyComponent = (props) => {
 const [checked, setChecked] = useState(false);
 const [prList, setPrList] = useState([])
 const username = 'olotem321'

 useEffect(() => {
   getPrList()
}, []);

  const getPrList = () => {
    ft.getPr((data) => {
        if(data.status){
          setPrList(data.prList)
        }else{
          alert(data.msg);
        }
      })
  }




  const handleItemToggle = (index, status) => {
    const updatedList = [...props.prItemList];
    updatedList[index].vat = status ? 'vat' : 'novat';

    props.setPrItemList(updatedList);
    ft.updatePurchaseItemVat({item: updatedList[index], status}, res => {
      if(!res.status){
        updatedList[index].vat = !status ? 'vat' : 'novat';;
        props.setPrItemList(updatedList);
        alert(res.msg)
      }
    })

    let incVat = !updatedList.some(item => item.vat === 'vat')
      if(incVat && (props.pr.includeVat !== 0) ){
        //Update Purchae Vat to : No Vat: 0
        ft.updatePurchaseIncludeVat({purchaseId: props.pr.id, includeVat: 0}, res => {})
        setChecked(false)
      }

      if(!incVat && (props.pr.includeVat === 0) ){
        //Update Purchae Vat to : Excl Vat: 2
        ft.updatePurchaseIncludeVat({purchaseId: props.pr.id, includeVat: 2}, res => {})
      }

  };

  const handleAllVatToggle = () => {
    const status = props.prItemList[0].vat === 'vat' || false
    ft.updatePurchaseIncludeVat({purchaseId: props.pr.id, includeVat: status ? 2 : 0}, res => {})
    ft.updateAllPurchaseItemVat({purchaseId: props.pr.id, status: !status}, res => {
      if(res.status){
        getPrData(props.pr.id)
      }else{
        alert(res.msg)
      }
    })
  }

  const getPrData = id => {
    ft.getPrById(id, res => {
      if(res.status){
        props.setPr(res.pr)
        console.log(res.pr);
        setChecked(res.pr.includeVat===1)
        props.setPrItemList(res.prItems)
        props.setPrExpenseList(res.prExpense)
      }
    })
  }

  const cancelPr = () => {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่ว่าจะลบ Purchase Request(PR) นี้?',
      text: 'ไม่สามารถแก้ไขรายการได้เมื่อถูกลบ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ลบรายการนี้',
      cancelButtonText: 'กลับ',
    }).then((result) => {
      if (result.isConfirmed) {
        // perform delete action here
        ft.cancelPr(props.pr.id, res => {
          if(res.status){
            props.setPr(null)
            props.setPrItemList([])
            props.setPrExpenseList([])
            getPrList()
          }else{
            alert(res.msg)
          }
        })
      }
    });
  }

  let incVat = !props.prItemList.some(item => item.vat === 'vat')



  // useEffect(() => {
  //   if (incVat && checked) {
  //     setChecked(false);
  //     //Update No Vat
  //   }
  // }, [ checked]);

  const subTotal = props.prItemList.reduce((total, { total: t, vat }) => {
    if (vat === 'vat') {
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

  const totalExpense = props.prExpenseList.reduce((total, exp) => total += exp.amount, 0)

  const discount = props.pr === null ? 0 : props.pr.discount === null ? 0 : props.pr.discount


  const addExpense = async () => {
  const { value: formValues } = await Swal.fire({
    title: 'เพิ่มค่าใช้จ่าย',
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="รายการ">' +
      '<input id="swal-input2" class="swal2-input" placeholder="ราคา" type="number">',
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: '+ เพิ่มรายการ',
    cancelButtonText: 'ยกเลิก',
    preConfirm: () => {
      const title = document.getElementById('swal-input1').value;
      const amount = parseFloat(document.getElementById('swal-input2').value);

      if (!title || isNaN(amount) ) {
        Swal.showValidationMessage('กรุณากรอกรายการค่าใช้จ่ายและราคาที่ถูกต้อง');
        return false;
      }

      if( amount.toFixed(2) <=0 ){
        Swal.showValidationMessage('จำนวนเงินต้องมากกว่า 0 บาท');
        return false;
      }

      return { title, amount };
    },
  });

  if (formValues) {
    console.log('Title:', formValues.title);
    console.log('Amount:', formValues.amount.toFixed(2));
    // คุณสามารถทำสิ่งต่าง ๆ กับข้อมูลที่ได้ เช่น บันทึก
    submitExpense(formValues.title, formValues.amount.toFixed(2))
  }
};



const removeDiscount = async () => {
  Swal.fire({
    title: 'ลบส่วนลดใบสั่งซื้อนี้ออก?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'ยืนยัน',
    cancelButtonText: 'กลับ',
  }).then((result) => {
    if (result.isConfirmed) {
      // perform delete action here
      ft.removeDiscount({id: props.pr.id}, res => {
        if(res.status){
          getPrData(props.pr.id)
        }else{
          alert(res.msg)
        }
      })
    }
  });
}

const addDiscount = async () => {
const { value: formValues } = await Swal.fire({
  title: 'เพิ่มส่วนลดใบสั่งซื้อ',
  html:
    '<input id="swal-input3" class="swal2-input" placeholder="ราคา" type="number">',
  focusConfirm: false,
  showCancelButton: true,
  confirmButtonText: 'บันทึกส่วนลด',
  cancelButtonText: 'ยกเลิก',
  preConfirm: () => {
    const amount = parseFloat(document.getElementById('swal-input3').value);

    if (isNaN(amount) ) {
      Swal.showValidationMessage('กรุณากรอกส่วนลดเป็นตัวเลข');
      return false;
    }

    if( amount.toFixed(2) <=0 ){
      Swal.showValidationMessage('จำนวนต้องมากกว่า 0 บาท');
      return false;
    }

    return { amount };
  },
});

if (formValues) {
  console.log('Amount:', formValues.amount.toFixed(2));
  // คุณสามารถทำสิ่งต่าง ๆ กับข้อมูลที่ได้ เช่น บันทึก
  submitDiscountToPR(formValues.amount.toFixed(2))
}
};

const submitDiscountToPR = (discount) => {
    ft.addDiscount({id: props.pr.id, discount}, res => {
      if(res.status){
        getPrData(props.pr.id)
      }else{
          alert(res.msg)
      }
    })
}


const submitExpense = (expenseDetail, expenseAmount) => {
    ft.addExpenseToPurchase({
        purchaseId: props.pr.id,
        amount: expenseAmount,
        detail: expenseDetail,
        createBy: 'olotem321'
    }, res => {
        if(res.status){
          getPrData(props.pr.id)
        }else{
            alert(res.msg)
        }
    })
}

const deleteExpense = (id) => {
  Swal.fire({
    title: 'คุณแน่ใจหรือไม่ว่าจะลบค่าใช้จ่ายนี้?',
    text: 'ไม่สามารถแก้ไขรายการได้เมื่อถูกลบ',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'ลบค่าใช้จ่ายนี้',
    cancelButtonText: 'กลับ',
  }).then((result) => {
    if (result.isConfirmed) {
      // perform delete action here
      ft.deleteExpense({id, purchaseId: props.pr.id}, res => {
        if(res.status){
          getPrData(props.pr.id)
        }else{
          alert(res.msg)
        }
      })
    }
  });
}

const createPRApproval = () => {
  helper.previewPo(
    props.pr,
    props.prItemList,
    props.prExpenseList,
    'Avatara Resort',
    discount,
    totalExpense,
    subTotal.vat,
    subTotal.sub,
    (subTotal.vat + subTotal.sub + totalExpense - discount),
    props.pr.requester
  )
  ft.updatePurchaseStatus({purchaseId: props.pr.id, status: 'await'}, res=> {
    if(res.status){
      getPrData(props.pr.id)
    }else{
      alert(res.msg)
    }
  })
}

  return (
    <div className="">
      <div className='row'>
        <div className="col-3 ">
          <div className="text-center my-4">
            <button onClick={() => props.openNewPr()} className="btn btn-success w-100">+ สร้าง PR</button>
          </div>
           <div className="border-end"
             style={{maxHeight: '100vh', overflowY: 'auto'}}>
             {
               prList.filter(pr => (username === 'olotem321' || pr.createBy === username))
               .map(pr => <PrListBox selectedId={props.pr? props.pr.id : '0'} pr={pr} getPrById={getPrData} />)
             }
           </div>

        </div>
        {
          props.pr ?
          <div className="col-9 ">
            <div className="mt-3 pb-3" style={{display:'flex', justifyContent: 'flex-end', borderBottom: '1px solid #cfcfcf' }}>
              <div style={{flex: 2, fontSize: '26px'}}>
                <b>ID: {props.pr.id}</b>
              </div>
              <button className="btn btn-success btn-sm mx-3">จ่าย PO</button>
            <button onClick={createPRApproval} className="btn btn-warning btn-sm mx-3">ใบเสนอราคา</button>
              <button onClick={cancelPr} className="btn btn-danger btn-sm">ยกเลิก</button>
            </div>
            <div className="mt-2" style={{display:'flex'}}>
              <div style={{display:'flex', flexDirection: 'column', flexGrow: 1}}>
                <span>{props.pr.requester?props.pr.requester : 'ไม่ระบุ'}</span>
              <b>{props.pr.total ? props.pr.total.toFixed(2) : 0}.-</b>
              </div>
              <div style={{display:'flex', flexDirection: 'column', flexGrow: 1}}>
                <span>วันที่</span>
              <b>{formatDate(props.pr.timestamp)}</b>
              </div>
              <div className='text-end' style={{display:'flex', flexDirection: 'column', flexGrow: 2 , justifyContent: 'flex-end'}}>
              <p>
                <span class={`badge ${props.pr.status === 'request' ? 'text-bg-warning' : 'text-bg-info'} `}>{props.pr.status}</span>
              </p>
            </div>
            </div>
            <div className="mt-2 border rounded p-3" style={{display:'flex', flexDirection: 'column'}}>
              <h6><u>ผู้ขาย & การชำระ</u></h6>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80px', width: '100%'}}>
              <button className="btn btn-link">+ เพิ่มผู้ขาย</button>
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
                onChange={() => {
                  //Update Purchase Vat to : 1 or 2
                  ft.updatePurchaseIncludeVat({purchaseId: props.pr.id, includeVat: checked ? 2 : 1}, res => {})
                  setChecked(!checked)
                }
              }
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                ราคาสินค้ารวม Vat
              </label>
            </div>
            <button onClick={props.editPrListItem} className="btn btn-info btn-sm mx-3">แก้ไขรายการ</button>
            </div>
            <div style={{maxHeight: '60vh', overflowY: 'auto'}}>
              <table className="table table-striped">
                <colgroup>
                  <col style={{ width: '5%' }} />         {/* คอลัมน์ 1 */}
                  <col style={{ width: '5%' }} />          {/* คอลัมน์ 2 - ขยาย */}
                  <col style={{ width: '43%' }} />
                <col style={{ width: '15%' }} />
              <col style={{ width: '22%' }} />       {/* คอลัมน์ 3 */}
                <col style={{ width: '10%' }} />
                </colgroup>
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
            {props.prItemList.map((item, index) => (
              <PrListItem index={index} item={item} handleItemToggle={(status) => handleItemToggle(index, status)} />
            ))}
          </tbody>
        </table>
            </div>
            <div>
              <button onClick={addExpense} className="btn btn-success">+ เพิ่มค่าใช้จ่าย</button>
            </div>
            {
              props.prExpenseList.length > 0 && (
                <div style={{maxHeight: '30vh', overflowY: 'auto'}}>
                  <table className="table table-striped">
                    <colgroup>
                      <col style={{ width: '100px' }} />         {/* คอลัมน์ 1 */}
                      <col style={{ width: 'auto' }} />          {/* คอลัมน์ 2 - ขยาย */}
                      <col style={{ width: '100px' }} />
                      <col style={{ width: '50px' }} />         {/* คอลัมน์ 3 */}
                    </colgroup>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>รายการค่าใช้จ่าย</th>
                        <th>ราคา</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.prExpenseList.map((exp, index) => (
                        <tr>
                          <td>{index+1}</td>
                          <td>{exp.detail}</td>
                          <td>{exp.amount}</td>
                          <td><button
                            onClick={() => deleteExpense(exp.id)}
                             className="btn btn-outline-secondary"><i className="bi bi-trash"></i></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            }
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
                  <tr>
                    <th>Other Expenses</th>
                    <td>฿{totalExpense.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <th>
                      {props.pr.discount === null ? <button onClick={addDiscount} className="btn btn-link">แก้ไข</button> :
                      <button onClick={removeDiscount} className="btn btn-link">ลบส่วนลด</button>
                    }
                      Discount
                      </th>
                    <td>฿{discount.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-dark" style={{color: 'white'}}>
                    <th>Total</th>
                    <th>฿{(subTotal.vat + subTotal.sub + totalExpense - discount).toFixed(2)}</th>
                  </tr>
                </table>
                </div>
            </div>
          </div>
          :
          <div className="col-9 ">
            <div className="bg-light" style={{height:'500px', display: 'flex', justifyContent: 'center'}}>
              <span style={{fontSize: '36px', marginTop: '200px'}}>No Pr Selected</span>
            </div>
          </div>

        }

      </div>

    </div>
  )
}

const PrListBox = props => {
  const {pr, getPrById, selectedId} = props
  const lightTextColor = '#6e6a6a'
  return (
    <div onClick={() => getPrById(pr.id)} className={`px-2 ${selectedId === pr.id ? 'pr-selected' : 'pr-list-container'}`} style={{display:'flex', flexDirection: 'column', borderBottom: '1px solid #cfcfcf', padding:'10px 0',
        }}>
      <div style={{display:'flex', justifyContent: 'space-between'}}>
        <span><b>{pr.requester? pr.requester : 'ไม่ระบุ'}</b></span>
      <span style={{color: lightTextColor}}>{formatDate(pr.timestamp)}</span>
      </div>
      <div style={{display:'flex', justifyContent: 'space-between'}}>
        <span style={{color: lightTextColor}}>{pr.createBy}</span>
      <span><b>{pr.total ? pr.total.toFixed(2) : 0}</b></span>
      </div>
      <div style={{display:'flex', justifyContent: 'space-between', color: lightTextColor}}>
        <span>ID: {pr.id}</span>
      <span class={`badge ${pr.status === 'request' ? 'text-bg-warning' : 'text-bg-info'} `}>{pr.status}</span>
      </div>
    </div>
  )
}

const PrListItem = props => {
  const {item, handleItemToggle, index} = props

   const handleToggle = () => {
     const status = item.vat === 'vat' || false
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
    className={`btn ${item.vat === 'vat' ? 'btn-primary' : 'btn-outline-secondary'}`}
    onClick={handleToggle}
    >
    {item.vat === 'vat' ? 'มี Vat' : 'ไม่มี Vat'}
    </button>
  </td>
  <td className="text-end">{item.total}</td>
    </tr>
  )
}

const formatDate = (inputDate) => {
  const date = moment(inputDate);
  return date.isSame(moment(), 'day')
    ? date.format('HH:mm')
    : date.format('MMM D, YYYY');
};
export default MyComponent;
