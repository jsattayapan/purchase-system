import React, {useState} from 'react'
import PrView from './pr-view';
import PoView from './po-view';
import './App.css'

const Container = props => {
  const [page, setPage] = useState('po')
  const [pr, setPr] = useState(null)
  const [prItemList, setPrItemList] = useState([])
  const [prExpenseList, setPrExpenseList] = useState([])

  const openNewPr = () => {
    setPage('pr')
    setPr(null)
    setPrItemList([])
    setPrExpenseList([])
  }

  const editPrListItem = () => {
    setPage('pr')
  }

  return (
    <div>
      {
        page === 'po' ? <PoView
        prItemList={prItemList}
        setPrItemList={setPrItemList}
        setPr={setPr}
        pr={pr}
        openNewPr={openNewPr}
        editPrListItem={editPrListItem}
        prExpenseList={prExpenseList}
        setPrExpenseList={setPrExpenseList}
        user={props.user}
         /> :
        <PrView
          setPage={setPage}
          prItemList={prItemList}
          pr={pr}
          setPrItemList={setPrItemList}
          setPr={setPr}
          user={props.user}
          />
      }
    </div>
  )
}

export default Container
