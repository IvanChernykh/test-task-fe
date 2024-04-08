'use client';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import {
  IRequest,
  ParcelTypes,
  RequestType,
} from '@/redux/reducers/requests/types';

import { HelperText } from '../ui/HelperText';
import { Input } from '../ui/Input';

interface IRequestFormProps {
  type: RequestType;
  defaultValues?: RequestFormData;
  onSubmit: (data: RequestFormData) => void;
}

export type RequestFormData = Omit<
  IRequest,
  'id' | 'createdByUser' | 'type' | 'createdAt'
>;

type Error = {
  message: string;
  field: string;
};

const getErrorMsg = (errs: Error[], field: string) => {
  return errs.find((item) => item.field === field)?.message || '';
};

export const RequestForm: React.FC<IRequestFormProps> = ({
  type,
  defaultValues,
  onSubmit,
}) => {
  const [cityFrom, setCityFrom] = useState<string>(
    defaultValues?.cityFrom || '',
  );
  const [cityTo, setCityTo] = useState<string>(defaultValues?.cityTo || '');
  const [parcelType, setParcelType] = useState<ParcelTypes | ''>(
    defaultValues?.typeofParcel || '',
  );
  const [dateTo, setDateTo] = useState<string>(
    defaultValues?.dispatchDate || '',
  );
  const [desc, setDesc] = useState<string>(defaultValues?.description || '');

  const [errors, setErrors] = useState<Error[]>([]);

  const changeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const { value } = e.target;
    setInput(value);

    if (!value.length) {
      setErrors((prev) => {
        return prev.find((item) => item.field === field)
          ? prev
          : [...prev, { field, message: 'This field is required' }];
      });
    } else {
      setErrors((prev) => prev.filter((item) => item.field !== field));
    }
  };

  const handleSubmit = () => {
    onSubmit({
      cityFrom,
      cityTo,
      typeofParcel: parcelType || undefined,
      dispatchDate: dateTo,
      description: desc,
    });
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Box>
        <HelperText>City of departure</HelperText>
        <Input
          fullWidth
          name="cityFrom"
          placeholder="City of departure (required)"
          value={cityFrom}
          errorMessage={getErrorMsg(errors, 'cityFrom')}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            changeInput(e, 'cityFrom', setCityFrom);
          }}
        />
      </Box>
      <Box>
        <HelperText>Destination city</HelperText>
        <Input
          fullWidth
          name="cityTo"
          placeholder="Destination city (required)"
          value={cityTo}
          errorMessage={getErrorMsg(errors, 'cityTo')}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            changeInput(e, 'cityTo', setCityTo);
          }}
        />
      </Box>
      <Box>
        <HelperText>Dispatch date</HelperText>
        <DatePicker
          sx={{ width: '100%' }}
          value={dateTo ? moment(dateTo) : undefined}
          onChange={(e) => setDateTo(moment(e).format('MMM DD YYYY'))}
        />
      </Box>
      {type === 'order' && (
        <>
          <FormControl fullWidth>
            <InputLabel>Type of parcel</InputLabel>
            <Select
              label="Type of parcel"
              value={parcelType}
              onChange={(e) => setParcelType(e.target.value as ParcelTypes)}
            >
              {Object.values(ParcelTypes).map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextareaAutosize
            placeholder="Parcel description"
            minRows={5}
            maxRows={10}
            style={{ resize: 'none', outline: 'none', padding: '5px' }}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </>
      )}
      <Button
        sx={{ mt: 1 }}
        disabled={!cityFrom.length || !cityTo.length}
        onClick={handleSubmit}
      >
        {defaultValues ? 'Update' : 'Create'} request
      </Button>
    </Box>
  );
};
