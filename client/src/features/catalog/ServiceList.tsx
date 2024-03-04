import { Grid } from "@mui/material";
import { Service } from "../../models/service";
import ServiceCard from "./ServiceCard";

interface Props {
  services: Service[];
}

export default function ServiceList({services}: Props) {
  return(
    <Grid container spacing={4} justifyContent='center' alignItems='center'>
      {services.map(service => (
        <Grid item xs={5} key={service.id}>
          <ServiceCard service={service} />
        </Grid>
      ))}
    </Grid>
  )
}