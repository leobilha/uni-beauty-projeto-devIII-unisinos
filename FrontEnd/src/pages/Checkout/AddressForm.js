import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {
  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="first-name" required>
          Nome
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="first-name"
          type="name"
          placeholder="João"
          autoComplete="first name"
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address1" required>
          Endereço
        </FormLabel>
        <OutlinedInput
          id="address1"
          name="address1"
          type="address1"
          placeholder="Nome da rua e número"
          autoComplete="shipping address-line1"
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="city" required>
          Cidade
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="city"
          placeholder="São Paulo"
          autoComplete="City"
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="state" required>
          Estado
        </FormLabel>
        <OutlinedInput
          id="state"
          name="state"
          type="state"
          placeholder="SP"
          autoComplete="State"
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="zip" required>
          CEP
        </FormLabel>
        <OutlinedInput
          id="zip"
          name="zip"
          type="zip"
          placeholder="12345-678"
          autoComplete="shipping postal-code"
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="country" required>
          País
        </FormLabel>
        <OutlinedInput
          id="country"
          name="country"
          type="country"
          placeholder="Brasil"
          autoComplete="shipping country"
          required
        />
      </FormGrid>
    </Grid>
  );
}
