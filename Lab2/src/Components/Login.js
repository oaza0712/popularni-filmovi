import { OidcSecure } from "@axa-fr/react-oidc";
import { useOidcUser } from "@axa-fr/react-oidc";
import { Route,Redirect} from "react-router";
import Datatable from "./datatable";
import { Navigate } from "react-router-dom";
import Header from "./Header";

export default function Login() {
  const { oidcUser } = useOidcUser();
  return (
  <div>
        <Header />

    {oidcUser && 
    <div>
    <div  style={{display:'flexbox', justifyContent: 'space-between'}}> USER NAME: {oidcUser.name}  </div>
    <div  style={{display:'flexbox', justifyContent: 'space-between'}}> E-MAIL:  {oidcUser.email}  </div>
    </div>

    }

  </div>
    
  );
}
