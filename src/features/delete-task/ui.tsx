import { useTranslation, Trans } from "react-i18next";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
} from '@material-tailwind/react';
import { useAction, useAtom } from '@reatom/npm-react';
import { useCallback, useState } from 'react';
import { taskModel } from '~/entities/task';
import { tasksAtom } from '~/entities/task/model';
import { getEntityById } from '~/shared/lib/entity';
import { Icon } from '~/shared/ui';
import { removeTask } from './model';

interface DeleteTaskProps {
  id: taskModel.Task['id'];
}

const taskTitleString = (task: taskModel.Task | undefined): string => {
  if (task?.title) {
    if (task.title.length >= 50) {
      return task.title.slice(0, 47) + '...';
    }
    return task.title;
  }
  return '';
};

export const DeleteTask = ({ id }: DeleteTaskProps) => {
const { t } = useTranslation("features/delete-task");

  const [task] = useAtom((ctx) => {
    const tasks = ctx.spy(tasksAtom);
    return getEntityById(tasks, id);
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmation = useCallback(
    () => setShowConfirmation((prev) => !prev),
    [],
  );

  const onRemove = useAction(removeTask);

  const onSubmit = () => {
    onRemove(id);
    handleConfirmation();
  };

  return (
    <>
      <Dialog size='lg' open={showConfirmation} handler={handleConfirmation}>
        <DialogHeader>
          <Icon size='6' name='InformationCircleIcon' />
        </DialogHeader>
        <DialogBody>
          <div className='line-clamp-3'><Trans
i18nKey="confirm-delete-task"
values={{ taskTitleStringTask: <>{taskTitleString(task)}</> }}
components={{"0": <span className='font-black' />}}
/>
            </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant='text'
            color='red'
            onClick={handleConfirmation}
            className='mr-1'
          >
            <span>{t('cancel-button')}</span>
          </Button>
          <Button variant='gradient' onClick={onSubmit}>
            <span>{t('confirm-button')}</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <IconButton
        variant='text'
        size='sm'
        onClick={() => setShowConfirmation(true)}
      >
        <Icon size='6' name='TrashIcon' />
      </IconButton>
    </>
  );
};
