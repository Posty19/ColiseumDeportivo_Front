
const TableData =({data})=>{
    return <td className={
        data==='active'?'active':data==='inactive'?'inactive':null
    }>{data}</td>
}
export default TableData;