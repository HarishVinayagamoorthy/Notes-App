import React from 'react'
export const NotesContext = React.createContext(null)
function NotesDataContext({ children }) {

  // let [data,setData]=useState([

  //         {
  //             title:'Feedbacks',

  //            notes:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa illum unde at. Deleniti ducimus, vitae quidem eius sapiente fuga, eligendi itaque rem quisquam inventore odio obcaecati eum tempore! Minus, illo?',



  //         },

  //         {
  //           title:'Weekly Task',

  //           notes:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa illum unde at. Deleniti ducimus, vitae quidem eius sapiente fuga, eligendi itaque rem quisquam inventore odio obcaecati eum tempore! Minus, illo?'


  //         },
  //         {
  //           title:'Lyrics',

  //           notes:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa illum unde at. Deleniti ducimus, vitae quidem eius sapiente fuga, eligendi itaque rem quisquam inventore odio obcaecati eum tempore! Minus, illo?'
  //         },
  //     ])


  const API_URL = 'https://651666c609e3260018c9b892.mockapi.io/users'


  return <><NotesContext.Provider value={{ API_URL }}>
    {children}
  </NotesContext.Provider>

  </>


}

export default NotesDataContext