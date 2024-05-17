import { FC, createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{auth?:any,setAuth?:any}>({});

const AuthProvider:FC<{children:any}> = ({children})=>{
    const [auth,setAuth] = useState({isAuthenticated:true,role:'admin'})
    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = ()=>useContext(AuthContext);

const withAuthorization = (WrappedComponent:any,allowedRoles:any)=>{
    return (props:any)=>{
        const { auth,setAuth } = useAuth();
        useEffect(()=>{
            //这里可以进行获取权限设定
            setAuth({
                isAuthenticated:true,
                role:'client'
            })
        },[])
        
        if (auth.isAuthenticated && allowedRoles.includes(auth.role)) {
            return <WrappedComponent {...props} />;
          } else {
            return <div>You do not have permission to view this content.</div>;
          }
    }
}

const AdminPage = () => {
    return <div>Welcome to the admin page!</div>;
  };

  const AuthorizedAdminPage = withAuthorization(AdminPage, ['admin']);

  const AuthorizedClientPage = withAuthorization(AdminPage, ['client']);

const App = () => {
  return (
    <AuthProvider>
      <AuthorizedAdminPage />
      <AuthorizedClientPage />
    </AuthProvider>
  );
};

export default App;
