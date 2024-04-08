import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { IRequest } from '@/redux/reducers/requests/types';

import { RequestItem } from './components/requestItem';

interface IRequestListProps {
  requests: IRequest[];
}

type SortMode = 'creationDate' | 'SendingDate';

const sortItems = (arr: IRequest[], sortMode: SortMode) => {
  return _.orderBy(
    arr,
    (item) =>
      sortMode === 'creationDate'
        ? +item.createdAt
        : +moment(item.dispatchDate).format('X'),
    'desc',
  );
};

export const RequestList: React.FC<IRequestListProps> = ({ requests }) => {
  const [sorted, setSorted] = useState<IRequest[]>(requests);
  const [sortMode, setSortMode] = useState<SortMode>('creationDate');

  useEffect(() => {
    setSorted(sortItems(requests, sortMode));
  }, [requests, sortMode]);

  return (
    <div>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Sort by</InputLabel>
          <Select
            label="Type of parcel"
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
          >
            <MenuItem value="creationDate">Creation date</MenuItem>
            <MenuItem value="SendingDate">Sending date</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {sorted.map((item) => (
        <RequestItem key={item.id} request={item} />
      ))}
    </div>
  );
};
