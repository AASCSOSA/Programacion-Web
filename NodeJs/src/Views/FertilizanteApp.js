import Ract, { useEffect, useState } from "react";
import FertilizanteService from "../Controllers/FertilizanteService";
import { Link } from "react-router-dom";

export default function FertilizanteApp() {
  const [fertilizante, setFertilizante] = useState([]);

  const listarFertilizante = () => {
    FertilizanteService.findAll()
      .then((response) => {
        setFertilizante(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(()=>{
    FertilizanteService.findAll().then((response)=>{
        setFertilizante(response.data);
    }).catch((error)=>{
        console.log(error);
    })
  });

  useEffect(()=>{
        listarFertilizante();
  });

  const deleteCarga= (id)=>{
    FertilizanteService.delete(id)
  }

}
