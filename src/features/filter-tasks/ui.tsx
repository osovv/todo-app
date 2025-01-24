import { useTranslation } from "react-i18next";
import { Checkbox } from '@material-tailwind/react';
import { useAction, useAtom } from '@reatom/npm-react';
import React from 'react';
import { taskModel } from '~/entities/task';
import { updateStatusFilter } from './model';

export const ShowCompletedTasks = () => {
const { t } = useTranslation("features/filter-tasks");

  const [filterByStatusEnabled] = useAtom((ctx) => {
    return ctx.spy(taskModel.filterAtom).status;
  });

  const toggleFilter = useAction(updateStatusFilter);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      toggleFilter(undefined);
    } else {
      toggleFilter('active');
    }
  };

  return (
    <Checkbox
      defaultChecked={filterByStatusEnabled !== 'active'}
      ripple={false}
      onChange={handleChange}
      className='[&:before]:h-0 [&:before]:w-0'
      label={t('show-completed-tasks')}
    />
  );
};
