import React, { useReducer } from "react";
import Button from "../../common/Button";
import { useEffect, useState, useMemo } from "react";
import { Redirect, useLocation, useParams } from "react-router";
import Confirmation from "./Confirmation";
import Layout from "../../layout/Layout";
import { getAd, getUi } from "../../../store/selectors";
import { loadAd, deleteAd } from "../../../store/actions";
import { connect } from "react-redux";

import "./AdPage.css";
import { useDispatch } from "react-redux";

function AdPage({ ad, history }) {
  const dispatch = useDispatch();
  const { adId } = useParams();

  const [display, setDisplay] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(loadAd(adId));
  }, [dispatch, adId]);

  const confirmation = async (event) => {
    event.preventDefault();
    setDisplay(true);
  };
  const handleDelete = async () => {
    await dispatch(deleteAd(adId, history));
  };
  // const buttonDisabled = useMemo(() => isLoading[isLoading]);

  // if (error?.status === 404) {
  //   return <Redirect to="/404" />;
  // }

  return (
    <div>
      {ad && (
        <Layout>
          <div className="adContainer">
            <img
              className="adPhoto"
              src={`http://localhost:3001${ad.photo}`}
            ></img>
            <p className="adPrice">{ad.price} EUR</p>
            <p className="adName">{ad.name}</p>
            {ad.sale === true ? (
              <p className="sale">Tipo: Venta </p>
            ) : (
              <p className="sale">Tipo: Compra </p>
            )}
            <div className="tags">Etiquetas:{ad.tags.join(", ")}</div>
            <Button
              className="adButton"
              onClick={confirmation}
              // disabled={buttonDisabled}
              variant="delete"
            >
              Borrar
            </Button>
          </div>
          {display && (
            <Confirmation onConfirm={handleDelete} onDisplay={setDisplay}>
              Desea borrar el anuncio?
            </Confirmation>
          )}
        </Layout>
      )}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  ad: getAd(state, ownProps.match.params.adId),
  ...getUi(state),
});

const connectedToStore = connect(mapStateToProps);
export default connectedToStore(AdPage);
