import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  CardBody,
  Input,
  Textarea,
} from '@material-tailwind/react';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Notifier } from '~/shared/lib/notifier';
import { mergeRefs } from '~/shared/lib/react';
import { Task, TaskDataWithoutStatus } from '../../model';

const notifier = new Notifier();

interface TaskEditorProps {
  title?: Task['title'];
  description?: Task['description'];
  submitButtonText: string;
  onSubmit: (data: TaskDataWithoutStatus) => void;
  onClose: (_: void) => void;
}

export const TaskEditor = ({
  title: initialTitle = '',
  description: initialDescription = '',
  submitButtonText,
  onSubmit,
  onClose,
}: TaskEditorProps) => {
const { t } = useTranslation("entities/task/ui/task-editor");

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    const unsubscribe = notifier.subscribe(onClose);

    return unsubscribe;
  }, [onClose]);

  const handleClose = useCallback(() => onClose(), [onClose]);

  const handleSubmit = useCallback(
    () =>
      onSubmit({
        title,
        description,
      }),
    [onSubmit, title, description],
  );

  const onChangeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value),
    [],
  );

  const onChangeDescription = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value),
    [],
  );

  const isValid = title !== '';

  const titleInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputEl = titleInput.current?.firstChild as
      | HTMLInputElement
      | null
      | undefined;
    inputEl?.focus();
  }, [titleInput]);

  const ref = useHotkeys('esc', handleClose, { enableOnFormTags: true });

  const ref2 = useHotkeys(
    'enter',
    () =>
      isValid &&
      document.activeElement === titleInput.current?.firstChild &&
      handleSubmit(),
    { enableOnFormTags: true },
  );

  const ref3 = useHotkeys('ctrl+enter', () => isValid && handleSubmit(), {
    enableOnFormTags: true,
  });

  return (
    <div className='relative pb-2' ref={mergeRefs([ref, ref2, ref3])}>
      <Card shadow={false} className='border-2 border-gray-400'>
        <CardBody className='p-2'>
          <Input
            ref={mergeRefs([titleInput, ref, ref2])}
            variant='standard'
            placeholder={t('task-name')}
            className='border-none text-base placeholder:text-base placeholder:text-gray-500'
            value={title}
            onChange={onChangeTitle}
          />
          <Textarea
            ref={mergeRefs([ref, ref3])}
            variant='standard'
            placeholder={t('description')}
            className='border-none text-sm placeholder:text-sm placeholder:text-gray-500'
            value={description}
            onChange={onChangeDescription}
          />
        </CardBody>
      </Card>
      <div className='mt-2 flex w-full flex-row-reverse gap-2'>
        <Button disabled={!isValid} onClick={handleSubmit}>
          {submitButtonText}
        </Button>
        <Button onClick={handleClose} className='outlined'>{t('cancel-button')}</Button>
      </div>
    </div>
  );
};
