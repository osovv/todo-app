import { useTranslation } from "react-i18next";
import { Link, NotFoundRoute } from '@tanstack/react-router';
import { rootRoute, routes } from '~/shared/routes';

const NotFoundPage = () => {
const { t } = useTranslation("pages/not-found");

  return (
    <div>
      <h1 className='text-3xl font-bold text-red-500'>{t('not-found')}</h1>
      <Link to={routes.home.fullPath}>{t('back-to-home')}</Link>
    </div>
  );
};

export const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFoundPage,
});
