import { Redirect, Route, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { getIsLogged } from "../../store/selectors";

const PrivateRoute = ({ isLogged, ...props }) => {
  return isLogged ? (
    <Route {...props} />
  ) : (
    <Route>
      {({ location }) => (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      )}
    </Route>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isLogged: getIsLogged(state),
  };
};

const connectedToStore = connect(mapStateToProps);
export default connectedToStore(PrivateRoute);
