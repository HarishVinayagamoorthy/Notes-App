import React from "react";
export const NotesContext = React.createContext(null);
function NotesDataContext({ children }) {
  const API_URL = "https://657d7d78853beeefdb9acdbe.mockapi.io/users";

  return (
    <>
      <NotesContext.Provider value={{ API_URL }}>
        {children}
      </NotesContext.Provider>
    </>
  );
}

export default NotesDataContext;
