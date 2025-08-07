import React from 'react';
import moment from 'moment';
import ReactDOMServer from 'react-dom/server'
import numeral from 'numeral'

  const previewPo = (pr, items, expenses, property, discount, expenseTotal, vat, stockValue, total,issueDate) => {
    const myWindow = window.open("", pr.id, "width=595,height=842");
    const tableStyle = {borderCollapse: "collapse",border: "1px solid black", width: "100%"}
    const th = {border: "1px solid black"}
    const td = {paddingRight: "5px", paddingLeft: "5px", bodrderLeft: "1px solid black", borderRight: "1px solid black"}
    const htmlString = ReactDOMServer.renderToStaticMarkup(
          <div style={{fontFamily: 'Kanit'}}>
            <div style={{overflow: 'auto'}}>
              {property === 'Avatara Resort' ? <div style={{float: 'left'}}>
                <h2>Avatara Resort</h2>
                <div>นาย ชูสิทธิ์ สัตยาพันธุ์</div>
                <div>เลขประจำตัวผู้เสียภาษี: 3100200521903</div>
                <div>
                  106 หมู่ 4
                </div>
                <div>
                  ตำบลเพ อำเภอเมือง
                </div>
                <div>
                  จังหวัดระยอง 21160
                </div>
                <div>
                  โทร 038-644-113
                </div>
              </div> : <div style={{float: 'left'}}>
                <h2>Samed Pavilion Resort</h2>
                <div>นาง สุนีย์ ทรัพย์ไพฑูรย์</div>
                <div>เลขประจำตัวผู้เสียภาษี: 3100200458870</div>
                <div>
                  89/1 หมู่ 4
                </div>
                <div>
                  ตำบลเพ อำเภอเมือง
                </div>
                <div>
                  จังหวัดระยอง 21160
                </div>
                <div>
                  โทร 038-644-113
                </div>
              </div>}
              <div style={{float: 'right'}}>
                <h2>Purchase Order</h2>
                <div># {pr.id}</div>
                <div>วันที่บันทึึก {moment().format('l')}</div>
                <div>วันที่รับบิล {moment(issueDate).format('l')}</div>
                <div>
                  ผู้ขาย: {pr.supplier}
                </div>
                <div>
                  ชำระเงินโดย: await
                </div>
                {/* {(pr.payment.type === 'โอนเงิน' || pr.payment.type === 'บัตรเครดิต') &&
                  <div>
                  รายละเอียด: {pr.payment.detail}
                </div>
                } */}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-12">
                <table style={tableStyle}>
                  <thead>
                    <tr style={{background:'black', color: 'white'}}>
                      <th style={{...th, width: '10%'}}>ลำดับ</th>
                      <th style={{...th, width: '40%'}}>รายการ</th>
                      <th style={{...th, width: '10%'}}>จำนวน</th>
                      <th style={{...th, width: '10%'}}>หน่วย</th>

                      <th style={{...th, width: '10%'}}>ราคา/หน่วย</th>
                    <th style={{...th, width: '5%'}}>Vat</th>
                    <th style={{...th, width: '15%'}}>จำนวนเงิน</th>
                    </tr>
                  </thead>
                  <tbody style={{fontSize: '12px'}}>
                    {items.map((x, index) => (
                      <tr>
                        <td style={{...td, textAlign: 'center'}}>{index+1}</td>
                        <td style={td}>{x.name}</td>
                        <td style={{...td, textAlign: 'center'}}>{numeral(x.quantity).format('0,0.00')}</td>
                        <td style={{...td, textAlign: 'center'}}>{x.unit}</td>

                        <td style={{...td, textAlign: 'right'}}>{numeral(x.price).format('0,0.00')}</td>
                      <td style={{...td, textAlign: 'center'}}>{x.vat === 'vat' ? 'V' : 'NV'}</td>
                      <td style={{...td, textAlign: 'right'}}>{numeral(x.price * x.quantity).format('0,0.00')}</td>
                      </tr>
                    ))}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    {expenses.map(x => (
                      <tr>
                          <td></td>
                          <td style={td}>{x.detail}</td>
                          <td></td>
                          <td></td>
                        <td></td>
                          <td></td>
                        <td style={{...td, textAlign: 'right'}}>{numeral(x.amount).format('0,0.00')}</td>
                      </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div>
                Ref# : {pr.reference}
              </div>
              <div>
                หมายเหตุ: {pr.remark}
              </div>
              <table style={{float: 'right', width: '40%'}}>
                <tbody>
                  <tr>
                    <td style={{fontWeight: 'bold'}}>รวมเป็นเงิน</td>
                    <td style={{textAlign: 'right'}}>{numeral(stockValue + expenseTotal).format('0,0.00')}</td>
                  </tr>
                  <tr>
                    <td style={{fontWeight: 'bold'}}>จำนวนภาษีมูลค่าเพิ่ม 7%</td>
                    <td style={{textAlign: 'right'}}>{numeral(vat).format('0,0.00')}</td>
                  </tr>
                  <tr>
                    <td style={{fontWeight: 'bold'}}>ส่วนลด</td>
                    <td style={{textAlign: 'right'}}>{numeral(discount).format('0,0.00')}</td>
                  </tr>
                  <tr>
                    <td style={{fontWeight: 'bold'}}>จำนวนเงินรวมทั้งสิ้น</td>
                    <td style={{textAlign: 'right'}}>{numeral(total).format('0,0.00')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <table style={tableStyle}>
                <tbody>
                  <tr>
                    <td style={{textAlign:'center'}}>ผู้ตรวจสอบ<br /><br /><br />.............................................<br /><br />วันที่ .......................</td>
                    <td style={{textAlign:'center'}}>ผู้อนุมัติ<br /><br /><br />.............................................<br /><br />วันที่ .......................</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
    );
    myWindow.document.write(htmlString);

}

export default { previewPo }
