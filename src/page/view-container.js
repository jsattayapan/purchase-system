import React, {useState} from 'react'
import PrView from './pr-view';
import PoView from './po-view';

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
         /> :
        <PrView
          setPage={setPage}
          prItemList={prItemList}
          pr={pr}
          setPrItemList={setPrItemList}
          setPr={setPr}
          />
      }
    </div>
  )
}

export default Container
