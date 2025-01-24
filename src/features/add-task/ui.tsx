import { useTranslation } from "react-i18next";
import { Button } from '@material-tailwind/react';
import { useAction } from '@reatom/npm-react';
import { useCallback, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { TaskEditor, taskModel } from '~/entities/task';
import { createTask } from './model';

export const AddTask = () => {
const { t } = useTranslation("features/add-task");

  const [showForm, setShowForm] = useState(false);
  const [editorKey, setEditorKey] = useState(0);

  const onClose = useCallback(() => setShowForm(false), []);

  const submitButtonText = 'Add task';

  const onSubmit = useAction(createTask);

  const handleSubmit = (payload: taskModel.TaskDataWithoutStatus) => {
    setEditorKey((key) => key + 1);
    onSubmit(payload);
  };

  useHotkeys('ctrl+space', () => setShowForm((show) => !show));

  if (!showForm) {
    return (
      <div>
        <Button
          onClick={(_) => setShowForm(true)}
          variant='text'
          className='w-full p-2 text-left'
        >{t('add-task')}</Button>
      </div>
    );
  }

  return (
    <TaskEditor
      key={editorKey}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={submitButtonText}
    />
  );
};
